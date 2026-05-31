import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-secondary);
`;

export const Sidebar = styled.aside`
  width: 260px;
  background-color: var(--bg-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  transition: all 0.2s ease;
  z-index: 20;

  @media (max-width: 768px) {
    transform: translateX(-100%);
    position: fixed;
    box-shadow: var(--shadow);
  }
`;

export const SidebarHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1rem;
`;

export const Logo = styled.div`
  width: 36px;
  height: 36px;
  background-color: var(--accent-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--button-text);
  font-weight: 700;
  font-size: 1rem;
`;

export const LogoText = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: var(--heading-color);
`;

export const NavSection = styled.div`
  flex: 1;
  padding: 0 1rem;
  overflow-y: auto;

  .section-label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-color);
    opacity: 0.6;
    padding: 1rem 0.75rem 0.5rem;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
  }
`;

interface NavItemProps {
  $active?: boolean;
}

export const NavItem = styled.button<NavItemProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 0.6rem 0.75rem;
  margin-bottom: 0.25rem;
  border: none;
  background: ${(props) =>
    props.$active ? "var(--bg-secondary)" : "transparent"};
  color: ${(props) =>
    props.$active ? "var(--accent-color)" : "var(--text-color)"};
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: ${(props) => (props.$active ? "500" : "400")};
  transition: all 0.2s ease;
  position: relative;

  svg {
    font-size: 1rem;
    min-width: 20px;
    opacity: ${(props) => (props.$active ? "1" : "0.7")};
  }

  .active-indicator {
    position: absolute;
    left: 0;
    width: 3px;
    height: 20px;
    background-color: var(--accent-color);
    border-radius: 0 2px 2px 0;
  }

  &:hover {
    background: var(--bg-secondary);
    color: var(--accent-color);

    svg {
      opacity: 1;
    }
  }
`;

export const SidebarFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid var(--border-color);
  margin-top: auto;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: var(--bg-secondary);
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--button-text);
  font-weight: 600;
  font-size: 1rem;
`;

export const UserDetails = styled.div`
  flex: 1;

  h4 {
    font-size: 0.85rem;
    font-weight: 600;
    margin: 0 0 2px 0;
    color: var(--heading-color);
  }

  p {
    font-size: 0.7rem;
    margin: 0;
    opacity: 0.6;
    color: var(--text-color);
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: none;
  background: transparent;
  color: #ef4444;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  svg {
    font-size: 1rem;
  }

  &:hover {
    background-color: rgba(239, 68, 68, 0.1);
  }
`;

export const ContentArea = styled.main`
  flex: 1;
  margin-left: 260px;
  padding: 1rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  background-color: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
`;

export const PageTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--heading-color);
  margin: 0;
  letter-spacing: -0.01em;
`;

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
