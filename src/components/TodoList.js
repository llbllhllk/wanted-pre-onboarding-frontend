import TodoListItem from "./TodoListItem";

const TodoList = ({ todos, onFilterTodos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          id={todo.id}
          todo={todo.todo}
          isCompleted={todo.isCompleted}
          userId={todo.userId}
          onFilterTodos={onFilterTodos}
        />
      ))}
    </ul>
  );
};

export default TodoList;
