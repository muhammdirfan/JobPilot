import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";
import { Job } from "@/types/job";

export default function KanbanColumn({
  id,
  title,
  jobs,
}: {
  id: string;
  title: string;
  jobs: Job[];
}) {
  const { setNodeRef } = useDroppable({ id });

  const statusColors: Record<string, string> = {
    applied: "bg-blue-50",
    interview: "bg-yellow-50",
    offer: "bg-green-50",
    rejected: "bg-red-50",
  };

  return (
    <div
      ref={setNodeRef}
      className={`${statusColors[id]} p-3 rounded h-full min-h-[300px] transition-all`}
    >
      <h2 className="text-lg font-bold capitalize mb-2">{title}</h2>
      <div className="space-y-2">
        {jobs.map((job) => (
          <KanbanCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
