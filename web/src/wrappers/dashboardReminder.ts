// src/wrappers/dashboardReminder.ts
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Card = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.25rem;
  background-color: var(--bg-color);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--shadow);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const PrimaryButton = styled.button<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  padding: 0.5rem 1.125rem;
  border-radius: 8px;
  border: none;
  background-color: ${(props) =>
    props.$disabled ? "var(--border-color)" : "var(--accent-color)"};
  color: ${(props) =>
    props.$disabled ? "var(--text-color)" : "var(--button-text)"};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  font-size: 0.8rem;
  font-weight: 500;
  transition: var(--transition);
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
    filter: brightness(1.05);
  }
`;

export const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  padding: 0.5rem 1.125rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  font-size: 0.8rem;
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
    background-color: var(--bg-secondary);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DangerButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  border: none;
  background-color: #dc2626;
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
    background-color: #b91c1c;
  }
`;

export const CancelButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-color);
  cursor: pointer;
  font-size: 0.8rem;
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
    background-color: var(--bg-secondary);
  }
`;

export const ConfirmContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const ConfirmText = styled.span`
  font-size: 0.75rem;
  color: #dc2626;
`;

export const ResultBox = styled.div<{ $hasError?: boolean }>`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: ${(props) =>
    props.$hasError ? "rgba(245, 158, 11, 0.1)" : "rgba(34, 197, 94, 0.1)"};
  border: 1px solid ${(props) => (props.$hasError ? "#f59e0b" : "#22c55e")};
  font-size: 0.8rem;
`;

export const ResultTitle = styled.p`
  margin: 0 0 0.25rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--heading-color);
`;

export const ErrorItem = styled.p`
  margin: 0.125rem 0;
  color: #dc2626;
`;

export const RemindersCard = styled(Card)`
  overflow: hidden;
  padding: 0;
`;

export const RemindersHeader = styled.div`
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--heading-color);
  background-color: var(--bg-secondary);
`;

export const ReminderItem = styled.div<{ $type: "warning" | "error" }>`
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  background-color: ${(props) =>
    props.$type === "error"
      ? "rgba(239, 68, 68, 0.05)"
      : "rgba(245, 158, 11, 0.05)"};

  &:last-child {
    border-bottom: none;
  }
`;

export const ReminderMessage = styled.span<{ $type: "warning" | "error" }>`
  font-size: 0.8rem;
  color: ${(props) => (props.$type === "error" ? "#dc2626" : "#f59e0b")};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ReminderButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--bg-color);
  cursor: pointer;
  transition: var(--transition);
  color: var(--text-color);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
    background-color: var(--bg-secondary);
  }
`;

export const ExpandableCard = styled(Card)`
  overflow: hidden;
  padding: 0;
`;

export const ExpandButton = styled.button<{ $expanded: boolean }>`
  width: 100%;
  padding: 0.875rem 1.25rem;
  border: none;
  border-bottom: ${(props) =>
    props.$expanded ? `1px solid var(--border-color)` : "none"};
  background: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 0.875rem;
  transition: var(--transition);
  color: var(--heading-color);
  background-color: var(--bg-secondary);

  &:hover {
    background-color: var(--bg-secondary);
  }
`;

export const ExpandIcon = styled.span<{ $expanded: boolean }>`
  transition: transform 0.2s;
  transform: ${(props) => (props.$expanded ? "rotate(180deg)" : "rotate(0)")};
  display: inline-flex;
  align-items: center;
`;

export const ExpandContent = styled.div``;

export const IncompleteClassItem = styled.div`
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;

  &:last-child {
    border-bottom: none;
  }
`;

export const ClassInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  strong {
    font-weight: 600;
    color: var(--heading-color);
  }
`;

export const MissingSubjects = styled.span`
  color: var(--text-color);
  opacity: 0.7;
  font-size: 0.75rem;
`;

export const SmallButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--bg-color);
  cursor: pointer;
  transition: var(--transition);
  color: var(--text-color);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
    background-color: var(--bg-secondary);
    color: var(--accent-color);
  }
`;

export const WarningBox = styled.div`
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  background-color: rgba(239, 68, 68, 0.05);
  font-size: 0.8rem;
  color: #dc2626;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TeacherItem = styled.div`
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

export const TeacherName = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--heading-color);
`;

export const TeacherPeriods = styled.span`
  color: #f59e0b;
  font-weight: 500;
`;

export const AddButtonContainer = styled.div`
  padding: 0.875rem 1.25rem;
  border-top: 1px solid var(--border-color);
`;

export const AddTeacherButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--accent-color);
  border-radius: 8px;
  background-color: transparent;
  color: var(--accent-color);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
    background-color: var(--accent-color);
    color: var(--button-text);
  }
`;

export const SuccessMessage = styled.div`
  padding: 1rem 1.25rem;
  border-radius: 12px;
  background-color: rgba(34, 197, 94, 0.1);
  border: 1px solid #22c55e;
  font-size: 0.8rem;
  color: #22c55e;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
