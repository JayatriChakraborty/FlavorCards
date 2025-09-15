import { useState } from "react";
import { Search, Filter, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/RecipeCard";
import { getPopularRecipes, searchRecipes, Recipe } from "@/data/mockRecipes";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [popularRecipes] = useState<Recipe[]>(getPopularRecipes());

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      const results = searchRecipes(query);
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleSwipeLeft = (recipe: Recipe) => {
    console.log("Added to menu:", recipe.name);
  };

  const handleSwipeRight = (recipe: Recipe) => {
    console.log("Marked as made:", recipe.name);
  };

  const displayRecipes = isSearching ? searchResults : popularRecipes;

  return (
    <div className="min-h-screen bg-background pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Explore Recipes 🔍
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover amazing recipes from our community
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 animate-scale-in">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search recipes, ingredients, cuisines..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 pr-12 py-4 text-lg bg-card border-border focus:border-primary shadow-card rounded-card"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search Results or Popular Section */}
        <div className="mb-8">
          {isSearching ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Search Results ({searchResults.length})
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearching(false);
                    setSearchResults([]);
                  }}
                >
                  Clear
                </Button>
              </div>
              
              {searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No recipes found
                  </h3>
                  <p className="text-muted-foreground">
                    Try searching for different ingredients or cuisine types
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {searchResults.map((recipe, index) => (
                    <div
                      key={recipe.id}
                      className="animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <RecipeCard
                        recipe={recipe}
                        onSwipeLeft={handleSwipeLeft}
                        onSwipeRight={handleSwipeRight}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Popular Recipes</h2>
                <div className="flex-1 h-px bg-border ml-4"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {popularRecipes.map((recipe, index) => (
                  <div
                    key={recipe.id}
                    className="animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <RecipeCard
                      recipe={recipe}
                      onSwipeLeft={handleSwipeLeft}
                      onSwipeRight={handleSwipeRight}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Category Pills */}
        {!isSearching && (
          <div className="animate-slide-up">
            <h3 className="text-lg font-semibold text-foreground mb-4">Browse by Category</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "🍝 Italian", color: "bg-secondary/10 text-secondary hover:bg-secondary/20" },
                { name: "🌶️ Spicy", color: "bg-destructive/10 text-destructive hover:bg-destructive/20" },
                { name: "🥗 Healthy", color: "bg-accent/10 text-accent hover:bg-accent/20" },
                { name: "🍰 Desserts", color: "bg-warning/10 text-warning hover:bg-warning/20" },
                { name: "⚡ Quick", color: "bg-primary/10 text-primary hover:bg-primary/20" },
                { name: "🥘 Comfort Food", color: "bg-muted text-muted-foreground hover:bg-muted/80" }
              ].map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(category.name.split(' ')[1])}
                  className={`px-4 py-2 rounded-card font-medium transition-all duration-200 hover:scale-105 ${category.color}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trending Tip */}
        <div className="mt-12 p-6 bg-gradient-primary rounded-card text-center">
          <div className="text-4xl mb-3">✨</div>
          <h3 className="text-xl font-bold text-primary-foreground mb-2">
            Trending This Week
          </h3>
          <p className="text-primary-foreground/90">
            Mediterranean bowls are getting lots of love! Try our quinoa bowl recipe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explore;