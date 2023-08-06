import { memo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import EditView from "./EditView";

const TodoListItem = memo(
  ({ id, todo, isCompleted, userId, onFilterTodos }) => {
    const [isChecked, setIsChecked] = useState(isCompleted);
    const [isEdit, setIsEdit] = useState(false);
    const [storedValue] = useLocalStorage("access_token");
    const [currentTodo, setCurrentTodo] = useState(todo);

    const handleRequest = async (method) => {
      const url = `https://www.pre-onboarding-selection-task.shop/todos/${id}`;

      const config = {
        method,
        headers: {
          Authorization: `Bearer ${storedValue}`,
        },
      };

      try {
        const res = await fetch(url, config);
        if (res.ok) {
          onFilterTodos(id);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const handleChangeCheckbox = (e) => {
      const checked = e.target.checked;
      setIsChecked(checked);
    };

    const handleDeleteTodo = () => {
      const method = "DELETE";
      handleRequest(method);
    };

    const handleToggleEditMode = () => {
      setIsEdit(!isEdit);
    };

    return (
      <li>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChangeCheckbox}
          />
          <span>{currentTodo}</span>
        </label>
        {isEdit ? (
          <EditView
            onToggleEditMode={handleToggleEditMode}
            id={id}
            currentTodo={currentTodo}
            isChecked={isChecked}
            setCurrentTodo={setCurrentTodo}
            storedValue={storedValue}
          />
        ) : (
          <div>
            <button
              type="button"
              data-testid="modify-button"
              onClick={handleToggleEditMode}
            >
              수정
            </button>
            <button
              type="button"
              data-testid="delete-button"
              onClick={handleDeleteTodo}
            >
              삭제
            </button>
          </div>
        )}
      </li>
    );
  }
);

export default TodoListItem;
