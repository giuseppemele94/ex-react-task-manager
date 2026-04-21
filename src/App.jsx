import DefaultLayout from "./layouts/DefaultLayout";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalProvider from "./contexts/GlobalContext";

function App() {

  return (

    <GlobalProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<TaskList />} />
          <Route path="/addTask" element={<AddTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </GlobalProvider>
  )
}

export default App; 
