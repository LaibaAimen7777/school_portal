// wrappers/adminStyles.ts
import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: var(--font-main);
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: var(--transition);
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
    border-radius: var(--border-radius-full);
    border: 1px solid var(--border-color);
  }
`;

export const SidebarHeader = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: var(--border-width) solid var(--border-color);
  margin: 0 1rem;

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
  color: var(--text-color);
  opacity: 0.5;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  padding-left: 1rem;
  font-weight: 600;

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
  margin-bottom: 0.5rem;
  border: var(--border-width) solid var(--border-color);
  background: ${(props) =>
    props.$active ? "var(--text-color)" : "transparent"};
  color: ${(props) =>
    props.$active ? "var(--bg-color)" : "var(--text-color)"};
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  font-family: var(--font-main);
  font-size: 1rem;
  transition: var(--transition);
  position: relative;
  box-shadow: ${(props) => (props.$active ? "var(--shadow)" : "none")};

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
  }

  &:hover {
    background: ${(props) =>
      props.$active ? "var(--text-color)" : "var(--text-color)"};
    color: var(--bg-color);
    transform: translateX(5px);
    border-color: var(--border-color);
    box-shadow: var(--shadow);

    @media (max-width: 768px) {
      transform: translateX(0);
    }
  }
`;

export const SidebarFooter = styled.div`
  padding: 2rem 1rem;
  border-top: var(--border-width) solid var(--border-color);
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background: var(--bg-color);
  box-shadow: var(--shadow);

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
  border-radius: var(--border-radius-lg);
  background: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg-color);
  font-weight: 700;
  font-size: 1.2rem;
  text-transform: uppercase;
  box-shadow: var(--shadow);
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
    color: var(--text-color);
    opacity: 0.6;
    font-size: 0.6rem;
    margin: 0;
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
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  font-weight: 600;
  font-family: var(--font-main);
  font-size: 1rem;
  transition: var(--transition);
  opacity: 0.8;
  box-shadow: var(--shadow);

  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: center;

    span {
      display: none;
    }
  }

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background: var(--text-color);
    color: var(--bg-color);
    opacity: 1;
    transform: translateX(5px);
    border-color: var(--border-color);
    box-shadow: var(--shadow-hover);

    @media (max-width: 768px) {
      transform: translateX(0);
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
  border-bottom: var(--border-width) solid var(--border-color);

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
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow);
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 1.5rem;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
    background: var(--text-color);

    .icon {
      background: var(--bg-color);
      color: var(--text-color);
      border-color: var(--bg-color);
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
    border-radius: var(--border-radius-lg);
    background: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--bg-color);
    font-size: 1.8rem;
    transition: var(--transition);
    box-shadow: var(--shadow);
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
  border-radius: var(--border-radius-xl);
  margin-bottom: 1.5rem;
  transition: var(--transition);
  box-shadow: var(--shadow);

  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-2px);
  }

  h2 {
    color: var(--text-color);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-heading);
    border: none;
    padding: 0;
    box-shadow: none;

    svg {
      font-size: 1.5rem;
    }
  }
`;
