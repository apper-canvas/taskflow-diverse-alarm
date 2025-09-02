import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import SearchBar from "@/components/molecules/SearchBar"
import CategorySidebar from "@/components/molecules/CategorySidebar"
import { useCategories } from "@/hooks/useCategories"
import { useTasks } from "@/hooks/useTasks"
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { AuthContext } from '../../App'
import { cn } from "@/utils/cn"

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
const { categories } = useCategories()
  const { tasks } = useTasks()
  const { logout } = useContext(AuthContext)
  const { user } = useSelector((state) => state.user)
  
  // Calculate task counts
  const taskCounts = categories.reduce((acc, category) => {
    acc[category.Id] = tasks.filter(task => 
      task.categoryId === category.Id && !task.completed
    ).length
    return acc
  }, {})
  
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])
  
  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
<CategorySidebar 
          categories={categories}
          taskCounts={taskCounts}
          totalTasks={totalTasks}
          completedTasks={completedTasks}
        />
        
        {/* User Profile & Logout */}
        <div className="border-t border-surface-200 pt-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.firstName?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-surface-900">
                  {user?.firstName || 'User'}
                </span>
                <span className="text-xs text-surface-500">
                  {user?.emailAddress || 'user@example.com'}
                </span>
              </div>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            icon="LogOut"
            onClick={logout}
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-64"
            >
<CategorySidebar 
                categories={categories}
                taskCounts={taskCounts}
                totalTasks={totalTasks}
                completedTasks={completedTasks}
              />
              
              {/* Mobile User Profile & Logout */}
              <div className="border-t border-surface-200 pt-4 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user?.firstName?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-surface-900">
                        {user?.firstName || 'User'}
                      </span>
                      <span className="text-xs text-surface-500">
                        {user?.emailAddress || 'user@example.com'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  icon="LogOut"
                  onClick={logout}
                  className="w-full"
                >
                  Logout
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-surface-200 px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                icon="Menu"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden h-8 w-8 p-0"
              />
              
              {/* Mobile logo */}
              <div className="flex items-center gap-3 lg:hidden">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
                  <ApperIcon name="CheckSquare" size={18} className="text-white" />
                </div>
                <h1 className="text-xl font-display font-bold text-surface-900">
                  TaskFlow
                </h1>
              </div>
            </div>
            
            {/* Search bar */}
            <div className="flex-1 max-w-md mx-4">
              <SearchBar />
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                icon="Bell"
                className="h-8 w-8 p-0 relative"
              >
                {/* Notification dot */}
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                icon="Settings"
                className="h-8 w-8 p-0"
              />
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout