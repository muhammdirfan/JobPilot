"use client";

import { DndContext, closestCenter } from "@dnd-kit/core";
import KanbanColumn from "./KanbanColumn";
import { useJobStore } from "@/store/jobStore";
import { Job } from "@/types/job";

const columns = ["applied", "interview", "offer", "rejected"];

export default function KanbanBoard({ jobs }: { jobs: Array<Job> }) {
  const { updateJob } = useJobStore();

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.data.current?.status === over.id) return;

    updateJob(active.id, { status: over.id });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((status) => (
          <KanbanColumn
            key={status}
            id={status}
            title={status}
            jobs={jobs.filter((job) => job.status === status)}
          />
        ))}
      </div>
    </DndContext>
  );
}
