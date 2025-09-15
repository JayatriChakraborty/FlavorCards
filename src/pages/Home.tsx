import { useState } from "react";
import { Clock, TrendingUp, Star } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import { getRecentRecipes, Recipe } from "@/data/mockRecipes";

const Home = () => {
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>(getRecentRecipes());
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleSwipeLeft = (recipe: Recipe) => {
    console.log("Added to menu:", recipe.name);
    setCurrentCardIndex(prev => Math.min(prev + 1, recentRecipes.length - 1));
  };

  const handleSwipeRight = (recipe: Recipe) => {
    console.log("Marked as made:", recipe.name);
    setCurrentCardIndex(prev => Math.min(prev + 1, recentRecipes.length - 1));
  };

  const handleLike = (recipe: Recipe) => {
    setRecentRecipes(prev => 
      prev.map(r => r.id === recipe.id ? { ...r, isLiked: !r.isLiked } : r)
    );
  };

  const currentRecipe = recentRecipes[currentCardIndex];

  return (
    <div className="min-h-screen bg-background pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, Chef! 👨‍🍳
          </h1>
          <p className="text-muted-foreground text-lg">
            Ready to cook something delicious today?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-card p-6 shadow-card animate-scale-in">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-primary rounded-lg">
                <Clock className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">Recipes Made</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-card p-6 shadow-card animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-secondary rounded-lg">
                <TrendingUp className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-card p-6 shadow-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-accent rounded-lg">
                <Star className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">45</p>
                <p className="text-sm text-muted-foreground">Favorites</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Recipes Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Your Recent Recipes</h2>
          <p className="text-muted-foreground">Continue cooking from where you left off</p>
        </div>

        {/* Recipe Card Stack */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {currentRecipe && (
              <div className="animate-scale-in">
                <RecipeCard
                  recipe={currentRecipe}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  onLike={handleLike}
                />
              </div>
            )}
            
            {/* Progress indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {recentRecipes.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentCardIndex
                      ? 'bg-primary'
                      : index < currentCardIndex
                      ? 'bg-accent'
                      : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <button
            onClick={() => setCurrentCardIndex(prev => Math.max(0, prev - 1))}
            className="p-4 bg-card rounded-card shadow-card hover:shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentCardIndex === 0}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">⬅️</div>
              <p className="text-sm font-medium text-foreground">Previous</p>
            </div>
          </button>
          
          <button
            onClick={() => setCurrentCardIndex(prev => Math.min(recentRecipes.length - 1, prev + 1))}
            className="p-4 bg-card rounded-card shadow-card hover:shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentCardIndex === recentRecipes.length - 1}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">➡️</div>
              <p className="text-sm font-medium text-foreground">Next</p>
            </div>
          </button>
        </div>

        {/* Swipe Instructions */}
        <div className="text-center mt-8 p-4 bg-muted rounded-card">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Pro tip:</strong> Tap to flip cards, swipe left to add to menu, swipe right when made!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;