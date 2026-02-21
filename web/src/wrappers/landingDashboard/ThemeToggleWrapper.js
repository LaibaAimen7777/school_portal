import styled from "styled-components";

export const ThemeToggleWrapper = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 0.8rem 1.5rem;
  background: var(--accent);
  color: var(--background);
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
