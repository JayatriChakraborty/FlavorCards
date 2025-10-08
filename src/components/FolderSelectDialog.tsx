import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Folder, FolderPlus, Check } from "lucide-react";

interface RecipeFolder {
  id: string;
  name: string;
  color: string;
}

interface FolderSelectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folders: RecipeFolder[];
  selectedFolderIds: string[];
  onSelectFolder: (folderId: string) => void;
  onCreateFolder: (name: string) => void;
}

const FolderSelectDialog = ({
  open,
  onOpenChange,
  folders,
  selectedFolderIds,
  onSelectFolder,
  onCreateFolder
}: FolderSelectDialogProps) => {
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName);
      setNewFolderName("");
      setShowCreateNew(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-md w-[95vw] sm:w-full max-h-[85vh] sm:max-h-[600px] p-4 sm:p-6">
        <DialogHeader className="pb-3 sm:pb-4">
          <DialogTitle className="text-lg sm:text-xl">Save to Folder</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-2.5 sm:space-y-3 max-h-[60vh] sm:max-h-[400px] overflow-y-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => onSelectFolder(folder.id)}
              className={`w-full flex items-center justify-between p-3.5 sm:p-3 rounded-lg border transition-all active:scale-95 touch-manipulation ${
                selectedFolderIds.includes(folder.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-accent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Folder className="w-5 h-5 sm:w-5 sm:h-5 text-primary" />
                <span className="font-medium text-sm sm:text-base text-foreground">{folder.name}</span>
              </div>
              {selectedFolderIds.includes(folder.id) && (
                <Check className="w-5 h-5 text-primary" />
              )}
            </button>
          ))}

          {!showCreateNew ? (
            <Button
              variant="outline"
              className="w-full h-11 sm:h-10 touch-manipulation active:scale-95"
              onClick={() => setShowCreateNew(true)}
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              Create New Folder
            </Button>
          ) : (
            <div className="space-y-2 pt-2 border-t border-border">
              <Input
                placeholder="Folder name (e.g., Italian Dishes 🍝)"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
                autoFocus
                className="h-11 sm:h-10 text-base"
              />
              <div className="flex space-x-2">
                <Button 
                  onClick={handleCreateFolder} 
                  disabled={!newFolderName.trim()} 
                  className="flex-1 h-11 sm:h-10 touch-manipulation active:scale-95"
                >
                  Create
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowCreateNew(false);
                    setNewFolderName("");
                  }}
                  className="flex-1 h-11 sm:h-10 touch-manipulation active:scale-95"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FolderSelectDialog;
