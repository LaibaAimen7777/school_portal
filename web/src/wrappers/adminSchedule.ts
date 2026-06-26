import styled from "styled-components";

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-xl);
  background-color: var(--bg-secondary);
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-md);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
  gap: var(--spacing-md);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--heading-color);
  margin: 0;
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
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
    box-shadow: var(--shadow);
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
`;

export const StatCard = styled.div`
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  min-width: 120px;

  .value {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--heading-color);
    display: block;
  }

  .label {
    font-size: 0.65rem;
    color: var(--text-color);
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  align-items: center;
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

export const FilterLabel = styled.label`
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-color);
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const FilterSelect = styled.select`
  padding: 0.4rem 2rem 0.4rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 0.8rem;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

export const ClearButton = styled.button`
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 0.75rem;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background: var(--bg-secondary);
  }
`;

export const GridView = styled.div`
  overflow-x: auto;
`;

export const WarningText = styled.p`
  font-size: 0.75rem;
  color: #f59e0b;
  margin-bottom: var(--spacing-sm);
`;

export const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(5, minmax(140px, 1fr));
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg-color);
  min-width: 780px;
`;

export const GridHeader = styled.div`
  background: var(--bg-secondary);
  padding: 0.75rem 0.5rem;
  font-weight: 600;
  text-align: center;
  font-size: 0.75rem;
  color: var(--heading-color);
  border-left: 1px solid var(--border-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:first-child {
    border-left: none;
  }
`;

export const TimeLabel = styled.div`
  padding: 0.75rem 0.5rem;
  font-size: 0.7rem;
  color: var(--text-color);
  opacity: 0.6;
  font-weight: 500;
  text-align: center;
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 1rem;
`;

export const Cell = styled.div`
  border-top: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
  min-height: 90px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const SlotCard = styled.div<{ $color: string }>`
  background: var(--bg-color);
  border-radius: 8px;
  padding: 0.5rem 0.6rem;
  font-size: 0.7rem;
  position: relative;
  border-left: 3px solid ${(props) => props.$color};
  box-shadow: var(--shadow-sm);
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
  }

  .subject {
    font-weight: 600;
    color: var(--heading-color);
    font-size: 0.75rem;
    margin-bottom: 2px;
    padding-right: 20px;
  }

  .class {
    color: var(--text-color);
    font-size: 0.65rem;
    opacity: 0.7;
  }

  .teacher {
    color: var(--text-color);
    font-size: 0.6rem;
    opacity: 0.6;
  }

  .room {
    color: var(--text-color);
    font-size: 0.55rem;
    opacity: 0.5;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 2px;
  right: 4px;
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 0.6rem;
  padding: 2px;
  border-radius: 4px;
  transition: var(--transition);

  &:hover {
    background: rgba(239, 68, 68, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AddSlotButton = styled.button`
  width: 100%;
  min-height: 78px;
  border: 1px dashed var(--border-color);
  border-radius: 6px;
  background: none;
  color: var(--border-color);
  cursor: pointer;
  font-size: 1.2rem;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
  }
`;

export const WeekView = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
`;

export const DayColumn = styled.div`
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  min-height: 400px;
`;

export const DayTitle = styled.div`
  padding: 0.75rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.85rem;
  background: var(--accent-color);
  color: var(--button-text);
`;

export const DayContent = styled.div`
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const WeekSlotCard = styled.div<{
  $bg: string;
  $border: string;
  $text: string;
}>`
  background: ${(props) => props.$bg};
  border: 1px solid ${(props) => props.$border};
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  position: relative;
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
  }

  .time {
    font-size: 0.6rem;
    color: var(--text-color);
    opacity: 0.6;
    font-weight: 500;
    margin-bottom: 2px;
  }

  .subject {
    font-weight: 600;
    color: ${(props) => props.$text};
    font-size: 0.8rem;
  }

  .class {
    font-size: 0.65rem;
    color: var(--text-color);
    opacity: 0.7;
  }

  .teacher {
    font-size: 0.6rem;
    color: var(--text-color);
    opacity: 0.6;
  }

  .room {
    font-size: 0.55rem;
    color: var(--text-color);
    opacity: 0.5;
  }
`;

export const WeekDeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 0.6rem;
  padding: 2px 4px;
  border-radius: 4px;
  transition: var(--transition);

  &:hover {
    background: rgba(239, 68, 68, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const EmptyDay = styled.div`
  padding: 1rem;
  text-align: center;
  color: var(--text-color);
  opacity: 0.4;
  border: 1px dashed var(--border-color);
  border-radius: 8px;
  font-size: 0.75rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-2xl);
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);

  p {
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.6;
    margin-bottom: var(--spacing-md);
  }

  button {
    padding: 0.6rem 1.25rem;
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
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: var(--spacing-2xl);
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);

  .loading-dots {
    display: inline-flex;
    gap: 0.5rem;
    margin-bottom: var(--spacing-md);

    span {
      width: 10px;
      height: 10px;
      background: var(--accent-color);
      border-radius: 50%;
      animation: pulse 1.4s ease-in-out infinite;

      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
  }

  p {
    font-size: 0.85rem;
    color: var(--text-color);
    opacity: 0.6;
    margin: 0;
  }
`;
