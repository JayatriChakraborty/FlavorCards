import { useState } from "react";
import { Plus, Link2, ShoppingCart, Trash2, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockRecipes, Recipe } from "@/data/mockRecipes";

interface MenuItem extends Recipe {
  addedToMenu: boolean;
}

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    mockRecipes.slice(0, 3).map(recipe => ({ ...recipe, addedToMenu: true }))
  );
  const [linkInput, setLinkInput] = useState("");
  const [isProcessingLink, setIsProcessingLink] = useState(false);

  const handleAddLink = async () => {
    if (linkInput.trim()) {
      setIsProcessingLink(true);
      // Simulate link processing
      setTimeout(() => {
        setIsProcessingLink(false);
        setLinkInput("");
        // You would integrate with your recipe detection API here
        console.log("Processing link:", linkInput);
      }, 2000);
    }
  };

  const removeFromMenu = (recipeId: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== recipeId));
  };

  const toggleIngredient = (recipeId: string, ingredientIndex: number) => {
    setMenuItems(prev => 
      prev.map(item => {
        if (item.id === recipeId) {
          const updatedIngredients = [...item.ingredients];
          updatedIngredients[ingredientIndex] = {
            ...updatedIngredients[ingredientIndex],
            checked: !updatedIngredients[ingredientIndex].checked
          };
          return { ...item, ingredients: updatedIngredients };
        }
        return item;
      })
    );
  };

  const getAllIngredients = () => {
    const ingredientMap = new Map();
    
    menuItems.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const key = ingredient.name.toLowerCase();
        if (ingredientMap.has(key)) {
          const existing = ingredientMap.get(key);
          existing.amount += ingredient.amount;
          existing.recipes.push(recipe.name);
        } else {
          ingredientMap.set(key, {
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
            recipes: [recipe.name],
            checked: ingredient.checked || false
          });
        }
      });
    });
    
    return Array.from(ingredientMap.values());
  };

  const consolidatedIngredients = getAllIngredients();

  return (
    <div className="min-h-screen bg-background pt-6 lg:pt-20 pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Menu 📋
          </h1>
          <p className="text-muted-foreground text-lg">
            Plan your meals and generate shopping lists
          </p>
        </div>

        {/* Link Input Section */}
        <Card className="p-6 mb-8 animate-scale-in">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Link2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Add Recipe from Link</h3>
              <p className="text-sm text-muted-foreground">
                Paste a YouTube, Instagram, or recipe website link
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Input
              type="url"
              placeholder="https://youtube.com/watch?v=... or recipe URL"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              className="flex-1"
              disabled={isProcessingLink}
            />
            <Button
              onClick={handleAddLink}
              disabled={!linkInput.trim() || isProcessingLink}
              className="bg-accent hover:bg-accent-light"
            >
              {isProcessingLink ? (
                <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          {isProcessingLink && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary">
                🤖 Analyzing recipe content... This may take a moment.
              </p>
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Menu Items */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Planned Recipes ({menuItems.length})
              </h2>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Recipe
              </Button>
            </div>

            <div className="space-y-3">
              {menuItems.map((recipe, index) => (
                <Card 
                  key={recipe.id} 
                  className="p-3 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-foreground truncate">
                            {recipe.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {recipe.servings} servings • {recipe.cookTime}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromMenu(recipe.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0 flex-shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              {menuItems.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🍽️</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No recipes in your menu yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Add recipes by swiping left on recipe cards or using the link above
                  </p>
                  <Button className="bg-accent hover:bg-accent-light">
                    Browse Recipes
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Shopping List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Shopping List
              </h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Card className="p-4">
              {consolidatedIngredients.length > 0 ? (
                <div className="space-y-3">
                  {consolidatedIngredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                        ingredient.checked ? 'bg-accent/10' : 'hover:bg-hover'
                      }`}
                    >
                      <button
                        onClick={() => {
                          const updatedIngredients = [...consolidatedIngredients];
                          updatedIngredients[index].checked = !updatedIngredients[index].checked;
                        }}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          ingredient.checked
                            ? 'bg-accent border-accent text-accent-foreground'
                            : 'border-border hover:border-accent'
                        }`}
                      >
                        {ingredient.checked && <Check className="w-3 h-3" />}
                      </button>
                      
                      <div className="flex-1">
                        <div className={`font-medium transition-colors ${
                          ingredient.checked 
                            ? 'text-muted-foreground line-through' 
                            : 'text-foreground'
                        }`}>
                          {ingredient.amount} {ingredient.unit} {ingredient.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          For: {ingredient.recipes.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {consolidatedIngredients.filter(i => i.checked).length} of{' '}
                        {consolidatedIngredients.length} items checked
                      </span>
                      <div className="text-right">
                        <div className="text-muted-foreground">
                          Estimated cost: <span className="font-semibold text-foreground">$45-65</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">🛒</div>
                  <p className="text-muted-foreground">
                    Add recipes to your menu to generate a shopping list
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;