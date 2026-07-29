import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background-color: var(--bg-secondary, #f5f5f0);
  color: var(--text-color);
`;

export const BannerHeader = styled.header`
  background-color: var(--accent-color, #f2b72b);
  padding: 16px 32px;
  border-bottom: 2px solid var(--border-color, #e0a31c);
`;

export const BannerHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Spacing out brand and logout btn */
  max-width: 1200px;
  margin: 0 auto;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid black 1px;
  border-radius: 30px;

  img {
    object-fit: contain;
    border-radius: 30px;
  }
`;

export const BannerTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--button-text, #1a1a1a);
  letter-spacing: 0.05em;
  margin: 0;
`;

export const MainContent = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: var(--spacing-xl, 24px) var(--spacing-lg, 16px);

  @media (max-width: 768px) {
    padding: var(--spacing-lg, 16px);
  }
`;

export const ParentSummaryCard = styled.div`
  background-color: var(--accent-color, #f2b72b);
  border: 1px solid var(--border-color, #d99f18);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: var(--shadow, 0 4px 6px -1px rgba(0, 0, 0, 0.05));
`;

export const ParentAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: var(--bg-color, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 36px;
    height: 36px;
    color: var(--heading-color, #333333);
  }
`;

export const ParentDetails = styled.div`
  flex: 1;
  z-index: 1;

  h2 {
    margin: 0 0 6px 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--button-text, #1a1a1a);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--button-text, #333333);
    font-weight: 600;
    text-transform: uppercase;
    opacity: 0.9;
  }
`;

export const IllustrationWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;

  img {
    height: 130px;
    object-fit: contain;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

export const ChildSwitcher = styled.div`
  display: flex;
  gap: var(--spacing-sm, 8px);
  margin-bottom: var(--spacing-xl, 24px);
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
  transition: var(--transition, all 0.2s ease);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
  }
`;

export const ChildHeader = styled.div`
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  padding: var(--spacing-xl, 24px);
  margin-bottom: var(--spacing-xl, 24px);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg, 16px);
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
    margin: 0 0 var(--spacing-xs, 4px);
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
  gap: var(--spacing-xl, 24px);
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
  gap: var(--spacing-xs, 4px);
  margin-bottom: var(--spacing-lg, 16px);
  background: var(--bg-color);
  padding: var(--spacing-xs, 4px);
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
  transition: var(--transition, all 0.2s ease);

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
  padding: var(--spacing-2xl, 32px);
  text-align: center;
  color: var(--text-color);
  opacity: 0.6;
  font-size: 0.85rem;
`;

export const ScheduleWrapper = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ScheduleDay = styled.div`
  margin-bottom: var(--spacing-xl, 24px);
`;

export const ScheduleDayTitle = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--text-color);
  opacity: 0.5;
  text-transform: uppercase;
  margin-bottom: var(--spacing-sm, 8px);
`;

export const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ScheduleItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md, 12px);
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  border-radius: 10px;
  margin-bottom: var(--spacing-xs, 4px);
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
  gap: var(--spacing-md, 12px);
  padding: var(--spacing-xl, 24px);
`;

export const TeacherCard = styled.div`
  display: flex;
  gap: var(--spacing-md, 12px);
  padding: var(--spacing-md, 12px);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-color);
  transition: var(--transition, all 0.2s ease);

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
    margin: 0 0 var(--spacing-xs, 4px);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--heading-color);
  }
`;

export const SubjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs, 4px);
`;

export const SubjectTag = styled.span`
  font-size: 0.65rem;
  padding: 0.2rem 0.6rem;
  background: var(--bg-secondary);
  border-radius: 6px;
  color: var(--text-color);
  border: 1px solid var(--border-color);
`;

export const AttendanceSection = styled.div`
  padding: var(--spacing-xl, 24px);
`;

export const ProgressBarContainer = styled.div`
  margin-bottom: var(--spacing-xl, 24px);
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm, 8px);
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
  gap: var(--spacing-xl, 24px);
  margin-bottom: var(--spacing-xl, 24px);
  font-size: 0.8rem;
  color: var(--text-color);
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
  margin-bottom: var(--spacing-md, 12px);
`;

export const AttendanceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AttendanceRecord = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md, 12px);
  padding: 0.6rem 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
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
  color: var(--heading-color);
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

export const WarningBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: var(--bg-secondary);
  border: 1px solid var(--accent-color);
  border-radius: 12px;
  margin-bottom: 24px;
`;

export const WarningMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--heading-color);
  font-weight: 500;
  font-size: 0.95rem;
`;

export const WarningIcon = styled.span`
  font-size: 1.1rem;
`;

export const BannerButton = styled.button`
  padding: 8px 16px;
  background: var(--accent-color);
  color: var(--button-text);
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`;

export const ModalCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  padding: 28px;
  border-radius: 16px;
  box-shadow: var(--shadow);
`;

export const ModalHeader = styled.div`
  margin-bottom: 20px;

  h3 {
    margin: 0 0 6px 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--heading-color);
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--text-color);
    opacity: 0.7;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--heading-color);
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  background: var(--bg-secondary);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s ease;

  &:focus {
    border-color: var(--accent-color);
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

export const PrimaryButton = styled.button`
  flex: 1;
  padding: 10px;
  background: var(--accent-color);
  color: var(--button-text);
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  flex: 1;
  padding: 10px;
  background: var(--bg-secondary);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const ModalError = styled.div`
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 8px;
`;

export const LogoBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(0, 0, 0, 0.1);
  color: var(--button-text, #1a1a1a);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition, all 0.2s ease);

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
