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
    <div className="min-h-screen bg-background pt-4 pb-20 lg:pt-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Header */}
        <div className="text-center mb-6 lg:mb-8 animate-slide-up">
          <div className="inline-block p-2 lg:p-3 bg-gradient-primary rounded-lg lg:rounded-xl mb-3 lg:mb-4">
            <Search className="w-6 h-6 lg:w-8 lg:h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-2 lg:mb-3 px-4">
            Discover Your Next Favorite Recipe
          </h1>
          <p className="text-muted-foreground text-sm lg:text-lg max-w-2xl mx-auto px-4">
            Browse thousands of recipes from around the world
          </p>
        </div>

        {/* Enhanced Search Bar */}
        <div className="max-w-3xl mx-auto mb-6 lg:mb-10 animate-scale-in">
          <div className="relative bg-card rounded-xl lg:rounded-2xl shadow-elegant p-1.5 lg:p-2">
            <div className="relative">
              <Search className="absolute left-3 lg:left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 lg:w-5 lg:h-5" />
              <Input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 lg:pl-14 pr-12 lg:pr-14 py-3 lg:py-5 text-base lg:text-lg bg-transparent border-none focus:ring-0 focus-visible:ring-0"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 lg:right-2 top-1/2 transform -translate-y-1/2 hover:bg-primary/10 h-8 w-8 lg:h-auto lg:w-auto p-1 lg:p-2"
              >
                <Filter className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
              </Button>
            </div>
          </div>
          {/* Quick Filters */}
          <div className="flex items-center justify-center gap-1.5 lg:gap-2 mt-3 lg:mt-4 flex-wrap px-2">
            <span className="text-xs lg:text-sm text-muted-foreground hidden sm:inline">Quick filters:</span>
            {["Vegetarian", "Under 30 min", "High Protein", "Low Carb"].map((filter) => (
              <button
                key={filter}
                onClick={() => handleSearch(filter)}
                className="text-xs lg:text-sm px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-95"
              >
                {filter}
              </button>
            ))}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
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

        {/* Enhanced Category Grid */}
        {!isSearching && (
          <div className="animate-slide-up mb-8 lg:mb-12">
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4 lg:mb-6">Explore by Cuisine</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
              {[
                { name: "Italian", emoji: "🍝", color: "from-red-500/20 to-green-500/20" },
                { name: "Asian", emoji: "🍜", color: "from-orange-500/20 to-yellow-500/20" },
                { name: "Mexican", emoji: "🌮", color: "from-green-500/20 to-red-500/20" },
                { name: "Desserts", emoji: "🍰", color: "from-pink-500/20 to-purple-500/20" },
                { name: "Healthy", emoji: "🥗", color: "from-green-500/20 to-emerald-500/20" },
                { name: "Quick Meals", emoji: "⚡", color: "from-blue-500/20 to-cyan-500/20" }
              ].map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(category.name)}
                  className={`group relative overflow-hidden bg-gradient-to-br ${category.color} rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-lg touch-manipulation`}
                >
                  <div className="text-3xl lg:text-4xl mb-1 lg:mb-2">{category.emoji}</div>
                  <div className="text-xs lg:text-sm font-semibold text-foreground">{category.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trending Section */}
        {!isSearching && (
          <div className="mt-8 lg:mt-12 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center border border-primary/20">
            <div className="inline-block p-3 lg:p-4 bg-gradient-primary rounded-xl lg:rounded-2xl mb-3 lg:mb-4">
              <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2 lg:mb-3">
              🔥 Trending This Week
            </h3>
            <p className="text-muted-foreground text-sm lg:text-lg max-w-2xl mx-auto">
              Mediterranean bowls, Air Fryer recipes, and One-Pot Wonders are getting lots of love from our community!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;