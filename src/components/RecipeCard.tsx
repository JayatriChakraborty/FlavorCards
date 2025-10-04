import { useState, useRef } from "react";
import { Heart, Clock, Users, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  metricAmount?: number;
  metricUnit?: string;
}

interface Recipe {
  id: string;
  name: string;
  image: string;
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: Ingredient[];
  isLiked?: boolean;
}

interface RecipeCardProps {
  recipe: Recipe;
  onSwipeLeft?: (recipe: Recipe) => void;
  onSwipeRight?: (recipe: Recipe) => void;
  onLike?: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onSwipeLeft, onSwipeRight, onLike }: RecipeCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMetric, setIsMetric] = useState(false);
  const [currentServings, setCurrentServings] = useState(recipe.servings);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  const servingMultiplier = currentServings / recipe.servings;

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX.current;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0 && onSwipeRight) {
        onSwipeRight(recipe);
      } else if (dragOffset < 0 && onSwipeLeft) {
        onSwipeLeft(recipe);
      }
    }
    setDragOffset(0);
  };

  const adjustServings = (delta: number) => {
    const newServings = Math.max(1, currentServings + delta);
    setCurrentServings(newServings);
  };

  const getAdjustedAmount = (ingredient: Ingredient) => {
    const baseAmount = isMetric && ingredient.metricAmount 
      ? ingredient.metricAmount 
      : ingredient.amount;
    return (baseAmount * servingMultiplier).toFixed(1);
  };

  const getUnit = (ingredient: Ingredient) => {
    return isMetric && ingredient.metricUnit 
      ? ingredient.metricUnit 
      : ingredient.unit;
  };

  return (
    <div 
      ref={cardRef}
      className="relative w-full max-w-sm mx-auto h-[420px] perspective-1000"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ 
        transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.1}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-600 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="relative w-full h-full bg-card rounded-card shadow-card overflow-hidden">
            <img 
              src={recipe.image} 
              alt={recipe.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-semibold text-foreground leading-tight flex-1">
                  {recipe.name}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike?.(recipe);
                  }}
                  className="p-1 rounded-full hover:bg-hover transition-colors flex-shrink-0 ml-2"
                >
                  <Heart 
                    className={`w-5 h-5 transition-colors ${
                      recipe.isLiked 
                        ? 'fill-accent text-accent' 
                        : 'text-muted-foreground hover:text-accent'
                    }`} 
                  />
                </button>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{recipe.cookTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{recipe.servings}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  recipe.difficulty === 'Easy' ? 'bg-success/10 text-success' :
                  recipe.difficulty === 'Medium' ? 'bg-warning/10 text-warning' :
                  'bg-destructive/10 text-destructive'
                }`}>
                  {recipe.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-card rounded-card shadow-card p-3 flex flex-col">
            {/* Header with title and controls */}
            <div className="mb-3">
              <h3 className="text-base font-semibold text-foreground mb-2">{recipe.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-3 h-3 text-muted-foreground" />
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        adjustServings(-1);
                      }}
                      className="p-1 hover:bg-hover rounded transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium min-w-[1.5rem] text-center">
                      {currentServings}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        adjustServings(1);
                      }}
                      className="p-1 hover:bg-hover rounded transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMetric(!isMetric);
                  }}
                  className="text-xs h-7 px-2"
                >
                  {isMetric ? 'Metric' : 'Imperial'}
                </Button>
              </div>
            </div>

            {/* Ingredients list - scrollable if needed */}
            <div className="flex-1 min-h-0">
              <h4 className="font-semibold text-sm text-foreground mb-2">Ingredients</h4>
              <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <span className="text-foreground">{ingredient.name}</span>
                    <span className="text-muted-foreground font-medium whitespace-nowrap ml-2">
                      {getAdjustedAmount(ingredient)} {getUnit(ingredient)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-2 mt-3 pt-3 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-8 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onSwipeLeft?.(recipe);
                }}
              >
                Add to Menu
              </Button>
              <Button
                size="sm"
                className="flex-1 h-8 text-xs bg-accent hover:bg-accent-light"
                onClick={(e) => {
                  e.stopPropagation();
                  onSwipeRight?.(recipe);
                }}
              >
                Made It!
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe indicators */}
      {Math.abs(dragOffset) > 50 && (
        <div className={`absolute top-4 ${dragOffset > 0 ? 'right-4' : 'left-4'} 
          px-3 py-1 rounded-full text-sm font-medium transition-opacity
          ${dragOffset > 0 
            ? 'bg-accent text-accent-foreground' 
            : 'bg-secondary text-secondary-foreground'
          }`}>
          {dragOffset > 0 ? 'Made It!' : 'Add to Menu'}
        </div>
      )}
    </div>
  );
};

export default RecipeCard;