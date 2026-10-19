import { useState } from "react";
import TodoForm from "./components/TodoForm";
import Filters from "./components/Filters";
import TodoList from "./components/TodoList";
import ConfirmModal from "./components/ConfirmModal";
import { useTodoStore } from "./store/useTodoStore";
import bgImage from "./assets/background.jpg";
import { CheckCircle, Trash2 } from "lucide-react";

export default function App() {
  const todos = useTodoStore((state) => state.todos);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  const [showClearModal, setShowClearModal] = useState(false);

  const remaining = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - remaining;

  const handleConfirmClear = () => {
    clearCompleted();
    setShowClearModal(false);
  };

  return (
    <main
      className="app"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="card">
        <header className="header">
          <h1 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CheckCircle
              className="icon-primary"
              size={28}
              style={{ color: "var(--primary)" }}
            />
            My Tasks
          </h1>
          <p className="subtitle">
            {remaining} remaining · {completedCount} done
          </p>
        </header>

        <TodoForm />
        <Filters />
        <TodoList />

        {completedCount > 0 && (
          <button className="btn-clear" onClick={() => setShowClearModal(true)}>
            <Trash2 size={16} style={{ marginRight: "6px" }} />
            Clear completed ({completedCount})
          </button>
        )}
      </section>

      {/* مودال التأكيد لحذف جميع المهام المكتملة */}
      <ConfirmModal
        isOpen={showClearModal}
        title="Confirm Clear Completed"
        message={`Are you sure you want to clear all completed tasks (${completedCount})? This action cannot be undone.`}
        onConfirm={handleConfirmClear}
        onCancel={() => setShowClearModal(false)}
      />
    </main>
  );
}
