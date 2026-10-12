import { useState } from "react";
import { useTodoStore } from "../store/useTodoStore";

export default function TodoItem({ todo }) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const editTodo = useTodoStore((state) => state.editTodo);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const save = () => {
    if (draft.trim()) editTodo(todo.id, draft);
    else setDraft(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") {
      setDraft(todo.text);
      setIsEditing(false);
    }
  };
  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure to delete this task ?");
    if (confirmed) {
      deleteTodo(todo.id);
    }
  };
  return (
    <li className={`item ${todo.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        className="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />

      {isEditing ? (
        <input
          className="edit-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span className="text" onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </span>
      )}

      <div className="actions">
        <button
          className="icon-btn"
          onClick={() => setIsEditing(true)}
          aria-label="Edit"
        >
          ✏️
        </button>
        <button
          className="icon-btn danger"
          onClick={handleDelete}
          aria-label="Delete"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
