import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-xl);

  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-md);
  }
`;

export const Header = styled.div`
  margin-bottom: var(--spacing-xl);
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--heading-color);
  margin: 0 0 var(--spacing-xs) 0;
`;

export const LastUpdated = styled.p`
  font-size: 0.75rem;
  color: var(--text-color);
  opacity: 0.6;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
`;

export const Section = styled.section`
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  padding: var(--spacing-xl);
`;

export const SectionTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--heading-color);
  margin: 0 0 var(--spacing-lg) 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

export const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 0.85rem;
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }

  &[type="time"] {
    font-family: var(--font-mono);
  }
`;

export const ErrorText = styled.p`
  font-size: 0.7rem;
  color: #ef4444;
  margin-top: var(--spacing-xs);
`;

export const PeriodPreview = styled(Section)``;

export const PeriodBadge = styled.div`
  padding: 0.4rem 0.8rem;
  background: var(--bg-secondary);
  border-radius: 6px;
  font-size: 0.75rem;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  transition: var(--transition);

  strong {
    color: var(--accent-color);
    font-weight: 600;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
  }
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
`;

export const EmptyMessage = styled.p`
  font-size: 0.75rem;
  color: var(--text-color);
  opacity: 0.6;
`;

export const SaveButton = styled.button`
  align-self: flex-start;
  padding: 0.6rem 1.5rem;
  background: var(--accent-color);
  color: var(--button-text);
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ConflictPanel = styled.div`
  margin-top: var(--spacing-xl);
  border-radius: 12px;
  border: 1px solid #fca5a5;
  overflow: hidden;
  background: var(--bg-color);
`;

export const ConflictHeader = styled.div`
  background: #fef2f2;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid #fca5a5;

  strong {
    color: #b91c1c;
    font-size: 0.85rem;
  }

  p {
    font-size: 0.7rem;
    color: #6b7280;
    margin: var(--spacing-xs) 0 0;
  }
`;

export const ConflictTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75rem;

  th {
    text-align: left;
    padding: 0.75rem 1rem;
    background: #fafafa;
    color: var(--heading-color);
    font-weight: 600;
    border-bottom: 1px solid #e5e7eb;
  }

  td {
    padding: 0.75rem 1rem;
    color: var(--text-color);
    border-bottom: 1px solid #f3f4f6;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

export const IssueText = styled.td`
  color: #b91c1c;
  font-size: 0.7rem;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: var(--transition);

  &:hover {
    background: #fef2f2;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.7;
`;
