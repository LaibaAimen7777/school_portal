import styled from "styled-components";

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }

  .btn {
    padding: 1rem 2.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    background: transparent;
    color: var(--foreground);
    border: 2px solid var(--foreground);
    border-radius: 4px;

    &:hover {
      background: var(--accent);
      color: var(--background);
      border-color: var(--accent);
    }
  }

  .btn-primary {
    background: var(--accent);
    color: var(--background);
    border: 2px solid var(--accent);

    &:hover {
      background: var(--foreground);
      color: var(--accent);
      border-color: var(--foreground);
    }
  }
`;
