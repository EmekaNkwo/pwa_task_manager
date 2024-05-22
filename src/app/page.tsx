"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/shared/routes/AppRoutes";
import { Spin } from "antd";

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push(AppRoutes.Activity)
  }, [])
  return (
    <main >

      <Spin className="flex items-center justify-center my-[2rem]" />
    </main>
  );
}
