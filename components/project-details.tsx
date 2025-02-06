import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, DollarSign } from "lucide-react"
import type { Project } from "@/lib/types"

interface ProjectDetailsProps {
  project: Project
  tasksCount: number
  completedTasksCount: number
}

export function ProjectDetails({ project, tasksCount, completedTasksCount }: ProjectDetailsProps) {
  const progress = tasksCount > 0 ? (completedTasksCount / tasksCount) * 100 : 0

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          <Badge
            variant={project.status === "active" ? "default" : project.status === "completed" ? "success" : "secondary"}
            className="capitalize"
          >
            {project.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Due {new Date(project.deadline).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Balance: ${project.balance}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Team Leader</h3>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>
                    {project.teamLeader
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{project.teamLeader}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Co-Leaders</h3>
              <div className="flex flex-wrap gap-2">
                {project.teamCoLeaders.map((leader, i) => (
                  <div key={i} className="flex items-center bg-muted rounded-full px-3 py-1">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback>
                        {leader
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{leader}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

