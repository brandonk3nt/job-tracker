"use client"

import Link from "next/link"
import { Bird } from "lucide-react"
import { JobModal } from "@/components/new-job-modal"

export function Topbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur bg-card">
      <div className="flex h-14 items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <Bird className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold text-foreground">
            Finch AI
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <JobModal />
        </div>
      </div>
    </header>
  );
}
