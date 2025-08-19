import React from "react";
import clsx from "clsx";
import { IconCircleCheckFilled, IconClockFilled } from "@tabler/icons-react"; // or your icon set
import { useParams, useRouter } from "next/navigation";

type Task = {
  name: string;
  completed: boolean;
  description: string;
  user_id: number;
  due_date: string;
  id: number;
  project_id: number;
};

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  const isCompleted = task.completed;
  const dueDate = new Date(task.due_date).toLocaleDateString();
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId

  const openTask = ()=> {
    router.push(`/projects/${projectId}/tasks/${task.id}`);
  }
  

  return (
    <div
      onClick={openTask}
      className={clsx(
        "flex flex-col justify-between w-full rounded-xl bg-[#1F2121] p-6 space-y-4 shadow-lg border border-neutral-800 hover:border-indigo-500 transition-all duration-300 group cursor-pointer"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">{task.name}</h2>
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
      <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">{task.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-400 pt-2 border-t border-neutral-700 mt-auto">
        <span>
          Due: <span className="text-white font-medium">{dueDate}</span>
        </span>
      </div>
    </div>
  );
}
