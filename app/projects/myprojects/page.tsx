"use client"
import { AddProjectBackground } from '@/app/components/AddProjectBackGround'
import ProjecrCardContainer from '@/app/components/ProjectCardContainer'
import { useSession } from 'next-auth/react'
import React from 'react'

const MyProjects = () => {
  const {data: session} = useSession();

  if(!session) return
  return (
    <div>
      <AddProjectBackground/>
      <ProjecrCardContainer/>
    </div>
  )
}

export default MyProjects
