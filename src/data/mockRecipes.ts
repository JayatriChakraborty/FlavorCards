import risottoImg from "@/assets/risotto.jpg";
import thaiChickenImg from "@/assets/thai-basil-chicken.jpg";
import cookiesImg from "@/assets/chocolate-chip-cookies.jpg";
import quinoaBowlImg from "@/assets/quinoa-bowl.jpg";
import beefTacosImg from "@/assets/beef-tacos.jpg";
import salmonTeriyakiImg from "@/assets/salmon-teriyaki.jpg";

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  metricAmount?: number;
  metricUnit?: string;
  checked?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: Ingredient[];
  isLiked?: boolean;
  isPopular?: boolean;
  dateAdded?: string;
}

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    name: "Creamy Mushroom Risotto",
    image: risottoImg,
    cookTime: "35 min",
    servings: 4,
    difficulty: "Medium",
    isLiked: true,
    isPopular: true,
    dateAdded: "2024-01-15",
    ingredients: [
      { name: "Arborio rice", amount: 1.5, unit: "cups", metricAmount: 300, metricUnit: "g" },
      { name: "Mixed mushrooms", amount: 1, unit: "lb", metricAmount: 450, metricUnit: "g" },
      { name: "Vegetable broth", amount: 4, unit: "cups", metricAmount: 1, metricUnit: "L" },
      { name: "White wine", amount: 0.5, unit: "cup", metricAmount: 120, metricUnit: "ml" },
      { name: "Parmesan cheese", amount: 0.5, unit: "cup", metricAmount: 50, metricUnit: "g" },
      { name: "Butter", amount: 3, unit: "tbsp", metricAmount: 45, metricUnit: "g" },
      { name: "Onion", amount: 1, unit: "medium", metricAmount: 1, metricUnit: "medium" },
      { name: "Garlic cloves", amount: 3, unit: "cloves", metricAmount: 3, metricUnit: "cloves" }
    ]
  },
  {
    id: "2",
    name: "Spicy Thai Basil Chicken",
    image: thaiChickenImg,
    cookTime: "20 min",
    servings: 2,
    difficulty: "Easy",
    isPopular: true,
    dateAdded: "2024-01-14",
    ingredients: [
      { name: "Chicken breast", amount: 1, unit: "lb", metricAmount: 450, metricUnit: "g" },
      { name: "Thai basil leaves", amount: 1, unit: "cup", metricAmount: 25, metricUnit: "g" },
      { name: "Bell peppers", amount: 2, unit: "medium", metricAmount: 2, metricUnit: "medium" },
      { name: "Fish sauce", amount: 2, unit: "tbsp", metricAmount: 30, metricUnit: "ml" },
      { name: "Soy sauce", amount: 1, unit: "tbsp", metricAmount: 15, metricUnit: "ml" },
      { name: "Brown sugar", amount: 1, unit: "tsp", metricAmount: 5, metricUnit: "g" },
      { name: "Thai chilies", amount: 3, unit: "pieces", metricAmount: 3, metricUnit: "pieces" },
      { name: "Garlic cloves", amount: 4, unit: "cloves", metricAmount: 4, metricUnit: "cloves" }
    ]
  },
  {
    id: "3",
    name: "Classic Chocolate Chip Cookies",
    image: cookiesImg,
    cookTime: "25 min",
    servings: 24,
    difficulty: "Easy",
    isLiked: true,
    isPopular: true,
    dateAdded: "2024-01-13",
    ingredients: [
      { name: "All-purpose flour", amount: 2.25, unit: "cups", metricAmount: 280, metricUnit: "g" },
      { name: "Butter", amount: 1, unit: "cup", metricAmount: 225, metricUnit: "g" },
      { name: "Brown sugar", amount: 0.75, unit: "cup", metricAmount: 150, metricUnit: "g" },
      { name: "White sugar", amount: 0.25, unit: "cup", metricAmount: 50, metricUnit: "g" },
      { name: "Eggs", amount: 2, unit: "large", metricAmount: 2, metricUnit: "large" },
      { name: "Vanilla extract", amount: 2, unit: "tsp", metricAmount: 10, metricUnit: "ml" },
      { name: "Baking soda", amount: 1, unit: "tsp", metricAmount: 5, metricUnit: "g" },
      { name: "Salt", amount: 1, unit: "tsp", metricAmount: 5, metricUnit: "g" },
      { name: "Chocolate chips", amount: 2, unit: "cups", metricAmount: 350, metricUnit: "g" }
    ]
  },
  {
    id: "4",
    name: "Mediterranean Quinoa Bowl",
    image: quinoaBowlImg,
    cookTime: "30 min",
    servings: 3,
    difficulty: "Easy",
    isPopular: true,
    dateAdded: "2024-01-12",
    ingredients: [
      { name: "Quinoa", amount: 1, unit: "cup", metricAmount: 200, metricUnit: "g" },
      { name: "Cucumber", amount: 1, unit: "large", metricAmount: 1, metricUnit: "large" },
      { name: "Cherry tomatoes", amount: 2, unit: "cups", metricAmount: 300, metricUnit: "g" },
      { name: "Feta cheese", amount: 0.5, unit: "cup", metricAmount: 75, metricUnit: "g" },
      { name: "Kalamata olives", amount: 0.25, unit: "cup", metricAmount: 40, metricUnit: "g" },
      { name: "Red onion", amount: 0.25, unit: "cup", metricAmount: 40, metricUnit: "g" },
      { name: "Olive oil", amount: 3, unit: "tbsp", metricAmount: 45, metricUnit: "ml" },
      { name: "Lemon juice", amount: 2, unit: "tbsp", metricAmount: 30, metricUnit: "ml" }
    ]
  },
  {
    id: "5",
    name: "Beef Tacos with Guacamole",
    image: beefTacosImg,
    cookTime: "25 min",
    servings: 4,
    difficulty: "Easy",
    isLiked: true,
    dateAdded: "2024-01-11",
    ingredients: [
      { name: "Ground beef", amount: 1, unit: "lb", metricAmount: 450, metricUnit: "g" },
      { name: "Taco shells", amount: 8, unit: "pieces", metricAmount: 8, metricUnit: "pieces" },
      { name: "Avocados", amount: 3, unit: "medium", metricAmount: 3, metricUnit: "medium" },
      { name: "Lime juice", amount: 2, unit: "tbsp", metricAmount: 30, metricUnit: "ml" },
      { name: "Onion", amount: 0.5, unit: "medium", metricAmount: 0.5, metricUnit: "medium" },
      { name: "Tomato", amount: 1, unit: "large", metricAmount: 1, metricUnit: "large" },
      { name: "Cheddar cheese", amount: 1, unit: "cup", metricAmount: 100, metricUnit: "g" },
      { name: "Lettuce", amount: 2, unit: "cups", metricAmount: 60, metricUnit: "g" }
    ]
  },
  {
    id: "6",
    name: "Salmon Teriyaki",
    image: salmonTeriyakiImg,
    cookTime: "18 min",
    servings: 2,
    difficulty: "Medium",
    isPopular: true,
    dateAdded: "2024-01-10",
    ingredients: [
      { name: "Salmon fillets", amount: 2, unit: "pieces", metricAmount: 2, metricUnit: "pieces" },
      { name: "Soy sauce", amount: 0.25, unit: "cup", metricAmount: 60, metricUnit: "ml" },
      { name: "Mirin", amount: 2, unit: "tbsp", metricAmount: 30, metricUnit: "ml" },
      { name: "Brown sugar", amount: 2, unit: "tbsp", metricAmount: 25, metricUnit: "g" },
      { name: "Ginger", amount: 1, unit: "tbsp", metricAmount: 15, metricUnit: "g" },
      { name: "Garlic cloves", amount: 2, unit: "cloves", metricAmount: 2, metricUnit: "cloves" },
      { name: "Sesame oil", amount: 1, unit: "tsp", metricAmount: 5, metricUnit: "ml" },
      { name: "Green onions", amount: 2, unit: "stalks", metricAmount: 2, metricUnit: "stalks" }
    ]
  }
];

export const getRecentRecipes = (limit: number = 6): Recipe[] => {
  return mockRecipes
    .sort((a, b) => new Date(b.dateAdded || '').getTime() - new Date(a.dateAdded || '').getTime())
    .slice(0, limit);
};

export const getPopularRecipes = (limit: number = 8): Recipe[] => {
  return mockRecipes.filter(recipe => recipe.isPopular).slice(0, limit);
};

export const searchRecipes = (query: string): Recipe[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockRecipes.filter(recipe => 
    recipe.name.toLowerCase().includes(lowercaseQuery) ||
    recipe.ingredients.some(ingredient => 
      ingredient.name.toLowerCase().includes(lowercaseQuery)
    )
  );
};