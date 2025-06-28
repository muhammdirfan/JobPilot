'use client'

import { useEffect } from 'react'
import { useJobStore } from '@/store/jobStore'
import JobCard from './components/JobCard'

export default function JobList() {
  const { jobs, fetchJobs, loading } = useJobStore()

  useEffect(() => {
    fetchJobs()
  }, [])

  if (loading) return <p>Loading...</p>
  if (!jobs.length) return <p>No jobs yet.</p>

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}
