import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ActivityCards from "./ActivityCards";
import { useActivityStore } from "@/store/actvitystore";

const ActivityCardsContainer = () => {
  const { data: session, status } = useSession();
  // const [activities, setActivities] = useState<Activity[]>();
  const activities = useActivityStore((state)=> state.activities);
  const setActivities = useActivityStore((state)=> state.setActivities);

  const getAllActivities = async () => {
    try {
      if (!session) {
        return;
      }
      console.log(session);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/activities/`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );
      setActivities(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllActivities();
  }, [status]);
  return (
    <div className="p-4 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {activities?.map((activity) => (
          <ActivityCards key={activity.id} activity={activity}/>
        ))}
      </div>
    </div>
  );
};

export default ActivityCardsContainer;
