"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { JobCard } from "@/components/job-card"
import { jobs, Job } from "@/lib/jobs"

const statusFilters = ["all", "active", "pending", "completed", "on-hold"] as const

export function JobList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<typeof statusFilters[number]>("all")

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.address.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = activeFilter === "all" || job.status === activeFilter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex gap-6">
      {/* Left Sidebar Filters */}
      <div className="w-64 shrink-0">
        <div className="sticky top-20 rounded-lg border border-border bg-card p-4">
          <h1 className="text-lg font-bold text-foreground">Jobs</h1>
          <p className="mb-4 mt-1 text-xs text-muted-foreground">
            Manage and track all your projects
          </p>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9  border border-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Status
              </label>
              <div className="flex flex-col gap-1">
                {statusFilters.map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setActiveFilter(filter)}
                    className="justify-start capitalize"
                  >
                    {filter.replace("-", " ")}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job List */}
      <div className="flex-1 space-y-3 flex flex-col gap-3">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12">
            <p className="text-sm text-muted-foreground">No jobs found</p>
          </div>
        )}
      </div>
    </div>
  );
}
