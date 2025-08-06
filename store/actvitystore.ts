import { create } from 'zustand';

export type Activity = {
  task: string;
  completed: boolean;
  summary: string;
  user_id: number;
  due_date: string;
  id: number;
};

type ActivityStore = {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
  setActivities: (activities: Activity[]) => void;
  overdueActivities: Activity[];
  setOverdueActivity: (activities: Activity[]) => void;
  completedActivities: Activity[];
  setCompletedActivity: (activities: Activity[]) => void;
};

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],
  addActivity: (activity) =>
    set((state) => ({ activities: [activity, ...state.activities] })),
  setActivities: (activities) => set({ activities }),
  overdueActivities: [],
  setOverdueActivity: (overdueActivities) => set({ overdueActivities }),
  completedActivities: [],
  setCompletedActivity: (completedActivities) => set({completedActivities}),
}));
