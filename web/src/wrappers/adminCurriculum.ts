import styled, { keyframes, css } from "styled-components";

// ==========================================
// Keyframes & Animations
// ==========================================

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ==========================================
// Base Buttons (Moved up to prevent TDZ error)
// ==========================================

export const SaveButton = styled.button`
  background-color: var(--accent-color, #2563eb);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.45rem 1.1rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  background: transparent;
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.15));
  color: var(--heading-color, inherit);
  border-radius: 8px;
  padding: 0.45rem 1.1rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

// ==========================================
// Container & Header
// ==========================================

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1.25rem;
  }
`;

export const Header = styled.header`
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

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--heading-color, inherit);
  margin: 0;
  letter-spacing: -0.01em;
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--accent-color, #2563eb);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 0.65rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

// ==========================================
// Form & Inputs (Create/Edit)
// ==========================================

export const FormCard = styled.div`
  background: var(--bg-portal, rgba(255, 255, 255, 0.03)) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08)) !important;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
  animation: ${slideDown} 0.25s ease-out;
`;

export const FormTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: var(--heading-color, inherit);
  margin: 0 0 1.25rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.9;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Label = styled.label`
  font-size: 0.775rem;
  font-weight: 600;
  color: var(--heading-color, inherit);
  opacity: 0.85;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
  border-radius: 10px;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.05) !important;
  color: var(--heading-color, inherit);
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: var(--accent-color, #2563eb);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }

  &::placeholder {
    opacity: 0.4;
  }
`;

export const SmallInput = styled(Input)`
  width: 90px;
  text-align: center;
  font-family: var(--font-mono, monospace);
  font-weight: 600;
`;

export const PeriodsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const PeriodsHint = styled.span`
  font-size: 0.8rem;
  color: var(--heading-color, inherit);
  opacity: 0.6;
`;

export const CreateButton = styled(SaveButton)`
  margin-top: 0.5rem;
  align-self: flex-start;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

// ==========================================
// Grade Picker Component Styles
// ==========================================

export const GradePickerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

export const GradePickerButton = styled.button<{ $selected?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid
    ${({ $selected }) =>
      $selected
        ? "var(--accent-color, #2563eb)"
        : "var(--border-color, rgba(255, 255, 255, 0.12))"};
  background: ${({ $selected }) =>
    $selected
      ? "var(--accent-color, #2563eb)"
      : "rgba(255, 255, 255, 0.04)"} !important;
  color: ${({ $selected }) =>
    $selected ? "#ffffff" : "var(--heading-color, inherit)"};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: var(--accent-color, #2563eb);
    transform: translateY(-1px);

    ${({ $selected }) =>
      !$selected &&
      css`
        background: rgba(255, 255, 255, 0.08) !important;
      `}
  }

  &:active {
    transform: translateY(0);
  }
`;

// ==========================================
// Accordion Grade Groups & Cards
// ==========================================

export const GradeGroupCard = styled.div`
  background: var(--bg-portal, rgba(255, 255, 255, 0.03)) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08)) !important;
  border-radius: 14px;
  margin-bottom: 0.85rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: border-color 0.2s ease;

  &:hover {
    border-color: var(--border-color, rgba(255, 255, 255, 0.15)) !important;
  }
`;

export const GradeHeader = styled.div<{ $expanded?: boolean }>`
  padding: 1.1rem 1.35rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  background: ${({ $expanded }) =>
    $expanded ? "rgba(255, 255, 255, 0.04)" : "transparent"};
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const GradeTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const GradeNumber = styled.span`
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--heading-color, inherit);
`;

export const SubjectCount = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  color: var(--heading-color, inherit);
  opacity: 0.8;
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
`;

export const ExpandIcon = styled.span<{ $expanded?: boolean }>`
  font-size: 0.75rem;
  color: var(--heading-color, inherit);
  opacity: 0.6;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $expanded }) =>
    $expanded ? "rotate(180deg)" : "rotate(0deg)"};
`;

// ==========================================
// Subject Item Rows & Actions
// ==========================================

export const SubjectRow = styled.div<{ $isEditing?: boolean }>`
  padding: 1rem 1.35rem;
  border-top: 1px solid var(--border-color, rgba(255, 255, 255, 0.05));
  background: ${({ $isEditing }) =>
    $isEditing ? "rgba(255, 255, 255, 0.03)" : "transparent"};
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;

export const SubjectInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SubjectName = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--heading-color, inherit);
  margin: 0 0 0.4rem 0;
`;

export const SubjectMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const GradeBadge = styled.span`
  font-size: 0.725rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background: rgba(37, 99, 235, 0.12);
  color: var(--accent-color, #3b82f6);
  border: 1px solid rgba(37, 99, 235, 0.25);
`;

export const MetaText = styled.span`
  font-size: 0.775rem;
  color: var(--heading-color, inherit);
  opacity: 0.6;
  display: flex;
  align-items: center;

  &:before {
    content: "•";
    margin: 0 0.4rem;
    opacity: 0.5;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }
`;

export const EditButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
  color: var(--heading-color, inherit);
  font-size: 0.775rem;
  font-weight: 600;
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--accent-color, #3b82f6);
    color: var(--accent-color, #3b82f6);
  }
`;

export const DeleteButton = styled.button`
  background: rgba(239, 68, 68, 0.1) !important;
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #ef4444;
  font-size: 0.775rem;
  font-weight: 600;
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.22) !important;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
  }
`;

// ==========================================
// Edit Inline Form
// ==========================================

export const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const EditActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.25rem;
`;

export const EmptyState = styled.div`
  background: var(--bg-portal, rgba(255, 255, 255, 0.02));
  border: 1px dashed var(--border-color, rgba(255, 255, 255, 0.12));
  border-radius: 16px;
  padding: 3rem 1.5rem;
  text-align: center;
  color: var(--heading-color, inherit);
  opacity: 0.6;
  font-size: 0.9rem;
`;
