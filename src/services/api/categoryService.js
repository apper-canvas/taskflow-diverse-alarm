import categoryData from "@/services/mockData/categories.json"

const categories = [...categoryData]

export const getCategories = async () => {
  await new Promise(resolve => setTimeout(resolve, 200))
  return [...categories].sort((a, b) => a.order - b.order)
}

export const getCategoryById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 150))
  const category = categories.find(c => c.Id === parseInt(id))
  if (!category) {
    throw new Error("Category not found")
  }
  return { ...category }
}