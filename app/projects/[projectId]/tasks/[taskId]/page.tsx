"use client";
import { Loader } from "@/app/components/Loader";
import { Button } from "@/components/ui/stateful-button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select, { MultiValue, StylesConfig } from "react-select";
import { toast } from "sonner";

// Types
interface Assignee {
  id: number;
  name: string;
}

interface Option {
  value: number;
  label: string;
}

// Response type when fetching the task details
interface TaskDetails {
  project: string;
  name: string;
  due_date: string;
  created_by: string;
  description: string;
  completed: boolean;
  collaborators: Assignee[];
  assignees: Assignee[];
}

const TASK_TABS: ("details" | "activity")[] = ["details", "activity"];
export default function TaskPage() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date>();
  const [response, setResponse] = useState<TaskDetails>();
  const params = useParams();
  const { data: session, status } = useSession();

  const [collaborators, setCollaborators] = useState<Assignee[]>([]);
  const fillTaskDetails = async () => {
    if (!session) return;
    try {
      const { data }: { data: TaskDetails } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/task/details/${params.taskId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );
      setResponse(data);
      setName(data.name);
      setDescription(data.description);
      setDueDate(new Date(data.due_date));
      setCollaborators(data.collaborators);
      setSelectedAssignees(data.assignees);
    } catch {
      toast.error("Error while fetching details");
    }
  };
  const [activeTab, setActiveTab] = useState<"details" | "activity">("details");
  const [selectedAssignees, setSelectedAssignees] = useState<Assignee[]>([]);

  const assigneeOptions: Option[] = collaborators?.map((a) => ({
    value: a.id,
    label: a.name,
  }));

  if (session) {
    assigneeOptions.push({
      value: Number(session?.user.id),
      label: String(session.user.name),
    });
  }
  const handleAssigneeChange = (selected: MultiValue<Option>) => {
    setSelectedAssignees(selected.map((s) => ({ id: s.value, name: s.label })));
  };

  const selectStyles: StylesConfig<Option, true> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#1f2937",
      borderColor: "#374151",
      color: "white",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#0e5cc9ff",
      color: "white",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1f2937",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#374151" // dark gray for focused option
        : "#1f2937", // background for other options
      color: "white",
      cursor: "pointer",
    }),
  };

  useEffect(() => {
    fillTaskDetails();
  }, [status]);

  const handleUpdate = async () => {
    const updateData = {
      id: params.taskId,
      name,
      description,
      due_date: dueDate?.toISOString().split("T")[0],
      assignee_id: selectedAssignees.map((assignee) => assignee.id),
    };
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/task/update/${params.taskId}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );
      toast.success("Task Updated Successfully");
    } catch {
      toast.error("Error updating the record");
    }
  };

  const markDone = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/task/markdone/${params.taskId}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );
      toast.success("Marked Done");
    } catch {
      toast.error("Error while Marking Done");
    }
  };

  return (
    <>
      {response ? (
        <div className="min-h-screen bg-black p-8 mt-10">
          <div className="max-w-6xl mx-auto bg-gray-900 rounded-xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Task Form</h2>
              <div className="flex items-center space-x-4">
                {!response.completed && <Button className="border bg-blue" onClick={handleUpdate}>
                  Save Changes
                </Button>}

                {response.completed ? (
                  <span className="bg-green-400 text-black text-sm font-medium px-3 py-1 rounded-full">
                    Complted
                  </span>
                ) : (
                  <Button className="border bg-yellow-400" onClick={markDone}>
                    Mark Done
                  </Button>
                )}
              </div>
            </div>

            {/* Form Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Task Name */}
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Task Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter task name"
                  className="w-full rounded-md p-2 border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-white focus:outline-none"
                />
              </div>

              {/* Project - Static */}
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Project
                </label>
                <div className="w-full rounded-md p-2 border border-gray-700 bg-gray-800 text-white">
                  {response?.project}
                </div>
              </div>

              {/* Assignees */}
              <div className="md:col-span-2">
                <label className="block text-gray-300 font-semibold mb-1">
                  Assignees
                </label>
                <Select
                  isMulti
                  options={assigneeOptions}
                  value={selectedAssignees.map((a) => ({
                    value: a.id,
                    label: a.name,
                  }))}
                  onChange={handleAssigneeChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select assignees..."
                  styles={selectStyles}
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Due Date
                </label>
                <input
                  value={dueDate?.toISOString().split("T")[0]}
                  onChange={(e) => setDueDate(new Date(e.target.value))}
                  type="date"
                  className="w-full rounded-md p-2 border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-white focus:outline-none"
                />
              </div>

              {/* Created By */}
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Created By
                </label>
                <div className="w-full rounded-md p-2 border border-gray-700 bg-gray-800 text-white">
                  {response?.created_by}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-6 pt-4 border-t border-gray-700 bg-gray-800">
              <div className="flex border-b border-gray-700 mb-4">
                {TASK_TABS.map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 -mb-px font-semibold transition-colors ${
                      activeTab === tab
                        ? "border-b-2 border-white text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-6 min-h-[200px] bg-gray-900 rounded-md">
                {activeTab === "details" ? (
                  <div className="text-gray-300 italic">
                    <div>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-md p-2 border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-white focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-300 italic">
                    Activity tab content goes here...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center mt-15">
          <Loader />
        </div>
      )}
    </>
  );
}
