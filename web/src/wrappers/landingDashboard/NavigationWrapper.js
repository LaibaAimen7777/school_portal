import styled from "styled-components";

export const NavigationWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
    flex-direction: column;
    gap: 1rem;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 2px;
    color: var(--accent);
    cursor: pointer;
  }

  .nav-menu {
    display: flex;
    gap: 2.5rem;

    @media (max-width: 768px) {
      gap: 1.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .nav-link {
    color: var(--foreground);
    font-weight: 500;
    font-size: 0.9rem;
    letter-spacing: 1px;
    transition: color 0.3s ease;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: var(--accent);
    }
  }
`;
