import { NavLink } from "react-router-dom";
import { Home, Search, ChefHat, BookOpen } from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";

const Navigation = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/explore", icon: Search, label: "Explore" },
    { to: "/menu", icon: ChefHat, label: "Menu" },
    { to: "/recipes", icon: BookOpen, label: "Recipes" },
  ];

  return (
    <>
      {/* Desktop Navigation - Top */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FlavorCards
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-button transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-hover"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Hamburger Menu */}
          <HamburgerMenu />
        </div>
      </div>

      {/* Mobile & Tablet Navigation - Bottom */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-card/95 backdrop-blur-md border-t border-border z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center justify-around flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex flex-col items-center space-y-1 px-2 py-2 rounded-button transition-all duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
          
          {/* Mobile Hamburger Menu */}
          <div className="flex-shrink-0">
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;