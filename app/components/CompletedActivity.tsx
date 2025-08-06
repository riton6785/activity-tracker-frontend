import { useActivityStore } from '@/store/actvitystore';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import ActivityCards from './ActivityCards';

const CompletedActivity = () => {
  const {data: session, status} = useSession();
  const completedActivities = useActivityStore((state)=> state.completedActivities);
  const setCompletedActivities = useActivityStore((state)=> state.setCompletedActivity)
    const fetcCompletedActivities = async() => {
        try {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/completed/activities`, {
                headers: {
                    Authorization: `Bearer ${session?.user.access_token}`
                }
            })
            console.log(data);
            setCompletedActivities(data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=> {
        fetcCompletedActivities();
    }, [status]);
  return (
    <div className="p-4 mx-auto pt-15">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {completedActivities?.map((activity) => (
          <ActivityCards key={activity.id} activity={activity}/>
        ))}
      </div>
    </div>
  )
}

export default CompletedActivity
