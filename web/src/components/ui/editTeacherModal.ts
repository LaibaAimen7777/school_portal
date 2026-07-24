import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: ${fadeIn} 0.2s ease-out forwards;
`;

export const ModalBox = styled.div`
  width: 100%;
  max-width: 520px;
  background: var(--bg-portal, rgba(20, 20, 25, 0.85)) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12)) !important;
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideUp} 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));

  h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--heading-color, inherit);
  }
`;

export const CloseIconButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--heading-color, inherit);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: scale(1.05);
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--heading-color, inherit);
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
  border-radius: 10px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.04) !important;
  color: var(--heading-color, inherit);
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: var(--heading-color, inherit);
    opacity: 0.35;
  }

  &:focus {
    border-color: var(--accent-color, #2563eb);
    background: rgba(255, 255, 255, 0.07) !important;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
`;

export const ModalSelect = styled.select`
  width: 100%;
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
  border-radius: 10px;
  font-size: 0.9rem;
  background: var(--bg-color) !important;
  color: var(--heading-color, inherit);
  outline: none;
  transition: all 0.2s ease;
  cursor: pointer;

  &:focus {
    border-color: var(--accent-color, #2563eb);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }

  option {
    background: #18181b;
    color: #ffffff;
  }
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;

  h4 {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--heading-color, inherit);
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export const SubjectRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(255, 255, 255, 0.02);
  padding: 0.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  .grade-input {
    width: 90px;
    flex-shrink: 0;
  }

  .subject-select {
    flex: 1;
  }
`;

export const RemoveRowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.25);
  background: rgba(239, 68, 68, 0.08) !important;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(239, 68, 68, 0.2) !important;
    border-color: rgba(239, 68, 68, 0.5);
  }
`;

export const AddSubjectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  padding: 0.6rem;
  border-radius: 10px;
  border: 1px dashed var(--border-color, rgba(255, 255, 255, 0.2));
  background: rgba(255, 255, 255, 0.02) !important;
  color: var(--heading-color, inherit);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06) !important;
    border-color: var(--accent-color, #2563eb);
    color: var(--accent-color, #3b82f6);
  }
`;

export const ModalActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
`;

export const CancelButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
  background: rgba(255, 255, 255, 0.04) !important;
  color: var(--heading-color, inherit);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }
`;

export const SaveButton = styled.button`
  padding: 0.6rem 1.4rem;
  border-radius: 10px;
  border: none;
  background: var(--accent-color, #2563eb);
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;
