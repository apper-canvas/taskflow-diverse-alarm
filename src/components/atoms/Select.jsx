import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Select = forwardRef(({ 
  className,
  label,
  error,
  disabled = false,
  required = false,
  children,
  ...props 
}, ref) => {
  const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-medium text-surface-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            "w-full px-3 py-2 border border-surface-300 rounded-lg text-surface-900",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "transition-colors duration-200 appearance-none bg-white",
            "disabled:bg-surface-50 disabled:text-surface-500 disabled:cursor-not-allowed",
            "pr-10",
            error && "border-red-300 focus:ring-red-500",
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        >
          {children}
        </select>
        
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ApperIcon 
            name="ChevronDown" 
            size={18}
            className="text-surface-400"
          />
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <ApperIcon name="AlertCircle" size={14} className="mr-1 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
})

Select.displayName = "Select"

export default Select