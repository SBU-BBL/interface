import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Task } from "@/lib/types"
import { ChevronLeft, Calendar, Clock, User2 } from "lucide-react"

interface TaskDetailsProps {
  task: Task
  onEdit: () => void
  onDelete: () => void
  onClose: () => void
}

export function TaskDetails({ task, onEdit, onDelete, onClose }: TaskDetailsProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onClose} className="mr-2">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl">{task.taskName}</CardTitle>
        </div>
        <Badge className="capitalize mt-2">{task.status}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{task.taskDescription}</p>
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="font-semibold">Deadline:</span>
          <span className="ml-2">{new Date(task.deadline).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="font-semibold">Created:</span>
          <span className="ml-2">{new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
        <div>
          <div className="font-semibold mb-2 flex items-center">
            <User2 className="mr-2 h-4 w-4 text-muted-foreground" />
            Assigned to:
          </div>
          <div className="flex flex-wrap gap-2">
            {(() => {
              const usersArr = Array.isArray(task.users)
                ? task.users
                : typeof task.users === "string"
                  ? task.users.split(",").map(u => u.trim()).filter(Boolean)
                  : [];
              return usersArr.map((person, index) => (
                <div key={index} className="flex items-center bg-muted rounded-full px-3 py-1">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarFallback>
                      {person
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{person}</span>
                </div>
              ));
            })()}
          </div>
        </div>
        <div>
          <span className="font-semibold">Priority:</span>
          <span className="ml-2 capitalize">{task.priority}</span>
        </div>
        {task.reward && (
          <div>
            <span className="font-semibold">Reward:</span>
            <span className="ml-2">{task.reward}</span>
          </div>
        )}
        <div>
          <span className="font-semibold">Author:</span>
          <span className="ml-2">{task.author}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

