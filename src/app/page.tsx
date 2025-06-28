'use client'

import Header from '@/components/Header'
import { useJobStore } from '@/store/jobStore'

export default function Home() {
  const { jobs, addJob } = useJobStore()

  return (
    <main className="p-4">
      <Header />
      <h1 className="text-2xl font-semibold mb-4">Job List</h1>
      <button
        onClick={() =>
          addJob({
            id: String(Date.now()),
            company: 'Google',
            status: 'applied',
          })
        }
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Dummy Job
      </button>
      <ul className="mt-4 space-y-2">
        {jobs.map((job) => (
          <li
            key={job.id}
            className="border p-2 rounded bg-white shadow-sm text-sm"
          >
            {job.company} - {job.status}
          </li>
        ))}
      </ul>
    </main>
  )
}
