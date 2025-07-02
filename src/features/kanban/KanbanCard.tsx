"use client";

import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Job } from "@/types/job";
import { useJobStore } from "@/store/jobStore";

export default function KanbanCard({ job }: { job: Job }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: job.id,
      data: { status: job.status },
    });

  const { updateJob, deleteJob } = useJobStore();
  const [editing, setEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [form, setForm] = useState({
    company: job.company,
    position: job.position,
    status: job.status,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: isDragging ? 50 : 1,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateJob(job.id, form);
    setEditing(false);
  };

  const getPlatform = (url?: string) => {
    if (!url) return "Unknown";
    if (url.includes("upwork.com")) return "Upwork";
    if (url.includes("linkedin.com")) return "LinkedIn";
    if (url.includes("indeed.com")) return "Indeed";
    return "Other";
  };

  const platform = getPlatform(job.link);

  if (editing) {
    return (
      <div
        className="bg-white p-3 border rounded shadow space-y-2"
        ref={setNodeRef}
      >
        <form onSubmit={handleSubmit} className="space-y-1 text-sm">
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Company"
            className="border px-2 py-1 w-full"
          />
          <input
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            placeholder="Position"
            className="border px-2 py-1 w-full"
          />
          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as
                  | "applied"
                  | "interview"
                  | "offer"
                  | "rejected",
              })
            }
            className="border px-2 py-1 w-full"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="text-sm bg-blue-600 text-white px-2 py-1 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-sm text-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white p-3 border rounded shadow relative space-y-1 ${
        isDragging ? "ring-2 ring-blue-500 scale-105" : ""
      }`}
    >
      <div {...listeners} {...attributes} className="cursor-move mt-4">
        <p className="font-semibold">{job.position}</p>
        <p className="text-sm text-gray-500">{job.company}</p>
        <p className="text-xs text-gray-400">📌 {platform}</p>
      </div>

      {job.notes && (
        <div className="text-xs text-gray-600">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-600 hover:underline text-xs"
          >
            {showDetails ? "▲ Hide Description" : "▼ Show Description"}
          </button>
          {showDetails && (
            <p className="mt-1 whitespace-pre-line text-xs bg-gray-50 p-2 rounded">
              {job.notes}
            </p>
          )}
        </div>
      )}

      {job.link && (
        <a
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 underline mt-1 inline-block"
        >
          🔗 View Job Post
        </a>
      )}

      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button
          onClick={() => setEditing(true)}
          className="text-xs text-blue-500 hover:underline cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (confirm("Are you sure you want to delete this job?")) {
              deleteJob(job.id);
            }
          }}
          className="text-xs text-red-500 hover:underline cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
