"use client";
import axios from "axios";
import Heading from "@/components/Heading";
import { Calendar } from "lucide-react"; // or any other icon of your choice
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import Select from "react-select";

const dietOptions = [
  { value: "", label: "None" },
  { value: "Vegetarian", label: "Vegetarian" },
  { value: "High Protein Vegetarian", label: "High Protein Vegetarian" },
  { value: "Diabetic Friendly", label: "Diabetic Friendly" },
];

// Define the type for a single day's menu
interface DailyMenu {
  Day: string;
  Breakfast: string | null;
  Lunch: string | null;
  Dinner: string | null;
  [key: string]: string | null; // To capture things like Side Dish etc.
}

export default function MenuPredictionPage() {
  const [loading, setLoading] = useState(false);
  const [weeklyMenu, setWeeklyMenu] = useState<DailyMenu[]>([]);
  const [dietPreference, setDietPreference] = useState<string | null>(null);

  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/weekly-menu`;

  // Handle diet preference change
  const handleDietChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDietPreference(event.target.value);
  };

  // Send request to the backend
  const fetchWeeklyMenu = async () => {
    setLoading(true);

    try {
      const queryParams = dietPreference ? `?diet=${dietPreference}` : "";
      const response = await axios.get(url + queryParams); // Send GET request with diet preference as query params

      if (Array.isArray(response.data)) {
        setWeeklyMenu(response.data);
        console.log("Weekly Menu:", response.data);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching weekly menu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start space-y-4">
      {/* Heading Section */}
      <div className="bg-custom-primary w-[90%] sm:w-[85%] h-36 sm:h-40 rounded-xl flex items-center justify-between relative">
        <div className="flex h-full items-center">
          <Heading
            title="Menu Prediction"
            description="Select your preferred diet and let us generate a week's menu."
            icon={Calendar}
            iconColor="text-custom-primary"
            bgColor="bg-white"
          />
        </div>
        <div className="hidden sm:block absolute bottom-0 right-6">
          <Image
            src="/4.png"
            alt="Menu Prediction"
            height={190}
            width={190}
            className="object-contain"
          />
        </div>
      </div>

    
        {/* Diet Preference Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center  w-[90%] sm:w-[85%] sm:space-x-2 space-y-2 sm:space-y-0">
        <div className="w-full ">
          <Select
            options={dietOptions}
            placeholder="Select Diet Preference"
            onChange={(selected) => setDietPreference(selected?.value || "")}
            value={dietOptions.find((opt) => opt.value === dietPreference)}
            classNames={{
              control: () =>
                "bg-white border border-gray-300 rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200",
              menu: () =>
                "bg-white border border-gray-300 rounded-md shadow-lg mt-1",
              option: ({ isFocused }) =>
                isFocused
                  ? "bg-gray-100 p-2 cursor-pointer"
                  : "p-2 cursor-pointer",
            }}
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={fetchWeeklyMenu}
        className="bg-custom-primary px-6 py-4 rounded-xl text-white"
      >
        {loading ? (
          <div className="w-6 h-6 border-4 border-custom-primary border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "Generate Weekly Menu"
        )}
      </Button>

      {/* Display the Weekly Menu */}
      <div className="w-[90%] sm:w-[85%] overflow-hidden mt-6">
        {loading && (
          <div className="flex justify-center items-center">
            <Image
              src="/loader.png"
              alt="Loader"
              width={100}
              height={100}
              className="object-cover custom-spin"
            />
          </div>
        )}

        {!loading && weeklyMenu.length > 0 && (
          <div className="space-y-8 p-4">
            {weeklyMenu.map((menu, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4"
              >
                <h3 className="text-xl font-semibold">{menu.Day}</h3>
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                  <div className="w-full sm:w-1/3">
                    <p className="font-medium">Breakfast:</p>
                    <p>{menu.Breakfast || "No dish selected"}</p>
                  </div>
                  <div className="w-full sm:w-1/3">
                    <p className="font-medium">Lunch:</p>
                    <p>{menu.Lunch || "No dish selected"}</p>
                  </div>
                  <div className="w-full sm:w-1/3">
                    <p className="font-medium">Dinner:</p>
                    <p>{menu.Dinner || "No dish selected"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
