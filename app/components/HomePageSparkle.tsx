"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function HomePageSparkle() {
    const { status } = useSession();
    console.log(status)
  return (
    <div className="relative w-full bg-primary flex flex-col items-center justify-center overflow-hidden rounded-md min-h-[80vh]">
        {/* Sparkles Background */}
        <div className="w-full absolute inset-0 h-full">
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

        <div className="relative z-20 text-center px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-4">
            Struggling to manage your day-to-day activities?
            </h1>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 mb-8">
            Join FocusPulse and leave the struggle to us.
            </h2>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={['loading', 'unauthenticated'].includes(status)? '/signup': "/projects"} className="relative group">
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition" />
                <span className="relative z-10 px-6 py-2 bg-black rounded-lg text-white font-medium hover:bg-transparent border border-transparent hover:border-white transition">
                {['loading', 'unauthenticated'].includes(status)? 'Signup': "Manage Projects"}
                </span>
            </Link>
            <Link href={['loading', 'unauthenticated'].includes(status)? '/login': "/activities"} className="relative group">
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition" />
                <span className="relative z-10 px-6 py-2 bg-black rounded-lg text-white font-medium hover:bg-transparent border border-transparent hover:border-white transition">
                {['loading', 'unauthenticated'].includes(status)? 'Login': "Manage activities"}
                </span>
            </Link>
            </div>
        </div>
    </div>

  );
}
