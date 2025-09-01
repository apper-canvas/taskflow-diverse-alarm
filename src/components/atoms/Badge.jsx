import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Badge = forwardRef(({ 
  className,
  variant = "default",
  size = "md",
  icon,
  pulse = false,
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full border"
  
  const variants = {
    default: "bg-surface-100 text-surface-700 border-surface-200",
    primary: "bg-primary-100 text-primary-800 border-primary-200",
    secondary: "bg-secondary-100 text-secondary-800 border-secondary-200",
    accent: "bg-accent-100 text-accent-800 border-accent-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    danger: "bg-red-100 text-red-800 border-red-200",
    urgent: "bg-red-100 text-red-800 border-red-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-surface-100 text-surface-600 border-surface-200"
  }
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-sm"
  }
  
  const iconSize = size === "sm" ? 12 : size === "lg" ? 16 : 14
  
  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        pulse && "animate-pulse-gentle",
        className
      )}
      ref={ref}
      {...props}
    >
      {icon && (
        <ApperIcon 
          name={icon} 
          size={iconSize}
          className={cn("flex-shrink-0", children && "mr-1")}
        />
      )}
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge