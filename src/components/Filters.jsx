import { useTodoStore } from "../store/useTodoStore";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

export default function Filters() {
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);

  return (
    <div className="filters" role="tablist">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          className={`filter-btn ${filter === key ? "active" : ""}`}
          onClick={() => setFilter(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
