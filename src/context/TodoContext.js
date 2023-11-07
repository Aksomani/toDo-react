/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useEffect, useState } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id:1,
            todo:"todo task",
            completed: false,
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},

});

export const TodoProvider = ({children}) => {

    const[todos, setTodos] = useState([]);

    const addTodo= (todo) => {
        setTodos((prev) => [...prev, {id: Date.now(), ...todo}] )
    }

    const updateTodo = (id, todo) => {
        setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
    }

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }

    const toggleComplete = (id) => {
        setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo, completed:!prevTodo.completed } : prevTodo)))
    }


    useEffect(() => {
      
     const todos = JSON.parse(localStorage.getItem("todos"))
     if(todos && todos.length > 0 ){
        setTodos(todos)
     }
    }, [])

    useEffect (() => {

        localStorage.setItem("todos", JSON.stringify(todos))
    },[todos])
    

    const values = {todos, addTodo, updateTodo, deleteTodo, toggleComplete}


    return< TodoContext.Provider value={values}>{children}</ TodoContext.Provider>
}

export const useTodo = () => {
    return useContext(TodoContext)
};