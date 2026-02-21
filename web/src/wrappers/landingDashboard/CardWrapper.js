import styled from "styled-components";

export const CardWrapper = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--accent);
  }

  .card-description {
    font-size: 0.95rem;
    line-height: 1.6;
    opacity: 0.8;
    color: var(--foreground);
  }

  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--accent);
  }
`;
