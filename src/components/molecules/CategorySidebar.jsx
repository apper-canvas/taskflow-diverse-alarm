import { motion } from "framer-motion"
import { NavLink, useParams } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Badge from "@/components/atoms/Badge"
import { cn } from "@/utils/cn"

const CategorySidebar = ({ categories, taskCounts, totalTasks, completedTasks }) => {
  const { categoryId } = useParams()
  
  const navItems = [
    {
      to: "/",
      label: "All Tasks",
      icon: "List",
      count: totalTasks,
      isActive: !categoryId
    },
    {
      to: "/completed",
      label: "Completed",
      icon: "CheckCircle2",
      count: completedTasks,
      isActive: false
    }
  ]
  
  return (
    <div className="w-64 bg-surface-50 border-r border-surface-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-surface-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
            <ApperIcon name="CheckSquare" size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-surface-900">
              TaskFlow
            </h1>
            <p className="text-sm text-surface-500">
              Stay organized
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 p-4 space-y-6">
        {/* Overview */}
        <div>
          <h3 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">
            Overview
          </h3>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive || item.isActive
                      ? "bg-primary-100 text-primary-700 border border-primary-200"
                      : "text-surface-600 hover:text-surface-900 hover:bg-surface-100"
                  )
                }
              >
                <ApperIcon name={item.icon} size={18} />
                <span className="flex-1">{item.label}</span>
                {item.count > 0 && (
                  <Badge size="sm" variant="default">
                    {item.count}
                  </Badge>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        
        {/* Categories */}
        <div>
          <h3 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">
            Categories
          </h3>
          <nav className="space-y-1">
            {categories.map((category) => {
              const count = taskCounts[category.Id] || 0
              const isActive = categoryId === category.Id.toString()
              
              return (
                <NavLink
                  key={category.Id}
                  to={`/category/${category.Id}`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
                    isActive
                      ? "bg-primary-100 text-primary-700 border border-primary-200"
                      : "text-surface-600 hover:text-surface-900 hover:bg-surface-100"
                  )}
                >
                  {/* Color indicator */}
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: category.color }}
                  />
                  <ApperIcon name={category.icon} size={16} />
                  <span className="flex-1">{category.name}</span>
                  {count > 0 && (
                    <Badge size="sm" variant="default">
                      {count}
                    </Badge>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </div>
      
      {/* Stats */}
      <div className="p-4 border-t border-surface-200">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 flex items-center justify-center">
              <ApperIcon name="TrendingUp" size={18} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-surface-900">
                {completedTasks} of {totalTasks}
              </div>
              <div className="text-xs text-surface-500">
                tasks completed
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          {totalTasks > 0 && (
            <div className="mt-3">
              <div className="w-full bg-surface-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-gradient-to-r from-accent-500 to-accent-600 h-2 rounded-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategorySidebar