import { formToJSON } from "axios";
import { useState } from "react";
import fetchData from "../api";
import useLocalStorage from "../hooks/useLocalStorage";

const TodoForm = ({ accessToken, onSetTodos }) => {
  const [todo, setTodo] = useState({
    todo: "",
  });

  const handleCreateTodo = async () => {
    const url = `https://www.pre-onboarding-selection-task.shop/todos`;

    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    };

    try {
      const res = await fetch(url, config);
      const jsonData = await res.json();
      onSetTodos(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleAddTodo = (e) => {
    setTodo({ todo: "" });
    e.preventDefault();
    handleCreateTodo(accessToken);
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input
        data-testid="new-todo-input"
        name="todo"
        value={todo.todo}
        onChange={handleChange}
      />
      <button type="submit" data-testid="new-todo-add-button">
        추가
      </button>
    </form>
  );
};

export default TodoForm;
