// src/app/dashboard/admin/curriculum/styles.ts
import styled from "styled-components";

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--bg-color);
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px dashed var(--border-color);
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
  color: var(--text-color);
`;

export const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-full);
  background-color: var(--text-color);
  color: var(--bg-color);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--bg-color);
    color: var(--text-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
  }
`;

export const FormCard = styled.div`
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-xl);
  padding: 1.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(
    135deg,
    var(--bg-color) 0%,
    rgba(0, 0, 0, 0.02) 100%
  );
`;

export const FormTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  color: var(--text-color);
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-color);
  margin-left: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  font-size: 0.9rem;
  transition: var(--transition);
  background-color: var(--bg-color);
  color: var(--text-color);
  width: 300px;

  &:focus {
    outline: none;
    border-width: 2px;
    box-shadow: var(--shadow);
  }
`;

export const SmallInput = styled(Input)`
  width: 80px;
`;

export const PeriodsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const PeriodsHint = styled.span`
  font-size: 0.8rem;
  color: #6b7280;
`;

export const CreateButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-full);
  background-color: var(--text-color);
  color: var(--bg-color);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  align-self: flex-start;

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

export const GradeGroupCard = styled.div`
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  margin-bottom: 1rem;
  transition: var(--transition);

  &:hover {
    box-shadow: var(--shadow);
  }
`;

export const GradeHeader = styled.button<{ $expanded: boolean }>`
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  background-color: ${(props) =>
    props.$expanded ? "#f8fafc" : "var(--bg-color)"};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${(props) =>
    props.$expanded ? `var(--border-width) solid var(--border-color)` : "none"};
  transition: var(--transition);

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

export const GradeTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const GradeNumber = styled.span`
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-color);
`;

export const SubjectCount = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-full);
  background-color: #e0f2fe;
  color: #0369a1;
`;

export const ExpandIcon = styled.span<{ $expanded: boolean }>`
  color: #94a3b8;
  font-size: 0.8rem;
  transition: transform 0.2s;
  transform: ${(props) => (props.$expanded ? "rotate(180deg)" : "rotate(0)")};
`;

export const SubjectRow = styled.div<{ $isEditing: boolean }>`
  padding: 1rem 1.5rem;
  border-bottom: var(--border-width) solid #f9fafb;
  background-color: ${(props) =>
    props.$isEditing ? "#fafafa" : "var(--bg-color)"};
`;

export const SubjectInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SubjectName = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-color);
`;

export const SubjectMeta = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const GradeBadge = styled.span`
  font-size: 0.7rem;
  padding: 0.125rem 0.6rem;
  border-radius: var(--border-radius-full);
  background-color: #f1f5f9;
  color: #475569;
  border: var(--border-width) solid #e2e8f0;
`;

export const MetaText = styled.span`
  font-size: 0.7rem;
  color: #94a3b8;
  margin-left: 0.25rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const EditButton = styled.button`
  padding: 0.35rem 1rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-color);
  color: var(--text-color);
  font-size: 0.75rem;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--text-color);
    color: var(--bg-color);
    transform: translateY(-1px);
  }
`;

export const DeleteButton = styled.button`
  padding: 0.35rem 1rem;
  border: var(--border-width) solid #fecaca;
  border-radius: var(--border-radius-lg);
  background-color: #fef2f2;
  color: #b91c1c;
  font-size: 0.75rem;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: #fecaca;
    transform: translateY(-1px);
  }
`;

export const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const EditActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SaveButton = styled.button`
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: var(--border-radius-lg);
  background-color: var(--text-color);
  color: var(--bg-color);
  font-size: 0.8rem;
  cursor: pointer;
  transition: var(--transition);

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  padding: 0.5rem 1.25rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-color);
  color: var(--text-color);
  font-size: 0.8rem;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--text-color);
    color: var(--bg-color);
    transform: translateY(-1px);
  }
`;

export const EmptyState = styled.div`
  color: #9ca3af;
  font-size: 0.9rem;
  text-align: center;
  padding: 3rem;
  border: var(--border-width) dashed var(--border-color);
  border-radius: var(--border-radius-xl);
`;

export const GradePickerContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const GradePickerButton = styled.button<{ $selected: boolean }>`
  padding: 0.25rem 0.875rem;
  border-radius: var(--border-radius-lg);
  border: var(--border-width) solid
    ${(props) => (props.$selected ? "#2563eb" : "var(--border-color)")};
  background-color: ${(props) =>
    props.$selected ? "#eff6ff" : "var(--bg-color)"};
  color: ${(props) => (props.$selected ? "#2563eb" : "#6b7280")};
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: ${(props) => (props.$selected ? 600 : 400)};
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
  }
`;

export const LoadingState = styled.div`
  padding: 2rem;
  text-align: center;
  color: var(--text-color);
`;