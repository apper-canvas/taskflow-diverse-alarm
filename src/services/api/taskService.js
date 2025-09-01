import taskData from "@/services/mockData/tasks.json"

let tasks = [...taskData]

export const getTasks = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export const getTaskById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  const task = tasks.find(t => t.Id === parseInt(id))
  if (!task) {
    throw new Error("Task not found")
  }
  return { ...task }
}

export const createTask = async (taskData) => {
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const newTask = {
    ...taskData,
    Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
    createdAt: new Date().toISOString(),
    completedAt: null
  }
  
  tasks.push(newTask)
  return { ...newTask }
}

export const updateTask = async (id, updates) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const taskIndex = tasks.findIndex(t => t.Id === parseInt(id))
  if (taskIndex === -1) {
    throw new Error("Task not found")
  }
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...updates }
  return { ...tasks[taskIndex] }
}

export const deleteTask = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 250))
  
  const taskIndex = tasks.findIndex(t => t.Id === parseInt(id))
  if (taskIndex === -1) {
    throw new Error("Task not found")
  }
  
  tasks.splice(taskIndex, 1)
  return true
}