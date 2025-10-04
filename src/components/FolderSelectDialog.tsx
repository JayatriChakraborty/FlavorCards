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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Save to Folder</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => onSelectFolder(folder.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                selectedFolderIds.includes(folder.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-accent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Folder className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">{folder.name}</span>
              </div>
              {selectedFolderIds.includes(folder.id) && (
                <Check className="w-5 h-5 text-primary" />
              )}
            </button>
          ))}

          {!showCreateNew ? (
            <Button
              variant="outline"
              className="w-full"
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
              />
              <div className="flex space-x-2">
                <Button onClick={handleCreateFolder} disabled={!newFolderName.trim()} className="flex-1">
                  Create
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowCreateNew(false);
                    setNewFolderName("");
                  }}
                  className="flex-1"
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
