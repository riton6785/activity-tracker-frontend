// components/ActivityEditModal.tsx
"use client";
import React, { useState } from "react";
import { Activity, useActivityStore } from "@/store/actvitystore";
import { Button } from "@/components/ui/stateful-button";
import { X } from "lucide-react"; // Optional close icon
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import axios from "axios";

interface ActivityEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity | null; // nullable to allow default empty state
  type: string
}

export const ActivityEditModal: React.FC<ActivityEditModalProps> = ({ isOpen, onClose, activity, type }) => {
  const [task, setTask] = useState(activity?.task);
  const [summary, setSummary] = useState(activity?.summary);
  const [dueDate, setDueDate] = useState<Date>(new Date(activity?.due_date || new Date()));
  const {data: session} = useSession();

//   Zustand states
  const updateActivities = useActivityStore((state) => state.updateActivities);
  const updateOverdueActivity = useActivityStore((state)=> state.updateOverdueActivity);

  if (!isOpen || !activity) return null;

  const editHandler = async() => {
    try {
        const editData = {task, summary, id: activity.id, due_date: dueDate};
        const {data} = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/edit/activity`, editData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.user.access_token}`
            }
        })
        if(type === "all") {
            updateActivities(activity.id, {
            summary: summary,
            due_date: dueDate.toISOString().split("T")[0],
            task: task
            })
        } else if(type === "overdues") {
            updateOverdueActivity(activity.id, {
               summary: summary,
                due_date: dueDate.toISOString().split("T")[0],
                task: task 
            })
        }
        toast.success("Activity updated Successfully");
        onClose();
    } catch (error) {
        toast.error("Error while editing the activities")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-semibold mb-4">Edit Activity</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task</label>
            <Input
              type="text"
              defaultValue={task}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
            <Input
              type="text"
              defaultValue={summary}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e)=> setSummary(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <Input
                id="activityDate"
                name="activityDate"
                type="date"
                className="w-full"
                defaultValue={dueDate.toISOString().split('T')[0]}
                onChange={(e) => setDueDate(new Date(e.target.value))}
              />
          </div>
        </div>
        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <Button onClick={onClose} className="bg-gray-800 text-white hover:bg-gray-400">
            Cancel
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800" onClick={editHandler}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
