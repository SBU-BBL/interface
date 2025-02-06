import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, DollarSign, Users } from "lucide-react"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
  onClick: () => void
  tasksCount: number
  completedTasksCount: number
}

export function ProjectCard({ project, onClick, tasksCount, completedTasksCount }: ProjectCardProps) {
  const progress = tasksCount > 0 ? (completedTasksCount / tasksCount) * 100 : 0

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
          </div>
          <Badge
            variant={project.status === "active" ? "default" : project.status === "completed" ? "success" : "secondary"}
            className="capitalize"
          >
            {project.status}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Due {new Date(project.deadline).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center text-sm">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Balance: ${project.balance}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              <Avatar className="h-8 w-8 border-2 border-background">
                <AvatarFallback>
                  {project.teamLeader
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {project.teamCoLeaders.slice(0, 2).map((leader, i) => (
                <Avatar key={i} className="h-8 w-8 border-2 border-background">
                  <AvatarFallback>
                    {leader
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              {project.teamCoLeaders.length > 2 && (
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground text-xs border-2 border-background">
                  +{project.teamCoLeaders.length - 2}
                </div>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-2 h-4 w-4" />
              {tasksCount} tasks
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

