import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { toast } from "sonner";
import ProjectCards from "./ProjectCard";
import { useProjectStore } from "@/store/actvitystore";

const ProjecrCardContainer = () => {
  const [isFetched, setIsFetched] = useState(false);  // State for managing laoder
  const { data: session, status } = useSession();
  const projects = useProjectStore((state)=> state.projects);
  const setProjects = useProjectStore((state)=> state.setProjects);

  const getAllActivities = async () => {
    try {
      setIsFetched(false);
      if (!session) {
        return;
      }
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/projects`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );
      setProjects(data);
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
            {projects?.map((project) => (
              <ProjectCards key={project.id} project={project} />
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

export default ProjecrCardContainer;
