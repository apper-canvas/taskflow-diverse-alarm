export const getPriorityColor = (priority) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800 border-red-200"
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "low":
      return "bg-surface-100 text-surface-600 border-surface-200"
    default:
      return "bg-surface-100 text-surface-600 border-surface-200"
  }
}

export const getPriorityIcon = (priority) => {
  switch (priority) {
    case "urgent":
      return "AlertTriangle"
    case "high":
      return "ArrowUp"
    case "medium":
      return "Minus"
    case "low":
      return "ArrowDown"
    default:
      return "Minus"
  }
}

export const getPriorityLabel = (priority) => {
  switch (priority) {
    case "urgent":
      return "Urgent"
    case "high":
      return "High"
    case "medium":
      return "Medium"
    case "low":
      return "Low"
    default:
      return "Medium"
  }
}

export const sortTasksByPriority = (tasks) => {
  const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
  
  return [...tasks].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed - b.completed
    }
    
    // Then by priority
    const aPriority = priorityOrder[a.priority] ?? 2
    const bPriority = priorityOrder[b.priority] ?? 2
    
    if (aPriority !== bPriority) {
      return aPriority - bPriority
    }
    
    // Finally by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
}

export const filterTasksByQuery = (tasks, query) => {
  if (!query.trim()) return tasks
  
  const searchTerm = query.toLowerCase().trim()
  
  return tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm) ||
    task.description.toLowerCase().includes(searchTerm)
  )
}

export const getTaskStats = (tasks) => {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const pending = total - completed
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
  
  return {
    total,
    completed,
    pending,
    completionRate
  }
}

export const generateTaskId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}