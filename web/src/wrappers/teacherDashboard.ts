import styled from "styled-components";

export const DashboardContainer = styled.div`
  min-height: 100vh;
  /* 1. Base fallback color in case the image is slow to load */
  background-color: var(--bg-secondary, #f8fafc);

  /* 2. Softened tint overlay (Light mode friendly) */
  background-image:
    linear-gradient(
      var(--bg-image-tint, rgba(248, 250, 252, 0.88)),
      var(--bg-image-tint, rgba(248, 250, 252, 0.88))
    ),
    url("/images/teachBackground.gif");

  /* 3. 'cover' prevents screen gaps; 'fixed' stays smooth while scrolling */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  color: var(--text-color, #0f172a);
  font-family: inherit;
`;

// ── Banner Navbar Header ─────────────────────────────────────────────────────
export const BannerHeader = styled.header`
  background-color: var(--accent-color, #f2b72b);
  padding: 12px 24px;
  border-bottom: 1px solid black;
`;

export const BannerHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1300px;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.4);

  img {
    object-fit: contain;
    border: 1px solid black;

    border-radius: 30px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #64748b;
`;

export const NavTabsInline = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const PillButton = styled.button<{ $active?: boolean }>`
  background-color: ${(props) =>
    props.$active ? "#173f2e" : "var(--bg-color, #ffffff)"};
  color: ${(props) => (props.$active ? "#ffffff" : "var(--button-text)")};
  border: 1px solid ${(props) => (props.$active ? "#0f172a" : "#cbd5e1")};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: var(--button-hover);
    border-color: ${(props) => (props.$active ? "#1e293b" : "#94a3b8")};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const LogoutPillButton = styled(PillButton)`
  background-color: var(--bg-secondary);
  color: var(--button-text);
  border: 2px solid var(--border-color);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  padding: 0.65rem 1.75rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 0 var(--border-color);

  display: inline-flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 16px;
    height: 16px;
    stroke-width: 2.5;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 0 var(--border-color);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 0 var(--border-color);
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
  border: 1px solid black;
  border-radius: 16px;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeroAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background-color: var(--bg-color, #ffffff);
  border: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--heading-color, #1a1a1a);
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const HeroDetails = styled.div`
  flex: 1;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--heading-color, #1a1a1a);
  }
`;

export const SubDetails = styled.p`
  margin: 4px 0 8px 0;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--heading-color, #1a1a1a);
  opacity: 0.85;
`;

export const BadgeGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

export const SubjectPill = styled.span`
  background: var(--bg-color, #ffffff);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 9999px;
  padding: 3px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--heading-color, #1a1a1a);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;

export const DatePillCard = styled.div`
  background: var(--bg-color, #ffffff);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 10px 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  .date-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 2px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .date-value {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--heading-color, #1a1a1a);
  }

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

export const ContentCard = styled.div`
  background: var(--bg-color, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 8px;
`;

export const StatCard = styled.div`
  background-color: var(--bg-color, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 12px;
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }

  .label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    color: #64748b;
    text-transform: uppercase;
  }

  .value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--heading-color, #0f172a);
    word-break: break-word;
  }
`;

export const SectionCard = styled.section`
  background-color: var(--bg-color, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-color, #e2e8f0);

  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--heading-color, #0f172a);
  }
`;

// ── Table Wrapper ─────────────────────────────────────────────────────────────
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 16px;

  table {
    width: 100%;
    border-collapse: collapse;

    th {
      text-align: left;
      padding: 10px 16px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: #64748b;
      text-transform: uppercase;
      border-bottom: 1px solid var(--border-color, #e2e8f0);
    }

    td {
      padding: 14px 16px;
      font-weight: 500;
      font-size: 0.875rem;
      color: #334155;
      border-bottom: 1px solid var(--border-color, #f1f5f9);
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background-color: #f8fafc;
    }
  }
`;

