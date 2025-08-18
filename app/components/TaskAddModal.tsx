"use client";
import React, {useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "@/components/ui/animated-modal";
import { IconPlus } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/stateful-button";
import { toast } from "sonner";
import axios from "axios";
import { useTaskStore } from "@/store/actvitystore";
import { useParams } from "next/navigation";

export function TaskAddModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date>();
  const { data: session } = useSession();
  const addTask = useTaskStore((state)=> state.addTasks)
  const params = useParams()

  const createTaskHandler = async (setOpen: (val: boolean) => void) => {
      const taskData = {
      name,
      description,
      due_date: dueDate?.toISOString().split("T")[0],
      completed: false,
      project_id: Number(params.projectId),
      }
    if (session) {
      try {
        debugger
        const {data} = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/create/task`,
          taskData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user.access_token}`,
            },
          }
        );
        setOpen(false); // Close modal on success
        addTask(data);
        toast.success('task created successfully')
      } catch {
        toast.error("Error while creating Task something went wrong");
      }
    };
  }

  return (
    <div className="py-10 flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Add New Task
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 z-20">
            <IconPlus />
          </div>
        </ModalTrigger>

        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Add your new Task
            </h4>

            <LabelInputContainer>
              <Label htmlFor="task">Name</Label>
              <Input id="task" placeholder="Add name of your Task" type="text" required onChange={(e) => setName(e.target.value)} />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="summary">Description</Label>
              <Input id="summary" placeholder="Add description to your Task" type="text" required onChange={(e) => setDescription(e.target.value)} />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="activityDate">Due Date</Label>
              <Input
                id="activityDate"
                name="activityDate"
                type="date"
                className="w-full"
                required
                onChange={(e) => setDueDate(new Date(e.target.value))}
              />
            </LabelInputContainer>
          </ModalContent>

          <ModalFooter className="gap-4">
            <FooterButtons createTaskHandler={createTaskHandler} />
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

const FooterButtons = ({ createTaskHandler }: { createTaskHandler: (setOpen: (val: boolean) => void) => void }) => {
  const { setOpen } = useModal(); //We can use this hook when modal is loaded so that's why extracted footer in to other components.

  return (
    <>
      <Button
        className="cursor-pointer px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
      <Button className="w-50 bg-black" onClick={() => createTaskHandler(setOpen)}>Add</Button>
      
    </>
  );
};
