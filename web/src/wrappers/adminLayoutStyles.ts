import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh; /* Locks the wrapper to screen height */
  width: 100vw;
  overflow: hidden; /* Prevents whole-page scrolling */
  background-color: var(--bg-container);
`;

export const Sidebar = styled.aside`
  width: 260px;
  height: 100vh; /* Fixed full height */
  background-color: var(--bg-portal, #ffffff);
  border-right: 2px solid var(--border-color, #111111);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  flex-shrink: 0; /* Prevents sidebar from squishing */
`;

export const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 2px solid var(--border-color, #111111);
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const LogoImageWrapper = styled.div`
  width: 36px;
  height: 36px;
  position: relative;
`;

export const LogoText = styled.span`
  font-family: var(--font-main);
  font-size: 0.95rem;
  font-weight: 900;
  color: var(--heading-color, #111111);
  letter-spacing: 0.05em;
`;
export const NavSection = styled.nav`
  padding: 1rem;
  flex: 1;
  overflow-y: auto; /* INDEPENDENT SIDEBAR SCROLLING */

  /* Optional: Custom slim scrollbar for sidebar */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border-color, #cccccc);
    border-radius: 4px;
  }

  .nav-group {
    margin-bottom: 1.25rem;
  }

  .section-label {
    font-size: 0.7rem;
    font-weight: 800;
    color: var(--text-color);
    opacity: 0.6;
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
  }
`;

export const NavItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  background-color: ${(props) =>
    props.$active ? "var(--accent-color, #eeb22d)" : "transparent"};
  color: var(--heading-color, #111111);
  border: ${(props) =>
    props.$active
      ? "2px solid var(--border-color, #111111)"
      : "2px solid transparent"};
  box-shadow: ${(props) =>
    props.$active ? "0 3px 0 var(--border-color, #111111)" : "none"};

  &:hover {
    background-color: var(--accent-color, #eeb22d);
    border-color: var(--border-color, #111111);
  }

  .nav-icon {
    font-size: 1rem;
  }
`;

export const SidebarFooter = styled.div`
  padding: 1rem;
  border-top: 2px solid var(--border-color, #111111);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.5rem;
  border: 1.5px solid var(--border-color, #111111);
  border-radius: 16px;
  background-color: var(--bg-portal, #ffffff);
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--accent-color, #eeb22d);
  border: 1.5px solid var(--border-color, #111111);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.85rem;
  color: var(--heading-color, #111111);
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  h4 {
    font-size: 0.8rem;
    font-weight: 800;
    margin: 0;
    color: var(--heading-color, #111111);
  }

  p {
    font-size: 0.7rem;
    margin: 0;
    opacity: 0.7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.55rem;
  background-color: transparent;
  color: #d93838;
  border: 1.5px solid #d93838;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #d93838;
    color: #ffffff;
  }
`;

export const ContentArea = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100vh; /* Fixed full height */
  overflow-y: auto; /* INDEPENDENT CONTENT AREA SCROLLING */
  position: relative;

  /* FIXED BACKGROUND IMAGE */
  .full-bg-image {
    position: fixed !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 260px;
    /* width: calc(100vw - 260px) !important; */
    height: 100vh !important;
    object-fit: cover !important;
    object-position: center !important;
    z-index: 0;
    pointer-events: none;

    @media (max-width: 768px) {
      left: 0;
      width: 100vw !important;
    }
  }

  /* TINT OVERLAY */
  &::before {
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 260px;
    height: 100vh;
    background-color: var(--bg-image-tint, rgba(218, 165, 32, 0.35));
    mix-blend-mode: var(--bg-image-blend, color);
    z-index: 1;
    pointer-events: none;
    transition: background-color 0.3s ease;

    @media (max-width: 768px) {
      left: 0;
    }
  }

  /* Keep content elevated */
  > * {
    position: relative;
    z-index: 2;
  }

  .main-content-padding {
    padding: 1.5rem 2rem;
  }
`;

export const TopBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 2px solid var(--border-color, #111111);
  background-color: var(--bg-portal, #ffffff);
`;

export const PageTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  margin: 0;
  color: var(--heading-color, #111111);
`;

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// --- NEW HERO BANNER STYLES (MATCHES TARGET IMAGE) ---

export const HeroBackgroundWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 280px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 2px solid var(--border-color, #111111);

  /* Background Image / GIF */
  img.bg-image {
    object-fit: cover;
    z-index: 0;
  }

  /* Dynamic Dark/Light Mode Tint Overlay */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--bg-image-tint, rgba(238, 178, 45, 0.25));
    mix-blend-mode: var(--bg-image-blend, multiply);
    z-index: 1;
    pointer-events: none;
    transition: background-color 0.3s ease;
  }

  /* Elevates elements inside banner above the tint */
  > * {
    position: relative;
    z-index: 2;
  }
`;
export const DashboardHeaderCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-portal, rgba(255, 255, 255, 0.85));
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-color, rgba(229, 231, 235, 0.8));
  border-radius: 16px;
  padding: 1rem 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  margin-bottom: 2rem;

  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem;

    h1 {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--heading-color, #111827);
      letter-spacing: -0.01em;
      margin: 0;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    .header-right {
      width: 100%;
      button {
        width: 100%;
        justify-content: center;
      }
    }
  }
`;

export const UserIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: var(--accent-color, #2563eb);
  background-color: var(--bg-secondary, #eff6ff);
  flex-shrink: 0;
`;
