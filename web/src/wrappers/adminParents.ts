import styled from "styled-components";

export const ParentsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ParentsHeader = styled.div`
  background: var(--bg-portal, rgba(255, 255, 255, 0.03)) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08)) !important;
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
`;

export const ParentsTitle = styled.h2`
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

export const SearchWrapper = styled.div`
  position: relative;
  min-width: 280px;
  flex: 1;
  max-width: 400px;

  svg {
    position: absolute;
    left: 0.9rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--heading-color, inherit);
    opacity: 0.5;
    font-size: 0.9rem;
    pointer-events: none;
  }

  @media (max-width: 640px) {
    max-width: 100%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.65rem 0.9rem 0.65rem 2.4rem;
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
  border-radius: 10px;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.04) !important;
  color: var(--heading-color, inherit);
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: var(--heading-color, inherit);
    opacity: 0.4;
  }

  &:focus {
    border-color: var(--accent-color, #2563eb);
    background: rgba(255, 255, 255, 0.07) !important;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
`;

export const TableWrapper = styled.div`
  background: var(--bg-portal, rgba(255, 255, 255, 0.03)) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08)) !important;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.875rem;

  thead {
    background: rgba(255, 255, 255, 0.02);
    border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));

    th {
      padding: 1rem 1.25rem;
      font-weight: 600;
      color: var(--heading-color, inherit);
      opacity: 0.8;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.05));
      transition: background 0.2s ease;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.03) !important;
      }
    }

    td {
      padding: 1rem 1.25rem;
      color: var(--heading-color, inherit);
      vertical-align: middle;

      .username {
        opacity: 0.75;
        font-size: 0.85rem;
      }

      .contact-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-size: 0.85rem;

        span {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          opacity: 0.85;

          svg {
            font-size: 0.8rem;
            color: var(--accent-color, #3b82f6);
          }
        }
      }

      .children-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
    }
  }
`;

export const StudentBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(255, 255, 255, 0.05) !important;
  color: var(--heading-color, inherit);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;

  svg {
    font-size: 0.7rem;
    opacity: 0.7;
  }
`;

export const ResetButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.25);
  background: rgba(239, 68, 68, 0.08) !important;
  color: #ef4444;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  svg {
    font-size: 0.85rem;
  }

  &:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.18) !important;
    border-color: rgba(239, 68, 68, 0.5);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: var(--heading-color, inherit);
  opacity: 0.6;
  gap: 1rem;

  svg {
    font-size: 2.5rem;
    opacity: 0.5;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 500;
  }
`;

/* Credentials Modal / Card Glass Box */
export const CredentialCardContainer = styled.div`
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
`;

export const CredentialCard = styled.div`
  width: 100%;
  max-width: 440px;
  background: #ffffff !important; /* Kept light for clean PDF printing */
  color: #0f172a !important;
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 0.75rem;

    h3 {
      margin: 0;
      font-size: 1.15rem;
      font-weight: 700;
      color: #0f172a;
    }
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    background: #f8fafc;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    border: 1px solid #e2e8f0;

    label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      font-weight: 600;
    }

    span {
      font-family: monospace;
      font-size: 1rem;
      font-weight: 700;
      color: #1e293b;
    }
  }

  .card-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }
`;

export const PrimaryButton = styled.button`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 0.65rem 1.25rem;
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

export const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #f1f5f9;
  color: #334155;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 0.65rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e2e8f0;
  }
`;
