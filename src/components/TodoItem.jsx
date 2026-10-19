// src/components/TodoItem.jsx
import { useState } from "react";
import { useTodoStore } from "../store/useTodoStore";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

export default function TodoItem({ todo }) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const editTodo = useTodoStore((state) => state.editTodo);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleConfirmDelete = () => {
    deleteTodo(todo.id);
    setShowDeleteModal(false);
  };

  return (
    <>
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
            <Pencil size={18} />
          </button>
          <button
            className="icon-btn danger"
            onClick={() => setShowDeleteModal(true)}
            aria-label="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </li>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Task"
        message={`Are you sure you want to delete "${todo.text}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}