// ── Day Button ───────────────────────────────────────────────────────────────
export const DayButton = styled.button<{ $active?: boolean }>`
  background-color: ${(props) =>
    props.$active
      ? "var(--accent-color, #f2b72b)"
      : "var(--bg-color, #ffffff)"};
  color: var(--button-text, #1a1a1a);
  border: 1px solid
    ${(props) => (props.$active ? "var(--accent-color, #f2b72b)" : "#cbd5e1")};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.45rem 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  &:hover {
    border-color: #94a3b8;
    /* background-color: ${(props) =>
      props.$active ? "var(--accent-color, #f2b72b)" : "#f8fafc"}; */
    background-color: var(--accent-color);
  }
`;

// ── Badge Component ──────────────────────────────────────────────────────────
export const Badge = styled.span<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: ${(props) =>
    props.$primary ? "var(--accent-color, #f2b72b)" : "#f1f5f9"};
  color: var(--heading-color, #0f172a);
  border: 1px solid
    ${(props) => (props.$primary ? "rgba(0, 0, 0, 0.08)" : "#e2e8f0")};
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 0.75rem;
  font-weight: 600;

  &.id-badge {
    background-color: transparent;
    border-style: dashed;
    border-color: #cbd5e1;
    color: #64748b;
  }
`;

// ── Modal Overlay & Container ────────────────────────────────────────────────
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  background-color: var(--bg-color, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 18px 24px;
  border-bottom: 1px solid var(--border-color, #e2e8f0);
  background-color: var(--accent-color, #f2b72b);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
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
  border-top: 1px solid var(--border-color, #e2e8f0);
  background-color: var(--bg-secondary, #f8fafc);
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
  background-color: var(--bg-color, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;

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
    if (props.$status === "PRESENT") return "#22c55e";
    if (props.$status === "ABSENT") return "#891e1e";
    if (props.$status === "LATE") return "#f59e0b";
    return "var(--bg-color, #ffffff)";
  }};
  color: ${(props) =>
    props.$active ? "#ffffff" : "var(--text-color, #475569)"};
  border: 1px solid ${(props) => (props.$active ? "transparent" : "#cbd5e1")};
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #94a3b8;
  }
`;

export const CancelButton = styled.button`
  background-color: var(--bg-color, #ffffff);
  color: var(--button-text, #334155);
  border: 1px solid #cbd5e1;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
  }
`;

export const SubmitButton = styled(CancelButton)`
  background-color: var(--accent-color, #f2b72b);
  border-color: rgba(0, 0, 0, 0.1);
  color: #1a1a1a;

  &:hover {
    background-color: #eab308;
  }
`;

export const DaySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
  margin-bottom: 20px;
`;

export const StudentCount = styled.span`
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: var(--heading-color, #334155);
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

// ── Students Page Components ──────────────────────────────────────────────────
export const SearchInput = styled.input`
  background-color: var(--bg-color, #ffffff);
  color: var(--text-color, #0f172a);
  border: 1px solid var(--border-color, #cbd5e1);
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 0.875rem;
  font-weight: 500;
  outline: none;
  width: 100%;
  max-width: 320px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: #0f172a;
    box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
  }

  &::placeholder {
    color: #94a3b8;
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
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
`;

export const StudentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StudentInitials = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background-color: var(--accent-color, #f2b72b);
  border: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  color: var(--heading-color, #1a1a1a);
  flex-shrink: 0;
`;

export const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--heading-color, #0f172a);
  }

  span {
    font-size: 0.75rem;
    font-weight: 500;
    color: #64748b;
  }
`;

export const StudentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 10px;
  border-top: 1px solid #f1f5f9;
  font-size: 0.825rem;
  font-weight: 500;
  color: #475569;
`;

export const ParentInfo = styled.div`
  background-color: var(--bg-secondary, #f8fafc);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 8px;
  padding: 8px 12px;
  margin-top: 4px;
  font-size: 0.75rem;

  .parent-label {
    font-size: 0.65rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    display: block;
    margin-bottom: 2px;
  }

  .parent-name {
    font-weight: 600;
    color: var(--heading-color, #0f172a);
  }
`;
