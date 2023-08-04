import { formToJSON } from "axios";
import { useState } from "react";
import fetchData from "../api";

const TodoForm = () => {
  const [todo, setTodo] = useState("");

  const handleCreateTodo = async () => {
    const api = "/todos";
    // localstorage에서 accessToken 받기
    // const accessToken =
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    };
    const res = await fetchData(api, config);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setTodo(value);
  };

  const handleAddTodo = () => {
    // todo => localstorage
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input
        data-testid="new-todo-input"
        name="todo"
        value={todo}
        onChange={handleChange}
      />
      <button type="submit" data-testid="new-todo-add-button">
        추가
      </button>
    </form>
  );
};

export default TodoForm;
