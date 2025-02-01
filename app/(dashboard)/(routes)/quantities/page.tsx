"use client";
import axios from "axios";
import Heading from "@/components/Heading";
import { Scale } from "lucide-react";
import Image from "next/image";
import { recipeNames } from "@/lib/recipeNames";
import AsyncSelect from "react-select/async";
import {
  OptionsOrGroups,
  GroupBase,
  MultiValue,
  SingleValue,
  ActionMeta,
} from "react-select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Convert the array of strings into { value, label } format
const options = recipeNames.map((name) => ({ value: name, label: name }));

// Define the type for each option in the select dropdown
interface Option {
  value: string;
  label: string;
}
interface Ingredient {
  Ingredient: string;
  Quantity: number | string; // Quantity can be a number or a string (e.g., "as required")
  Unit: string;
}

interface RecipeData {
  recipe_name: string;
  image_url: string;
  course: string;
  diet: string;
  desired_servings: number;
  default_servings: number;
  ingredients: Ingredient[]; // Array of ingredients
  status: string; // Response status
}

export default function QuantityEstimationPage() {
  // Capture selected options

  const [recipeData, setRecipeData] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Option | null>(null);
  const [servings, setServings] = useState<number | string>("");
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}`;

  // Send data to backend
  const sendDataToBackend = async () => {
    if (!selectedDish || servings === "") {
      alert("Please select a dish and enter the desired servings.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/quantity_estimation`,
        {
          recipe_name: selectedDish.value,
          desired_servings: servings,
        }
      );

      console.log("Response from backend:", response.data);
      if (response.data.status === 'success') {
        setRecipeData(response.data);  // Store response data
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  // Handle selection
  const handleSelectChange = (selectedOption: SingleValue<Option>) => {
    setSelectedDish(selectedOption);
    // onChange(selectedOption ? selectedOption.value : "");
  };
  // Handle servings input
  const handleServingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServings(event.target.value);
  };

  // Filter options for search
  const filterOptions = (inputValue: string): Option[] => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // Load options asynchronously (simulate API delay)
  const loadOptions = async (inputValue: string): Promise<Option[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterOptions(inputValue));
      }, 300); // Simulated delay
    });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-start space-y-4 ">
        <div className="bg-custom-primary w-[90%] sm:w-[85%] h-36 sm:h-40 rounded-xl flex items-center justify-between relative ">
          {/* Heading Section */}
          <div className="flex h-full items-center">
            <Heading
              title="Adjust Your Recipe Servings"
              description="Enter the number of people, and let us adjust ingredient quantities for the perfect meal."
              // icon={ChefHat}
              icon={Scale}
              iconColor="text-custom-primary"
              bgColor="bg-white"
            />
          </div>

          {/* Image Section */}
          <div className="hidden sm:block absolute bottom-0 right-6">
            <Image
              src="/2.png"
              alt="Predict Recipes front pic"
              height={190}
              width={190}
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center  w-[90%] sm:w-[85%] sm:space-x-2 space-y-2 sm:space-y-0">
          <div className="sm:w-[60%] md:w-[70%] ">
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions={options.slice(0, 50)} // Show first 50 items initially
              placeholder="Search a dish..."
              onChange={handleSelectChange}
              value={selectedDish}
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
          {/* Desired Servings Input */}
          <div className="sm:w-[60%] w-full ">
            <input
              type="number"
              value={servings}
              onChange={handleServingsChange}
              placeholder="Enter desired servings"
              className="bg-white border border-gray-300 rounded-md px-2 py-4 w-full h-full"
            />
          </div>
          <Button
            onClick={sendDataToBackend}
            className="bg-custom-primary px-6 py-6 rounded-xl text-white "
          >
            {loading ? (
              <div className="absolute flex justify-center items-center w-full h-full">
                <div className="w-6 h-6 border-4  border-custom-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>

        <div className="w-[90%] sm:w-[85%] overflow-hidden">
          {!loading && recipeData && (
            <div className="space-y-8 p-4">
              {/* First Row: Recipe Details */}
              <div className="bg-active/20 shadow-md rounded-lg p-6 flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-8">
                {/* Recipe Image */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 overflow-hidden rounded-full shadow-sm">
                  <Image
                    src={recipeData.image_url}
                    alt={recipeData.recipe_name}
                    className="w-full h-full rounded-full object-cover"
                    height={160}
                    width={160}
                  />
                </div>

                {/* Recipe Name and General Information */}
                <div className="flex flex-col items-center sm:items-start space-y-1">
                  <h2 className="text-xl  sm:text-2xl font-semibold text-center sm:text-left">
                    {recipeData.recipe_name}
                  </h2>
                  <p className="text-md sm:text-lg text-center sm:text-left">
                    {recipeData.course} | {recipeData.diet}
                  </p>
                  <div className="flex flex-col sm:flex-row space-x-3 items-center justify-center"> 
                  <p className="text-sm text-gray-600">
                    Default Servings: {recipeData.default_servings}
                  </p>
                  <p className="text-sm text-gray-600">
                    Desired Servings: {recipeData.desired_servings}
                  </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="my-4 border-gray-300" />

              {/* Subsequent Rows: Ingredients List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipeData.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-semibold">
                      {ingredient.Ingredient}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {ingredient.Quantity} {ingredient.Unit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center overflow-hidden">
              <Image
                src="/loader.png" // Replace this with dynamic URLs
                alt="Loader Ingredients Image "
                width={100}
                height={100}
                className="object-cover sm:mt-20 custom-spin w-24 h-24 sm:w-56 sm:h-56 "
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
