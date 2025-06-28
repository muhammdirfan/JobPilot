import { useState } from 'react'
import { Job } from '@/types/job'
import { useJobStore } from '@/store/jobStore'
import JobEditForm from './JobEditForm'

export default function JobCard({ job }: { job: Job }) {
  const { deleteJob } = useJobStore()
  const [editing, setEditing] = useState(false)

  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      {!editing ? (
        <>
          <div className="flex justify-between">
            <div>
              <h3 className="font-bold">{job.position}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm">Status: {job.status}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditing(true)}
                className="text-blue-500 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => deleteJob(job.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      ) : (
        <JobEditForm job={job} onClose={() => setEditing(false)} />
      )}
    </div>
  )
}
