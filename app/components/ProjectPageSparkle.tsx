"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

export function ProjectPagePageSparkle() {
  return (
    <div className="relative w-full bg-primary flex flex-col items-center justify-center overflow-hidden rounded-md min-h-[100vh] px-6 py-16">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center text-white space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Struggling to manage your Projects
        </h1>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
          Manage your personal and professional projects
        </h2>

        <ul className="mt-6 space-y-2 text-lg md:text-xl font-medium text-white/90 text-left max-w-2xl mx-auto">
          <li>✅ Manage your projects with effective deadlines</li>
          <li>✅ Stay on top of your project-related tasks</li>
          <li>✅ Get real-time tracking of your projects, tasks and it&apos;s scheduled activities</li>
        </ul>
      </div>
    </div>
  );
}
