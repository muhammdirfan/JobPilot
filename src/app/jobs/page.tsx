import AddJobForm from '@/features/jobs/AddJobForm'
import JobList from '@/features/jobs/JobList'

export default function JobsPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Job Tracker</h1>
      <AddJobForm />
      <JobList />
    </div>
  )
}
