import React from "react";
import { IconBellRinging, IconCalendarCheck, IconChartBar } from "@tabler/icons-react";

const features = [
  {
    title: "Smart Activity Management",
    icon: <IconCalendarCheck size={28} className="text-indigo-400" />,
    description: "Easily plan, add, and manage your daily tasks in one place with intuitive tools.",
  },
  {
    title: "Email Reminders",
    icon: <IconBellRinging size={28} className="text-purple-400" />,
    description: "Never miss a deadline with automated email reminders for due and upcoming tasks.",
  },
  {
    title: "Overdue Tracker",
    icon: <IconChartBar size={28} className="text-pink-400" />,
    description: "Track overdue activities at a glance and stay ahead with productivity analytics.",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          FocusPulse keeps you organized and stress-free.
        </h2>
        <p className="text-lg text-gray-400 mb-12">
          Plan your activities, stay on top of your deadlines, and let us remind you when things are due.
        </p>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-neutral-900 rounded-lg border border-neutral-700 shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
