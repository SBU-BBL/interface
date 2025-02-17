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

export interface Project {
  id: string
  title: string
  description: string
  balance: number
  teamLeader: string
  teamCoLeaders: string[]
  deadline: string
  createdAt: string
  status: "active" | "completed" | "on-hold"
}

export interface User {
  id: string
  name: string
  email: string
  role: "Owner" | "Professor" | "Team Leader" | "Member"
}
