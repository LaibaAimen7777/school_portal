import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: var(--font-main);
  transition: background-color 0.3s ease;
`;

// Navigation
export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background-color: var(--nav-bg);
  border-bottom: 1px solid var(--border-color);

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--accent-color);
`;

export const NavMenu = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1.2rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const NavLink = styled.a`
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: var(--transition);

  &:hover {
    color: var(--accent-color);
  }
`;

/* HERO SECTION */
export const Hero = styled.section`
  background-color: var(--bg-secondary);
  padding: 3rem 4rem 5rem 4rem;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  align-items: center;
  gap: 3rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    padding: 2rem 1.5rem;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--heading-color);
  line-height: 1.2;
  margin-bottom: 2rem;

  span {
    display: block;
    font-size: 0.6em;
    color: var(--accent-color);
    font-weight: 500;
    margin-top: 0.5rem;
  }
`;

export const HeroIllustration = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow);

  @media (max-width: 768px) {
    height: 280px;
  }
`;

/* FEATURE SECTION */
export const FeatureSection = styled.section`
  background-color: var(--card-bg);
  padding: 5rem 4rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const SectionMeta = styled.p`
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-color);
  margin-bottom: 0.75rem;
  font-weight: 500;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 3rem;
  color: var(--heading-color);
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FeatureCard = styled.div`
  background-color: var(--bg-color);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow);
  }
`;

interface ImageWrapperProps {
  $variant: "mint" | "sage" | "terracotta";
}

export const CardImageWrapper = styled.div<ImageWrapperProps>`
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.$variant === "mint"
      ? "rgba(55, 67, 117, 0.08)"
      : props.$variant === "sage"
        ? "rgba(137, 81, 89, 0.08)"
        : "rgba(223, 174, 161, 0.08)"};

  img {
    object-fit: contain;
  }
`;

export const CardBody = styled.div`
  padding: 1.5rem;
  text-align: left;

  h4 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: var(--heading-color);
  }

  p {
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--text-color);
    opacity: 0.8;
  }
`;

/* CIRCLE GALLERY SECTION */
export const CircleSection = styled.section`
  background-color: var(--bg-secondary);
  padding: 5rem 4rem;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const CircleGrid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto 4rem auto;
`;

export const CircleCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h5 {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--heading-color);
  }
`;

interface FrameProps {
  $highlighted?: boolean;
}

export const CircleImageFrame = styled.div<FrameProps>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid
    ${(props) =>
      props.$highlighted ? "var(--accent-color)" : "var(--secondary-color)"};
  background-color: var(--bg-color);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);

  &:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow);
  }

  img {
    object-fit: cover;
  }
`;

/* EDITORIAL SECTION */
export const EditorialSection = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: center;
  gap: 4rem;
  padding-top: 4rem;
  border-top: 1px solid var(--border-color);

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const EditorialContent = styled.div`
  text-align: left;
`;

export const EditorialTitle = styled.h3`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--heading-color);
  margin-bottom: 1.25rem;
`;

export const EditorialText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-color);
  margin-bottom: 2rem;
  opacity: 0.85;
`;

export const EditorialIllustration = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color);
  padding: 1.5rem;
  border-radius: 24px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);

  img {
    object-fit: contain;
    border-radius: 16px;
  }
`;

/* BUTTONS */
export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

interface ButtonProps {
  $primary?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: 0.85rem 2rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 40px;
  transition: var(--transition);

  border: ${(props) =>
    props.$primary ? "none" : `1.5px solid var(--accent-color)`};
  background-color: ${(props) =>
    props.$primary ? "var(--accent-color)" : "transparent"};
  color: ${(props) =>
    props.$primary ? "var(--button-text)" : "var(--accent-color)"};

  &:hover {
    transform: translateY(-2px);
    ${(props) =>
      props.$primary
        ? "filter: brightness(1.05); box-shadow: var(--shadow);"
        : `background-color: var(--accent-color); color: var(--button-text);`}
  }
`;
