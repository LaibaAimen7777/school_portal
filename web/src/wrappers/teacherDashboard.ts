import styled from "styled-components";

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: var(--bg-color);
  font-family:
    var(--font-main),
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
`;

/* ==========================================
   ✨ PREMIUM MINIMAL TOP NAV
   ========================================== */

export const NavWrapper = styled.nav`
  width: 100%;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

export const NavContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 1.25rem;
    height: auto;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 0.75rem;
  }
`;

export const BrandGroup = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;

  .brand-icon {
    font-size: 1.35rem;
  }

  .brand-name {
    font-size: 1rem;
    font-weight: 800;
    color: var(--heading-color);
    letter-spacing: -0.3px;
  }
`;

export const NavLinksList = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.75rem;
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    gap: 0;
    border-top: 1px solid var(--border-color);
  }
`;

export const NavLinkItem = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
`;

export const TopNavLink = styled.a<{ $active?: boolean }>`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${(props) =>
    props.$active ? "var(--heading-color)" : "var(--text-color)"};
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  position: relative;
  opacity: ${(props) => (props.$active ? "1" : "0.65")};
  transition: all 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: -1px; /* Aligns line flush perfectly with wrapper border bottom */
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--accent-color);
    transform: ${(props) => (props.$active ? "scaleX(1)" : "scaleX(0)")};
    transition: transform 0.2s ease;
  }

  &:hover {
    opacity: 1;
    color: var(--heading-color);

    &::after {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;

    &::after {
      bottom: 0;
    }
  }
`;

export const NavRightStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-color);
  opacity: 0.7;

  .status-dot {
    width: 6px;
    height: 6px;
    background-color: #22c55e;
    border-radius: 50%;
    box-shadow: 0 0 8px #22c55e;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ==========================================
   💻 WORKSPACE & HERO CONTAINERS
   ========================================== */

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

export const HeaderCard = styled.div`
  background: linear-gradient(
    135deg,
    var(--bg-color) 0%,
    var(--bg-secondary) 100%
  );
  border-radius: 24px;
  border: 1px solid var(--border-color);
  padding: 2.5rem;
  margin-bottom: var(--spacing-xl);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 280px;
    height: 100%;
    background: linear-gradient(
      225deg,
      rgba(var(--accent-color-rgb, 99, 102, 241), 0.03) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 1.75rem;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
`;

export const TeacherInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-color) 0%, #4f46e5 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  box-shadow: 0 8px 20px -6px rgba(var(--accent-color-rgb, 99, 102, 241), 0.3);
`;

export const TeacherDetails = styled.div`
  .welcome-tag {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--accent-color);
    margin-bottom: 0.25rem;
  }

  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--heading-color);
    letter-spacing: -0.5px;
  }
`;

export const BadgeGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const Badge = styled.span<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.85rem;
  background: ${(props) =>
    props.$primary ? "var(--heading-color)" : "var(--bg-color)"};
  color: ${(props) =>
    props.$primary ? "var(--bg-color)" : "var(--text-color)"};
  border: 1px solid
    ${(props) => (props.$primary ? "transparent" : "var(--border-color)")};
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.01);

  &.id-badge {
    opacity: 0.8;
    background: transparent;
    border: 1px dashed var(--border-color);
  }
`;

export const DateDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--bg-color);
  padding: 0.75rem 1.25rem;
  border-radius: 14px;
  border: 1px solid var(--border-color);

  .icon {
    font-size: 1.25rem;
  }

  .label {
    display: block;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-color);
    opacity: 0.6;
    margin-bottom: 0.15rem;
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--heading-color);
  }
`;

export const MainContentWrapper = styled.div`
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

/* ==========================================
   ⚙️ REUSED SUB-CARDS AND GRIDS
   ========================================== */

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  padding: var(--spacing-lg);
  transition: var(--transition);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
    border-color: var(--accent-color);
  }

  .label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-color);
    opacity: 0.6;
    margin-bottom: var(--spacing-sm);
  }

  .value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--heading-color);
  }
`;

export const SectionCard = styled.div`
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--shadow);
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--heading-color);
    margin: 0;
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--accent-color);
    color: var(--button-text);
    border: none;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);

    &:hover {
      transform: translateY(-1px);
      filter: brightness(1.05);
    }
  }
`;

export const TableWrapper = styled.div`
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  overflow: hidden;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    padding: 0.75rem 1rem;
    background-color: var(--bg-secondary);
    color: var(--heading-color);
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid var(--border-color);
  }

  td {
    padding: 0.75rem 1rem;
    color: var(--text-color);
    font-size: 0.85rem;
    border-bottom: 1px solid var(--border-color);
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background-color: var(--bg-secondary);
  }
`;

export const DaySelector = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: var(--spacing-lg);
`;

export const DayButton = styled.button<{ $active: boolean }>`
  padding: 0.4rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: ${(props) =>
    props.$active ? "var(--accent-color)" : "var(--bg-color)"};
  color: ${(props) =>
    props.$active ? "var(--button-text)" : "var(--text-color)"};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.7;
`;

export const StudentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .badge {
    background-color: var(--accent-color);
    color: var(--button-text);
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 600;
  }
`;

export const StudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
`;

export const StudentCard = styled.div<{ $expandable?: boolean }>`
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  padding: var(--spacing-lg);
  transition: var(--transition);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
    border-color: var(--accent-color);
  }
`;

export const StudentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: var(--spacing-md);
`;

export const StudentInitials = styled.div`
  width: 48px;
  height: 48px;
  background-color: var(--accent-color);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--button-text);
  font-weight: 600;
  font-size: 1rem;
`;

export const StudentInfo = styled.div`
  h4 {
    margin: 0 0 0.25rem 0;
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

export const StudentDetails = styled.div`
  font-size: 0.8rem;
  color: var(--text-color);

  p {
    margin: 0.25rem 0;
  }
`;

export const ParentInfo = styled.div`
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--bg-secondary);
  border-radius: 10px;

  h5 {
    margin: 0 0 0.75rem 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--heading-color);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  p {
    margin: 0;
    font-size: 0.75rem;

    strong {
      font-weight: 600;
    }
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 320px;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 0.85rem;
  margin-bottom: var(--spacing-lg);

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }

  &::placeholder {
    color: var(--text-color);
    opacity: 0.5;
  }
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
`;

export const PreviewCard = styled.div`
  background: var(--bg-secondary);
  border-radius: 10px;
  padding: 1rem;
  transition: var(--transition);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
  }
`;

export const PreviewContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: var(--bg-color);
  border-radius: 16px;
  padding: var(--spacing-xl);
  width: 90%;
  max-width: 600px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow);
`;

export const ModalHeader = styled.div`
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--heading-color);
  }

  p {
    margin: 0.25rem 0 0 0;
    font-size: 0.8rem;
    color: var(--text-color);
    opacity: 0.7;
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: var(--spacing-lg);
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
`;

export const StudentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  background: var(--bg-secondary);
  border-radius: 8px;

  span {
    font-size: 0.85rem;
    color: var(--text-color);
  }
`;

export const StatusButton = styled.button<{
  $active: boolean;
  $status: "PRESENT" | "ABSENT";
}>`
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: 500;
  background: ${(props) =>
    props.$active
      ? props.$status === "PRESENT"
        ? "#22c55e"
        : "#ef4444"
      : "var(--bg-color)"};
  color: ${(props) => (props.$active ? "white" : "var(--text-color)")};
  border: 1px solid var(--border-color);
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
  }
`;

export const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 0.8rem;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background: var(--bg-secondary);
  }
`;

export const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  background: var(--accent-color);
  color: var(--button-text);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }
`;
