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

type ActivityStore = {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
  setActivities: (activities: Activity[]) => void;
  removeActivities: (id: number) => void
  overdueActivities: Activity[];
  setOverdueActivity: (activities: Activity[]) => void;
  removeOverduesActivity: (id: number) => void
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
  overdueActivities: [],
  setOverdueActivity: (overdueActivities) => set({ overdueActivities }),
  removeOverduesActivity: (id) =>
    set((state)=> ({overdueActivities: state.overdueActivities.filter((activity) => activity.id != id)})),
  completedActivities: [],
  setCompletedActivity: (completedActivities) => set({completedActivities}),
}));
