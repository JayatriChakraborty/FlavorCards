import { useState } from "react";
import { FolderPlus, Folder, Search, Grid, List, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RecipeCard from "@/components/RecipeCard";
import FolderSelectDialog from "@/components/FolderSelectDialog";
import { mockRecipes, Recipe } from "@/data/mockRecipes";
import { useToast } from "@/hooks/use-toast";

interface RecipeFolder {
  id: string;
  name: string;
  recipes: Recipe[];
  color: string;
}

const Recipes = () => {
  const { toast } = useToast();
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
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editFolderName, setEditFolderName] = useState("");

  const createFolder = (name?: string) => {
    const folderName = name || newFolderName;
    if (folderName.trim()) {
      const newFolder: RecipeFolder = {
        id: Date.now().toString(),
        name: folderName,
        recipes: [],
        color: "bg-primary/10 border-primary/20"
      };
      setFolders(prev => [...prev, newFolder]);
      setNewFolderName("");
      setShowCreateFolder(false);
      toast({
        title: "Folder created",
        description: `"${folderName}" has been created.`
      });
      return newFolder.id;
    }
  };

  const renameFolder = (folderId: string, newName: string) => {
    if (newName.trim()) {
      setFolders(prev => prev.map(f => 
        f.id === folderId ? { ...f, name: newName } : f
      ));
      setEditingFolderId(null);
      setEditFolderName("");
      toast({
        title: "Folder renamed",
        description: `Folder renamed to "${newName}".`
      });
    }
  };

  const deleteFolder = (folderId: string) => {
    const folder = folders.find(f => f.id === folderId);
    setFolders(prev => prev.filter(f => f.id !== folderId));
    if (selectedFolder?.id === folderId) {
      setSelectedFolder(null);
    }
    toast({
      title: "Folder deleted",
      description: `"${folder?.name}" has been deleted.`
    });
  };

  const handleLikeRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setFolderDialogOpen(true);
  };

  const toggleRecipeInFolder = (folderId: string) => {
    if (!selectedRecipe) return;

    setFolders(prev => prev.map(folder => {
      if (folder.id === folderId) {
        const isInFolder = folder.recipes.some(r => r.id === selectedRecipe.id);
        if (isInFolder) {
          // Remove from folder
          return {
            ...folder,
            recipes: folder.recipes.filter(r => r.id !== selectedRecipe.id)
          };
        } else {
          // Add to folder
          return {
            ...folder,
            recipes: [...folder.recipes, selectedRecipe]
          };
        }
      }
      return folder;
    }));
  };

  const getRecipeFolderIds = (recipe: Recipe) => {
    return folders
      .filter(folder => folder.recipes.some(r => r.id === recipe.id))
      .map(folder => folder.id);
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
    <div className="min-h-screen bg-background pt-4 pb-20 lg:pt-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-8 animate-slide-up">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Your Recipes 📚
          </h1>
          <p className="text-muted-foreground text-sm lg:text-lg">
            Organize your favorite recipes in custom folders
          </p>
        </div>

        {/* Folder View */}
        {!selectedFolder ? (
          <div>
            {/* Create Folder Section */}
            <Card className="p-4 lg:p-6 mb-6 lg:mb-8 animate-scale-in">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-gradient-primary rounded-lg flex-shrink-0">
                    <FolderPlus className="w-4 h-4 lg:w-5 lg:h-5 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm lg:text-base text-foreground">Create New Folder</h3>
                    <p className="text-xs lg:text-sm text-muted-foreground hidden sm:block">
                      Organize your recipes by cuisine or meal type
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowCreateFolder(!showCreateFolder)}
                  className="bg-accent hover:bg-accent-light flex-shrink-0 h-9 lg:h-10 text-sm"
                >
                  <FolderPlus className="w-4 h-4 lg:mr-2" />
                  <span className="hidden lg:inline">New Folder</span>
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
                    <Button onClick={() => createFolder()} disabled={!newFolderName.trim()}>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {folders.map((folder, index) => (
                <Card
                  key={folder.id}
                  className={`p-4 lg:p-6 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg touch-manipulation ${folder.color} animate-scale-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="flex items-center space-x-4 flex-1 cursor-pointer"
                      onClick={() => setSelectedFolder(folder)}
                    >
                      <div className="p-3 bg-card rounded-lg shadow-sm">
                        <Folder className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        {editingFolderId === folder.id ? (
                          <Input
                            value={editFolderName}
                            onChange={(e) => setEditFolderName(e.target.value)}
                            onBlur={() => renameFolder(folder.id, editFolderName)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                renameFolder(folder.id, editFolderName);
                              }
                            }}
                            className="h-8 font-semibold"
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <>
                            <h3 className="font-semibold text-foreground text-lg">
                              {folder.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {folder.recipes.length} recipe{folder.recipes.length !== 1 ? 's' : ''}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingFolderId(folder.id);
                            setEditFolderName(folder.name);
                          }}
                        >
                          <Edit2 className="mr-2 h-4 w-4" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteFolder(folder.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  {/* Preview Images */}
                  <div 
                    className="mt-4 flex space-x-2 cursor-pointer"
                    onClick={() => setSelectedFolder(folder)}
                  >
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
                      onLike={handleLikeRecipe}
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

        {/* Folder Selection Dialog */}
        <FolderSelectDialog
          open={folderDialogOpen}
          onOpenChange={setFolderDialogOpen}
          folders={folders.map(f => ({ id: f.id, name: f.name, color: f.color }))}
          selectedFolderIds={selectedRecipe ? getRecipeFolderIds(selectedRecipe) : []}
          onSelectFolder={toggleRecipeInFolder}
          onCreateFolder={(name) => {
            const newId = createFolder(name);
            if (newId) {
              toggleRecipeInFolder(newId);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Recipes;