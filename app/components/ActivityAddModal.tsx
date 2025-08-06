"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "@/components/ui/animated-modal";
import { IconActivity } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useActivityStore } from "@/store/actvitystore";
import { Button } from "@/components/ui/stateful-button";

export function ActivityAdddModal() {
  const [task, setTask] = useState("");
  const [summary, setSummary] = useState("");
  const [dueDate, setDueDate] = useState<Date>();
  const { data: session, status } = useSession();
  const addActivity = useActivityStore((state)=> state.addActivity);

  const createActivityHandler = async (setOpen: (val: boolean) => void) => {
    const activityData = {
      task,
      summary,
      due_date: dueDate?.toISOString().split("T")[0],
      completed: false,
    };

    if (session) {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/activities`,
          activityData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user.access_token}`,
            },
          }
        );
        addActivity(data);
        setOpen(false); // Close modal on success
      } catch (error) {
        console.error(error, "Error while creating user");
      }
    }
  };

  return (
    <div className="py-10 flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Add New Activity
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            <IconActivity />
          </div>
        </ModalTrigger>

        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Add your new activity
            </h4>

            <LabelInputContainer>
              <Label htmlFor="task">Task</Label>
              <Input id="task" placeholder="Tyler" type="text" onChange={(e) => setTask(e.target.value)} />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="summary">Summary</Label>
              <Input id="summary" placeholder="Tyler" type="text" onChange={(e) => setSummary(e.target.value)} />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="activityDate">Due Date</Label>
              <Input
                id="activityDate"
                name="activityDate"
                type="date"
                className="w-full"
                onChange={(e) => setDueDate(new Date(e.target.value))}
              />
            </LabelInputContainer>
          </ModalContent>

          <ModalFooter className="gap-4">
            <FooterButtons createActivityHandler={createActivityHandler} />
        </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}


const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

const FooterButtons = ({ createActivityHandler }: { createActivityHandler: (setOpen: (val: boolean) => void) => void }) => {
  const { setOpen } = useModal(); //We can use this hook when modal is loaded so that's why extracted footer in to other components.

  return (
    <>
      <button
        className="cursor-pointer px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
        onClick={() => setOpen(false)}
      >
        Cancel
      </button>
      {/* <button
        className="cursor-pointer bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
        onClick={() => createActivityHandler(setOpen)}
      >
        ADD
      </button> */}
      <Button className="w-50 bg-black" onClick={() => createActivityHandler(setOpen)}>Add</Button>
      
    </>
  );
};
