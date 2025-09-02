import { toast } from "react-toastify";
import React from "react";
import taskData from "@/services/mockData/tasks.json";
import Error from "@/components/ui/Error";

let tasks = [...taskData]

// Helper function for consistent delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getTasks = async () => {
  try {
    await delay(300)
    return [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } catch (error) {
    console.error("Error fetching tasks:", error)
    throw new Error("Failed to fetch tasks")
  }
}

export const getTaskById = async (id) => {
  try {
    await delay(200)
    const task = tasks.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error("Task not found")
    }
    return { ...task }
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error)
    throw error
  }
}

export const createTask = async (taskData) => {
  try {
    await delay(400)
    
    const newTask = {
      ...taskData,
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    
    tasks.push(newTask)
    toast.success("Task created successfully!")
    return { ...newTask }
  } catch (error) {
    console.error("Error creating task:", error)
    toast.error("Failed to create task")
    throw new Error("Failed to create task")
  }
}

export const updateTask = async (id, updates) => {
  try {
    await delay(300)
    
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id))
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }
    
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates }
    toast.success("Task updated successfully!")
    return { ...tasks[taskIndex] }
  } catch (error) {
    console.error(`Error updating task ${id}:`, error)
    toast.error("Failed to update task")
    throw error
  }
}

export const deleteTask = async (id) => {
  try {
    await delay(250)
    
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id))
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }
    
    tasks.splice(taskIndex, 1)
    toast.success("Task deleted successfully!")
    return true
  } catch (error) {
console.error(`Error deleting task ${id}:`, error)
    toast.error("Failed to delete task")
    throw error
  }
}