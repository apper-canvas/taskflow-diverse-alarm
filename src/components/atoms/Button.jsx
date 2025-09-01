import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  icon, 
  iconPosition = "left",
  disabled = false,
  loading = false,
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-sm hover:shadow-md focus:ring-primary-500",
    secondary: "bg-surface-50 hover:bg-surface-100 text-surface-700 border border-surface-200 hover:border-surface-300 focus:ring-surface-500",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-sm hover:shadow-md focus:ring-accent-500",
    ghost: "bg-transparent hover:bg-surface-50 text-surface-600 hover:text-surface-700 focus:ring-surface-500",
    danger: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-sm hover:shadow-md focus:ring-red-500"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
    xl: "px-8 py-4 text-lg rounded-xl"
  }
  
  const IconComponent = icon ? (
    <ApperIcon 
      name={icon} 
      size={size === "sm" ? 16 : size === "lg" || size === "xl" ? 20 : 18}
      className={cn(
        "flex-shrink-0",
        children && iconPosition === "left" && "mr-2",
        children && iconPosition === "right" && "ml-2"
      )}
    />
  ) : null
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        loading && "cursor-wait",
        className
      )}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          size={size === "sm" ? 16 : 18}
          className={cn("animate-spin", children && "mr-2")}
        />
      )}
      {!loading && iconPosition === "left" && IconComponent}
      {children}
      {!loading && iconPosition === "right" && IconComponent}
    </button>
  )
})

Button.displayName = "Button"

export default Button