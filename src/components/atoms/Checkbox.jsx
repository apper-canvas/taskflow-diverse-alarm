import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ 
  className,
  label,
  description,
  error,
  disabled = false,
  checked = false,
  onChange,
  size = "md",
  ...props 
}, ref) => {
  const checkboxId = props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
  
  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  }
  
  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18
  }
  
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <div className="relative">
          <input
            id={checkboxId}
            type="checkbox"
            className="sr-only"
            ref={ref}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            {...props}
          />
          
          <div
            className={cn(
              sizes[size],
              "border-2 rounded-md transition-all duration-200 cursor-pointer",
              "flex items-center justify-center",
              checked 
                ? "bg-gradient-to-r from-primary-500 to-primary-600 border-primary-500" 
                : "bg-white border-surface-300 hover:border-surface-400",
              disabled && "opacity-50 cursor-not-allowed",
              error && "border-red-300",
              className
            )}
            onClick={() => !disabled && onChange?.({ target: { checked: !checked } })}
          >
            {checked && (
              <ApperIcon 
                name="Check" 
                size={iconSizes[size]}
                className="text-white animate-scale-up"
              />
            )}
          </div>
        </div>
      </div>
      
      {(label || description) && (
        <div className="ml-3 text-sm">
          {label && (
            <label 
              htmlFor={checkboxId}
              className={cn(
                "font-medium cursor-pointer",
                disabled ? "text-surface-400" : "text-surface-700"
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-surface-500">{description}</p>
          )}
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <ApperIcon name="AlertCircle" size={14} className="mr-1 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox