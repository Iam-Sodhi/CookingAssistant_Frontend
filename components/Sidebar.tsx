"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import {
  ArrowRight,
  ChefHat,
  Code,
  ImageIcon,
  LayoutDashboard,
  Scale,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";

type SidebarProps = {};
const monteserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const routes = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/overview",
    color: "text-sky-500",
  },
  {
    label: "Predict Recipes",
    icon: ChefHat,
    href: "/recipes",
    color: "text-violet-500",
  },
  {
    label: "Predict Quantities",
    icon: Scale,
    color: "text-pink-700",
    href: "/quantities",
  },
  // {
  //   label: "Code Generation",
  //   icon: Code,
  //   color: "text-green-700",
  //   href: "/code",
  // },
];

const Sidebar: React.FC<SidebarProps> = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm ">
      <div className="p-6 pt-8">
        <Link href="/dashboard" className="">
          <div className="flex justify-start items-center leading-[117.02%] cursor-pointer font-poppins">
            <b className="text-[21px] sm:text-[25px] ">get</b>
            <span className="font-poppins text-[22px] sm:text-[25px] text-custom-primary">
              dish._
            </span>
          </div>
        </Link>
      </div>
      <div className="space-y-1 flex flex-col w-full">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            type="button"
            className={cn(
              "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
              pathname === route.href &&
                "text-text-secondary font-[700] bg-active hover:bg-orange-500/15 hover:text-text-secondary"
            )}
          >
            <div className="flex items-center gap-x-2 py-4">
              <route.icon
                size={22}
                className={cn(
                  "text-slate-500",
                  pathname === route.href && "text-text-secondary"
                )}
              />
              {route.label}
            </div>
            <div
              className={cn(
                "ml-auto opacity-0 border-2 border-custom-primary h-full transition-all",
                pathname === route.href && "opacity-100"
              )}
            />
          </Link>
        ))}
      </div>

      <div className=" w-full absolute bottom-12 flex items-center justify-center">
        <div className=" w-[82%] h-48 bg-custom-primary rounded-t-3xl rounded-b-xl flex justify-center">
          <div className="absolute -top-28 ">
            <Image src="/3.png" height={120} width={120} alt="sidebar-pic" />
          </div>
          <div className="h-full mt-3 text-white flex flex-col justify-center items-center space-y-3">
            <p className="w-[80%] text-sm font-semibold">
              Let AI predict the perfect dish for you.
            </p>

            <Link
              href="/recipes"
              className="h-10 px-4 py-2 w-[80%] rounded-xl bg-white text-center text-custom-primary text-md flex items-center justify-center transition-all duration-200
               hover:bg-orange-50  hover:text-custom-primary group"
            >
              Generate
              <ArrowRight className="w-4 h-4 ml-2 text-custom-primary group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
