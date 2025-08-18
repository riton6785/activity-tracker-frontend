import { create } from 'zustand';

export type Activity = {
  task: string;
  completed: boolean;
  summary: string;
  user_id: number;
  due_date: string;
  id: number;
  finish_note: string | null;
};

export type Project = {
  name: string
  completed: boolean;
  description: string;
  user_id: number;
  due_date: string;
  id: number;
}

export type Task = {
  name: string
  completed: boolean;
  description: string;
  user_id: number;
  due_date: string;
  id: number;
  project_id: number
}

type ActivityStore = {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
  setActivities: (activities: Activity[]) => void;
  removeActivities: (id: number) => void
  updateActivities: (id: number, updatedFields: Partial<Activity>) => void,
  overdueActivities: Activity[];
  setOverdueActivity: (activities: Activity[]) => void;
  removeOverduesActivity: (id: number) => void
  updateOverdueActivity: (id: number, updatedFields: Partial<Activity>) => void,
  completedActivities: Activity[];
  setCompletedActivity: (activities: Activity[]) => void;
};

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],
  addActivity: (activity) =>
    set((state) => ({ activities: [activity, ...state.activities] })),
  setActivities: (activities) => set({ activities }),
  removeActivities: (id) =>
    set((state) => ({
      activities: state.activities.filter((item) => item.id !== id),
    })),
  updateActivities: (id, updatedFields) =>
    set((state) => ({
      activities: state.activities.map((activity) =>
        activity.id === id ? { ...activity, ...updatedFields } : activity
      ),
    })),
  overdueActivities: [],
  setOverdueActivity: (overdueActivities) => set({ overdueActivities }),
  removeOverduesActivity: (id) =>
    set((state)=> ({overdueActivities: state.overdueActivities.filter((activity) => activity.id != id)})),
  updateOverdueActivity: (id, updatedFields) =>
    set((state) => ({
      overdueActivities: state.overdueActivities.map((activity) =>
        activity.id === id ? { ...activity, ...updatedFields } : activity
      )
    })),
  completedActivities: [],
  setCompletedActivity: (completedActivities) => set({completedActivities}),
}));

type ProjectStore = {
  projects: Project[]
  addproject: (project: Project) => void;
  setProjects: (projects: Project[]) => void;
}

type TaskStore = {
  tasks: Task[];
  addTasks: (task: Task) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  addproject: (project) =>
    set((state) => ({ projects: [project, ...state.projects] })),
  setProjects: (projects) => set({ projects }),
}));

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTasks: (task) => 
    set((state)=> ({tasks: [task, ...state.tasks]})),
  setTasks: (tasks) => set({tasks}),
}));
