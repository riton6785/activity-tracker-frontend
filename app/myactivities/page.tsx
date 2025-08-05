"use client";
import { useSession } from 'next-auth/react';
import React from 'react'
import { AddActivityBackground } from '../components/AddActivityBackground';
import ActivityCardsContainer from '../components/ActivityCardsContainer';

const MyActivities = () => {
    const session = useSession();
    // console.log(session)
  return (
    <div className="m-5">
      <AddActivityBackground/>
      <ActivityCardsContainer/>
    </div>
  )
}

export default MyActivities;
