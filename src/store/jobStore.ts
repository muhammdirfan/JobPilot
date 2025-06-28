import { create } from 'zustand'

interface Job {
  id: string
  company: string
  status: 'applied' | 'interview' | 'offer' | 'rejected'
}

interface JobState {
  jobs: Job[]
  addJob: (job: Job) => void
}

export const useJobStore = create<JobState>((set: any) => ({
  jobs: [],
  addJob: (job: Job) =>
    set((state: JobState) => ({
      jobs: [...state.jobs, job],
    })),
}))
