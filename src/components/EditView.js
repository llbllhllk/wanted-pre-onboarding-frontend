import { useState, useEffect } from "react";
import fetchData from "../api";

const EditView = ({
  id,
  isChecked,
  currentTodo,
  storedValue,
  onToggleEditMode,
  setCurrentTodo,
}) => {
  const [editTodo, setEditTodo] = useState({
    todo: currentTodo,
    isCompleted: isChecked,
  });

  useEffect(() => {
    setEditTodo({ ...editTodo, isCompleted: isChecked });
  }, [isChecked, editTodo]);

  const handleChangeTodo = (e) => {
    const { name, value } = e.target;
    setEditTodo({
      ...editTodo,
      [name]: value,
      isCompleted: isChecked,
    });
  };

  const handleRequest = async (method) => {
    const api = `/todos/${id}`;
    const config = {
      method,
      headers: {
        Authorization: `Bearer ${storedValue}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editTodo),
    };

    const res = await fetchData(api, config);
    if (res.status === 200) {
      setCurrentTodo(editTodo.todo);
      onToggleEditMode();
    }
  };

  const handleEditTodo = () => {
    const method = "PUT";
    handleRequest(method);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="modify-input"
        name="todo"
        value={editTodo.todo}
        onChange={handleChangeTodo}
      />
      <button
        type="button"
        data-testid="submit-button"
        onClick={handleEditTodo}
      >
        제출
      </button>
      <button
        type="button"
        data-testid="cancel-button"
        onClick={onToggleEditMode}
      >
        취소
      </button>
    </div>
  );
};

export default EditView;
