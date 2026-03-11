import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--bg-color);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--shadow-hover);
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-top: 0;
  margin-bottom: 2rem;
  padding: var(--spacing-lg);
  border-bottom: 2px dashed var(--border-color);
  box-shadow: none;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  color: var(--text-color);
  margin-left: 0.5rem;
`;

export const Select = styled.select`
  padding: 1rem 1.2rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  font-size: 1rem;
  transition: var(--transition);
  background-color: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.2rem;

  &:focus {
    outline: none;
    border-width: 2px;
    box-shadow: var(--shadow);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  padding: 1rem 1.2rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  font-size: 1rem;
  transition: var(--transition);
  background-color: var(--bg-color);
  color: var(--text-color);

  &:focus {
    outline: none;
    border-width: 2px;
    box-shadow: var(--shadow);
  }

  &[type="time"] {
    font-family: var(--font-mono);
  }
`;

export const TimeSlotGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

export const CheckRoomsButton = styled.button`
  padding: 1rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-color);
  color: var(--text-color);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  margin: 0.5rem 0 1rem 0;

  &:hover:not(:disabled) {
    background-color: var(--text-color);
    color: var(--bg-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
  margin: 1rem 0;
  padding: 1rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background: linear-gradient(
    135deg,
    var(--bg-color) 0%,
    rgba(0, 0, 0, 0.02) 100%
  );
`;

export const RoomButton = styled.button<{ selected: boolean }>`
  padding: 0.75rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-full);
  background-color: ${(props) =>
    props.selected ? "var(--text-color)" : "var(--bg-color)"};
  color: ${(props) =>
    props.selected ? "var(--bg-color)" : "var(--text-color)"};
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
    background-color: ${(props) =>
      props.selected ? "var(--text-color)" : "var(--text-color)"};
    color: var(--bg-color);
  }
`;

export const Message = styled.p<{ type?: "error" | "info" | "success" }>`
  margin: 0;
  padding: 0.75rem 1rem;
  border: var(--border-width) solid
    ${(props) =>
      props.type === "error"
        ? "#ff4444"
        : props.type === "success"
          ? "#44ff44"
          : "var(--border-color)"};
  border-radius: var(--border-radius-full);
  background-color: var(--bg-color);
  color: ${(props) =>
    props.type === "error"
      ? "#ff4444"
      : props.type === "success"
        ? "#44ff44"
        : "var(--text-color)"};
  font-size: 0.9rem;
  text-align: center;
`;

export const Toast = styled.div<{ $ok: boolean }>`
  // Rename to $ok to avoid passing to DOM
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 1rem 2rem;
  background-color: ${(props) => (props.$ok ? "var(--text-color)" : "#ff4444")};
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

export const Button = styled.button`
  padding: 1rem 2rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-full);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  background-color: var(--text-color);
  color: var(--bg-color);
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background-color: var(--bg-color);
    color: var(--text-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
