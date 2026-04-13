import Link from "next/link"
import { MapPin, Calendar, DollarSign, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Job, getStatusColor } from "@/lib/jobs"
import { cn } from "@/lib/utils"

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="group transition-all hover:border-primary/50 hover:bg-card/80">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {job.name}
                </h3>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs capitalize", getStatusColor(job.status))}
                >
                  {job.status.replace("-", " ")}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">{job.client}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{job.address}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(job.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {new Date(job.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span>${job.budget.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{job.progress}%</span>
                </div>
                <Progress value={job.progress} className="h-1.5" />
              </div>
            </div>
            
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
