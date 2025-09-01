import { format, isToday, isTomorrow, isPast, parseISO, addDays } from "date-fns"

export const formatDueDate = (dateString) => {
  if (!dateString) return ""
  
  try {
    const date = parseISO(dateString)
    
    if (isToday(date)) {
      return "Today"
    } else if (isTomorrow(date)) {
      return "Tomorrow"
    } else {
      return format(date, "MMM d")
    }
  } catch (error) {
    console.error("Error formatting date:", error)
    return ""
  }
}

export const isOverdue = (dateString) => {
  if (!dateString) return false
  
  try {
    const date = parseISO(dateString)
    return isPast(date) && !isToday(date)
  } catch (error) {
    console.error("Error checking if overdue:", error)
    return false
  }
}

export const getDueDateStatus = (dateString) => {
  if (!dateString) return "none"
  
  try {
    const date = parseISO(dateString)
    
    if (isOverdue(dateString)) return "overdue"
    if (isToday(date)) return "today"
    if (isTomorrow(date)) return "tomorrow"
    return "upcoming"
  } catch (error) {
    console.error("Error getting due date status:", error)
    return "none"
  }
}

export const formatDateForInput = (dateString) => {
  if (!dateString) return ""
  
  try {
    const date = parseISO(dateString)
    return format(date, "yyyy-MM-dd")
  } catch (error) {
    console.error("Error formatting date for input:", error)
    return ""
  }
}

export const getTodayDateString = () => {
  return format(new Date(), "yyyy-MM-dd")
}

export const getTomorrowDateString = () => {
  return format(addDays(new Date(), 1), "yyyy-MM-dd")
}