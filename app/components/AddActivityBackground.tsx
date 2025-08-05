"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { ActivityAdddModal } from "./ActivityAddModal";

export function AddActivityBackground() {
  return (
    <div className="h-96 relative w-full overflow-hidden bg-white-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-blue relative z-20")}>
        check your all activities
      </h1>
        <ActivityAdddModal/>
    </div>
  );
}
