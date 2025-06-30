"use client";

import { useState } from "react";
import { useJobStore } from "@/store/jobStore";
import { JobFormData } from "@/types/job";
import toast from "react-hot-toast";
import { parseAIResponse } from "@/utils";

export default function AddJobForm() {
  const [isLoading, setisLoading] = useState(false);
  const [form, setForm] = useState<JobFormData>({
    company: "",
    position: "",
    status: "applied" as const,
    url: "",
  });

  const { addJob } = useJobStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setisLoading(true);
    if (!form.company || !form.position) return;
    await addJob(form);
    setForm({ company: "", position: "", status: "applied", url: "" });
    setisLoading(false);
  };

  const handleAutoFill = async (url: any) => {
    const res = await fetch("/api/ai/fill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
      const text = await res.text();
      return toast.error("Auto-fill failed. Try again.");
    }

    const data = await res.json();
    const parsed = parseAIResponse(data.raw);

    setForm({
      company: parsed.company,
      position: parsed.position,
      status: parsed.status,
      url: parsed.link,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        type="url"
        className="border px-4 py-2 w-full"
        placeholder="Paste job post URL"
        value={form.url}
        onChange={(e) => setForm({ ...form, url: e.target.value })}
      />
      <button
        type="button"
        onClick={() => handleAutoFill(form.url)}
        className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
      >
        Auto-Fill
      </button>

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
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Add Job"}
      </button>
    </form>
  );
}
