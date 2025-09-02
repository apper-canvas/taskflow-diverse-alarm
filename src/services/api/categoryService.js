import categoryData from "@/services/mockData/categories.json"
import { toast } from "react-toastify"

const categories = [...categoryData]

// Helper function for consistent delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getCategories = async () => {
  try {
    await delay(200)
    return [...categories].sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw new Error("Failed to fetch categories")
  }
}

export const getCategoryById = async (id) => {
  try {
    await delay(150)
    const category = categories.find(c => c.Id === parseInt(id))
    if (!category) {
      throw new Error("Category not found")
    }
    return { ...category }
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error)
    throw error
  }
}