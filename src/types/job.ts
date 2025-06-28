type SortOrder = "newest" | "oldest";
type StatusFilter = "all" | "applied" | "interview" | "offer" | "rejected";

export type Job = {
  id: string;
  company: string;
  position: string;
  status: "applied" | "interview" | "offer" | "rejected";
  link?: string;
  notes?: string;
  createdAt?: string;
};

export interface JobStore {
  jobs: Job[];
  loading: boolean;
  fetchJobs: () => Promise<void>;
  addJob: (job: Omit<Job, "id" | "createdAt">) => Promise<void>;
  updateJob: (id: string, data: Partial<Omit<Job, "id">>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
}

export interface JobFormData {
  company: string;
  position: string;
  status: "applied" | "interview" | "offer" | "rejected";
}

export interface UIState {
  search: string;
  status: StatusFilter;
  sort: SortOrder;
  setSearch: (val: string) => void;
  setStatus: (val: StatusFilter) => void;
  setSort: (val: SortOrder) => void;
}
