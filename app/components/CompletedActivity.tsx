import { useActivityStore } from '@/store/actvitystore';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import ActivityCards from './ActivityCards';
import { Loader } from './Loader';
import { toast } from 'sonner';
import { CometCard } from '@/components/ui/comet-card';

const CompletedActivity = () => {
  const [isFetched, setIsFetched] = useState(false); //state for managing the loader.
  const {data: session, status} = useSession();
  const completedActivities = useActivityStore((state)=> state.completedActivities);
  const setCompletedActivities = useActivityStore((state)=> state.setCompletedActivity)
    const fetcCompletedActivities = async() => {
        try {
            setIsFetched(false)
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/completed/activities`, {
                headers: {
                    Authorization: `Bearer ${session?.user.access_token}`
                }
            })
            setCompletedActivities(data);
            setIsFetched(true);
        } catch (error) {
          setIsFetched(true);
            toast.error("Some thing went wrong fetching completed activities");
        }
    }
    useEffect(()=> {
        fetcCompletedActivities();
    }, [status]);
  return (
    <>
      {isFetched ? (
        <div className="p-4 mx-auto pt-15">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {completedActivities?.map((activity) => (
              <CometCard key={activity.id}>
                    <div
                      className=
                        "flex flex-col w-full rounded-[16px] bg-[#1F2121] p-4 space-y-4">
                      {/* Task Name + Due Date */}
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">{activity.task}</h3>
                        <span className="text-xs text-gray-300 opacity-80">
                          Due: {activity.due_date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-200">{activity.summary}</p>
                      {/* Finish Notes for Completed Activities */}
                      <div className="mt-4 space-y-2">
                          <span className="text-sm text-gray-300">{activity.finish_note}</span>
                        </div>
                    </div>
                  </CometCard>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto pt-15 flex justify-center">
          <Loader />
        </div>
      )}
    </>
  );
}

export default CompletedActivity
