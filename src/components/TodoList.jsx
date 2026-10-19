import { useMemo } from 'react'
import { useTodoStore } from '../store/useTodoStore'
import TodoItem from './TodoItem'
import { ClipboardList } from 'lucide-react';

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos)
  const filter = useTodoStore((state) => state.filter)

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed)
    if (filter === 'completed') return todos.filter((t) => t.completed)
    return todos
  }, [todos, filter])

  if (visibleTodos.length === 0) {
    return (
      <div className="empty">
        <ClipboardList size={48} style={{ color: 'var(--muted)', marginBottom: '10px' }} />
        <p>No tasks here yet</p>
      </div>
    )
  }

  return (
    <ul className="list">
      {visibleTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}