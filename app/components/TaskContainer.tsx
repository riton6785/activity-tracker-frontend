import { useTaskStore } from '@/store/actvitystore'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import TaskCard from './TaskCard';
import { Loader } from './Loader';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

const TaskContainer = () => {

  const [isFetched, setIsFetched] = useState(false) 
    const { data: session, status } = useSession();
    const tasks = useTaskStore((state)=> state.tasks);
    const setTask = useTaskStore((state) => state.setTasks);
    const params = useParams();

    const fetchTasks = (async()=> {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/project/${params.projectId}/tasks`)
        setTask(data)
        try {
      setIsFetched(false);
      if (!session) {
        return;
      }
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/project/${params.projectId}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );
      setTask(data);
      setIsFetched(true);
    } catch (error) {
      setIsFetched(true);
      toast.error("Error While fetching the actvities");
    }
    })
    useEffect(()=> {
        fetchTasks()
    }, [status])
  return (
    <>
      {isFetched ? (
        <div className="p-4 mx-auto pt-15">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto pt-15 flex justify-center">
          <Loader />
        </div>
      )}
    </>
  )
}

export default TaskContainer
