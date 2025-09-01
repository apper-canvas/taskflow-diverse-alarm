import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  title,
  message,
  icon = "Package",
  actionLabel,
  onAction,
  illustration
}) => {
  const variants = {
    tasks: {
      title: "No tasks yet",
      message: "Get started by creating your first task. Stay organized and boost your productivity!",
      icon: "CheckSquare",
      actionLabel: "Create Your First Task",
      illustration: "tasks"
    },
    search: {
      title: "No results found",
      message: "We couldn't find any tasks matching your search. Try adjusting your search terms or create a new task.",
      icon: "Search",
      actionLabel: "Clear Search",
      illustration: "search"
    },
    category: {
      title: "No tasks in this category",
      message: "This category is empty. Add your first task to get started with better organization.",
      icon: "FolderOpen",
      actionLabel: "Add Task",
      illustration: "category"
    },
    completed: {
      title: "No completed tasks",
      message: "Complete some tasks to see them here. Keep up the great work!",
      icon: "CheckCircle2",
      actionLabel: "View All Tasks",
      illustration: "completed"
    }
  }
  
  const config = variants[illustration] || {
    title: title || "Nothing here yet",
    message: message || "Start by adding some content.",
    icon: icon,
    actionLabel: actionLabel || "Get Started",
    illustration: "default"
  }
  
  const illustrations = {
    tasks: (
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mb-4 mx-auto">
          <ApperIcon name="CheckSquare" size={40} className="text-primary-600" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full flex items-center justify-center">
          <ApperIcon name="Plus" size={16} className="text-white" />
        </div>
      </div>
    ),
    
    search: (
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-surface-100 to-surface-200 rounded-2xl flex items-center justify-center mb-4 mx-auto">
          <ApperIcon name="Search" size={40} className="text-surface-500" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" size={12} className="text-white" />
        </div>
      </div>
    ),
    
    category: (
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-4 mx-auto">
          <ApperIcon name="FolderOpen" size={40} className="text-blue-600" />
        </div>
        <div className="absolute -top-1 -left-1 w-6 h-6 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full flex items-center justify-center">
          <ApperIcon name="Plus" size={12} className="text-white" />
        </div>
      </div>
    ),
    
    completed: (
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mb-4 mx-auto">
          <ApperIcon name="CheckCircle2" size={40} className="text-accent-600" />
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center"
        >
          <ApperIcon name="Star" size={16} className="text-white" />
        </motion.div>
      </div>
    ),
    
    default: (
      <div className="w-24 h-24 bg-gradient-to-br from-surface-100 to-surface-200 rounded-2xl flex items-center justify-center mb-4 mx-auto">
        <ApperIcon name={config.icon} size={40} className="text-surface-500" />
      </div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex items-center justify-center p-6"
    >
      <div className="text-center max-w-md">
        {illustrations[config.illustration]}
        
        <h3 className="text-2xl font-display font-bold text-surface-900 mb-3">
          {config.title}
        </h3>
        
        <p className="text-surface-600 mb-8 leading-relaxed">
          {config.message}
        </p>
        
        {config.actionLabel && onAction && (
          <Button
            variant="primary"
            size="lg"
            icon="Plus"
            onClick={onAction}
            className="min-w-[200px]"
          >
            {config.actionLabel}
          </Button>
        )}
        
        {/* Decorative elements */}
        <div className="mt-12 flex justify-center space-x-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.3 
              }}
              className="w-2 h-2 bg-primary-300 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Empty