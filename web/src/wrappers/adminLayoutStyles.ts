import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-container);
`;

export const Sidebar = styled.aside`
  width: 280px;
  background-color: var(--bg-portal);
  border-right: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  transition: var(--transition);
  z-index: 20;

  @media (max-width: 768px) {
    transform: translateX(-100%);
    position: fixed;
    box-shadow: var(--shadow-hover);
  }
`;

export const SidebarHeader = styled.div`
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  border-bottom: 2px solid var(--border-color);
  background-color: var(--accent-color);
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const LogoImageWrapper = styled.div<{ small?: boolean }>`
  width: ${(props) => (props.small ? "32px" : "38px")};
  height: ${(props) => (props.small ? "32px" : "38px")};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    border: solid black 1px;
    border-radius: 30px;
  }
`;

export const LogoText = styled.span`
  font-family: var(--font-main);
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--heading-color);
  text-transform: uppercase;
`;

export const NavSection = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;

  .nav-group {
    margin-bottom: 1rem;
  }

  .section-label {
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--heading-color);
    opacity: 0.7;
    padding: 0.5rem 0.75rem;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: var(--border-radius-full);
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
  padding: 0.65rem 1rem;
  margin-bottom: 0.4rem;
  border: 1.5px solid
    ${(props) => (props.$active ? "var(--border-color)" : "transparent")};
  background: ${(props) =>
    props.$active ? "var(--accent-color)" : "transparent"};
  color: ${(props) =>
    props.$active ? "var(--heading-color)" : "var(--text-color)"};
  border-radius: var(--border-radius-full);
  cursor: pointer;
  font-family: var(--font-main);
  font-size: 0.85rem;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  transition: all 0.2s ease;
  position: relative;
  box-shadow: ${(props) =>
    props.$active ? "0 2px 0 var(--border-color)" : "none"};

  .nav-icon {
    font-size: 1rem;
    min-width: 20px;
    color: var(--heading-color);
  }

  .active-indicator {
    position: absolute;
    right: 12px;
    width: 6px;
    height: 6px;
    background-color: var(--heading-color);
    border-radius: 50%;
  }

  &:hover {
    background: var(--accent-color);
    border-color: var(--border-color);
    color: var(--heading-color);
    transform: translateX(2px);
  }
`;

export const SidebarFooter = styled.div`
  padding: 1rem;
  border-top: 2px solid var(--border-color);
  background-color: var(--bg-portal);
  margin-top: auto;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border-radius: var(--border-radius-md);
  border: 1.5px solid var(--border-color);
  background-color: var(--card-bg);
`;

export const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid var(--border-color);
  background-color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--heading-color);
  font-weight: 800;
  font-size: 0.9rem;
`;

export const UserDetails = styled.div`
  flex: 1;
  overflow: hidden;

  h4 {
    font-size: 0.8rem;
    font-weight: 700;
    margin: 0;
    color: var(--heading-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 0.7rem;
    margin: 0;
    opacity: 0.7;
    color: var(--text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1.5px solid var(--border-color);
  background: var(--bg-portal);
  color: #ef4444;
  border-radius: var(--border-radius-full);
  cursor: pointer;
  font-family: var(--font-main);
  font-size: 0.8rem;
  font-weight: 700;
  transition: all 0.2s ease;

  svg {
    font-size: 0.9rem;
  }

  &:hover {
    background-color: #ef4444;
    color: #ffffff;
  }
`;

export const ContentArea = styled.main`
  flex: 1;
  margin-left: 280px;
  padding: 1.5rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .main-content-padding {
    flex: 1;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  background-color: var(--bg-portal);
  border-radius: var(--border-radius-md);
  border: 2px solid var(--border-color);
  box-shadow: 0 4px 0 var(--border-color);
`;

export const PageTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--heading-color);
  margin: 0;
  letter-spacing: 0.02em;
`;

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
