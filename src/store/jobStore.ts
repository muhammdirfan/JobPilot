import { create } from "zustand";
import toast from "react-hot-toast";
import { Job, JobStore } from "@/types/job";

// export type Job = {
//   id: string;
//   company: string;
//   position: string;
//   status: string;
//   link?: string;
//   notes?: string;
//   createdAt?: string;
// };

// interface JobStore {
//   jobs: Job[];
//   loading: boolean;
//   fetchJobs: () => Promise<void>;
//   addJob: (job: Omit<Job, "id" | "createdAt">) => Promise<void>;
// }

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
    toast.success("Job added!");
  },

  updateJob: async (id, data) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) return console.error("Update failed");

    const updatedJob = await res.json();
    set((state) => ({
      jobs: state.jobs.map((job) => (job.id === id ? updatedJob : job)),
    }));
    toast.success("Job updated!");
  },

  deleteJob: async (id: any) => {
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });

    if (!res.ok) return console.error("Delete failed");

    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== id),
    }));
    toast.success("Job deleted.");
  },
}));
