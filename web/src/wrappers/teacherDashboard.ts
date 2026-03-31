import styled, { css } from "styled-components";

export const DashboardContainer = styled.div`
  height: 100%;
  background-color: var(--bg-color);
  position: relative;
  margin: 0px;
  margin-bottom: 0px;
  padding: 5px;
`;

export const Nav = styled.nav`
  background-color: var(--nav-bg);
  border-bottom: 2px solid var(--border-color);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: var(--shadow-sm);
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
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text-color);
  padding: 0.5rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
  background-color: var(--bg-color);
  box-shadow: var(--shadow-sm);
  transform: rotate(-0.5deg);
  transition: all 0.2s ease;

  &:hover {
    transform: rotate(-0.8deg) translateY(-2px);
    box-shadow: var(--shadow);
  }
`;

export const NavList = styled.ul`
  display: flex;
  gap: 0.5rem;
  list-style: none;
  flex-wrap: wrap;
`;

export const NavItem = styled.li`
  margin: 0;
`;

export const NavLink = styled.a<{ $active?: boolean }>`
  color: ${(props) =>
    props.$active ? "var(--bg-color)" : "var(--text-color)"};
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  font-size: 0.95rem;
  text-decoration: none;
  padding: 0.6rem 1.25rem;
  border: 2px solid var(--border-color);
  border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
  background-color: ${(props) =>
    props.$active ? "var(--text-color)" : "transparent"};
  transition: all 0.2s ease;
  display: inline-block;
  box-shadow: ${(props) => (props.$active ? "var(--shadow)" : "none")};
  transform: ${(props) => (props.$active ? "rotate(-0.3deg)" : "rotate(0deg)")};

  &:hover {
    transform: rotate(-0.8deg) translateY(-2px);
    box-shadow: var(--shadow);
    background-color: var(--text-color);
    color: var(--bg-color);
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`;

export const HeaderCard = styled.div`
  background-color: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
  transform: rotate(-0.2deg);
  transition: all 0.2s ease;

  &:hover {
    transform: rotate(-0.3deg) translateY(-4px);
    box-shadow: var(--shadow-hover);
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

export const TeacherInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background: var(--pop-color);
  border: 2px solid var(--border-color);
  border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: var(--shadow);
  transform: rotate(-1deg);
`;

export const TeacherDetails = styled.div`
  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
    font-weight: 700;
    color: var(--heading-color);
    border: none;
    padding: 0;
    box-shadow: none;
    transform: none;
  }
`;

export const BadgeGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const Badge = styled.span<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
  font-size: 0.85rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.$primary ? "var(--pop-color)" : "var(--bg-color)"};
  color: ${(props) => (props.$primary ? "white" : "var(--text-color)")};
  box-shadow: var(--shadow-sm);
  transform: rotate(-0.2deg);
`;

export const TeachingSince = styled.p`
  margin: 0.5rem 0 0 0;
  color: var(--text-color);
  font-size: 0.9rem;
  opacity: 0.8;
  border: none;
  box-shadow: none;
  padding: 0;
`;

export const DateDisplay = styled.div`
  color: var(--text-color);
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 40px 40px 40px 40px/40px 40px 40px 40px;
  background-color: var(--bg-color);
  box-shadow: var(--shadow-sm);
  transform: rotate(0.2deg);

  p {
    margin: 0;
    border: none;
    box-shadow: none;
    padding: 0;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background-color: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 225px 15px 255px 15px/15px 255px 15px 225px;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transform: rotate(-0.1deg);
  transition: all 0.2s ease;

  &:hover {
    transform: rotate(-0.3deg) translateY(-4px);
    box-shadow: var(--shadow-hover);
  }

  .label {
    color: var(--text-color);
    font-size: 0.9rem;
    opacity: 0.7;
    margin-bottom: 0.5rem;
    border: none;
    padding: 0;
  }

  .value {
    color: var(--heading-color);
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1;
    border: none;
    padding: 0;
  }
`;

export const SectionCard = styled.div`
  background-color: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
  transform: rotate(-0.1deg);
  transition: all 0.2s ease;

  &:hover {
    transform: rotate(-0.2deg) translateY(-2px);
    box-shadow: var(--shadow-hover);
  }
`;

export const SectionHeader = styled.div<{ $withAction?: boolean }>`
  display: flex;
  justify-content: ${(props) =>
    props.$withAction ? "space-between" : "flex-start"};
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--heading-color);
    border: none;
    padding: 0;
    box-shadow: none;
    transform: none;
  }
`;

export const ViewButton = styled.button`
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 2px solid var(--border-color);
  border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
  padding: 0.5rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
  transform: rotate(-0.1deg);

  &:hover {
    background-color: var(--text-color);
    color: var(--bg-color);
    transform: rotate(-0.3deg) translateY(-2px);
    box-shadow: var(--shadow);
  }
`;

export const TableWrapper = styled.div`
  border: 2px solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  overflow: hidden;
  box-shadow: var(--shadow);
  background-color: var(--bg-color);

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    background-color: var(--text-color);
    color: var(--bg-color);
    font-weight: 600;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 1rem;
    text-align: left;
    border-bottom: 2px solid var(--border-color);
  }

  td {
    padding: 1rem;
    border-bottom: 1px dashed var(--border-color);
    color: var(--text-color);
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background-color: rgba(98, 129, 65, 0.05);
  }
