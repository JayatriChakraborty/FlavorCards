import { useState } from "react";
import { 
  Menu, 
  User, 
  CreditCard, 
  UserPlus, 
  MessageSquare, 
  Users, 
  LogOut, 
  Trash2 
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const menuItems = [
    { 
      icon: User, 
      label: "Profile", 
      onClick: () => {
        console.log("Navigate to Profile");
        setOpen(false);
      }
    },
    { 
      icon: CreditCard, 
      label: "Subscription", 
      onClick: () => {
        console.log("Navigate to Subscription");
        setOpen(false);
      }
    },
    { 
      icon: UserPlus, 
      label: "Invite Friends", 
      onClick: () => {
        console.log("Open Invite Friends");
        setOpen(false);
      }
    },
    { 
      icon: MessageSquare, 
      label: "Leave Feedback", 
      onClick: () => {
        console.log("Open Feedback Form");
        setOpen(false);
      }
    },
    { 
      icon: Users, 
      label: "Join Us", 
      onClick: () => {
        console.log("Navigate to Join Us");
        setOpen(false);
      }
    },
  ];

  const handleLogOut = () => {
    console.log("Log out user");
    setOpen(false);
    // Add logout logic here
  };

  const handleDeleteAccount = () => {
    setShowDeleteDialog(true);
    setOpen(false);
  };

  const confirmDeleteAccount = () => {
    console.log("Delete account confirmed");
    setShowDeleteDialog(false);
    // Add delete account logic here
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-hover active:scale-95 transition-all touch-manipulation"
          >
            <Menu className="h-5 w-5 lg:h-6 lg:w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[350px]">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-all active:scale-95 touch-manipulation"
              >
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-base font-medium text-foreground">{item.label}</span>
              </button>
            ))}
            
            <Separator className="my-4" />
            
            <button
              onClick={handleLogOut}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-all active:scale-95 touch-manipulation"
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
              <span className="text-base font-medium text-foreground">Log Out</span>
            </button>
            
            <button
              onClick={handleDeleteAccount}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-destructive/10 text-destructive transition-all active:scale-95 touch-manipulation"
            >
              <Trash2 className="w-5 h-5" />
              <span className="text-base font-medium">Delete Account</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default HamburgerMenu;
