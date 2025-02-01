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
interface Dish {
  "image-url": string;
  TranslatedRecipeName: string;
  Matching: string;
  Missing: string;
  TotalTimeInMins: number;
}

export default function QuantityEstimationPage() {
  // Capture selected options

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Option | null>(null);

  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}`;
  // Send selected data to Flask API
  const sendDataToBackend = async () => {

    // if (!selectedIngredients.length) {
    //   alert("Please select at least one ingredient!");
    //   return;
    // }
    // try {
    //   setLoading(true);
    //   const ingredients = selectedIngredients
    //     .map((item) => item.label)
    //     .join(",");
    //   console.log(url);
    //   const response = await axios.post(`${url}/recommend`, {
    //     ingredients, // Pass ingredients as a comma-separated string
    //     top_n: 12, // Limit results to top 12
    //   });

    //   console.log("Response from backend:", response.data);
    //   setDishes(response.data.results);
    //   // // Clear selection after successful submission
    //   // setSelectedIngredients([]);
    // } catch (error) {
    //   console.error("Error sending data to backend:", error);
    // } finally {
    //   setLoading(false); // Stop loading animation
    // }
  };

  // Handle selection
  const handleSelectChange = (selectedOption: SingleValue<Option>) => {
    setSelectedDish(selectedOption);
    // onChange(selectedOption ? selectedOption.value : "");
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
          <div className="sm:w-[95%]  ">
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions={options.slice(0, 50)} // Show first 50 items initially
              placeholder="Search & select a dish..."
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
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {dishes.map((dish, index) => (
                <Card
                  key={index}
                  className="bg-active/20 shadow-md rounded-lg px-2 pt-4 hover:shadow-lg transition-shadow"
                >
                  {/* First Row: Image and Title */}
                  <div className="flex items-center space-x-4">
                    {/* Image */}
                    <div className="w-24 h-16 overflow-hidden rounded-full shadow-sm">
                      <Image
                        src={dish["image-url"]}
                        alt={dish.TranslatedRecipeName}
                        className="w-full h-full  rounded-full object-fill" // Ensures the image fully covers the container
                        height={100}
                        width={100}
                      />
                    </div>
                    {/* Title and Time */}
                    <div>
                      <CardTitle className="text-md font-semibold">
                        {dish.TranslatedRecipeName}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        Time: {dish.TotalTimeInMins} mins
                      </CardDescription>
                    </div>
                  </div>

                  {/* Divider */}
                  <hr className="my-2 border-gray-300 " />

                  {/* Subsequent Rows: Additional Information */}
                  <CardContent className="space-y-2">
                    <CardDescription className="text-gray-700">
                      <strong>Matching Ingredients:</strong> {dish.Matching}
                    </CardDescription>
                    <CardDescription className="text-gray-700">
                      <strong>Missing Ingredients:</strong> {dish.Missing}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
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
