import styled from "styled-components";

export const TeachersContainer = styled.div`
  padding: var(--spacing-xl);
  background-color: var(--bg-secondary);
  min-height: 100vh;
  font-family: var(--font-main);

  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-md);
  }
`;

export const TeachersHeader = styled.div`
  margin-bottom: var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: var(--spacing-md);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TeachersTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--heading-color);
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  svg {
    color: var(--accent-color);
    font-size: 1.5rem;
  }
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--accent-color);
  color: var(--button-text);
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.25rem;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  transition: var(--transition);

  svg {
    font-size: 0.9rem;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
    filter: brightness(1.05);
  }
`;

export const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.7;
`;

export const TableWrapper = styled.div`
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;

  thead {
    tr {
      background-color: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
    }

    th {
      text-align: left;
      padding: 1rem;
      font-weight: 600;
      color: var(--heading-color);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background-color: var(--secondary-color);
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid var(--border-color);
      transition: var(--transition);

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: var(--bg-secondary);
      }
    }

    td {
      padding: 1rem;
      color: var(--text-color);
      vertical-align: middle;

      .code-badge {
        display: inline-block;
        padding: 0.25rem 0.6rem;
        background-color: var(--bg-secondary);
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--accent-color);
      }

      .username {
        font-size: 0.8rem;
        opacity: 0.7;
      }

      .subjects-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      strong {
        font-weight: 600;
        /* color: var(--heading-color); */
      }
    }
  }
`;

export const SubjectBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.6rem;
  background-color: var(--bg-secondary);
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--accent-color);
`;

export const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: #dc2626;
  cursor: pointer;
  font-size: 0.75rem;
  transition: var(--transition);

  &:hover {
    background: #dc2626;
    border-color: #dc2626;
    color: white;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-2xl);
  color: var(--text-color);
  opacity: 0.6;
  text-align: center;

  svg {
    font-size: 2rem;
    color: var(--accent-color);
    opacity: 0.5;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;
