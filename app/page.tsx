"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react"


export default function Home() {
  const router =useRouter();
  useEffect(() => {
    // Check if the current URL is the root URL
    router.push('/overview');
  }, [router]);
    return (
      <main >
      
      </main>
    )
  }