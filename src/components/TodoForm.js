import { useState } from "react";
import fetchData from "../api";

const TodoForm = ({ accessToken, onSetTodos }) => {
  const [todo, setTodo] = useState({
    todo: "",
  });

  const handleCreateTodo = async () => {
    const api = "/todos";

    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    };

    const res = await fetchData(api, config);
    const jsonData = await res.json();

    onSetTodos(jsonData);
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
    if (todo.todo !== "") handleCreateTodo(accessToken);
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
