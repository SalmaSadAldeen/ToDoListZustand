// src/components/TodoForm.jsx
import { useState } from "react";
import { useTodoStore } from "../store/useTodoStore";

export default function TodoForm() {
  const [text, setText] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  // التحقق إن كان النص المدخل يحتوي على محتوى حقيقي (غير فارغ بعد إزالة المسافات)
  const isFormValid = text.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return; // حماية إضافية

    addTodo(text);
    setText(""); // تفريغ الحقل والعودة لـ "All" تلقائياً
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
      <button 
        type="submit" 
        className="btn-add" 
        disabled={!isFormValid} // الزر غير متاح إذا كان الحقل فارغاً
        style={{
          opacity: isFormValid ? 1 : 0.6,
          cursor: isFormValid ? "pointer" : "not-allowed"
        }}
      >
        Add
      </button>
    </form>
  );
}