"use client";

import { useEffect } from "react";
import { useJobStore } from "@/store/jobStore";
import JobCard from "./components/JobCard";

export default function JobList() {
  const {
    jobs,
    fetchJobs,
    search,
    status,
    sort,
    setSearch,
    setStatus,
    setSort,
    loading,
  } = useJobStore();

  useEffect(() => {
    fetchJobs();
  }, []);

  const filtered = jobs
    .filter((job) =>
      [job.company, job.position]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((job) => (status === "all" ? true : job.status === status))
    .sort((a, b) =>
      sort === "newest"
        ? new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        : new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
    );

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/3"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="border px-3 py-2 rounded"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && filtered.length === 0 && <p>No jobs found.</p>}

      <div className="grid gap-4">
        {filtered.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
