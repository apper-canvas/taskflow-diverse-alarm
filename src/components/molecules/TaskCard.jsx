import React, { forwardRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { formatDueDate, getDueDateStatus, isOverdue } from "@/utils/dateUtils";
import { cn } from "@/utils/cn";
import { getPriorityColor, getPriorityIcon, getPriorityLabel } from "@/utils/taskUtils";
import ApperIcon from "@/components/ApperIcon";
import TaskEditModal from "@/components/molecules/TaskEditModal";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const TaskCard = forwardRef(({ 
  task, 
  onToggleComplete, 
  onDelete, 
  onEdit,
  category,
  isDragging = false,
  dragHandleProps = {}
}, ref) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  
  const dueDateStatus = getDueDateStatus(task.dueDate)
  const isOverdue = dueDateStatus === "overdue"
  
  const handleToggleComplete = async () => {
    setIsCompleting(true)
    
    // Add a small delay for animation
    setTimeout(() => {
      onToggleComplete(task.Id)
      setIsCompleting(false)
      
      if (!task.completed) {
        toast.success("Task completed! 🎉", {
          className: "toast-success"
        })
      }
    }, 200)
  }
  
  const handleDelete = () => {
    onDelete(task.Id)
    setShowDeleteConfirm(false)
    toast.success("Task deleted")
  }
  
  const handleEdit = (updatedTask) => {
    onEdit(updatedTask)
    setShowEditModal(false)
    toast.success("Task updated")
  }
  
  return (
    <>
<motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "bg-white border border-surface-200 rounded-lg p-4 hover:shadow-md transition-all duration-200",
          "group relative",
          task.completed && "opacity-75",
          isCompleting && "task-complete-animation",
          isDragging && "dragging",
          isOverdue && !task.completed && "border-l-4 border-l-red-400"
        )}
      >
        {/* Category color indicator */}
        {category && !isOverdue && (
          <div 
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
            style={{ backgroundColor: category.color }}
          />
        )}
        
        <div className="flex items-start gap-3">
          {/* Drag handle */}
          <div 
            {...dragHandleProps}
            className="flex-shrink-0 mt-1 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ApperIcon name="GripVertical" size={16} className="text-surface-400" />
          </div>
          
          {/* Checkbox */}
          <div className="flex-shrink-0 mt-1">
            <button
              onClick={handleToggleComplete}
              disabled={isCompleting}
              className={cn(
                "w-5 h-5 border-2 rounded-md transition-all duration-200",
                "flex items-center justify-center",
                task.completed
                  ? "bg-gradient-to-r from-accent-500 to-accent-600 border-accent-500"
                  : "bg-white border-surface-300 hover:border-surface-400"
              )}
            >
              {task.completed && (
                <ApperIcon name="Check" size={14} className="text-white" />
              )}
            </button>
          </div>
          
          {/* Task content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  "font-medium text-surface-900 break-words",
                  task.completed && "line-through text-surface-500"
                )}>
                  {task.title}
                </h3>
                
                {task.description && (
                  <p className={cn(
                    "text-sm text-surface-600 mt-1 break-words",
                    task.completed && "line-through text-surface-400"
                  )}>
                    {task.description}
                  </p>
                )}
                
                {/* Tags */}
                <div className="flex items-center gap-2 mt-3">
                  {/* Priority badge */}
                  <Badge
                    variant={task.priority}
                    size="sm"
                    icon={getPriorityIcon(task.priority)}
                    pulse={task.priority === "urgent" && !task.completed && isOverdue}
                  >
                    {getPriorityLabel(task.priority)}
                  </Badge>
                  
                  {/* Due date */}
                  {task.dueDate && (
                    <Badge
                      size="sm"
                      icon="Calendar"
                      variant={isOverdue ? "danger" : dueDateStatus === "today" ? "warning" : "default"}
                    >
                      {formatDueDate(task.dueDate)}
                    </Badge>
                  )}
                  
                  {/* Category */}
                  {category && (
                    <Badge size="sm" icon={category.icon} variant="default">
                      {category.name}
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="Edit2"
                    onClick={() => setShowEditModal(true)}
                    className="h-8 w-8 p-0"
                  />
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="Trash2"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Delete confirmation */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-surface-200 mt-3 pt-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-surface-600">
                  Are you sure you want to delete this task?
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Edit modal */}
      {showEditModal && (
        <TaskEditModal
          task={task}
          onSave={handleEdit}
          onCancel={() => setShowEditModal(false)}
        />
      )}
    </>
)
})

TaskCard.displayName = "TaskCard"

export default TaskCard