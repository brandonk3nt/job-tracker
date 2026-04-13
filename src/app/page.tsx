import { Topbar } from "@/components/topbar"
import { JobList } from "@/components/job-list"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <JobList />
      </main>
    </div>
  )
}
