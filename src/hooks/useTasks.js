import { useState, useEffect } from "react"
import * as taskService from "@/services/api/taskService"
import { toast } from "react-toastify"

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await taskService.getTasks()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData)
      setTasks(prev => [...prev, newTask])
      return newTask
    } catch (err) {
      throw new Error("Failed to create task")
    }
  }
  
  const updateTask = async (taskId, updates) => {
    try {
// Handle toggle completion
      if (typeof updates === "boolean") {
        const task = tasks.find(t => t.Id === taskId)
        if (task) {
          const updatedTask = await taskService.updateTask(taskId, {
            ...task,
            completed: updates,
            completedAt: updates ? new Date().toISOString() : null
          })
          setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t))
          if (updates) {
            toast.success("Task completed! 🎉")
          } else {
            toast.success("Task restored!")
          }
        }
      } else {
        const updatedTask = await taskService.updateTask(taskId, updates)
setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t))
      }
    } catch (err) {
      throw new Error("Failed to update task")
    }
  }
  
  const deleteTask = async (taskId) => {
    try {
await taskService.deleteTask(taskId)
      setTasks(prev => prev.filter(t => t.Id !== taskId))
    } catch (err) {
      throw new Error("Failed to delete task")
    }
  }
  
  useEffect(() => {
    loadTasks()
  }, [])
  
  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: loadTasks
  }
}