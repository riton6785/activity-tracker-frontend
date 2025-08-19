"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Project } from "@/store/actvitystore";
import clsx from "clsx";
import {
  IconCircleCheckFilled,
  IconClockFilled,
  IconUserPlus,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const ProjectCards = ({ project }: { project: Project }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const isCompleted = project.completed;

  const [showInvite, setShowInvite] = useState(false);
  const [email, setEmail] = useState("");

  const dueDate = new Date(project.due_date).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleCardClick = () => {
    router.push(`/projects/${project.id}/tasks`);
  };

  const handleInvite = async () => {
  if (!email.trim()) return;

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/project/${project.id}/invite`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${session?.user?.access_token}`, // JWT from NextAuth
        },
      }
    );

    toast.success(`✅ Invite sent successfully to ${email}`);
  } catch {
    toast.error("❌ Failed to send invite");
  }

  setEmail("");
  setShowInvite(false);
};


  return (
    <div
      onClick={handleCardClick}
      className={clsx(
        "flex flex-col w-full rounded-[16px] bg-[#1F2121] p-4 space-y-4 shadow-md transition-all duration-200 cursor-pointer"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          {project.name}
        </h2>
        <span
          className={clsx(
            "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
            isCompleted ? "bg-green-600 text-white" : "bg-yellow-500 text-black"
          )}
        >
          {isCompleted ? (
            <>
              <IconCircleCheckFilled className="h-4 w-4 mr-1" /> Completed
            </>
          ) : (
            <>
              <IconClockFilled className="h-4 w-4 mr-1" /> Pending
            </>
          )}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
        {project.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-400 pt-2 border-t border-neutral-700 mt-auto">
        <span>
          Due: <span className="text-white font-medium">{dueDate}</span>
        </span>
        {project.user_id === session?.user.id && <button
          onClick={(e) => {
            e.stopPropagation(); // stop navigation otherwise card click event will trigger
            setShowInvite(true);
          }}
          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
        >
          <IconUserPlus className="h-4 w-4" />
          Invite
        </button>}
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div
          className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-xl z-100"
          onClick={() => setShowInvite(false)}
        >
          <div
            className="bg-[#2A2C2C] p-6 rounded-xl shadow-lg space-y-4 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white font-semibold text-lg">
              Invite Collaborator
            </h3>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowInvite(false)}
                className="px-3 py-1 rounded-lg bg-neutral-700 text-gray-300 hover:bg-neutral-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                className="px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCards;
