import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ActivityCards from "./ActivityCards";
import { useActivityStore } from "@/store/actvitystore";
import { Loader } from "./Loader";
import { toast } from "sonner";

const ActivityCardsContainer = () => {
  const [isFetched, setIsFetched] = useState(false);  // State for managing laoder
  const { data: session, status } = useSession();
  const activities = useActivityStore((state)=> state.activities);
  const setActivities = useActivityStore((state)=> state.setActivities);

  const getAllActivities = async () => {
    try {
      setIsFetched(false);
      if (!session) {
        return;
      }
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/activities/`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );
      setActivities(data);
      setIsFetched(true);
    } catch (error) {
      setIsFetched(true);
      toast.error("Error While fetching the actvities");
    }
  };

  useEffect(() => {
    getAllActivities();
  }, [status]);
  return (
    <>
      {isFetched ? (
        <div className="p-4 mx-auto pt-15">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {activities?.map((activity) => (
              <ActivityCards key={activity.id} activity={activity} type="all" />
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto pt-15 flex justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ActivityCardsContainer;
