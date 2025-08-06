import React, { useEffect, useState } from "react";
import { CometCard } from "@/components/ui/comet-card";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Activity, useActivityStore } from "@/store/actvitystore";
import clsx from "clsx";
import { Button } from "@/components/ui/stateful-button";
import { toast } from "sonner";
import { ActivityEditModal } from "./ActivityEditModal";
import { IconEdit } from "@tabler/icons-react";

const ActivityCards = ({ activity, type }: { activity: Activity, type: string }) => {
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const isOverdue = new Date().toLocaleDateString('en-CA') > activity.due_date;
  const isDuedate = new Date().toLocaleDateString('en-CA') === activity.due_date;
  const removeActivities = useActivityStore((state)=> state.removeActivities);
  const removeOverdueActivities = useActivityStore((state) => state.removeOverduesActivity);

  // if the date is overdue calculate days
  const diffDays = isOverdue
  ? Math.floor((new Date().getTime() - new Date(activity.due_date).getTime()) / (1000 * 60 * 60 * 24))
  : 0;

  const {data: session, status} = useSession()
  const handleSubmitNote= async()=> {
    try {
        const toggleData = {
            notes,
            id: activity.id
        }
        await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/activity/toggle`, toggleData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.user.access_token}`
            }
        })

        if(type==="all") {
          removeActivities(activity.id)
        } else if(type === "overdues") {
          removeOverdueActivities(activity.id);
        }

        setShowNotes(false);
    } catch (error) {
        toast.error("Some thing went wrong markinga actvities done")
    }
  }
  const handleEdit = () => {}

  useEffect(()=> {
  }, [status])
  return (
    <CometCard key={activity.id}>
      <div
        className={clsx(
          "flex flex-col w-full rounded-[16px] bg-[#1F2121] p-4 space-y-4",
          {
            "text-red-900": isOverdue && !activity.completed,
            "text-yellow-900": isDuedate && !activity.completed,
            "text-white": (!isOverdue && !isDuedate) || activity.completed,
          }
        )}
      >
        {/* Status + Edit Icon */}
        <div className="flex justify-between items-center">
          {/* Status Badge */}
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              activity.completed
                ? "bg-green-600 text-white"
                : "bg-yellow-500 text-black"
            }`}
          >
            {activity.completed ? "Completed" : "Pending"}
          </span>
          {/* Edit Icon */}
          <button onClick={() => {
            setIsEditOpen(true);
          }}>
            <IconEdit/>
          </button>
          <ActivityEditModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            activity={activity}
            type = {type}
          />
        </div>

        {/* Task Name + Due Date */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{activity.task}</h3>
          <span className="text-xs text-gray-300 opacity-80">
            Due: {activity.due_date}
          </span>
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-200">{activity.summary}</p>

        {/* Overdue Notice + Mark Done */}
        <div className="flex justify-between items-center">
          {/* Overdue Info */}
          <span className="text-sm text-red-500">
            {isOverdue && !activity.completed && `${diffDays} Days overdue`}
          </span>

          {/* Mark as Done Button */}
          {!activity.completed && (
            <button
              onClick={() => setShowNotes(true)}
              className="px-3 py-1 text-xs rounded bg-white text-black hover:bg-gray-300 transition"
            >
              Mark Done
            </button>
          )}
        </div>

        {/* Finish Notes for Completed Activities */}
        {activity.completed && activity.finish_note && (
          <div className="mt-4 space-y-2">
            <span className="text-sm text-gray-300">{activity.finish_note}</span>
          </div>
        )}

        {/* Textarea + Submit Button */}
        {showNotes && (
          <div className="mt-4 space-y-2">
            <textarea
              placeholder="Add notes before marking done..."
              className="w-full p-2 rounded-md border border-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#1F2121]"
              rows={3}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="flex gap-2">
              <Button className="w-full" onClick={handleSubmitNote}>
                Submit
              </Button>
              <button
                onClick={() => setShowNotes(false)}
                className="px-3 py-1 text-xs rounded bg-gray-400 text-white hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </CometCard>
  );
};

export default ActivityCards;
