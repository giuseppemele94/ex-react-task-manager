import { createContext, useState, useEffect } from "react";
import useTasks from "../customHook/useTasks";


export const GlobalContext = createContext();



function GlobalProvider({ children }) {

    const { tasks, addTask, removeTask, updateTask } = useTasks();

    return (
        <GlobalContext.Provider value={{ tasks, addTask, removeTask,updateTask }}>
            {children}
        </GlobalContext.Provider>)
}

export default GlobalProvider