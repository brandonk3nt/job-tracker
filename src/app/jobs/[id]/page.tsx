import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, DollarSign, User, Users, FileText } from "lucide-react"
import { Topbar } from "@/components/topbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { JobDetailActions } from "@/components/job-detail-actions"
import { getJobById, getStatusColor } from "@/lib/jobs"
import { cn } from "@/lib/utils"

interface JobDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params
  const job = getJobById(id)

  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 gap-2 text-muted-foreground hover:text-background"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Button>
        </Link>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">
                  {job.name}
                </h1>
                <Badge
                  variant="outline"
                  className={cn("capitalize", getStatusColor(job.status))}
                >
                  {job.status.replace("-", " ")}
                </Badge>
              </div>
              <p className="text-muted-foreground">{job.client}</p>
            </div>
            <JobDetailActions job={job} />
          </div>

          {/* Progress Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">
                  Project Progress
                </span>
                <span className="text-2xl font-bold text-primary">
                  {job.progress}%
                </span>
              </div>
              <Progress value={job.progress} className="h-3" />
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Started:{" "}
                  {new Date(job.startDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>
                  Due:{" "}
                  {new Date(job.endDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Info Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Details Card */}
            <Card className="py-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4 text-primary" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm text-foreground">{job.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="text-sm text-foreground">
                        ${job.budget.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Timeline</p>
                      <p className="text-sm text-foreground">
                        {new Date(job.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(job.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Card */}
            <Card className="py-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-4 w-4 text-primary" />
                  Team
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Project Manager
                    </p>
                    <p className="text-sm text-foreground">
                      {job.projectManager}
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Crew Members
                  </p>
                  {job.crew.length > 0 ? (
                    <div className="space-y-2">
                      {job.crew.map((member, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                            {member
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="text-sm text-foreground">
                            {member}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No crew assigned yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
