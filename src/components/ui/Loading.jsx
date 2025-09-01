import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const TaskSkeleton = () => (
  <div className="bg-white border border-surface-200 rounded-lg p-4">
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-1">
        <div className="w-5 h-5 bg-surface-200 rounded-md animate-pulse" />
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-surface-200 rounded animate-pulse w-3/4" />
        <div className="h-3 bg-surface-100 rounded animate-pulse w-1/2" />
        
        <div className="flex gap-2 pt-1">
          <div className="h-6 bg-surface-200 rounded-full animate-pulse w-16" />
          <div className="h-6 bg-surface-200 rounded-full animate-pulse w-20" />
          <div className="h-6 bg-surface-200 rounded-full animate-pulse w-18" />
        </div>
      </div>
    </div>
  </div>
)

const QuickAddSkeleton = () => (
  <div className="bg-white border border-surface-200 rounded-xl p-4 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-surface-200 rounded-full" />
      <div className="h-4 bg-surface-200 rounded flex-1" />
      <div className="h-3 bg-surface-100 rounded w-20" />
    </div>
  </div>
)

const Loading = ({ type = "tasks", count = 6 }) => {
  const variants = {
    tasks: () => (
      <div className="p-6 space-y-6">
        <QuickAddSkeleton />
        
        <div className="space-y-4">
          {Array.from({ length: count }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TaskSkeleton />
            </motion.div>
          ))}
        </div>
      </div>
    ),
    
    page: () => (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ApperIcon 
              name="Loader2" 
              size={24} 
              className="text-white animate-spin"
            />
          </div>
          <h3 className="text-lg font-display font-semibold text-surface-900 mb-2">
            Loading...
          </h3>
          <p className="text-surface-600">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    ),
    
    minimal: () => (
      <div className="flex items-center justify-center py-8">
        <ApperIcon 
          name="Loader2" 
          size={24} 
          className="text-primary-500 animate-spin"
        />
      </div>
    )
  }
  
  return variants[type]?.() || variants.minimal()
}

export default Loading