"use client"
import { AddProjectBackground } from '@/app/components/AddProjectBackGround'
import ProjecrCardContainer from '@/app/components/ProjectCardContainer'
import React from 'react'

const MyProjects = () => {
  return (
    <div>
      <AddProjectBackground/>
      <ProjecrCardContainer/>
    </div>
  )
}

export default MyProjects
