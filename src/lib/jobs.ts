export interface Job {
  id: string
  name: string
  client: string
  address: string
  status: "active" | "pending" | "completed" | "on-hold"
  startDate: string
  endDate: string
  budget: number
  progress: number
  description: string
  projectManager: string
  crew: string[]
}

export const jobs: Job[] = [
  {
    id: "job-001",
    name: "Johnson Kitchen Remodel",
    client: "Michael & Sarah Johnson",
    address: "742 Maple Drive",
    status: "active",
    startDate: "2026-03-15",
    endDate: "2026-05-10",
    budget: 45000,
    progress: 45,
    description: "Complete kitchen renovation including new cabinetry, quartz countertops, subway tile backsplash, and stainless steel appliances. Also includes updated electrical and plumbing.",
    projectManager: "Sarah Mitchell",
    crew: ["Mike Thompson", "David Chen", "Lisa Rodriguez"]
  },
  {
    id: "job-002",
    name: "Garcia Backyard Landscape",
    client: "Roberto & Maria Garcia",
    address: "1584 Willow Lane",
    status: "active",
    startDate: "2026-03-01",
    endDate: "2026-04-30",
    budget: 28000,
    progress: 68,
    description: "Full backyard transformation including new patio with pavers, raised garden beds, irrigation system, native plant installation, and outdoor lighting.",
    projectManager: "Robert Garcia",
    crew: ["Tom Bradley", "Kevin O'Brien", "Maria Santos"]
  },
  {
    id: "job-003",
    name: "Chen Master Bathroom Renovation",
    client: "David & Emily Chen",
    address: "2201 Oak Street",
    status: "pending",
    startDate: "2026-05-01",
    endDate: "2026-06-15",
    budget: 32000,
    progress: 0,
    description: "Master bathroom upgrade with walk-in shower, freestanding tub, double vanity, heated floors, and new tile throughout. Includes updated plumbing and ventilation.",
    projectManager: "Jennifer Walsh",
    crew: []
  },
  {
    id: "job-004",
    name: "Thompson Front Yard Makeover",
    client: "James & Linda Thompson",
    address: "895 Cedar Avenue",
    status: "completed",
    startDate: "2025-12-01",
    endDate: "2026-02-28",
    budget: 18500,
    progress: 100,
    description: "Complete front yard redesign with drought-tolerant landscaping, new walkway, decorative rock features, and drip irrigation system.",
    projectManager: "Michael Torres",
    crew: ["Eric Johnson", "Amanda Lee", "Brian Foster"]
  },
  {
    id: "job-005",
    name: "Williams Basement Finishing",
    client: "Robert & Karen Williams",
    address: "3340 Birch Road",
    status: "on-hold",
    startDate: "2026-02-15",
    endDate: "2026-05-30",
    budget: 55000,
    progress: 12,
    description: "Basement conversion into living space with bedroom, bathroom, home theater area, and wet bar. Currently on hold pending permit approval for egress window.",
    projectManager: "Sarah Mitchell",
    crew: ["Tom Bradley", "David Chen"]
  },
  {
    id: "job-006",
    name: "Patel Deck & Pergola",
    client: "Raj & Priya Patel",
    address: "567 Elm Court",
    status: "active",
    startDate: "2026-04-01",
    endDate: "2026-05-15",
    budget: 22000,
    progress: 30,
    description: "New composite deck with built-in seating, cedar pergola with retractable shade, and integrated LED lighting. Includes stair access to backyard.",
    projectManager: "Jennifer Walsh",
    crew: ["Kevin O'Brien", "Lisa Rodriguez"]
  }
]

export function getJobById(id: string): Job | undefined {
  return jobs.find(job => job.id === id)
}

export function getStatusColor(status: Job["status"]): string {
  switch (status) {
    case "active":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    case "pending":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30"
    case "completed":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "on-hold":
      return "bg-rose-500/20 text-rose-400 border-rose-500/30"
  }
}
