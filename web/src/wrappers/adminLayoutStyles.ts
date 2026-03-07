// wrappers/adminStyles.ts
import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: var(--font-main);
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: var(--transition);
  position: relative;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(
        circle at 25px 25px,
        var(--text-color) 1px,
        transparent 1px
      ),
      linear-gradient(to right, var(--text-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--text-color) 1px, transparent 1px);
    background-size:
      50px 50px,
      50px 50px,
      50px 50px;
    background-position: -1px -1px;
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
  }
`;

export const Sidebar = styled.aside`
  width: 280px;
  background: var(--bg-color);
  border-right: var(--border-width) solid var(--border-color);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  transition: var(--transition);
  box-shadow: var(--shadow);
  z-index: 10;
  transform: rotate(0.02deg);

  @media (max-width: 768px) {
    width: 80px;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: var(--bg-color);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--text-color);
    border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
    border: 1px solid var(--border-color);
  }
`;

export const SidebarHeader = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: var(--border-width) solid var(--border-color);
  margin: 0 1rem;
  position: relative;

  &::after {
    content: "✧";
    position: absolute;
    bottom: -12px;
    right: 20px;
    color: var(--pop-color);
    font-size: 1.2rem;
    transform: rotate(5deg);
    background: var(--bg-color);
    padding: 0 5px;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    font-family: var(--font-heading);
    color: var(--text-color);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0;
    border: none;
    padding: 0;
    box-shadow: none;
    transform: rotate(-0.2deg);

    @media (max-width: 768px) {
      font-size: 1rem;
      text-align: center;
    }
  }

  p {
    color: var(--text-color);
    opacity: 0.6;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    border: none;
    padding: 0;
    /* font-style: italic; */

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const NavSection = styled.div`
  flex: 1;
  padding: 2rem 1rem;
`;

export const NavLabel = styled.div`
  color: var(--pop-color);
  opacity: 0.8;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  padding-left: 1rem;
  font-weight: 600;
  font-family: var(--font-heading);
  transform: rotate(-0.1deg);

  @media (max-width: 768px) {
    display: none;
  }
`;

interface NavButtonProps {
  $active?: boolean;
}

export const NavButton = styled.button<NavButtonProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  border: var(--border-width) solid var(--border-color);
  background: ${(props) =>
    props.$active ? "var(--pop-color)" : "transparent"};
  color: ${(props) =>
    props.$active ? "var(--bg-color)" : "var(--text-color)"};
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  cursor: pointer;
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  font-family: var(--font-main);
  font-size: 1rem;
  transition: var(--transition);
  position: relative;
  box-shadow: ${(props) => (props.$active ? "var(--shadow)" : "none")};
  transform: rotate(${(props) => (props.$active ? "-0.2deg" : "0.1deg")});

  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: center;

    span {
      display: none;
    }
  }

  svg {
    font-size: 1.2rem;
    min-width: 20px;
    color: ${(props) =>
      props.$active ? "var(--bg-color)" : "var(--pop-color)"};
  }

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 1px solid var(--border-color);
    border-radius: inherit;
    opacity: 0;
    transition: var(--transition);
  }

  &:hover {
    background: ${(props) =>
      props.$active ? "var(--pop-color)" : "var(--pop-color)"};
    color: var(--bg-color);
    transform: translateX(5px) rotate(-0.3deg);
    border-color: var(--border-color);
    box-shadow: var(--shadow-hover);

    svg {
      color: var(--bg-color);
    }

    &::before {
      opacity: 0.3;
    }

    @media (max-width: 768px) {
      transform: translateX(0) rotate(-0.2deg);
    }
  }
`;

export const SidebarFooter = styled.div`
  padding: 2rem 1rem;
  border-top: var(--border-width) solid var(--border-color);
  position: relative;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  background: var(--bg-color);
  box-shadow: var(--shadow);
  transform: rotate(-0.1deg);
  position: relative;

  &::after {
    content: "✦";
    position: absolute;
    top: -8px;
    right: -8px;
    color: var(--pop-color);
    font-size: 1rem;
    background: var(--bg-color);
    padding: 2px;
    transform: rotate(10deg);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    justify-content: center;

    div {
      display: none;
    }
  }
`;

export const UserAvatar = styled.div`
  width: 45px;
  height: 45px;
  border: var(--border-width) solid var(--border-color);
  border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
  background: var(--pop-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg-color);
  font-weight: 700;
  font-size: 1.2rem;
  text-transform: uppercase;
  box-shadow: var(--shadow);
  transform: rotate(-2deg);
`;

