import { useState } from "react";
import { FolderPlus, Folder, Search, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import RecipeCard from "@/components/RecipeCard";
import { mockRecipes, Recipe } from "@/data/mockRecipes";

interface RecipeFolder {
  id: string;
  name: string;
  recipes: Recipe[];
  color: string;
}

const Recipes = () => {
  const [folders, setFolders] = useState<RecipeFolder[]>([
    {
      id: "1",
      name: "Favorites ❤️",
      recipes: mockRecipes.filter(r => r.isLiked),
      color: "bg-accent/10 border-accent/20"
    },
    {
      id: "2", 
      name: "Quick Meals ⚡",
      recipes: mockRecipes.filter(r => parseInt(r.cookTime) <= 25),
      color: "bg-warning/10 border-warning/20"
    },
    {
      id: "3",
      name: "Desserts 🍰",
      recipes: mockRecipes.filter(r => r.name.toLowerCase().includes('cookie') || r.name.toLowerCase().includes('chocolate')),
      color: "bg-secondary/10 border-secondary/20"
    }
  ]);
  
  const [selectedFolder, setSelectedFolder] = useState<RecipeFolder | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const createFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: RecipeFolder = {
        id: Date.now().toString(),
        name: newFolderName,
        recipes: [],
        color: "bg-primary/10 border-primary/20"
      };
      setFolders(prev => [...prev, newFolder]);
      setNewFolderName("");
      setShowCreateFolder(false);
    }
  };

  const handleSwipeLeft = (recipe: Recipe) => {
    console.log("Added to menu:", recipe.name);
  };

  const handleSwipeRight = (recipe: Recipe) => {
    console.log("Marked as made:", recipe.name);
  };

  const filteredRecipes = selectedFolder 
    ? selectedFolder.recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-background pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Recipes 📚
          </h1>
          <p className="text-muted-foreground text-lg">
            Organize your favorite recipes in custom folders
          </p>
        </div>

        {/* Folder View */}
        {!selectedFolder ? (
          <div>
            {/* Create Folder Section */}
            <Card className="p-6 mb-8 animate-scale-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <FolderPlus className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Create New Folder</h3>
                    <p className="text-sm text-muted-foreground">
                      Organize your recipes by cuisine, meal type, or any custom category
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowCreateFolder(!showCreateFolder)}
                  className="bg-accent hover:bg-accent-light"
                >
                  <FolderPlus className="w-4 h-4 mr-2" />
                  New Folder
                </Button>
              </div>
              
              {showCreateFolder && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex space-x-3">
                    <Input
                      placeholder="Folder name (e.g., Italian Dishes 🍝)"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && createFolder()}
                    />
                    <Button onClick={createFolder} disabled={!newFolderName.trim()}>
                      Create
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowCreateFolder(false);
                        setNewFolderName("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Folders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {folders.map((folder, index) => (
                <Card
                  key={folder.id}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${folder.color} animate-scale-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedFolder(folder)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-card rounded-lg shadow-sm">
                      <Folder className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg">
                        {folder.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {folder.recipes.length} recipe{folder.recipes.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  {/* Preview Images */}
                  <div className="mt-4 flex space-x-2">
                    {folder.recipes.slice(0, 3).map((recipe, idx) => (
                      <img
                        key={recipe.id}
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ))}
                    {folder.recipes.length > 3 && (
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        <span className="text-xs text-muted-foreground font-medium">
                          +{folder.recipes.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{folders.length}</div>
                <div className="text-sm text-muted-foreground">Folders</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-secondary">
                  {folders.reduce((sum, folder) => sum + folder.recipes.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Recipes</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">
                  {mockRecipes.filter(r => r.isLiked).length}
                </div>
                <div className="text-sm text-muted-foreground">Favorites</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-warning">12</div>
                <div className="text-sm text-muted-foreground">Made This Week</div>
              </Card>
            </div>
          </div>
        ) : (
          /* Recipe List View */
          <div>
            {/* Folder Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedFolder(null)}
                >
                  ← Back
                </Button>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {selectedFolder.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedFolder.recipes.length} recipe{selectedFolder.recipes.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <div className="flex border border-border rounded-button">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Recipes */}
            {filteredRecipes.length > 0 ? (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
              }>
                {filteredRecipes.map((recipe, index) => (
                  <div
                    key={recipe.id}
                    className={`animate-scale-in ${viewMode === "list" ? "max-w-sm" : ""}`}
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
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📂</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {searchQuery ? "No matching recipes found" : "This folder is empty"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery 
                    ? "Try adjusting your search terms" 
                    : "Start adding recipes to organize them here"
                  }
                </p>
                {!searchQuery && (
                  <Button className="bg-accent hover:bg-accent-light">
                    Browse Recipes
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;