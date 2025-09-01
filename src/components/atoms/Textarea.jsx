import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Textarea = forwardRef(({ 
  className,
  label,
  error,
  placeholder,
  disabled = false,
  required = false,
  rows = 3,
  ...props 
}, ref) => {
  const inputId = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-surface-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        id={inputId}
        rows={rows}
        className={cn(
          "w-full px-3 py-2 border border-surface-300 rounded-lg text-surface-900 placeholder-surface-400",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          "transition-colors duration-200 resize-vertical",
          "disabled:bg-surface-50 disabled:text-surface-500 disabled:cursor-not-allowed",
          error && "border-red-300 focus:ring-red-500",
          className
        )}
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <ApperIcon name="AlertCircle" size={14} className="mr-1 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
})

Textarea.displayName = "Textarea"

export default Textarea