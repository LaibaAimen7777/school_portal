// wrappers/adminStyles.ts
import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: all 0.3s ease;
`;

export const Sidebar = styled.aside`
  width: 280px;
  background: var(--card-bg);
  border-right: 1px solid rgba(128, 128, 128, 0.1);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 80px;
  }

  /* Hide scrollbar for cleaner look */
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--accent-color);
    border-radius: 10px;
    opacity: 0.5;
  }
`;

export const SidebarHeader = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(128, 128, 128, 0.1);

  h2 {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--accent-color);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 1.2rem;
      text-align: center;
    }
  }

  p {
    color: var(--text-color);
    opacity: 0.6;
    font-size: 0.9rem;
    margin-top: 0.5rem;

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
  border: none;
  background: ${(props) =>
    props.$active ? "var(--accent-color)" : "transparent"};
  color: ${(props) =>
    props.$active ? "var(--button-text)" : "var(--text-color)"};
  border-radius: 12px;
  cursor: pointer;
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

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
      props.$active ? "var(--accent-color)" : "var(--secondary-color)"};
    color: var(--button-text-hover);
    transform: translateX(5px);

    @media (max-width: 768px) {
      transform: translateX(0);
    }
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${(props) => (props.$active ? "4px" : "0")};
    background: var(--accent-color);
    transition: width 0.3s ease;
  }
`;

export const SidebarFooter = styled.div`
  padding: 2rem 1rem;
  border-top: 1px solid rgba(128, 128, 128, 0.1);
  margin-top: auto;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: var(--secondary-color);
  border-radius: 12px;

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
  border-radius: 12px;
  background: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--button-text);
  font-weight: 700;
  font-size: 1.2rem;
  text-transform: uppercase;
`;

export const UserDetails = styled.div`
  flex: 1;

  h4 {
    color: white;
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0 0 4px 0;
  }

  p {
    color: white;
    opacity: 0.6;
    font-size: 0.8rem;
    margin: 0;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid transparent;
  background: transparent;
  color: var(--text-color);
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  opacity: 0.7;

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
    background: #ff4444;
    color: var(--button-text-hover);
    opacity: 1;
    transform: translateX(5px);
    border-color: #ff4444;

    @media (max-width: 768px) {
      transform: translateX(0);
    }
  }
`;

export const ContentArea = styled.main`
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
  background: var(--secondary-color);
  min-height: 100vh;
  transition: all 0.3s ease;

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
  border-bottom: 1px solid rgba(128, 128, 128, 0.1);

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--accent-color);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background: var(--card-bg);
  padding: 1.8rem;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(128, 128, 128, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1.5rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    color: var(--button-text-hover);
  }

  .icon {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    background: var(--accent-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--button-text);
    font-size: 1.8rem;
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
    }

    p {
      color: var(--accent-color);
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
    }
  }
`;

export const Card = styled.div`
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(128, 128, 128, 0.1);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  h2 {
    color: var(--accent-color);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
