// components/ActivityEditModal.tsx
"use client";
import React, { useState } from "react";
import { Activity, useActivityStore } from "@/store/actvitystore";
import { Button } from "@/components/ui/stateful-button";
import { X } from "lucide-react"; // Optional close icon
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger, useModal } from "@/components/ui/animated-modal";
import { cn } from "@/lib/utils";
import { IconEdit } from "@tabler/icons-react";
import { Label } from "@radix-ui/react-label";

interface ActivityEditModalProps {
  activity: Activity;
  type: string
}

export const ActivityEditModal: React.FC<ActivityEditModalProps> = ({ activity, type }) => {
  const [task, setTask] = useState(activity?.task);
  const [summary, setSummary] = useState(activity?.summary);
  const [dueDate, setDueDate] = useState<Date>(new Date(activity?.due_date || new Date()));
  const {data: session} = useSession();

//   Zustand states
  const updateActivities = useActivityStore((state) => state.updateActivities);
  const updateOverdueActivity = useActivityStore((state)=> state.updateOverdueActivity);

  const editHandler = async(setOpen: (val: boolean) => void) => {
    try {
        const editData = {task, summary, id: activity.id, due_date: dueDate};
        await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/edit/activity`, editData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.user.access_token}`
            }
        })
        if(type === "all") {
            updateActivities(activity.id, {
            summary: summary,
            due_date: dueDate.toISOString().split("T")[0],
            task: task
            })
        } else if(type === "overdues") {
            updateOverdueActivity(activity.id, {
               summary: summary,
                due_date: dueDate.toISOString().split("T")[0],
                task: task 
            })
        }
        setOpen(false); // Close modal on success
        toast.success("Activity updated Successfully");
    } catch (error) {
        toast.error("Error while editing the activities")
    }
  }

  return (
    <div className="py-10 flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Edit Activity
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            <IconEdit />
          </div>
        </ModalTrigger>

        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Edit your activity
            </h4>

            <LabelInputContainer>
              <Label htmlFor="task">Task</Label>
              <Input id="task" placeholder="Tyler" type="text" onChange={(e) => setTask(e.target.value)} defaultValue={task} />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="summary">Summary</Label>
              <Input id="summary" placeholder="Tyler" type="text" onChange={(e) => setSummary(e.target.value)} defaultValue={summary} />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="activityDate">Due Date</Label>
              <Input
                id="activityDate"
                name="activityDate"
                type="date"
                defaultValue={dueDate.toISOString().split("T")[0]}
                className="w-full"
                onChange={(e) => setDueDate(new Date(e.target.value))}
              />
            </LabelInputContainer>
          </ModalContent>

          <ModalFooter className="gap-4">
            <FooterButtons editHandler={editHandler} />
        </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

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

const FooterButtons = ({ editHandler }: { editHandler: (setOpen: (val: boolean) => void) => void }) => {
  const { setOpen } = useModal(); //We can use this hook when modal is loaded so that's why extracted footer in to other components.

  return (
    <>
      <Button
        className="w-50 bg-black cursor-pointer"
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
      <Button className="w-50 bg-black cursor-pointer" onClick={() => editHandler(setOpen)}>Update</Button></>
  );
};
