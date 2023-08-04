const TodoListItem = () => {
  return (
    <li>
      <label>
        <input type="checkbox" />
        <span>TODO 1</span>
        <div>
          <button type="button" data-testid="modify-button">
            수정
          </button>
          <button type="button" data-testid="delete-button">
            삭제
          </button>
        </div>
        <div>
          <input type="text" data-testid="modify-input" />
          <button type="button" data-testid="submit-button">
            제출
          </button>
          <button type="button" data-testid="cancel-button">
            취소
          </button>
        </div>
      </label>
    </li>
  );
};

export default TodoListItem;
