"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import type { Job } from "@/lib/jobs"

interface JobModalProps {
  job?: Job
  mode?: "create" | "edit"
}

const emptyFormData = {
  name: "",
  client: "",
  address: "",
  status: "pending",
  startDate: "",
  endDate: "",
  budget: "",
  progress: "0",
  description: "",
  projectManager: "",
}

export function JobModal({ job, mode = "create" }: JobModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(emptyFormData)

  useEffect(() => {
    if (job && mode === "edit") {
      setFormData({
        name: job.name,
        client: job.client,
        address: job.address,
        status: job.status,
        startDate: job.startDate,
        endDate: job.endDate,
        budget: job.budget.toString(),
        progress: job.progress.toString(),
        description: job.description,
        projectManager: job.projectManager,
      })
    }
  }, [job, mode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For demo purposes, just close the modal
    // In a real app, this would save the job to a database
    console.log(mode === "edit" ? "Updated job data:" : "New job data:", formData)
    setOpen(false)
    if (mode === "create") {
      setFormData(emptyFormData)
    }
  }

  const isEditMode = mode === "edit"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <Button size="sm">Update Progress</Button>
        ) : (
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Job
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Job" : "Create New Job"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the project details and progress."
              : "Enter the details for the new project."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-4 py-4">
            <Field>
              <FieldLabel>Job Name</FieldLabel>
              <Input
                placeholder="e.g., Smith Kitchen Remodel"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Field>

            <Field>
              <FieldLabel>Client</FieldLabel>
              <Input
                placeholder="e.g., John & Jane Smith"
                value={formData.client}
                onChange={(e) =>
                  setFormData({ ...formData, client: e.target.value })
                }
                required
              />
            </Field>

            <Field>
              <FieldLabel>Address</FieldLabel>
              <Input
                placeholder="e.g., 123 Main Street"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Start Date</FieldLabel>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  required
                />
              </Field>

              <Field>
                <FieldLabel>End Date</FieldLabel>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  required
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Budget ($)</FieldLabel>
                <Input
                  type="number"
                  placeholder="e.g., 25000"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Status</FieldLabel>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            {isEditMode && (
              <Field>
                <FieldLabel>Progress: {formData.progress}%</FieldLabel>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) =>
                    setFormData({ ...formData, progress: e.target.value })
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary"
                />
              </Field>
            )}

            <Field>
              <FieldLabel>Project Manager</FieldLabel>
              <Input
                placeholder="e.g., Sarah Mitchell"
                value={formData.projectManager}
                onChange={(e) =>
                  setFormData({ ...formData, projectManager: e.target.value })
                }
              />
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                placeholder="Brief description of the project..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              className="hover:text-white"
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Save Changes" : "Create Job"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
