import styled from "styled-components";

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: var(--bg-secondary, #f9f8f3);
  color: var(--text-color, #1a1a1a);
  font-family: inherit;
`;

// ── Banner Navbar Header ─────────────────────────────────────────────────────
export const BannerHeader = styled.header`
  background-color: var(--accent-color, #f2b72b);
  padding: 12px 24px;
  border-bottom: 2px solid var(--border-color, #1a1a1a);
`;

export const BannerHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  gap: 16px;
`;

export const BrandSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
`;

export const LogoCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid var(--border-color, #1a1a1a);
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;

  img {
    object-fit: contain;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const NavTabsInline = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const PillButton = styled.button<{ $active?: boolean }>`
  background-color: var(--bg-color, #ffffff);
  color: var(--button-text, #1a1a1a);
  border: 2px solid var(--border-color, #1a1a1a);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 0.55rem 1.4rem;
  border-radius: 9999px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.$active
      ? "0 4px 0 var(--border-color, #1a1a1a)"
      : "0 2px 0 var(--border-color, #1a1a1a)"};
  transform: ${(props) => (props.$active ? "translateY(-1px)" : "none")};
  text-transform: uppercase;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 0 var(--border-color, #1a1a1a);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 0 var(--border-color, #1a1a1a);
  }
`;

export const LogoutPillButton = styled(PillButton)`
  &:hover {
    background-color: #fee2e2;
  }
`;

// ── Workspace & Hero Banner ──────────────────────────────────────────────────
export const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const BannerHeroCard = styled.div`
  background-color: var(--accent-color, #f2b72b);
  border: 2px solid var(--border-color, #1a1a1a);
  border-radius: 20px;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 0 var(--border-color, #1a1a1a);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeroAvatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 14px;
  background-color: var(--bg-color, #ffffff);
  border: 2px solid var(--border-color, #1a1a1a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 900;
  color: var(--heading-color, #1a1a1a);
  flex-shrink: 0;
  box-shadow: 0 3px 0 var(--border-color, #1a1a1a);
`;

export const HeroDetails = styled.div`
  flex: 1;

  h2 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 900;
    letter-spacing: 0.04em;
    color: var(--heading-color, #1a1a1a);
    text-transform: uppercase;
  }
`;

export const SubDetails = styled.p`
  margin: 4px 0 8px 0;
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--heading-color, #1a1a1a);
  opacity: 0.8;
  letter-spacing: 0.05em;
`;

export const BadgeGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

export const SubjectPill = styled.span`
  background: var(--bg-color, #ffffff);
  border: 1.5px solid var(--border-color, #1a1a1a);
  border-radius: 9999px;
  padding: 3px 12px;
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--heading-color, #1a1a1a);
  box-shadow: 0 2px 0 var(--border-color, #1a1a1a);
`;

export const DatePillCard = styled.div`
  background: var(--bg-color, #ffffff);
  border: 2px solid var(--border-color, #1a1a1a);
  border-radius: 16px;
  padding: 10px 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-shadow: 0 3px 0 var(--border-color, #1a1a1a);

  .date-label {
    font-size: 0.65rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    opacity: 0.6;
    margin-bottom: 2px;
  }

  .date-value {
    font-size: 0.85rem;
    font-weight: 800;
    color: var(--heading-color, #1a1a1a);
  }

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

export const ContentCard = styled.div`
  background: var(--bg-color, #ffffff);
  border: 2px solid var(--border-color, #1a1a1a);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 0 var(--border-color, #1a1a1a);
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 8px;
`;

export const StatCard = styled.div`
  background-color: var(--bg-color, #ffffff);
  border: 2px solid var(--border-color, #1a1a1a);
  border-radius: 16px;
  padding: 18px 20px;
  box-shadow: 0 4px 0 var(--border-color, #1a1a1a);
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 0 var(--border-color, #1a1a1a);
  }

  .label {
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    color: var(--text-color, #1a1a1a);
    opacity: 0.7;
    text-transform: uppercase;
  }

  .value {
    font-size: 1.6rem;
    font-weight: 900;
    color: var(--heading-color, #1a1a1a);
    word-break: break-word;
  }
`;

export const SectionCard = styled.section`
  background-color: var(--bg-color, #ffffff);
  border: 2px solid var(--border-color, #1a1a1a);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 0 var(--border-color, #1a1a1a);
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border-color, #1a1a1a);

  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 900;
    letter-spacing: 0.04em;
    color: var(--heading-color, #1a1a1a);
    text-transform: uppercase;
  }
`;

// ── Table Wrapper (Fallback or Standard View) ─────────────────────────────────
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 16px;

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;

    th {
      text-align: left;
      padding: 8px 16px;
      font-size: 0.72rem;
      font-weight: 900;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      opacity: 0.7;
    }

    td {
      padding: 12px 16px;
      font-weight: 800;
      font-size: 0.85rem;
      border-top: 2px solid var(--border-color, #1a1a1a);
      border-bottom: 2px solid var(--border-color, #1a1a1a);
      background-color: var(--bg-secondary, #f9f8f3);

      &:first-child {
        border-left: 2px solid var(--border-color, #1a1a1a);
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
      }

      &:last-child {
        border-right: 2px solid var(--border-color, #1a1a1a);
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
      }
    }
  }
`;

// ── Day Button (Pill selector for days of the week) ─────────────────────────
export const DayButton = styled.button<{ $active?: boolean }>`
  background-color: ${(props) =>
    props.$active
      ? "var(--accent-color, #f2b72b)"
      : "var(--bg-color, #ffffff)"};
  color: var(--button-text, #1a1a1a);
  border: 2px solid var(--border-color, #1a1a1a);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.15s ease;
  box-shadow: ${(props) =>
    props.$active
      ? "0 3px 0 var(--border-color, #1a1a1a)"
      : "0 2px 0 var(--border-color, #1a1a1a)"};
  transform: ${(props) => (props.$active ? "translateY(-1px)" : "none")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 0 var(--border-color, #1a1a1a);
    background-color: ${(props) =>
      props.$active ? "var(--accent-color, #f2b72b)" : "#fef3c7"};
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 0 var(--border-color, #1a1a1a);
  }
`;

// ── Badge Component (Tags, Grades, Status Indicators) ────────────────────────
export const Badge = styled.span<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: ${(props) =>
    props.$primary
      ? "var(--accent-color, #f2b72b)"
      : "var(--bg-color, #ffffff)"};
  color: var(--heading-color, #1a1a1a);
  border: 1.5px solid var(--border-color, #1a1a1a);
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  box-shadow: 0 2px 0 var(--border-color, #1a1a1a);

  &.id-badge {
    background-color: var(--bg-secondary, #f9f8f3);
    border-style: dashed;
    box-shadow: none;
  }
`;

// ── Group Wrapper for Badges/Day Buttons ─────────────────────────────────────

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  background-color: var(--bg-color, #ffffff);
  border: 2px solid var(--border-color, #1a1a1a);
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 0 var(--border-color, #1a1a1a);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 2px solid var(--border-color, #1a1a1a);
  background-color: var(--accent-color, #f2b72b);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--heading-color, #1a1a1a);
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 2px solid var(--border-color, #1a1a1a);
  background-color: var(--bg-secondary, #f9f8f3);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

// ── Attendance Modal Specific Components ──────────────────────────────────────

export const StudentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: var(--bg-secondary, #f9f8f3);
  border: 2px solid var(--border-color, #1a1a1a);
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.9rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const StatusButton = styled.button<{
  $status: "PRESENT" | "ABSENT" | "LATE" | "NONE";
  $active: boolean;
}>`
  background-color: ${(props) => {
    if (!props.$active) return "var(--bg-color, #ffffff)";
    if (props.$status === "PRESENT") return "#22c55e"; // Green
    if (props.$status === "ABSENT") return "#ef4444"; // Red
    if (props.$status === "LATE") return "#f59e0b"; // Orange
    return "var(--bg-color, #ffffff)";
  }};
  color: ${(props) =>
    props.$active ? "#ffffff" : "var(--text-color, #1a1a1a)"};
  border: 2px solid var(--border-color, #1a1a1a);
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 900;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.$active
      ? "0 2px 0 var(--border-color, #1a1a1a)"
      : "0 3px 0 var(--border-color, #1a1a1a)"};
  transform: ${(props) => (props.$active ? "translateY(1px)" : "none")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 0 var(--border-color, #1a1a1a);
  }
`;

export const CancelButton = styled.button`
  background-color: var(--bg-color, #ffffff);
  color: var(--button-text, #1a1a1a);
  border: 2px solid var(--border-color, #1a1a1a);
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 0.6rem 1.4rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 0 var(--border-color, #1a1a1a);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 0 var(--border-color, #1a1a1a);
    background-color: #fee2e2;
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 0 var(--border-color, #1a1a1a);
  }
`;

export const SubmitButton = styled(CancelButton)`
  background-color: var(--accent-color, #f2b72b);

  &:hover {
    background-color: #fbbf24;
  }
`;

export const DaySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 16px;
  margin-bottom: 24px;
`;

export const StudentCount = styled.span`
  background: var(--bg-secondary, #f9f8f3);
  border: 1.5px solid var(--border-color, #1a1a1a);
  color: var(--heading-color, #1a1a1a);
  border-radius: 9999px;
  padding: 3px 10px;
  font-size: 0.72rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 0 var(--border-color, #1a1a1a);
`;

// ── Students Page Components ──────────────────────────────────────────────────

export const SearchInput = styled.input`
  background-color: var(--bg-secondary, #f9f8f3);
  color: var(--text-color, #1a1a1a);
  border: 2px solid var(--border-color, #1a1a1a);
  border-radius: 9999px;
  padding: 10px 18px;
  font-size: 0.85rem;
  font-weight: 700;
  outline: none;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 2px 0 var(--border-color, #1a1a1a);
  transition: all 0.2s ease;

  &:focus {
    box-shadow: 0 4px 0 var(--border-color, #1a1a1a);
    background-color: var(--bg-color, #ffffff);
  }

  &::placeholder {
    color: var(--text-color, #1a1a1a);
    opacity: 0.5;
  }
`;

export const StudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

export const StudentCard = styled.div`
  background-color: var(--bg-color, #ffffff);
  border: 2px solid var(--border-color, #1a1a1a);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 0 var(--border-color, #1a1a1a);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 0 var(--border-color, #1a1a1a);
  }
`;

export const StudentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StudentInitials = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: var(--accent-color, #f2b72b);
  border: 2px solid var(--border-color, #1a1a1a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--heading-color, #1a1a1a);
  box-shadow: 0 2px 0 var(--border-color, #1a1a1a);
  flex-shrink: 0;
`;

export const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 900;
    text-transform: uppercase;
    color: var(--heading-color, #1a1a1a);
  }

  span {
    font-size: 0.75rem;
    font-weight: 800;
    opacity: 0.7;
  }
`;

export const StudentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 10px;
  border-top: 1.5px dashed var(--border-color, #1a1a1a);
  font-size: 0.8rem;
  font-weight: 800;
`;

export const ParentInfo = styled.div`
  background-color: var(--bg-secondary, #f9f8f3);
  border: 1.5px solid var(--border-color, #1a1a1a);
  border-radius: 10px;
  padding: 8px 12px;
  margin-top: 4px;
  font-size: 0.75rem;

  .parent-label {
    font-size: 0.65rem;
    font-weight: 900;
    opacity: 0.6;
    text-transform: uppercase;
    display: block;
    margin-bottom: 2px;
  }

  .parent-name {
    font-weight: 800;
    color: var(--heading-color, #1a1a1a);
  }
`;
