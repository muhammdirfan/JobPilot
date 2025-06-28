'use client'

import { useState } from 'react'
import { Job } from '@/types/job'
import { useJobStore } from '@/store/jobStore'

export default function JobEditForm({ job, onClose }: { job: Job; onClose: () => void }) {
  const { updateJob } = useJobStore()
  const [form, setForm] = useState({
    company: job.company,
    position: job.position,
    status: job.status,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateJob(job.id, form)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4 p-4 border rounded bg-gray-50">
      <input
        className="border px-3 py-1 w-full"
        placeholder="Company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
      <input
        className="border px-3 py-1 w-full"
        placeholder="Position"
        value={form.position}
        onChange={(e) => setForm({ ...form, position: e.target.value })}
      />
      <select
        className="border px-3 py-1 w-full"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value as Job['status'] })}
      >
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
      <div className="flex justify-end space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          Save
        </button>
        <button type="button" onClick={onClose} className="text-gray-600">
          Cancel
        </button>
      </div>
    </form>
  )
}
