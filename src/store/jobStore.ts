import { create } from "zustand";

export type Job = {
  id: string;
  company: string;
  position: string;
  status: string;
  link?: string;
  notes?: string;
  createdAt?: string;
};

interface JobStore {
  jobs: Job[];
  loading: boolean;
  fetchJobs: () => Promise<void>;
  addJob: (job: Omit<Job, "id" | "createdAt">) => Promise<void>;
}

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  loading: false,

  fetchJobs: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/jobs");

      if (!res.ok) {
        console.error("Failed to fetch jobs:", res.status);
        set({ loading: false });
        return;
      }

      const jobs = await res.json();
      set({ jobs, loading: false });
    } catch (err) {
      console.error("Error fetching jobs:", err);
      set({ loading: false });
    }
  },

  addJob: async (job) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    const newJob = await res.json();
    set((state) => ({ jobs: [newJob, ...state.jobs] }));
  },
}));
