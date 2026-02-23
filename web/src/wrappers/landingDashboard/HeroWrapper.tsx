// wrappers/HeroWrapper.tsx
import styled from "styled-components";

interface HeroWrapperProps {
  bgImage?: string;
  children?: React.ReactNode;
}

export const HeroWrapper = styled.section<HeroWrapperProps>`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  position: relative;
  background-image: url(${(props) => props.bgImage || "/default-hero.jpg"});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  // In your HeroWrapper, update the overlay to use theme-aware colors:
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) =>
      props.theme === "piship" ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.5)"};
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }

  .hero-title {
    font-size: clamp(3rem, 10vw, 6rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: -2px;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

    span {
      color: var(--accent);
      display: block;
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      font-weight: 400;
      letter-spacing: 4px;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
  }

  .hero-image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--accent);
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-subtitle {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 2rem;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }
`;
