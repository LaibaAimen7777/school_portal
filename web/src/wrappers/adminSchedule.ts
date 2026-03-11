import styled from "styled-components";

export const Container = styled.div`
  max-width: 1400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--bg-color);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--shadow-hover);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px dashed var(--border-color);
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
  border: none;
  padding: 0;
  box-shadow: none;
`;

export const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-full);
  background-color: var(--text-color);
  color: var(--bg-color);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--bg-color);
    color: var(--text-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow);
  }
`;

export const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background: linear-gradient(
    135deg,
    var(--bg-color) 0%,
    rgba(0, 0, 0, 0.02) 100%
  );
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FilterLabel = styled.label`
  font-weight: 600;
  color: var(--text-color);
`;

export const FilterSelect = styled.select`
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-full);
  background-color: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.2rem;

  &:focus {
    outline: none;
    border-width: 2px;
  }
`;

export const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const ScheduleCard = styled.div`
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  transition: var(--transition);
  background-color: var(--bg-color);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
  }
`;

export const CardHeader = styled.div`
  padding: 1rem;
  background: linear-gradient(135deg, var(--text-color) 0%, #333 100%);
  color: var(--bg-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DayBadge = styled.span<{ day: string }>`
  padding: 0.25rem 1rem;
  border-radius: var(--border-radius-full);
  background-color: var(--bg-color);
  color: var(--text-color);
  font-weight: 600;
  font-size: 0.9rem;
`;

export const TimeBadge = styled.span`
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 500;
`;

export const CardBody = styled.div`
  padding: 1rem;
`;

export const InfoRow = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
  padding: 0.25rem 0;
  border-bottom: 1px dashed var(--border-color);

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  width: 80px;
  font-weight: 600;
  color: var(--text-color);
  opacity: 0.7;
`;

export const InfoValue = styled.span`
  flex: 1;
  color: var(--text-color);
`;

export const TeacherName = styled(InfoValue)`
  font-weight: 500;
`;

export const SubjectName = styled(InfoValue)`
  font-style: italic;
`;

export const RoomName = styled(InfoValue)`
  font-family: var(--font-mono);
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  border: var(--border-width) dashed var(--border-color);
  border-radius: var(--border-radius-lg);

  p {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    border: none;
  }

  button {
    padding: 0.75rem 2rem;
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius-full);
    background-color: var(--text-color);
    color: var(--bg-color);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);

    &:hover {
      background-color: var(--bg-color);
      color: var(--text-color);
      transform: translateY(-2px);
      box-shadow: var(--shadow);
    }
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 2rem;

  .loading-dots {
    display: inline-flex;
    gap: 0.5rem;
    margin-bottom: 1rem;

    span {
      width: 12px;
      height: 12px;
      background-color: var(--text-color);
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
    border: none;
    color: var(--text-color);
    opacity: 0.7;
  }
`;

export const WeekView = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

export const DayColumn = styled.div`
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-color);
  min-height: 500px;
`;

export const DayTitle = styled.div`
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  border-bottom: var(--border-width) solid var(--border-color);
  background: linear-gradient(135deg, var(--text-color) 0%, #333 100%);
  color: var(--bg-color);
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
`;

export const TimeSlot = styled.div`
  padding: 1rem;
  margin: 0.5rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-md);
  background-color: var(--bg-color);
  transition: var(--transition);

  &:hover {
    transform: translateX(4px);
    box-shadow: var(--shadow);
    border-left-width: 4px;
  }
`;
