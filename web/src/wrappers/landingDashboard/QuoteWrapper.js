import styled from "styled-components";

export const QuoteWrapper = styled.section`
  max-width: 800px;
  margin: 4rem auto;
  padding: 4rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .quote-text {
    font-family: "Playfair Display", serif;
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    font-style: italic;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: var(--foreground);
    opacity: 0.9;
  }

  .quote-author {
    font-size: 1rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent);
  }
`;
