import React, { useEffect, useState } from "react";
import { Activity } from "./ActivityCardsContainer";
import { CometCard } from "@/components/ui/comet-card";
import axios from "axios";
import { useSession } from "next-auth/react";

const ActivityCards = ({ activity }: { activity: Activity }) => {
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  
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
        setShowNotes(false);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(()=> {

  }, [status])
  return (
    <CometCard key={activity.id}>
      <div className="flex flex-col w-full rounded-[16px] bg-[#1F2121] p-4 text-white space-y-4">
        {/* Task Name + Due Date */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{activity.task}</h3>
          <span className="text-xs text-gray-300 opacity-80">
            Due: {activity.due_date}
          </span>
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-200">{activity.summary}</p>

        {/* Status + Action */}
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

          {/* Mark Done Button */}
          {!activity.completed && (
            <button
              onClick={() => setShowNotes(true)}
              className="px-3 py-1 text-xs rounded bg-white text-black hover:bg-gray-300 transition"
            >
              Mark Done
            </button>
          )}
        </div>

        {/* Textarea + Submit Button */}
        {showNotes && (
          <div className="mt-4 space-y-2">
            <textarea
              placeholder="Add notes before marking done..."
              className="w-full p-2 rounded-md border border-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              onChange={(e)=> setNotes(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSubmitNote}
                className="px-3 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700 transition"
              >
                Submit
              </button>
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
