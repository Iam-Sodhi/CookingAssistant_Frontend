"use client";
import axios from "axios";
import Heading from "@/components/Heading";
import { ChefHat} from "lucide-react";
import Image from "next/image";
import { data } from "@/lib/unique_ingredients";
import AsyncSelect from "react-select/async";
import { OptionsOrGroups, GroupBase, MultiValue, ActionMeta } from "react-select";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Define the type for each option in the select dropdown
interface Option {
  value: string;
  label: string;
}

export default function ConversationPage() {
 
  // Capture selected options
  const [selectedIngredients, setSelectedIngredients] = useState<Option[]>([]);

    // Send selected data to Flask API
    const sendDataToBackend = async () => {
      try {
        console.log("Request data: ",selectedIngredients);
        // Make a POST request to your Flask API
        // const response = await axios.post("http://your-flask-api-url/endpoint", {
        //   selectedIngredients,
        // });
  
        // Handle success (You can do something with the response if needed)
        // console.log(response.data);
          // Clear the selection after submitting
      setSelectedIngredients([]);
      } catch (error) {
        console.error("Error sending data to backend:", error);
      }
    };

  // Handle select change to prevent duplicates
  const handleSelectChange = (
    newValue: MultiValue<Option>, 
    actionMeta: ActionMeta<Option>
  ) => {
    // Remove duplicates using a Set to store unique values
    const uniqueIngredients = Array.from(new Set(newValue.map((item) => item.value)))
      .map((value) => newValue.find((item) => item.value === value));
    
    setSelectedIngredients(uniqueIngredients as Option[]); // Cast back to Option[]
  };
  const filterOptions = (
    inputValue: string
  ): OptionsOrGroups<Option, GroupBase<Option>> => {
    return data.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // Load options asynchronously
  const loadOptions = async (
    inputValue: string
  ): Promise<OptionsOrGroups<Option, GroupBase<Option>>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterOptions(inputValue));
      }, 300); // Simulate a small delay for async behavior
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start space-y-4 ">
        <div className="bg-custom-primary w-[90%] sm:w-[85%] h-36 sm:h-40 rounded-xl flex items-center justify-between relative">
          {/* Heading Section */}
          <div className="flex h-full items-center">
            <Heading
              title="Predict Your Own Recipe"
              description="Got ingredients? We’ve got ideas! Let AI predict the perfect dish for you."
              icon={ChefHat}
              iconColor="text-custom-primary"
              bgColor="bg-white"
            />
          </div>

          {/* Image Section */}
          <div className="hidden sm:block absolute bottom-0 right-6">
            <Image
              src="/1.png"
              alt="Predict Recipes front pic"
              height={190}
              width={190}
              className="object-contain"
            />
          </div>
        </div>
    
       <div className="flex items-center  w-[90%] sm:w-[85%] space-x-2">

       
        <div className="w-[95%]  ">
          <AsyncSelect
            isMulti
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions={data.slice(0, 50)} // Show the first 50 items by default
            placeholder="Search ingredients..."
            onChange={handleSelectChange}
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
          className="bg-custom-primary px-6 py-6 rounded-xl text-white"
        >
          Submit
        </Button>
        </div>
      </div>
    </>
  );
}
