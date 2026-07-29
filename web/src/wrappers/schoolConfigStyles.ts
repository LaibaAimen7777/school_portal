import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ==========================================
// Layout & Header
// ==========================================

export const Container = styled.div`
  max-width: 850px;
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
    gap: 0.5rem;
  }
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
    font-size: 1.3rem;
  }
`;

export const LastUpdated = styled.p`
  font-size: 0.78rem;
  color: var(--heading-color, inherit);
  opacity: 0.6;
  margin: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// ==========================================
// Glass Sections & Grid Layout
// ==========================================

export const Section = styled.section`
  background: var(--bg-portal, rgba(255, 255, 255, 0.03)) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08)) !important;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 640px) {
    padding: 1.25rem;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--heading-color, inherit);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.9;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

// ==========================================
// Form Fields & Controls
// ==========================================

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--heading-color, inherit);
  opacity: 0.85;
  text-transform: uppercase;
  letter-spacing: 0.04em;
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

  &[type="time"] {
    font-family: var(--font-mono, monospace);
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(0.8);
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  font-size: 0.78rem;
  color: #ef4444;
  margin: 0.25rem 0 0;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--accent-color, #2563eb);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 0.8rem 1.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

// ==========================================
// Period Badges
// ==========================================

export const PeriodPreview = styled(Section)``;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

export const PeriodBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.85rem;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
  border-radius: 10px;
  font-size: 0.8rem;
  color: var(--heading-color, inherit);
  transition: all 0.2s ease;

  strong {
    color: var(--accent-color, #3b82f6);
    font-weight: 700;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08) !important;
    border-color: var(--accent-color, #3b82f6);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const EmptyMessage = styled.p`
  font-size: 0.85rem;
  color: var(--heading-color, inherit);
  opacity: 0.6;
  font-style: italic;
  margin: 0;
`;

// ==========================================
// Conflict Panel & Tables
// ==========================================

export const ConflictPanel = styled.div`
  background: rgba(239, 68, 68, 0.04) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(239, 68, 68, 0.3) !important;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px 0 rgba(239, 68, 68, 0.08);
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ConflictHeader = styled.div`
  background: rgba(239, 68, 68, 0.12);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(239, 68, 68, 0.2);

  strong {
    color: #ef4444;
    font-size: 0.9rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    font-size: 0.8rem;
    color: var(--heading-color, inherit);
    opacity: 0.8;
    margin: 0.35rem 0 0;
  }
`;

export const ConflictTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.825rem;

  th {
    text-align: left;
    padding: 0.85rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    color: var(--heading-color, inherit);
    font-weight: 700;
    border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
    text-transform: uppercase;
    font-size: 0.725rem;
    letter-spacing: 0.05em;
  }

  td {
    padding: 0.85rem 1rem;
    color: var(--heading-color, inherit);
    border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.05));
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background: rgba(255, 255, 255, 0.02);
  }
`;

export const IssueText = styled.td`
  color: #ef4444 !important;
  font-weight: 600;
  font-size: 0.8rem;
`;

export const DeleteButton = styled.button`
  background: rgba(239, 68, 68, 0.12) !important;
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.25) !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

// ==========================================
// Loading State
// ==========================================

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--heading-color, inherit);
  opacity: 0.8;
`;
