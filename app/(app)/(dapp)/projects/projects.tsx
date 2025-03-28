"use client"

import { useState, useEffect } from "react"
import { useAtom } from "jotai"
import { _currentCommunity, selectedProjectAtom } from "@/atoms/user"
import { TasksTable } from "@/components/project/tasks-table"
import { TaskDetails } from "@/components/project/task-details"
import { TaskForm } from "@/components/project/task-form"
import { ProjectCard } from "@/components/project/project-card"
import { ProjectDetails } from "@/components/project/project-details"
import { ProjectForm } from "@/components/project/project-form"
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
  const [currentCommunity] = useAtom(_currentCommunity)
  const [globalProject, setGlobalProject] = useAtom(selectedProjectAtom)

  // Load projects list from the new list API using current community id.
  useEffect(() => {
    const loadProjects = async () => {
      const res = await fetch(`/api/project/list?communityId=${currentCommunity}`)
      const { projects } = await res.json();
      setProjects(projects);
    }
    loadProjects()
  }, [currentCommunity])

  const handleAddProject = async (newProject: Project) => {
    const res = await fetch("/api/project/create", {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      // add communityId using current community state
      body: JSON.stringify({ communityId: currentCommunity, ...newProject })
    });
    const data = await res.json();
    if (data.success) {
      setProjects([...projects, data.proj]);
      setIsProjectDialogOpen(false);
    }
  };

  const handleAddTask = async (newTaskData: Task) => {
    console.log("Submitting new task data:", newTaskData);
    const projId = globalProject?.id || selectedProject?.id; // Use the full selected project id
    if (!projId) {
      console.error("No project selected");
      return;
    }
    try {
      const res = await fetch("/api/task/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          communityId: currentCommunity,
          projId, // now guaranteed to be a proper project id
          address: newTaskData.creator,
          ...newTaskData,
        }),
      })
      const text = await res.text()
      if (!text) {
        console.error("Empty response from API")
        return
      }
      const data = JSON.parse(text)
      console.log("Response data:", data)
      if (data.success) {
        setTasks([...tasks, data.task])
        setIsTaskDialogOpen(false)
      } else {
        console.error("Task creation failed:", data)
      }
    } catch (err) {
      console.error("Error adding task:", err)
    }
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
              onClick={async () => {
                const res = await fetch(`/api/project/get?projectId=${project.id}`);
                const data = await res.json();
                const fullProject = data.project || {};
                console.log("Selected project:", fullProject); // This should show an id field.
                setSelectedProject(fullProject);
                setGlobalProject(fullProject);
                // Safely fetch tasks using the project's tasks relationship key.
                if(fullProject.tasks) {
                  const res2 = await fetch(`/api/task/list?taskKey=${encodeURIComponent(fullProject.tasks)}`);
                  const { tasks } = await res2.json();
                  setTasks(tasks);
                } else {
                  setTasks([]);
                }
              }}
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

