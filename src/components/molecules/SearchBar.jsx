import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"
import { cn } from "@/utils/cn"

const SearchBar = ({ className }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    } else {
      navigate("/")
    }
  }
  
  const handleClear = () => {
    setQuery("")
    navigate("/")
  }
  
  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div className="relative">
        <ApperIcon 
          name="Search" 
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400"
        />
        
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks..."
          className="pl-10 pr-10 bg-surface-50 border-surface-200 focus:bg-white"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-400 hover:text-surface-600"
          >
            <ApperIcon name="X" size={16} />
          </button>
        )}
      </div>
    </form>
  )
}

export default SearchBar