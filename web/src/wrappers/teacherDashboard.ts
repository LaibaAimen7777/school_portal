import styled, { css } from "styled-components";

export const DashboardContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

export const TeacherCard = styled.div`
  background-color: var(--bg-color);
  border: var(--border-width) solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: var(--spacing-xl);
  margin: var(--spacing-lg) 0;
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
  transform: rotate(-0.2deg);
  background: linear-gradient(
    135deg,
    var(--bg-color) 0%,
    rgba(98, 129, 65, 0.05) 100%
  );

  &:hover {
    transform: rotate(-0.5deg) translateY(-4px) scale(1.01);
    box-shadow: var(--shadow-hover);
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
`;

export const TeacherInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
`;

export const TeacherAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius-md);
  background: var(--pop-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  box-shadow: var(--shadow);
  border: var(--border-width) solid var(--border-color);
`;

export const TeacherDetails = styled.div`
  h2 {
    margin: 0;
    border: none;
    box-shadow: none;
    padding: 0;
    font-size: 1.8rem;
  }
`;

export const BadgeGroup = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-xs);
`;

export const Badge = styled.span<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-md);
  border: var(--border-width) solid var(--border-color);
  border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.$primary ? "var(--pop-color)" : "var(--bg-color)"};
  color: ${(props) => (props.$primary ? "white" : "var(--text-color)")};
  box-shadow: var(--shadow);
  transition: var(--transition);
  transform: rotate(-0.2deg);

  &:hover {
    transform: rotate(-0.5deg) translateY(-2px);
    box-shadow: var(--shadow-hover);
  }
`;

export const DateDisplay = styled.div`
  text-align: right;
  p {
    margin: 0;
    border: none;
    box-shadow: none;
    padding: 0;
    font-size: 0.9rem;
    opacity: 0.7;
  }
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
  border: var(--border-width) solid var(--border-color);
  border-radius: 225px 15px 255px 15px/15px 255px 15px 225px;
  padding: var(--spacing-lg);
  text-align: left;
  box-shadow: var(--shadow);
  transition: var(--transition);
  background-color: var(--bg-color);
  transform: rotate(-0.1deg);

  &:hover {
    transform: rotate(-0.3deg) translateY(-4px) scale(1.02);
    box-shadow: var(--shadow-hover);
  }

  p {
    margin: 0;
    border: none;
    box-shadow: none;
    padding: 0;
  }

  .stat-label {
    font-size: 0.9rem;
    opacity: 0.7;
    margin-bottom: var(--spacing-xs);
  }

  .stat-value {
    font-size: 2rem;
    font-weight: bold;
  }
`;

export const SectionHeader = styled.div<{ $withAction?: boolean }>`
  display: flex;
  justify-content: ${(props) =>
    props.$withAction ? "space-between" : "flex-start"};
  align-items: center;
  margin-top: 0;
  margin-bottom: var(--spacing-lg);

  h3 {
    margin: 0;
  }
`;

export const ViewButton = styled.button`
  background-color: transparent;
  color: var(--text-color);
  border: var(--border-width) solid var(--border-color);
  border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow);

  &:hover {
    background-color: var(--text-color);
    color: var(--bg-color);
    transform: rotate(-0.3deg) translateY(-2px) scale(1.02);
    box-shadow: var(--shadow-hover);
  }
`;

export const TableWrapper = styled.div`
  border: var(--border-width) solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  overflow: hidden;
  box-shadow: var(--shadow);
  margin: var(--spacing-lg) 0;

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--bg-color);
  }

  th {
    background-color: var(--text-color);
    color: var(--bg-color);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.875rem;
    padding: var(--spacing-md);
    border-bottom: var(--border-width) solid var(--border-color);
  }

  td {
    padding: var(--spacing-md);
    border-bottom: 1px dashed var(--border-color);
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background-color: rgba(0, 0, 0, 0.02);
  }

  [data-theme="piship"] tr:hover td {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const DaySelector = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  margin-bottom: var(--spacing-lg);
`;

export const DayButton = styled.button<{ $active: boolean }>`
  background-color: ${(props) =>
    props.$active ? "var(--pop-color)" : "transparent"};
  color: ${(props) => (props.$active ? "white" : "var(--text-color)")};
  border: var(--border-width) solid
    ${(props) => (props.$active ? "var(--pop-color)" : "var(--border-color)")};
  border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
  padding: var(--spacing-sm) var(--spacing-md);
  min-width: auto;
  font-family: var(--font-main);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow);

  &:hover {
    transform: rotate(-0.3deg) translateY(-2px);
    box-shadow: var(--shadow-hover);
  }
`;

export const StudentCount = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);

  .count-badge {
    width: 30px;
    height: 30px;
    border-radius: var(--border-radius-sm);
    background: var(--pop-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 12px;
    font-weight: bold;
  }
`;

export const StudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-md);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StudentCard = styled.div<{ $expandable?: boolean }>`
  border: var(--border-width) solid var(--border-color);
  border-radius: 225px 15px 255px 15px/15px 255px 15px 225px;
  padding: var(--spacing-lg);
  box-shadow: var(--shadow);
  transition: var(--transition);
  background-color: var(--bg-color);
  transform: rotate(-0.1deg);
  cursor: ${(props) => (props.$expandable ? "pointer" : "default")};

  &:hover {
    transform: rotate(-0.3deg) translateY(-4px) scale(1.02);
    box-shadow: var(--shadow-hover);
  }
`;

export const StudentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
`;

export const StudentInitials = styled.div`
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-sm);
  background: var(--pop-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: var(--border-width) solid var(--border-color);
`;

export const StudentInfo = styled.div`
  text-align: left;

  h4 {
    margin: 0;
    border: none;
    box-shadow: none;
    padding: 0;
  }
`;

export const StudentDetails = styled.div`
  text-align: left;
  font-size: 0.9rem;

  p {
    margin: var(--spacing-xs) 0;
    border: none;
    box-shadow: none;
    padding: 0;
  }
`;

export const ParentInfo = styled.div`
  border: var(--border-width) dashed var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: var(--spacing-md);
  margin-top: var(--spacing-md);

  h5 {
    margin: 0 0 var(--spacing-sm) 0;
    border: none;
    box-shadow: none;
    padding: 0;
    font-size: 1rem;
  }

  p {
    margin: var(--spacing-xs) 0;
    border: none;
    box-shadow: none;
    padding: 0;
    font-size: 0.85rem;
  }
`;

export const SearchInput = styled.input`
  background-color: var(--bg-color);
  color: var(--text-color);
  border: var(--border-width) solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: var(--spacing-md);
  font-family: var(--font-main);
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  transition: var(--transition);
  box-shadow: var(--shadow);
  margin-bottom: var(--spacing-lg);

  &:focus {
    outline: none;
    border-width: 2px;
    box-shadow: var(--shadow-hover);
    transform: rotate(-0.2deg) scale(1.01);
  }

  &::placeholder {
    color: var(--text-color);
    opacity: 0.5;
    font-style: italic;
  }
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
`;

export const PreviewStudentCard = styled.div`
  border: var(--border-width) solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: var(--spacing-md);
  transition: var(--transition);

  &:hover {
    transform: rotate(-0.2deg) translateY(-2px);
    box-shadow: var(--shadow);
  }
`;

export const PreviewStudentContent = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

export const LoadingContainer = styled.div`
  border: var(--border-width) solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: var(--spacing-2xl);
  margin: var(--spacing-lg) 0;
  text-align: center;
  background-color: var(--bg-color);
  box-shadow: var(--shadow);

  p {
    border: none;
    box-shadow: none;
    margin-top: var(--spacing-md);
  }
`;
