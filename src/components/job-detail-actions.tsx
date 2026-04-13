"use client"

import { Button } from "@/components/ui/button"
import { JobModal } from "@/components/new-job-modal"
import type { Job } from "@/lib/jobs"

interface JobDetailActionsProps {
  job: Job
}

export function JobDetailActions({ job }: JobDetailActionsProps) {
  return (
    <div className="flex gap-2">
      <Button className="hover:text-white" variant="outline" size="sm">
        Edit Job
      </Button>
      <JobModal job={job} mode="edit" />
    </div>
  );
}
