export interface Task {
  id: string
  taskName: string
  taskDescription: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
  taskBalance?: string
  deadline: string
  createdAt: string
  users: string[]
  creator: string
}

