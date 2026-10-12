import TodoForm from "./components/TodoForm";
import Filters from "./components/Filters";
import TodoList from "./components/TodoList";
import { useTodoStore } from "./store/useTodoStore";
import bgImage from "./assets/OIP.jpg";

export default function App() {
  const todos = useTodoStore((state) => state.todos);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  const remaining = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - remaining;

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
          <h1>✅ My Tasks</h1>
          <p className="subtitle">
            {remaining} remaining · {completedCount} done
          </p>
        </header>

        <TodoForm />
        <Filters />
        <TodoList />

        {completedCount > 0 && (
          <button className="btn-clear" onClick={clearCompleted}>
            Clear completed ({completedCount})
          </button>
        )}
      </section>
    </main>
  );
}
