"use client"

import { useEffect, useState } from "react"
import { TasksTable } from "@/components/tasks-table"
import { TaskDetails } from "@/components/task-details"
import { TaskForm } from "@/components/task-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { EmptyState } from "@/components/empty-state"
import axios from "axios"

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    const fetchTasks = async () => {
      const getTasks = await axios.get("/api/community/getAllTasks", {
        params: {
          communityId: "XT7D9BNI",
        },
      })
      setTasks(getTasks.data.tasks)
    }
    fetchTasks()
  }, [])

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask])
    setIsDialogOpen(false)
  }

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setIsDialogOpen(false)
    setSelectedTask(updatedTask)
    setEditingTask(null)
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    setSelectedTask(null)
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTask(null)}>
              <PlusCircle className="mr-2 h-4 w-4" /> New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
            </DialogHeader>
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? handleUpdateTask : handleAddTask}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      {tasks.length === 0 ? (
        <EmptyState onCreateTask={() => setIsDialogOpen(true)} />
      ) : (
        <div className="flex flex-col lg:flex-row gap-4">
          <div className={`w-full ${selectedTask ? "lg:w-2/3" : "lg:w-full"} transition-all duration-300 ease-in-out`}>
            <TasksTable
              tasks={tasks}
              onTaskClick={setSelectedTask}
              onEdit={(task) => {
                setEditingTask(task)
                setIsDialogOpen(true)
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
                  setIsDialogOpen(true)
                }}
                onDelete={() => handleDeleteTask(selectedTask.id)}
                onClose={() => setSelectedTask(null)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}