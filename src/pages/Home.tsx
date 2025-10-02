import { useState, useRef } from "react";
import { Clock, TrendingUp, Star } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import { getRecentRecipes, Recipe } from "@/data/mockRecipes";

const Home = () => {
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>(getRecentRecipes());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSwipeLeft = (recipe: Recipe) => {
    console.log("Added to menu:", recipe.name);
  };

  const handleSwipeRight = (recipe: Recipe) => {
    console.log("Marked as made:", recipe.name);
  };

  const handleLike = (recipe: Recipe) => {
    setRecentRecipes(prev => 
      prev.map(r => r.id === recipe.id ? { ...r, isLiked: !r.isLiked } : r)
    );
  };

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
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Your Recent Recipes</h2>
          <p className="text-muted-foreground">Drag to browse your recipe collection</p>
        </div>

        {/* Horizontal Scrollable Recipe Cards */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-visible scrollbar-hide pb-8 -mx-6 px-6 cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex gap-6 w-max">
            {recentRecipes.map((recipe, index) => (
              <div 
                key={recipe.id} 
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <RecipeCard
                  recipe={recipe}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  onLike={handleLike}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Swipe Instructions */}
        <div className="text-center mt-8 p-4 bg-muted rounded-card">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Pro tip:</strong> Drag to scroll • Tap to flip cards • Swipe left to add to menu • Swipe right when made!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;