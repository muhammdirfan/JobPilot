"use client";

import { useState } from "react";
import { useJobStore } from "@/store/jobStore";
import { JobFormData } from "@/types/job";

export default function AddJobForm() {
  const [form, setForm] = useState<JobFormData>({
    company: "",
    position: "",
    status: "applied" as const,
  });

  //   const [form, setForm] = useState({ company: '', position: '', status: 'applied' })
  const { addJob } = useJobStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.position) return;
    await addJob(form);
    setForm({ company: "", position: "", status: "applied" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        className="border px-4 py-2 w-full"
        placeholder="Company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
      <input
        className="border px-4 py-2 w-full"
        placeholder="Position"
        value={form.position}
        onChange={(e) => setForm({ ...form, position: e.target.value })}
      />
      <select
        className="border px-4 py-2 w-full"
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
      >
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Job
      </button>
    </form>
  );
}
