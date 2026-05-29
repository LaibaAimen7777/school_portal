// src/components/admin/DashboardReminders.styles.ts
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Card = styled.div`
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-xl);
  padding: 1.25rem;
  background-color: var(--bg-color);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--shadow);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const PrimaryButton = styled.button<{ $disabled?: boolean }>`
  white-space: nowrap;
  padding: 0.5rem 1.125rem;
  border-radius: var(--border-radius-lg);
  border: none;
  background-color: ${(props) =>
    props.$disabled ? "#e5e7eb" : "var(--text-color)"};
  color: ${(props) => (props.$disabled ? "#9ca3af" : "var(--bg-color)")};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  font-size: 0.8rem;
  font-weight: 500;
  transition: var(--transition);

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
  }
`;

export const SecondaryButton = styled.button`
  white-space: nowrap;
  padding: 0.5rem 1.125rem;
  border-radius: var(--border-radius-lg);
  border: var(--border-width) solid var(--border-color);
  background-color: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  font-size: 0.8rem;
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
    background-color: var(--text-color);
    color: var(--bg-color);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DangerButton = styled.button`
  padding: 0.5rem 0.875rem;
  border-radius: var(--border-radius-lg);
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
  padding: 0.5rem 0.875rem;
  border-radius: var(--border-radius-lg);
  border: var(--border-width) solid var(--border-color);
  background-color: var(--bg-color);
  cursor: pointer;
  font-size: 0.8rem;
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
  }
`;

export const ConfirmContainer = styled.div`
  display: flex;
  gap: 0.375rem;
  align-items: center;
`;

export const ConfirmText = styled.span`
  font-size: 0.75rem;
  color: #b91c1c;
  white-space: nowrap;
`;

export const ResultBox = styled.div<{ $hasError?: boolean }>`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: var(--border-radius-lg);
  background-color: ${(props) => (props.$hasError ? "#fef9c3" : "#f0fdf4")};
  border: var(--border-width) solid
    ${(props) => (props.$hasError ? "#fde047" : "#86efac")};
  font-size: 0.8rem;
`;

export const ResultTitle = styled.p`
  margin: 0 0 0.25rem;
  font-weight: 500;
`;

export const ErrorItem = styled.p`
  margin: 0.125rem 0;
  color: #b45309;
`;

export const RemindersCard = styled(Card)`
  overflow: hidden;
  padding: 0;
`;

export const RemindersHeader = styled.div`
  padding: 0.875rem 1.25rem;
  border-bottom: var(--border-width) solid #f3f4f6;
  font-weight: 600;
  font-size: 0.875rem;
`;

export const ReminderItem = styled.div<{ $type: "warning" | "error" }>`
  padding: 0.75rem 1.25rem;
  border-bottom: var(--border-width) solid #f9fafb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  background-color: ${(props) =>
    props.$type === "error" ? "#fef2f2" : "#fffbeb"};
`;

export const ReminderMessage = styled.span<{ $type: "warning" | "error" }>`
  font-size: 0.8rem;
  color: ${(props) => (props.$type === "error" ? "#b91c1c" : "#92400e")};
`;

export const ReminderButton = styled.button`
  white-space: nowrap;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border: var(--border-width) solid #d1d5db;
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-color);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
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
    props.$expanded ? `var(--border-width) solid #f3f4f6` : "none"};
  background: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 0.875rem;
  transition: var(--transition);
`;

export const ExpandIcon = styled.span<{ $expanded: boolean }>`
  transition: transform 0.2s;
  transform: ${(props) => (props.$expanded ? "rotate(180deg)" : "rotate(0)")};
`;

export const ExpandContent = styled.div``;

export const IncompleteClassItem = styled.div`
  padding: 0.625rem 1.25rem;
  border-bottom: var(--border-width) solid #f9fafb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
`;

export const ClassInfo = styled.div`
  strong {
    font-weight: 600;
  }
`;

export const MissingSubjects = styled.span`
  color: #6b7280;
  margin-left: 0.5rem;
`;

export const SmallButton = styled.button`
  font-size: 0.75rem;
  padding: 0.25rem 0.625rem;
  border: var(--border-width) solid #d1d5db;
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-color);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
  }
`;

export const WarningBox = styled.div`
  padding: 0.75rem 1.25rem;
  border-bottom: var(--border-width) solid #f9fafb;
  background-color: #fef2f2;
  font-size: 0.8rem;
  color: #b91c1c;
`;

export const TeacherItem = styled.div`
  padding: 0.625rem 1.25rem;
  border-bottom: var(--border-width) solid #f9fafb;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
`;

export const TeacherName = styled.span`
  color: #92400e;
`;

export const TeacherPeriods = styled.span`
  color: #92400e;
`;

export const AddButtonContainer = styled.div`
  padding: 0.625rem 1.25rem;
`;

export const AddTeacherButton = styled.button`
  font-size: 0.8rem;
  padding: 0.375rem 0.875rem;
  border: var(--border-width) solid #2563eb;
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-color);
  color: #2563eb;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
    background-color: #2563eb;
    color: var(--bg-color);
  }
`;

export const SuccessMessage = styled.div`
  padding: 1rem 1.25rem;
  border-radius: var(--border-radius-xl);
  background-color: #f0fdf4;
  border: var(--border-width) solid #86efac;
  font-size: 0.8rem;
  color: #166534;
`;
