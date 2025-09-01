import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import TaskCard from "@/components/molecules/TaskCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { useTasks } from "@/hooks/useTasks"
import { useCategories } from "@/hooks/useCategories"
import { filterTasksByQuery, sortTasksByPriority } from "@/utils/taskUtils"

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get("q") || ""
  
  const { tasks, loading, error, updateTask, deleteTask, refetch } = useTasks()
  const { categories } = useCategories()
  
  const searchResults = filterTasksByQuery(tasks, query)
  const sortedResults = sortTasksByPriority(searchResults)
  
  const handleClearSearch = () => {
    navigate("/")
  }
  
  if (loading) return <Loading type="tasks" />
  if (error) return <Error onRetry={refetch} />
  
  if (!query) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <ApperIcon name="Search" size={48} className="text-surface-400 mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold text-surface-900 mb-2">
            Enter a search term
          </h2>
          <p className="text-surface-600">
            Use the search bar above to find your tasks
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="p-6 space-y-6">
        {/* Search Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-surface-900 mb-2">
              Search Results
            </h1>
            <p className="text-surface-600">
              {sortedResults.length === 0
                ? `No results found for "${query}"`
                : `Found ${sortedResults.length} result${sortedResults.length === 1 ? "" : "s"} for "${query}"`
              }
            </p>
          </div>
          
          <Button
            variant="secondary"
            icon="X"
            onClick={handleClearSearch}
          >
            Clear Search
          </Button>
        </div>
        
        {/* Search Query Display */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <ApperIcon name="Search" size={20} className="text-primary-600" />
            <div>
              <div className="font-medium text-primary-900">
                Searching for: "{query}"
              </div>
              <div className="text-sm text-primary-700">
                Results are searched across task titles and descriptions
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        {sortedResults.length === 0 ? (
          <Empty
            illustration="search"
            onAction={handleClearSearch}
          />
        ) : (
          <div className="space-y-4">
            {/* Results count */}
            <div className="flex items-center justify-between text-sm text-surface-600">
              <span>
                {sortedResults.length} result{sortedResults.length === 1 ? "" : "s"}
              </span>
              <div className="flex items-center gap-4">
                <span>
                  {sortedResults.filter(t => t.completed).length} completed
                </span>
                <span>
                  {sortedResults.filter(t => !t.completed).length} pending
                </span>
              </div>
            </div>
            
            {/* Task Results */}
            <AnimatePresence mode="popLayout">
              {sortedResults.map((task) => {
                const category = categories.find(c => c.Id === task.categoryId)
                
                return (
                  <motion.div
                    key={task.Id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <TaskCard
                      task={task}
                      category={category}
                      onToggleComplete={updateTask}
                      onEdit={updateTask}
                      onDelete={deleteTask}
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
        
        {/* Search Tips */}
        {sortedResults.length === 0 && query && (
          <div className="bg-surface-50 rounded-lg p-6">
            <h3 className="font-display font-semibold text-surface-900 mb-3">
              Search Tips
            </h3>
            <div className="space-y-2 text-sm text-surface-600">
              <div className="flex items-center gap-2">
                <ApperIcon name="Lightbulb" size={16} className="text-yellow-500" />
                <span>Try using different keywords or shorter search terms</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Target" size={16} className="text-blue-500" />
                <span>Search looks through both task titles and descriptions</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Filter" size={16} className="text-green-500" />
                <span>Use the category sidebar to browse tasks by category</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults