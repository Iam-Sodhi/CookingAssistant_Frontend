"use client";
import * as z from "zod";
import axios from "axios";
import Heading from "@/components/Heading";
import {  ChefHat, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { cn } from "@/lib/utils";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import Image from "next/image";

export default function ConversationPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
    //   if (error?.response?.status === 403) {
    //     proModal.onOpen();
    //   } else {
    //     toast.error("Something went wrong.");
    //   }
    } finally {
      router.refresh();
    }
  };

  return (

    <>
   <div className="flex justify-center">
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
</div>

    </>
  );
}
