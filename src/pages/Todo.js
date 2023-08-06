import { useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const Todo = () => {
  const navigate = useNavigate();
  const [storedValue] = useLocalStorage("access_token");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    storedValue === undefined && navigate("/signin");

    const handleGetTodos = async () => {
      const url = `https://www.pre-onboarding-selection-task.shop/todos`;

      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedValue}`,
        },
      };

      try {
        const res = await fetch(url, config);
        const jsonData = await res.json();
        console.log(jsonData);
        setTodos(jsonData);
      } catch (err) {
        console.error(err);
      }
    };

    handleGetTodos();
  }, []);

  // useCallback 다시 한번 알아보고 사용하기
  const handleSetTodos = useCallback((todo) => {
    setTodos([...todos, todo]);
  });

  const handleFilterTodos = useCallback((id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  });

  return (
    <div>
      <TodoForm accessToken={storedValue} onSetTodos={handleSetTodos} />
      <TodoList todos={todos} onFilterTodos={handleFilterTodos} />
    </div>
  );
};

export default Todo;
