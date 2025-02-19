import { ChefHat, Scale } from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  // {
  //   label: 'Conversation',
  //   icon: MessageSquare,
  //   href: '/conversation',
  //   color: "text-violet-500",
  //   bgColor: "bg-violet-500/10",
  // },
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
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/quantities',
  },

];