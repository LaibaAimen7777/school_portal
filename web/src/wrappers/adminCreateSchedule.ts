import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Header = styled.div`
  background: var(--bg-portal, rgba(255, 255, 255, 0.03)) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08)) !important;
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--heading-color, inherit);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;

  svg {
    color: var(--accent-color, #2563eb);
    font-size: 1.4rem;
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
  color: var(--heading-color, inherit);
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    transform: translateX(-2px);
  }
`;

export const FormCard = styled.div`
  background: var(--bg-portal, rgba(255, 255, 255, 0.03)) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08)) !important;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--heading-color, inherit);
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  svg {
    opacity: 0.6;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
  border-radius: 10px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.05) !important;
  color: var(--heading-color, inherit);
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  option {
    background: #1e293b;
    color: #ffffff;
  }

  &:focus {
    border-color: var(--accent-color, #2563eb);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
  border-radius: 10px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.05) !important;
  color: var(--heading-color, inherit);
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: var(--accent-color, #2563eb);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(0.8);
    cursor: pointer;
  }
`;

export const TimeSlotGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const CheckRoomsButton = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(37, 99, 235, 0.12) !important;
  border: 1px solid rgba(37, 99, 235, 0.3);
  color: var(--accent-color, #3b82f6);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(37, 99, 235, 0.22) !important;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

export const RoomButton = styled.button<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.75rem 0.5rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid
    ${(props) =>
      props.selected
        ? "var(--accent-color, #2563eb)"
        : "rgba(255, 255, 255, 0.12)"};
  background: ${(props) =>
    props.selected
      ? "var(--accent-color, #2563eb) !important"
      : "rgba(255, 255, 255, 0.04) !important"};
  color: ${(props) =>
    props.selected ? "#ffffff" : "var(--heading-color, inherit)"};

  &:hover {
    border-color: var(--accent-color, #2563eb);
    transform: translateY(-1px);
  }
`;

export const Message = styled.div<{ type?: "error" | "info" | "success" }>`
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.35rem;
  animation: ${fadeIn} 0.2s ease-out;

  color: ${(props) =>
    props.type === "error"
      ? "#ef4444"
      : props.type === "success"
        ? "#10b981"
        : "#3b82f6"};
`;

export const SubmitButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--accent-color, #2563eb);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 0.85rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
  transition: all 0.2s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
`;
