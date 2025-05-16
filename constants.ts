import { Calendar, ChefHat, Scale } from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: 'Predict Recipes',
    icon: ChefHat,
    href: '/recipes',
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: 'Predict Quantities',
    icon: Scale,
    href: '/quantities',
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: 'Menu Prediction',
    icon: Calendar, // or use a different icon like Utensils or ClipboardList
    href: '/menu',
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
];

