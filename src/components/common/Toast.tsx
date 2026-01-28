import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div
      className={`fixed top-8 right-8 z-[999] px-6 py-4 text-white rounded-lg shadow-lg ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>,
    document.body // This renders the Toast inside <body>
  );
}