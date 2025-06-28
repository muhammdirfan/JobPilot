import { create } from "zustand";
import toast from "react-hot-toast";
import { JobStore, UIState } from "@/types/job";

export const useJobStore = create<JobStore & UIState>((set, get) => ({
  jobs: [],
  loading: false,
  search: "",
  status: "all",
  sort: "newest",

  setSearch: (val) => set({ search: val }),
  setStatus: (val) => set({ status: val }),
  setSort: (val) => set({ sort: val }),

  fetchJobs: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/jobs");
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
    const updated = await res.json();
    set((state) => ({
      jobs: state.jobs.map((job) => (job.id === id ? updated : job)),
    }));
    toast.success("Job updated!");
  },

  deleteJob: async (id) => {
    await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== id),
    }));
    toast.success("Job deleted!");
  },
}));
