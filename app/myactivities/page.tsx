"use client";
import { useSession } from 'next-auth/react';
import React from 'react'
import { AddActivityBackground } from '../components/AddActivityBackground';
import ActivityCardsContainer from '../components/ActivityCardsContainer';
import { useRouter } from 'next/navigation';

const MyActivities = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session?.user) {
    return router.push("/login");
  }
  return (
    <div className="m-5">
      <AddActivityBackground/>
      <ActivityCardsContainer/>
    </div>
  )
}

export default MyActivities;
