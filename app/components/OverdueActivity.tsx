import { useActivityStore } from '@/store/actvitystore';
import axios from 'axios';
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import ActivityCards from './ActivityCards';

const OverdueActivity = () => {
    const {data: session, status} = useSession();
    const overdueActivities = useActivityStore((state)=> state.overdueActivities);
    const setOverdueActivity = useActivityStore((state)=> state.setOverdueActivity);

    const fetcOverdueActivities = async() => {
        try {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/overdue/activities`, {
                headers: {
                    Authorization: `Bearer ${session?.user.access_token}`
                }
            })
            console.log(data);
            setOverdueActivity(data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=> {
        fetcOverdueActivities();
    }, [status]);
  return (
    <div className="p-4 mx-auto pt-15">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {overdueActivities?.map((activity) => (
          <ActivityCards key={activity.id} activity={activity} type="overdues"/>
        ))}
      </div>
    </div>
  )
}

export default OverdueActivity
