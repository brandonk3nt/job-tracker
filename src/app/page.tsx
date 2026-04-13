import { Topbar } from "@/components/topbar";
import { JobList } from "@/components/job-list";
import { getJobs } from "@/lib/jobs";

const statusFilters = [
  "all",
  "active",
  "pending",
  "completed",
  "on-hold",
] as const;

type Status = (typeof statusFilters)[number];

type PageProps = {
  searchParams: {
    q?: string;
    status?: Status;
  };
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const status: Status = statusFilters.includes(params.status as Status)
    ? (params.status as Status)
    : "all";
  const jobs = await getJobs({
    searchQuery: params.q ?? "",
    activeFilter: status,
  });

  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <JobList jobs={jobs} />
      </main>
    </div>
  );
}
