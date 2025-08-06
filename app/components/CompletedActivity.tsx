import { useActivityStore } from '@/store/actvitystore';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import ActivityCards from './ActivityCards';
import { Loader } from './Loader';
import { toast } from 'sonner';

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
              <ActivityCards
                key={activity.id}
                activity={activity}
                type="completed"
              />
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
