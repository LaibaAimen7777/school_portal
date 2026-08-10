import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Header = styled.div`
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
    font-size: 1.4rem;
  }
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--accent-color, #2563eb);
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

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

export const StatCard = styled.div`
  background: var(--bg-portal, rgba(255, 255, 255, 0.03)) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08)) !important;
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.06);

  .stat-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: rgba(37, 99, 235, 0.12);
    color: var(--accent-color, #3b82f6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }

  .stat-info {
    display: flex;
    flex-direction: column;

    .value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--heading-color, inherit);
      line-height: 1.2;
    }

    .label {
      font-size: 0.8rem;
      color: var(--heading-color, inherit);
      opacity: 0.7;
      font-weight: 500;
    }
  }
`;

export const FilterSection = styled.div`
  background: var(--bg-portal, rgba(255, 255, 255, 0.03)) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08)) !important;
  border-radius: 16px;
  padding: 1rem 1.25rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.06);
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FilterLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--heading-color, inherit);
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 0.35rem;

  svg {
    opacity: 0.6;
  }
`;

export const FilterSelect = styled.select`
  padding: 0.55rem 0.85rem;
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
  border-radius: 10px;
  font-size: 0.85rem;
  background: rgba(255, 255, 255, 0.05) !important;
  color: var(--heading-color, inherit);
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  option {
    background: #1e293b;
    color: #ffffff;
  }

  &:focus {
    border-color: var(--accent-color, #2563eb);
  }
`;

export const ClearButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.85rem;
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.25);
  background: rgba(239, 68, 68, 0.08) !important;
  color: #ef4444;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: auto;

  &:hover {
    background: rgba(239, 68, 68, 0.18) !important;
  }
`;

export const WarningText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #f59e0b;
  padding: 0.85rem 1.25rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

export const GridView = styled.div`
  width: 100%;
  overflow-x: auto;
  background: var(--bg-portal, rgba(255, 255, 255, 0.03)) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08)) !important;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
`;

export const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(5, minmax(180px, 1fr));
  gap: 0.75rem;
`;

export const GridHeader = styled.div`
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--heading-color, inherit);
  opacity: 0.8;
  text-align: center;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
`;

export const TimeLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: monospace;
  color: var(--heading-color, inherit);
  opacity: 0.75;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
`;

export const Cell = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.35rem;
  background: rgba(255, 255, 255, 0.015);
  border: 1px dashed var(--border-color, rgba(255, 255, 255, 0.06));
  border-radius: 10px;
  position: relative;
`;

export const SlotCard = styled.div<{ $color?: string }>`
  position: relative;
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-left: 4px solid
    ${(props) => props.$color || "var(--accent-color, #3b82f6)"};
  border-radius: 10px;
  padding: 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 0.08) !important;
  }

  .subject {
    font-weight: 700;
    font-size: 0.85rem;
    color: var(--heading-color, inherit);
  }

  .class {
    font-size: 0.75rem;
    font-weight: 600;
    opacity: 0.85;
    color: var(--accent-color, #3b82f6);
  }

  .teacher {
    font-size: 0.75rem;
    opacity: 0.75;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .room {
    font-size: 0.7rem;
    opacity: 0.6;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 0.35rem;
  right: 0.35rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;

  ${SlotCard}:hover & {
    opacity: 1;
  }

  &:hover {
    background: #ef4444;
    color: #ffffff;
  }
`;

export const AddSlotButton = styled.button`
  width: 100%;
  height: 100%;
  min-height: 80px;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  background: transparent;
  color: var(--heading-color, inherit);
  opacity: 0.3;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.9;
    border-color: var(--accent-color, #3b82f6);
    color: var(--accent-color, #3b82f6);
    background: rgba(37, 99, 235, 0.05);
  }
`;

export const WeekView = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.25rem;
`;

export const DayColumn = styled.div`
  background: var(--bg-portal, rgba(255, 255, 255, 0.03)) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08)) !important;
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.06);
`;

export const DayTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
  color: var(--heading-color, inherit);
  opacity: 0.9;
  text-align: center;
`;

export const DayContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .empty-day {
    text-align: center;
    padding: 2rem 0;
    font-size: 0.85rem;
    opacity: 0.4;
  }
`;

export const WeekSlotCard = styled.div<{
  $bg?: string;
  $border?: string;
  $text?: string;
}>`
  position: relative;
  background: rgba(255, 255, 255, 0.04) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 4px solid
    ${(props) => props.$text || "var(--accent-color, #3b82f6)"};
  border-radius: 12px;
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.07) !important;
  }

  .time {
    font-family: monospace;
    font-size: 0.75rem;
    font-weight: 600;
    opacity: 0.75;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .subject {
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--heading-color, inherit);
  }

  .class {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent-color, #3b82f6);
  }

  .teacher {
    font-size: 0.8rem;
    opacity: 0.75;
  }

  .room {
    font-size: 0.75rem;
    opacity: 0.6;
  }
`;

export const WeekDeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;

  ${WeekSlotCard}:hover & {
    opacity: 1;
  }

  &:hover {
    background: #ef4444;
    color: #ffffff;
  }
`;

export const EmptyState = styled.div`
  background: var(--bg-portal, rgba(255, 255, 255, 0.03)) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08)) !important;
  border-radius: 16px;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);

  svg {
    font-size: 2.5rem;
    opacity: 0.4;
    color: var(--heading-color, inherit);
  }

  p {
    font-size: 0.95rem;
    opacity: 0.6;
    margin: 0;
  }

  button {
    background: var(--accent-color, #2563eb);
    color: #ffffff;
    border: none;
    border-radius: 10px;
    padding: 0.6rem 1.2rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
`;

export const DeleteModal = styled.div`
  width: 420px;
  max-width: 100%;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;

  h3 {
    margin: 0;
    font-size: 1.2rem;
  }

  p {
    margin: 0.35rem 0 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

export const ModalCloseButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
  color: #777;

  &:hover {
    color: #111;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;

  .warning-icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: #fff3cd;
    color: #eeb22d;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  p {
    margin: 0;
    color: #444;
    line-height: 1.5;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const CancelButton = styled.button`
  padding: 0.65rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #333;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

export const ConfirmDeleteButton = styled.button`
  padding: 0.65rem 1rem;
  border: none;
  border-radius: 8px;
  background: #dc3545;
  color: white;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;
