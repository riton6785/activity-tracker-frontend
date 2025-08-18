"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { ActivityPageSparkle } from '../components/ActivityPageSparkle';

const Activities = () => {
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
    <>
      <div className="m-5 min-h-screen">
        <ActivityPageSparkle/>
      </div>
    </>
  )
}

export default Activities;