import { useState } from "react";
import { useTodoStore } from "../store/useTodoStore";

export default function TodoForm() {
  const [text, setText] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Please enter a task before adding!"); // رسالة التنبيه بالإنجليزية
      return;
    }
    addTodo(text);
    setText("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="What do you need to do?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={120}
      />
      <button type="submit" className="btn-add">
        Add
      </button>
    </form>
  );
}
