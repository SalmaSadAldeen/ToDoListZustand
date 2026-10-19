// src/components/ConfirmModal.jsx
import { createPortal } from "react-dom";
import { AlertTriangle } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <AlertTriangle className="modal-icon" size={24} />
          <h3>{title}</h3>
        </div>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="btn-modal-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-modal-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
