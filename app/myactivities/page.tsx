"use client";
import { useSession } from 'next-auth/react';
import React from 'react'

const MyActivities = () => {
    const session = useSession();
    console.log(session)
  return (
    <div>
      Hello
    </div>
  )
}

export default MyActivities;
