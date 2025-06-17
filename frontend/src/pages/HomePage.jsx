import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TodoCard from "../components/TodoCard";
import api from "../lib/axios";
import TodosNotFound from "../components/TodosNotFound";

const HomePage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get("/todos");
        setTodos(res.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {todos.length === 0 ? (
          <TodosNotFound />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todos.map((todo) => (
              <TodoCard key={todo._id} todo={todo} setTodos={setTodos} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
