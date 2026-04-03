"use client";

import toast from "react-hot-toast";
import styled from "styled-components";

// ✅ Styled Toast
const ToastBox = styled.div<{ $ok: boolean }>`
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 1rem 2rem;
  background-color: ${(props) =>
    props.$ok ? "var(--text-color)" : "#ff4444"};
  color: ${(props) => (props.$ok ? "var(--bg-color)" : "white")};
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-full);
  box-shadow: var(--shadow-hover);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

// ✅ Internal Component
const ToastComponent = ({
  message,
  ok,
}: {
  message: string;
  ok: boolean;
}) => {
  return <ToastBox $ok={ok}>{message}</ToastBox>;
};

// ✅ Exported functions (use anywhere)
export const showSuccess = (message: string) => {
  toast.custom(() => <ToastComponent message={message} ok={true} />, {
    duration: 3000,
  });
};

export const showError = (message: string) => {
  toast.custom(() => <ToastComponent message={message} ok={false} />, {
    duration: 3000,
  });
};

export const showLoading = (message: string) => {
  return toast.loading(message);
};

export const dismissToast = (id?: string) => {
  toast.dismiss(id);
};