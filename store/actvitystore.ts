import { create } from 'zustand';

type Activity = {
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
};

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],
  addActivity: (activity) =>
    set((state) => ({ activities: [activity, ...state.activities] })),
  setActivities: (activities) => set({ activities }),
}));
