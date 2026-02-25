import styled from "styled-components";

// Main Layout
export const AdminContainer = styled.div`
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: all 0.3s ease;
  display: flex;
`;

// Sidebar
export const Sidebar = styled.aside`
  width: 280px;
  background-color: var(--secondary-color);
  border-right: 1px solid var(--border);
  padding: 2rem 1.5rem;
  position: fixed;
  height: 100vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    padding: 1rem;
  }
`;

export const SidebarHeader = styled.div`
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);

  .logo {
    font-size: 1.8rem;
    font-weight: 800;
    letter-spacing: 2px;
    color: var(--accent-color);
    margin-bottom: 0.5rem;
  }

  .role-badge {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--text-color);
    opacity: 0.7;
  }
`;

export const NavSection = styled.div`
  margin-bottom: 2rem;

  .section-title {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--accent-color);
    margin-bottom: 1rem;
    opacity: 0.8;
  }
`;

interface NavButtonProps {
  $active?: boolean;
}

export const NavButton = styled.button<NavButtonProps>`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 8px;
  background: ${(props) =>
    props.$active ? "var(--accent-color)" : "transparent"};
  color: ${(props) =>
    props.$active ? "var(--bg-color)" : "var(--text-color)"};
  font-size: 0.9rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid
    ${(props) => (props.$active ? "var(--accent-color)" : "var(--border)")};

  &:hover {
    background: var(--accent-color);
    color: var(--bg-color);
    border-color: var(--accent-color);
    transform: translateX(5px);
  }

  display: flex;
  align-items: center;
  gap: 0.8rem;

  .icon {
    font-size: 1.2rem;
  }
`;

// Main Content
export const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
  background-color: var(--bg-color);

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

// Header
export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);

  .page-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -1px;

    span {
      color: var(--accent-color);
      font-size: 1rem;
      display: block;
      font-weight: 400;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
  }

  .date {
    font-size: 0.9rem;
    opacity: 0.7;
    padding: 0.5rem 1rem;
    border: 1px solid var(--border);
    border-radius: 30px;
  }
`;

// Stats Cards
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

export const StatCard = styled.div`
  background-color: var(--secondary-color);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    .stat-title {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      opacity: 0.7;
    }

    .stat-icon {
      font-size: 1.5rem;
      color: var(--accent-color);
    }
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .stat-change {
    font-size: 0.8rem;
    color: #4caf50;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
`;

// Tables
export const TableContainer = styled.div`
  background-color: var(--secondary-color);
  border-radius: 12px;
  border: 1px solid var(--border);
  overflow: hidden;
  margin-bottom: 2rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.05);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--accent-color);
    border-bottom: 1px solid var(--border);
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid var(--border);
    font-size: 0.9rem;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background-color: rgba(255, 255, 255, 0.02);
  }
`;

export const StatusBadge = styled.span<{ $status?: string }>`
  padding: 0.3rem 0.8rem;
  border-radius: 30px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: ${(props) => {
    switch (props.$status) {
      case "active":
        return "#4caf50";
      case "pending":
        return "#ff9800";
      case "inactive":
        return "#f44336";
      default:
        return "var(--accent-color)";
    }
  }};
  color: white;
`;

// Forms
export const FormContainer = styled.div`
  background-color: var(--secondary-color);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  max-width: 600px;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-color);
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    background-color: var(--bg-color);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text-color);
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--accent-color);
      box-shadow: 0 0 0 2px rgba(255, 77, 77, 0.1);
    }

    &::placeholder {
      color: var(--text-color);
      opacity: 0.5;
    }
  }

  select {
    cursor: pointer;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Buttons
interface ButtonProps {
  $primary?: boolean;
  $danger?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid
    ${(props) => {
      if (props.$danger) return "#f44336";
      return "var(--accent-color)";
    }};

  background-color: ${(props) => {
    if (props.$primary) return "var(--accent-color)";
    if (props.$danger) return "#f44336";
    return "transparent";
  }};

  color: ${(props) => {
    if (props.$primary || props.$danger) return "white";
    return "var(--text-color)";
  }};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    background-color: ${(props) => {
      if (props.$danger) return "#d32f2f";
      return "var(--accent-color)";
    }};
    color: white;
    border-color: ${(props) => {
      if (props.$danger) return "#d32f2f";
      return "var(--accent-color)";
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

// Action Icons
export const ActionIcon = styled.button`
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.3rem;
  margin: 0 0.2rem;
  transition: all 0.3s ease;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    color: var(--accent-color);
    transform: scale(1.1);
  }
`;

// Search Bar
export const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  input {
    flex: 1;
    padding: 0.8rem 1rem;
    background-color: var(--secondary-color);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text-color);
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: var(--accent-color);
    }
  }
`;

// Empty State
export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--secondary-color);
  border-radius: 12px;
  border: 1px solid var(--border);

  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: var(--accent-color);
    opacity: 0.5;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    opacity: 0.7;
    margin-bottom: 2rem;
  }
`;

// Theme Toggle (reuse from landing)
export const ThemeButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 0.8rem 1.5rem;
  background-color: var(--accent-color);
  color: var(--bg-color);
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
  font-size: 0.9rem;
  text-transform: uppercase;

  &:hover {
    transform: scale(1.05);
  }
`;
