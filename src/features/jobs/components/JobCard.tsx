import { Job } from '@/store/jobStore'

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{job.position}</h3>
      <p className="text-sm text-gray-600">{job.company}</p>
      <p className="text-xs mt-2">Status: {job.status}</p>
    </div>
  )
}
