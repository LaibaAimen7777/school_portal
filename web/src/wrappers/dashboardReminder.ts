import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

/* Base Card Styling - Modern, clean, and subtle */
export const Card = styled.div`
  background: var(--bg-portal, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease-in-out;
`;

/* Button Layouts */
export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  background-color: ${(props) =>
    props.$disabled ? "#e5e7eb" : "var(--accent-color, #2563eb)"};
  color: ${(props) => (props.$disabled ? "#9ca3af" : "#ffffff")};
  border: 1px solid transparent;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  box-shadow: ${(props) =>
    props.$disabled ? "none" : "0 1px 2px rgba(0, 0, 0, 0.05)"};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  background-color: var(--bg-portal, #ffffff);
  color: var(--text-color, #374151);
  border: 1px solid var(--border-color, #d1d5db);
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--bg-secondary, #f9fafb);
    border-color: #9ca3af;
  }

  &:active {
    background-color: #f3f4f6;
  }
`;

/* Confirmation Bar */
export const ConfirmContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #fef2f2;
  padding: 0.4rem 0.85rem;
  border-radius: 10px;
  border: 1px solid #fecaca;
  flex-wrap: wrap;
`;

export const ConfirmText = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  color: #dc2626;
`;

export const DangerButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.85rem;
  background-color: #dc2626;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b91c1c;
  }
`;

export const CancelButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.6rem;
  background-color: transparent;
  color: #4b5563;
  border: none;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: #111827;
  }
`;

/* Result Box */
export const ResultBox = styled.div<{ $hasError?: boolean }>`
  margin-top: 1rem;
  padding: 0.875rem 1rem;
  border-radius: 10px;
  background-color: ${(props) => (props.$hasError ? "#fef2f2" : "#f0fdf4")};
  border: 1px solid ${(props) => (props.$hasError ? "#fecaca" : "#bbf7d0")};
`;

export const ResultTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-color, #1f2937);
`;

export const ErrorItem = styled.p`
  font-size: 0.8125rem;
  color: #dc2626;
  margin-top: 0.35rem;
  font-weight: 500;
`;

/* Reminders Section */
export const RemindersCard = styled(Card)`
  background: #fffbeb;
  border-color: #fde68a;
  box-shadow: none;
`;

export const RemindersHeader = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #b45309;
  margin-bottom: 0.85rem;
`;

export const ReminderItem = styled.div<{ $type: "warning" | "error" }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid
    ${(props) => (props.$type === "error" ? "#fecaca" : "#fde68a")};

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.65rem;
  }
`;

export const ReminderMessage = styled.span<{ $type: "warning" | "error" }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
`;

export const ReminderButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  background-color: #1f2937;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

/* Expandable Card Details */
export const ExpandableCard = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

export const ExpandButton = styled.button<{ $expanded?: boolean }>`
  width: 100%;
  padding: 1.15rem 1.25rem;
  background: transparent;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--heading-color, #111827);

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &:hover {
    background-color: var(--bg-secondary, #f9fafb);
  }
`;

export const ExpandIcon = styled.div<{ $expanded?: boolean }>`
  transition: transform 0.2s ease;
  transform: ${(props) =>
    props.$expanded ? "rotate(180deg)" : "rotate(0deg)"};
  color: #6b7280;
`;

export const ExpandContent = styled.div`
  padding: 1rem 1.25rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  border-top: 1px solid var(--border-color, #e5e7eb);
`;

/* Incomplete Class Items */
export const IncompleteClassItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--bg-secondary, #f9fafb);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 10px;

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.65rem;
  }
`;

export const ClassInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  strong {
    font-size: 0.875rem;
    color: #111827;
  }
`;

export const MissingSubjects = styled.span`
  font-size: 0.8125rem;
  color: #dc2626;
  font-weight: 500;
`;

export const SmallButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  background-color: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    border-color: #9ca3af;
  }
`;

/* Teacher Workload Items */
export const WarningBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  color: #dc2626;
  font-size: 0.8125rem;
  font-weight: 500;
`;

export const TeacherItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--bg-secondary, #f9fafb);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 10px;
`;

export const TeacherName = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
`;

export const TeacherPeriods = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  background: #fef3c7;
  color: #92400e;
  border-radius: 6px;
`;

export const AddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.35rem;
`;

export const AddTeacherButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background-color: #111827;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

/* Success Banner */
export const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 1rem 1.25rem;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  color: #166534;
  font-size: 0.875rem;
  font-weight: 600;
`;
