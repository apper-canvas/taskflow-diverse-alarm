import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import { cn } from "@/utils/cn"

const TaskFilters = ({ 
  filters, 
  onFiltersChange, 
  taskStats,
  onClearCompleted
}) => {
  const priorityOptions = [
    { value: "all", label: "All Priority", icon: "List" },
    { value: "urgent", label: "Urgent", icon: "AlertTriangle", count: taskStats?.byPriority?.urgent || 0 },
    { value: "high", label: "High", icon: "ArrowUp", count: taskStats?.byPriority?.high || 0 },
    { value: "medium", label: "Medium", icon: "Minus", count: taskStats?.byPriority?.medium || 0 },
    { value: "low", label: "Low", icon: "ArrowDown", count: taskStats?.byPriority?.low || 0 }
  ]
  
  const statusOptions = [
    { value: "all", label: "All Tasks", icon: "List" },
    { value: "pending", label: "Pending", icon: "Clock" },
    { value: "completed", label: "Completed", icon: "CheckCircle2" },
    { value: "overdue", label: "Overdue", icon: "AlertCircle" }
  ]
  
  const sortOptions = [
    { value: "priority", label: "Priority", icon: "ArrowUpDown" },
    { value: "dueDate", label: "Due Date", icon: "Calendar" },
    { value: "created", label: "Created", icon: "Clock" },
    { value: "alphabetical", label: "A-Z", icon: "ArrowUpAZ" }
  ]
  
  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    })
  }
  
  return (
    <div className="bg-white border border-surface-200 rounded-lg p-4 space-y-4">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-4">
        {/* Priority filter */}
        <div>
          <h4 className="text-sm font-medium text-surface-700 mb-2">Priority</h4>
          <div className="flex flex-wrap gap-2">
            {priorityOptions.map((option) => (
              <Button
                key={option.value}
                variant={filters.priority === option.value ? "primary" : "secondary"}
                size="sm"
                icon={option.icon}
                onClick={() => handleFilterChange("priority", option.value)}
                className="h-8"
              >
                {option.label}
                {option.count > 0 && option.value !== "all" && (
                  <Badge size="sm" variant="default" className="ml-2">
                    {option.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Status filter */}
        <div>
          <h4 className="text-sm font-medium text-surface-700 mb-2">Status</h4>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <Button
                key={option.value}
                variant={filters.status === option.value ? "primary" : "secondary"}
                size="sm"
                icon={option.icon}
                onClick={() => handleFilterChange("status", option.value)}
                className="h-8"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Sort options */}
        <div>
          <h4 className="text-sm font-medium text-surface-700 mb-2">Sort by</h4>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant={filters.sortBy === option.value ? "primary" : "secondary"}
                size="sm"
                icon={option.icon}
                onClick={() => handleFilterChange("sortBy", option.value)}
                className="h-8"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-surface-200">
        <div className="flex items-center gap-4 text-sm text-surface-600">
          <span>
            Showing {taskStats?.filtered || 0} of {taskStats?.total || 0} tasks
          </span>
          {taskStats?.completed > 0 && (
            <span>
              {taskStats.completed} completed
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          {taskStats?.completed > 0 && (
            <Button
              variant="ghost"
              size="sm"
              icon="Trash2"
              onClick={onClearCompleted}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              Clear Completed
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            icon="RotateCcw"
            onClick={() => onFiltersChange({
              priority: "all",
              status: "all",
              sortBy: "priority"
            })}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskFilters