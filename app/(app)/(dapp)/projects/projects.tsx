"use client"

import { useState } from "react"
import { TasksTable } from "@/components/tasks-table"
import { TaskDetails } from "@/components/task-details"
import { TaskForm } from "@/components/task-form"
import { ProjectCard } from "@/components/project-card"
import { ProjectDetails } from "@/components/project-details"
import { ProjectForm } from "@/components/project-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, ChevronLeft } from "lucide-react"
import type { Task, Project } from "@/lib/types"

export default function TasksPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const handleAddProject = (newProject: Project) => {
    setProjects([...projects, newProject])
    setIsProjectDialogOpen(false)
  }

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask])
    setIsTaskDialogOpen(false)
  }

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map((project) => (project.id === updatedProject.id ? updatedProject : project)))
    setIsProjectDialogOpen(false)
    setSelectedProject(updatedProject)
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setIsTaskDialogOpen(false)
    setSelectedTask(updatedTask)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    setSelectedTask(null)
  }

  const getProjectTasks = (projectId: string) => {
    return tasks.filter((task) => task.projectId === projectId)
  }

  const getCompletedTasksCount = (projectId: string) => {
    return getProjectTasks(projectId).filter((task) => task.status === "done").length
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            {selectedProject ? (
              <>
                <Button variant="ghost" className="mr-2 -ml-4" onClick={() => setSelectedProject(null)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {selectedProject.title}
              </>
            ) : (
              "Projects"
            )}
          </h1>
        </div>
        <div className="flex gap-2">
          {selectedProject && (
            <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingTask(null)}>
                  <PlusCircle className="mr-2 h-4 w-4" /> New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
                </DialogHeader>
                <TaskForm
                  projectId={selectedProject.id}
                  task={editingTask}
                  onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                  onCancel={() => setIsTaskDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          )}
          <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingProject(null)}>
                <PlusCircle className="mr-2 h-4 w-4" /> New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
              </DialogHeader>
              <ProjectForm
                project={editingProject}
                onSubmit={editingProject ? handleUpdateProject : handleAddProject}
                onCancel={() => setIsProjectDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {!selectedProject ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
              tasksCount={getProjectTasks(project.id).length}
              completedTasksCount={getCompletedTasksCount(project.id)}
            />
          ))}
        </div>
      ) : (
        <>
          <ProjectDetails
            project={selectedProject}
            tasksCount={getProjectTasks(selectedProject.id).length}
            completedTasksCount={getCompletedTasksCount(selectedProject.id)}
          />
          <div className="flex flex-col lg:flex-row gap-4">
            <div
              className={`w-full ${selectedTask ? "lg:w-2/3" : "lg:w-full"} transition-all duration-300 ease-in-out`}
            >
              <TasksTable
                tasks={getProjectTasks(selectedProject.id)}
                onTaskClick={setSelectedTask}
                onEdit={(task) => {
                  setEditingTask(task)
                  setIsTaskDialogOpen(true)
                }}
                onDelete={handleDeleteTask}
              />
            </div>
            {selectedTask && (
              <div className="w-full lg:w-1/3 transition-all duration-300 ease-in-out">
                <TaskDetails
                  task={selectedTask}
                  onEdit={() => {
                    setEditingTask(selectedTask)
                    setIsTaskDialogOpen(true)
                  }}
                  onDelete={() => handleDeleteTask(selectedTask.id)}
                  onClose={() => setSelectedTask(null)}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

