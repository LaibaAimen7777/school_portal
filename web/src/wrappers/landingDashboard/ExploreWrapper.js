import styled from "styled-components";

export const ExploreWrapper = styled.section`
  padding: 6rem 4rem;
  background: var(--secondary);
  color: var(--foreground);

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }

  .section-title {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -1px;
    margin-bottom: 3rem;
    text-align: center;
    color: var(--foreground);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
`;
