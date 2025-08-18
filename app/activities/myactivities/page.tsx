"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { AddActivityBackground } from '../../components/AddActivityBackground';
import ActivityCardsContainer from '../../components/ActivityCardsContainer';
import { useRouter } from 'next/navigation';

const MyActivities = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(()=> {

  }, [status])
  if (status === "loading") return; // wait for session to load as usession is asynchronus in nature

  if (status === "unauthenticated") {
    router.push("/login");
    return;
  }
  return (
    <div className="m-5">
      <AddActivityBackground/>
      <ActivityCardsContainer/>
    </div>
  )
}

export default MyActivities;
