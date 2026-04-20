import DefaultLayout from "./layouts/DefaultLayout";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<TaskList />} />
          <Route path="AddTask" element={<AddTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App; 
