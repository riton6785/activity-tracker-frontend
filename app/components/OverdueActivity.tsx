import { useActivityStore } from '@/store/actvitystore';
import axios from 'axios';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import ActivityCards from './ActivityCards';
import { Loader } from './Loader';
import { toast } from 'sonner';

const OverdueActivity = () => {
    const [isFetched, setIsFetched] = useState(false); //state for managing the loader.
    const {data: session, status} = useSession();
    const overdueActivities = useActivityStore((state)=> state.overdueActivities);
    const setOverdueActivity = useActivityStore((state)=> state.setOverdueActivity);

    const fetcOverdueActivities = async() => {
        try {
            setIsFetched(false);
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/overdue/activities`, {
                headers: {
                    Authorization: `Bearer ${session?.user.access_token}`
                }
            })
            setOverdueActivity(data);
            setIsFetched(true);
        } catch (error) {
          setIsFetched(true);
            toast.error("Some thing went wrong, fetching overdues activity");
        }
    }
    useEffect(()=> {
        fetcOverdueActivities();
    }, [status]);
  return (
    <>
      {isFetched ? (
        <div className="p-4 mx-auto pt-15">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {overdueActivities?.map((activity) => (
              <ActivityCards
                key={activity.id}
                activity={activity}
                type="overdues"
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

export default OverdueActivity
