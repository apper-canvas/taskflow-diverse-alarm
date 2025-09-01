import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Error = ({ 
  title = "Something went wrong",
  message = "We encountered an error while loading your data. Please try again.",
  onRetry,
  showRetry = true,
  icon = "AlertTriangle"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex items-center justify-center p-6"
    >
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon 
            name={icon} 
            size={32} 
            className="text-red-600"
          />
        </div>
        
        <h3 className="text-xl font-display font-bold text-surface-900 mb-3">
          {title}
        </h3>
        
        <p className="text-surface-600 mb-6 leading-relaxed">
          {message}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && onRetry && (
            <Button
              variant="primary"
              icon="RefreshCw"
              onClick={onRetry}
            >
              Try Again
            </Button>
          )}
          
          <Button
            variant="secondary"
            icon="Home"
            onClick={() => window.location.href = "/"}
          >
            Go Home
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-surface-50 rounded-lg text-left">
          <h4 className="text-sm font-medium text-surface-700 mb-2">
            Need help?
          </h4>
          <div className="text-sm text-surface-600 space-y-1">
            <div className="flex items-center gap-2">
              <ApperIcon name="Wifi" size={14} />
              <span>Check your internet connection</span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="RefreshCw" size={14} />
              <span>Try refreshing the page</span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="MessageCircle" size={14} />
              <span>Contact support if the problem persists</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Error