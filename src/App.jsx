import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import TaskList from "@/components/pages/TaskList"
import CategoryView from "@/components/pages/CategoryView"
import SearchResults from "@/components/pages/SearchResults"
import CompletedTasks from "@/components/pages/CompletedTasks"

function App() {
  return (
    <div className="min-h-screen bg-white font-body">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/category/:categoryId" element={<CategoryView />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/completed" element={<CompletedTasks />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-container"
        style={{ zIndex: 9999 }}
      />
    </div>
  )
}

export default App