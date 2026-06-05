import styled from "styled-components";

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: var(--bg-secondary);
  padding: var(--spacing-xl);
  font-family: var(--font-main);

  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-md);
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

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

  a button {
    background-color: var(--accent-color);
    color: var(--button-text);
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
  border: none;
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

export const TeacherInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: var(--spacing-lg);
`;

export const Avatar = styled.div`
  width: 64px;
  height: 64px;
  background: var(--accent-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--button-text);
  font-size: 1.5rem;
  font-weight: 600;
`;

export const TeacherDetails = styled.div`
  h2 {
    margin: 0 0 0.25rem 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--heading-color);
  }
`;

export const BadgeGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0.5rem 0;
`;

export const Badge = styled.span<{ $primary?: boolean }>`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: ${(props) =>
    props.$primary ? "var(--accent-color)" : "var(--bg-secondary)"};
  color: ${(props) =>
    props.$primary ? "var(--button-text)" : "var(--text-color)"};
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 500;
`;

export const TeachingSince = styled.p`
  font-size: 0.75rem;
  color: var(--text-color);
  opacity: 0.6;
  margin: 0.25rem 0 0 0;
`;

export const DateDisplay = styled.div`
  p {
    margin: 0;
    font-size: 0.8rem;
    color: var(--text-color);
  }
`;

export const HeaderCard = styled.div`
  margin-bottom: var(--spacing-xl);
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--spacing-md);
`;

// Add these to your existing teacherDashboard.ts file

export const Nav = styled.nav`
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  padding: 0.75rem 2rem;
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const NavLogo = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--heading-color);

  &:hover {
    color: var(--accent-color);
  }
`;

export const NavList = styled.ul`
  display: flex;
  gap: 0.25rem;
  list-style: none;
  flex-wrap: wrap;
`;

export const NavItem = styled.li`
  margin: 0;
`;

export const NavLink = styled.a<{ $active?: boolean }>`
  color: ${(props) =>
    props.$active ? "var(--accent-color)" : "var(--text-color)"};
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  font-size: 0.85rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: var(--transition);
  display: inline-block;

  &:hover {
    color: var(--accent-color);
    background-color: var(--bg-secondary);
  }
`;