`;

export const DaySelector = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

export const DayButton = styled.button<{ $active: boolean }>`
  padding: 0.6rem 1.25rem;
  border: 2px solid var(--border-color);
  border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  background-color: ${(props) =>
    props.$active ? "var(--pop-color)" : "var(--bg-color)"};
  color: ${(props) => (props.$active ? "white" : "var(--text-color)")};
  box-shadow: var(--shadow-sm);
  transform: rotate(${(props) => (props.$active ? "-0.5deg" : "0deg")});
  transition: all 0.2s ease;

  &:hover {
    transform: rotate(-0.8deg) translateY(-2px);
    box-shadow: var(--shadow);
    background-color: ${(props) => !props.$active && "var(--pop-color)"};
    color: ${(props) => !props.$active && "white"};
  }
`;

export const StudentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .badge {
    background-color: var(--pop-color);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    min-width: 32px;
    text-align: center;
    border: 2px solid var(--border-color);
  }
`;

export const StudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const StudentCard = styled.div<{ $expandable?: boolean }>`
  background-color: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 225px 15px 255px 15px/15px 255px 15px 225px;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transform: rotate(-0.1deg);
  transition: all 0.2s ease;
  cursor: ${(props) => (props.$expandable ? "pointer" : "default")};

  &:hover {
    transform: rotate(-0.3deg) translateY(-4px);
    box-shadow: var(--shadow-hover);
  }
`;

export const StudentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const StudentInitials = styled.div`
  width: 50px;
  height: 50px;
  background-color: var(--pop-color);
  border: 2px solid var(--border-color);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  transform: rotate(-1deg);
`;

export const StudentInfo = styled.div`
  h4 {
    margin: 0 0 0.25rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--heading-color);
    border: none;
    padding: 0;
    box-shadow: none;
  }
`;

export const StudentDetails = styled.div`
  color: var(--text-color);
  font-size: 0.9rem;

  p {
    margin: 0.35rem 0;
    border: none;
    box-shadow: none;
    padding: 0;
  }
`;

export const ParentInfo = styled.div`
  margin-top: 1.5rem;
  padding: 1.25rem;
  background-color: var(--bg-color);
  border: 2px dashed var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;

  h5 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--heading-color);
    border: none;
    padding: 0;
    box-shadow: none;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    border: none;
    box-shadow: none;
    padding: 0;

    strong {
      color: var(--heading-color);
      font-weight: 600;
    }
  }
`;

export const SearchInput = styled.input`
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 2px solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: 0.75rem 1.25rem;
  font-family: var(--font-main);
  font-size: 0.95rem;
  width: 100%;
  max-width: 320px;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
  margin-bottom: 2rem;

  &:focus {
    outline: none;
    border-width: 2px;
    box-shadow: var(--shadow);
    transform: rotate(-0.2deg);
  }

  &::placeholder {
    color: var(--text-color);
    opacity: 0.5;
    font-style: italic;
  }
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
`;

export const PreviewCard = styled.div`
  background-color: var(--bg-color);
  border: 2px solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: 1rem;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: rotate(-0.2deg) translateY(-2px);
    box-shadow: var(--shadow);
  }
`;

export const PreviewContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const LoadingContainer = styled.div`
  background-color: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: 3rem;
  margin: 2rem 0;
  text-align: center;
  box-shadow: var(--shadow);

  p {
    border: none;
    box-shadow: none;
    margin-top: 1rem;
    font-size: 1.1rem;
  }
`;

export const FunBorder = styled.div`
  border: 2px dashed var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: 1.5rem;
  margin-top: 2rem;
  transition: all 0.2s ease;

  &:hover {
    border-style: solid;
    transform: scale(1.01) rotate(-0.1deg);
    box-shadow: var(--shadow-sm);
  }
`;

export const StripedPattern = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 225px 15px 255px 15px/15px 255px 15px 225px;
  padding: 1.5rem;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      var(--text-color),
      var(--text-color) 2px,
      transparent 2px,
      transparent 12px
    );
    opacity: 0.03;
    pointer-events: none;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

export const ModalContainer = styled.div`
  background-color: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-hover);
  transform: rotate(-0.2deg);
`;

export const ModalHeader = styled.div`
  border-bottom: 2px dashed var(--border-color);
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--heading-color);
  }

  p {
    margin: 0.25rem 0 0 0;
    color: var(--text-color);
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--border-color);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--pop-color);
    border-radius: 10px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 2px dashed var(--border-color);
`;

export const StudentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 225px 15px 255px 15px/15px 255px 15px 225px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
    box-shadow: var(--shadow-sm);
  }
`;

export const StatusButton = styled.button<{
  $active: boolean;
  $status: "PRESENT" | "ABSENT";
}>`
  margin-left: 0.5rem;
  padding: 0.4rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  background-color: ${(props) =>
    props.$active
      ? props.$status === "PRESENT"
        ? "var(--pop-color)"
        : "var(--text-color)"
      : "var(--bg-color)"};
  color: ${(props) => (props.$active ? "white" : "var(--text-color)")};
  box-shadow: ${(props) => (props.$active ? "var(--shadow-sm)" : "none")};
  transform: ${(props) => (props.$active ? "rotate(-0.3deg)" : "rotate(0deg)")};

  &:hover {
    transform: rotate(-0.8deg) translateY(-2px);
    box-shadow: var(--shadow);
  }
`;

export const CancelButton = styled.button`
  padding: 0.6rem 1.25rem;
  border: 2px solid var(--border-color);
  border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
  background-color: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    transform: rotate(-0.3deg) translateY(-2px);
    box-shadow: var(--shadow);
    background-color: var(--text-color);
    color: var(--bg-color);
  }
`;

export const SubmitButton = styled.button`
  padding: 0.6rem 1.25rem;
  border: 2px solid var(--border-color);
  border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
  background-color: var(--pop-color);
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: rotate(-0.3deg) translateY(-2px);
    box-shadow: var(--shadow);
    filter: brightness(0.95);
  }
`;
