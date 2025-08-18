"use client";
import TaskContainer from '@/app/components/TaskContainer';
import React from 'react';
import { TaskAddModal } from '@/app/components/TaskAddModal';

const TaskPage = () => {

  return (
    <div className="min-h-screen px-6 md:px-12 py-10 text-black my-5">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Ongoing Tasks</h1>
        <TaskAddModal/>
      </div>

      <TaskContainer />
    </div>
  );
};

export default TaskPage;

