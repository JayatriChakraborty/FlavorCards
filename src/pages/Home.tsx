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
    <div className="min-h-screen bg-background pt-4 pb-20 lg:pt-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Header */}
        <div className="text-center mb-6 lg:mb-10 animate-slide-up">
          <div className="text-5xl lg:text-6xl mb-3 lg:mb-4">👨‍🍳</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2 lg:mb-3">
            Welcome back, Chef!
          </h1>
          <p className="text-muted-foreground text-base lg:text-lg">
            Ready to cook something amazing today?
          </p>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-8 lg:mb-12">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-elegant animate-scale-in border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl lg:text-4xl font-bold text-foreground mb-1">12</p>
                <p className="text-xs lg:text-sm text-muted-foreground font-medium">Recipes Made</p>
                <p className="text-xs text-primary mt-0.5 lg:mt-1">+3 this week</p>
              </div>
              <div className="p-3 lg:p-4 bg-gradient-primary rounded-lg lg:rounded-xl">
                <Clock className="w-5 h-5 lg:w-7 lg:h-7 text-primary-foreground" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-elegant animate-scale-in border border-secondary/20" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl lg:text-4xl font-bold text-foreground mb-1">8</p>
                <p className="text-xs lg:text-sm text-muted-foreground font-medium">This Week</p>
                <p className="text-xs text-secondary mt-0.5 lg:mt-1">Great progress!</p>
              </div>
              <div className="p-3 lg:p-4 bg-gradient-secondary rounded-lg lg:rounded-xl">
                <TrendingUp className="w-5 h-5 lg:w-7 lg:h-7 text-secondary-foreground" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-elegant animate-scale-in border border-accent/20" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl lg:text-4xl font-bold text-foreground mb-1">45</p>
                <p className="text-xs lg:text-sm text-muted-foreground font-medium">Favorites</p>
                <p className="text-xs text-accent mt-0.5 lg:mt-1">Your collection</p>
              </div>
              <div className="p-3 lg:p-4 bg-accent rounded-lg lg:rounded-xl">
                <Star className="w-5 h-5 lg:w-7 lg:h-7 text-accent-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Recipes Section */}
        <div className="text-center mb-4 lg:mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">Your Recent Recipes</h2>
          <p className="text-sm lg:text-base text-muted-foreground">Drag to browse your recipe collection</p>
        </div>

        {/* Horizontal Scrollable Recipe Cards */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-visible scrollbar-hide pb-6 lg:pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex gap-4 lg:gap-6 w-max">
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

        {/* Enhanced Instructions */}
        <div className="mt-8 lg:mt-12 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-primary/10">
          <h3 className="text-base lg:text-lg font-bold text-foreground mb-3 text-center">✨ Quick Guide</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 text-center">
            <div className="p-3 lg:p-4 bg-card/50 rounded-lg lg:rounded-xl">
              <div className="text-xl lg:text-2xl mb-1 lg:mb-2">👆</div>
              <p className="text-xs lg:text-sm text-foreground font-medium mb-0.5 lg:mb-1">Tap to Flip</p>
              <p className="text-xs text-muted-foreground">See recipe details</p>
            </div>
            <div className="p-3 lg:p-4 bg-card/50 rounded-lg lg:rounded-xl">
              <div className="text-xl lg:text-2xl mb-1 lg:mb-2">👈</div>
              <p className="text-xs lg:text-sm text-foreground font-medium mb-0.5 lg:mb-1">Swipe Left</p>
              <p className="text-xs text-muted-foreground">Add to your menu</p>
            </div>
            <div className="p-3 lg:p-4 bg-card/50 rounded-lg lg:rounded-xl">
              <div className="text-xl lg:text-2xl mb-1 lg:mb-2">👉</div>
              <p className="text-xs lg:text-sm text-foreground font-medium mb-0.5 lg:mb-1">Swipe Right</p>
              <p className="text-xs text-muted-foreground">Mark as made</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;