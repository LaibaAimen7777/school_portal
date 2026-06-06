import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background-color: var(--bg-secondary);
  font-family: var(--font-main);
`;

export const Header = styled.div`
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  padding: var(--spacing-xl) var(--spacing-2xl);

  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }
`;

export const HeaderContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const HeaderLabel = styled.p`
  margin: 0 0 var(--spacing-xs);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--text-color);
  opacity: 0.6;
  text-transform: uppercase;
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--heading-color);
`;

export const MainContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);

  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }
`;

export const ChildSwitcher = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
`;

export const ChildButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--accent-color)" : "var(--border-color)"};
  background: ${(props) =>
    props.$active ? "var(--accent-color)" : "var(--bg-color)"};
  color: ${(props) =>
    props.$active ? "var(--button-text)" : "var(--text-color)"};
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
  }
`;

export const ChildHeader = styled.div`
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
`;

export const ChildAvatar = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: var(--accent-color);
  color: var(--button-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
`;

export const ChildInfo = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 var(--spacing-xs);
    font-size: 1rem;
    font-weight: 600;
    color: var(--heading-color);
  }

  p {
    margin: 0;
    font-size: 0.75rem;
    color: var(--text-color);
    opacity: 0.7;
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: var(--spacing-xl);
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatValue = styled.div<{ $color?: string }>`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${(props) => props.$color || "var(--heading-color)"};
`;

export const StatLabel = styled.div`
  font-size: 0.65rem;
  color: var(--text-color);
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-lg);
  background: var(--bg-color);
  padding: var(--spacing-xs);
  border-radius: 12px;
  border: 1px solid var(--border-color);
`;

export const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: none;
  background: ${(props) =>
    props.$active ? "var(--accent-color)" : "transparent"};
  color: ${(props) =>
    props.$active ? "var(--button-text)" : "var(--text-color)"};
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    opacity: 0.8;
  }
`;

export const TabPanel = styled.div`
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
`;

export const EmptyState = styled.div`
  padding: var(--spacing-2xl);
  text-align: center;
  color: var(--text-color);
  opacity: 0.6;
  font-size: 0.85rem;
`;

export const ScheduleDay = styled.div`
  margin-bottom: var(--spacing-xl);
`;

export const ScheduleDayTitle = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--text-color);
  opacity: 0.5;
  text-transform: uppercase;
  margin-bottom: var(--spacing-sm);
`;

export const ScheduleItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  border-radius: 10px;
  margin-bottom: var(--spacing-xs);
  border: 1px solid var(--border-color);

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ScheduleTime = styled.div`
  font-size: 0.75rem;
  color: var(--text-color);
  opacity: 0.7;
  min-width: 100px;
`;

export const ScheduleSubject = styled.div`
  font-weight: 600;
  font-size: 0.85rem;
  flex: 1;
  color: var(--heading-color);
`;

export const ScheduleTeacher = styled.div`
  font-size: 0.8rem;
  color: var(--text-color);
  opacity: 0.7;
`;

export const RoomBadge = styled.span`
  font-size: 0.7rem;
  padding: 0.2rem 0.6rem;
  background: var(--bg-secondary);
  border-radius: 6px;
  color: var(--text-color);
  border: 1px solid var(--border-color);
`;

export const TeachersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
`;

export const TeacherCard = styled.div`
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: var(--transition);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
  }
`;

export const TeacherAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--accent-color);
  color: var(--button-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.8rem;
  flex-shrink: 0;
`;

export const TeacherInfo = styled.div`
  flex: 1;

  h4 {
    margin: 0 0 var(--spacing-xs);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--heading-color);
  }
`;

export const SubjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
`;

export const SubjectTag = styled.span`
  font-size: 0.65rem;
  padding: 0.2rem 0.6rem;
  background: var(--bg-secondary);
  border-radius: 6px;
  color: var(--text-color);
`;

export const AttendanceSection = styled.div`
  padding: var(--spacing-xl);
`;

export const ProgressBarContainer = styled.div`
  margin-bottom: var(--spacing-xl);
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
  font-size: 0.8rem;
`;

export const ProgressLabel = styled.span`
  font-weight: 500;
  color: var(--heading-color);
`;

export const ProgressPercent = styled.span<{ $color: string }>`
  font-weight: 700;
  color: ${(props) => props.$color};
`;

export const ProgressBar = styled.div`
  height: 8px;
  background: var(--bg-secondary);
  border-radius: 10px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  width: ${(props) => props.$width}%;
  background: ${(props) => props.$color};
  border-radius: 10px;
  transition: width 0.5s ease;
`;

export const AttendanceStats = styled.div`
  display: flex;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  font-size: 0.8rem;
`;

export const AttendanceStat = styled.span`
  strong {
    color: var(--heading-color);
  }
`;

export const RecentTitle = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--text-color);
  opacity: 0.5;
  text-transform: uppercase;
  margin-bottom: var(--spacing-md);
`;

export const AttendanceRecord = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: 0.6rem 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  margin-bottom: var(--spacing-xs);
`;

export const AttendanceDate = styled.div`
  font-size: 0.75rem;
  color: var(--text-color);
  opacity: 0.7;
  min-width: 100px;
`;

export const AttendanceSubject = styled.div`
  flex: 1;
  font-size: 0.8rem;
  color: var(--text-color);
`;

export const AttendanceStatus = styled.span<{ $status: "PRESENT" | "ABSENT" }>`
  font-size: 0.7rem;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-weight: 600;
  background: ${(props) =>
    props.$status === "PRESENT"
      ? "rgba(34, 197, 94, 0.15)"
      : "rgba(239, 68, 68, 0.15)"};
  color: ${(props) => (props.$status === "PRESENT" ? "#22c55e" : "#ef4444")};
`;

export const MarksTable = styled.div`
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;

  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: var(--text-color);
    opacity: 0.6;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid var(--border-color);
  }

  td {
    padding: 0.8rem 1rem;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-color);
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

export const ScoreCell = styled.span<{ $score: number }>`
  font-weight: 700;
  font-size: 0.9rem;
  color: ${(props) => {
    if (props.$score >= 80) return "#22c55e";
    if (props.$score >= 60) return "#f59e0b";
    return "#ef4444";
  }};
`;

export const LoadingScreen = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.7;
`;

export const ErrorScreen = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  font-size: 0.9rem;
  color: #ef4444;
`;
