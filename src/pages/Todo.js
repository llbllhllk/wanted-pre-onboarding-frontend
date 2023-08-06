import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import fetchData from "../api";

const Todo = () => {
  const navigate = useNavigate();
  const [storedValue] = useLocalStorage("access_token");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    storedValue === undefined && navigate("/signin");

    const handleGetTodos = async () => {
      const api = "/todos";

      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedValue}`,
        },
      };

      const res = await fetchData(api, config);
      const jsonData = await res.json();
      setTodos(jsonData);
    };

    handleGetTodos();
  }, []);

  const handleSetTodos = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleFilterTodos = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <TodoForm accessToken={storedValue} onSetTodos={handleSetTodos} />
      <TodoList todos={todos} onFilterTodos={handleFilterTodos} />
    </div>
  );
};

export default Todo;