export const UserDetails = styled.div`
  flex: 1;

  h4 {
    color: var(--text-color);
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0 0 4px 0;
    font-family: var(--font-heading);
  }

  p {
    color: var(--pop-color);
    opacity: 0.9;
    font-size: 0.6rem;
    margin: 0;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 1rem 1.5rem;
  border: var(--border-width) solid var(--border-color);
  background: transparent;
  color: var(--text-color);
  border-radius: 225px 15px 255px 15px/15px 255px 15px 225px;
  cursor: pointer;
  font-weight: 600;
  font-family: var(--font-main);
  font-size: 1rem;
  transition: var(--transition);
  opacity: 0.8;
  box-shadow: var(--shadow);
  transform: rotate(0.1deg);

  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: center;

    span {
      display: none;
    }
  }

  svg {
    font-size: 1.2rem;
    color: var(--pop-color);
  }

  &:hover {
    background: var(--pop-color);
    color: var(--bg-color);
    opacity: 1;
    transform: translateX(5px) rotate(0.2deg);
    border-color: var(--border-color);
    box-shadow: var(--shadow-hover);

    svg {
      color: var(--bg-color);
    }

    @media (max-width: 768px) {
      transform: translateX(0) rotate(0.1deg);
    }
  }
`;

export const ContentArea = styled.main`
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
  background: var(--bg-color);
  min-height: 100vh;
  transition: var(--transition);
  border-left: var(--border-width) solid var(--border-color);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 1rem;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: var(--border-width) dashed var(--border-color);
  position: relative;

  &::before {
    content: "✧ ✧ ✧";
    position: absolute;
    bottom: -10px;
    right: 0;
    color: var(--pop-color);
    font-size: 0.8rem;
    opacity: 0.5;
    letter-spacing: 4px;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    font-family: var(--font-heading);
    color: var(--text-color);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
    border: none;
    padding: 0;
    box-shadow: none;
    transform: rotate(-0.1deg);
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 60%;
      height: 2px;
      background: var(--pop-color);
      opacity: 0.3;
      border-radius: 2px;
      transform: skew(-5deg);
    }
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background: var(--bg-color);
  padding: 1.8rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  box-shadow: var(--shadow);
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transform: rotate(${Math.random() > 0.5 ? "0.1deg" : "-0.1deg"});
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 4px;
    border: 1px dashed var(--pop-color);
    border-radius: inherit;
    opacity: 0;
    transition: var(--transition);
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px)
      rotate(${Math.random() > 0.5 ? "0.3deg" : "-0.2deg"});
    box-shadow: var(--shadow-hover);
    background: var(--text-color);
    border-color: var(--pop-color);

    &::before {
      opacity: 0.2;
    }

    .icon {
      background: var(--bg-color);
      color: var(--pop-color);
      border-color: var(--pop-color);
      transform: rotate(2deg);
    }

    .info {
      h3,
      p {
        color: var(--bg-color);
      }
    }
  }

  .icon {
    width: 60px;
    height: 60px;
    border: var(--border-width) solid var(--border-color);
    border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
    background: var(--pop-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--bg-color);
    font-size: 1.8rem;
    transition: var(--transition);
    box-shadow: var(--shadow);
    transform: rotate(-1deg);
  }

  .info {
    flex: 1;

    h3 {
      color: var(--text-color);
      opacity: 0.7;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 0.3rem;
      font-family: var(--font-heading);
      transition: var(--transition);
    }

    p {
      color: var(--text-color);
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
      font-family: var(--font-heading);
      transition: var(--transition);
    }
  }
`;

export const Card = styled.div`
  background: var(--bg-color);
  padding: 2rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: 225px 15px 255px 15px/15px 255px 15px 225px;
  margin-bottom: 1.5rem;
  transition: var(--transition);
  box-shadow: var(--shadow);
  transform: rotate(0.02deg);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    border: 1px dotted var(--pop-color);
    border-radius: inherit;
    opacity: 0.1;
    pointer-events: none;
  }

  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-2px) rotate(-0.1deg);
    border-color: var(--pop-color);
  }

  h2 {
    color: var(--text-color);
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-heading);
    border: none;
    padding: 0 0 0.5rem 0;
    box-shadow: none;
    border-bottom: 1px dashed var(--pop-color);
    position: relative;

    svg {
      font-size: 1.5rem;
      color: var(--pop-color);
    }

    &::after {
      content: "✧";
      position: absolute;
      right: 0;
      bottom: -8px;
      color: var(--pop-color);
      font-size: 1rem;
      background: var(--bg-color);
      padding: 0 5px;
    }
  }
`;

export const TableWrapper = styled.div`
  border: var(--border-width) solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  overflow: hidden;
  box-shadow: var(--shadow);
  margin: 1rem 0;
  background: var(--bg-color);

  table {
    width: 100%;
    border-collapse: collapse;

    th {
      background: var(--pop-color);
      color: var(--bg-color);
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.85rem;
      padding: 1rem;
      letter-spacing: 0.5px;
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
      background: rgba(191, 115, 83, 0.05);
    }
  }
`;

export const Badge = styled.span<{ $variant?: "success" | "warning" | "info" }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${(props) => {
    switch (props.$variant) {
      case "success":
        return "var(--pop-color)";
      case "warning":
        return "var(--pop-color)";
      case "info":
        return "var(--pop-color)";
      default:
        return "transparent";
    }
  }};
  color: ${(props) =>
    props.$variant ? "var(--bg-color)" : "var(--text-color)"};
  opacity: ${(props) => (props.$variant ? 0.9 : 1)};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transform: rotate(-0.5deg);
`;
