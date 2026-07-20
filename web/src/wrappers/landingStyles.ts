import styled, { css } from "styled-components";

// Dynamic CSS Theme Variables: Light mode (Mockup colors) vs Dark mode (Green palette)
const themeVariables = css`
  :root {
    /* LIGHT MODE (Mockup accurate: Yellow/Cream) */
    --bg-container: #eae6df;
    --bg-portal: #f4ede2;
    --accent-color: #e0a21b;
    --text-dark: #1e1e1e;
    --text-color: #2b2b2b;
    --heading-color: #1a1a1a;
    --border-color: #1a1a1a;
    --button-bg: #e0a21b;
    --button-text: #1a1a1a;
    --pill-bg: #ffffff;
    --pill-text: #1a1a1a;
    --card-bg: #ffffff;
    --scallop-color: #e0a21b;
  }

  [data-theme="dark"],
  .dark {
    /* DARK MODE (Deep Emerald Green palette) */
    --bg-container: #0a140f;
    --bg-portal: #0f1f18;
    --accent-color: #1e4d38;
    --text-dark: #e1efe6;
    --text-color: #c5ded0;
    --heading-color: #ffffff;
    --border-color: #2a6148;
    --button-bg: #287a55;
    --button-text: #ffffff;
    --pill-bg: #183829;
    --pill-text: #e1efe6;
    --card-bg: #142a20;
    --scallop-color: #1b4532;
  }
`;

// ========== CONTAINER STYLES ==========

export const Container = styled.div`
  ${themeVariables}
  width: 100%;
  min-height: 100vh;
  margin: 0;
  /* padding: 1.5rem; */
  background-color: var(--bg-container);
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const PortalInner = styled.div`
  background-color: var(--bg-portal);
  width: 100%;
  min-height: 100vh; /* Ensures it stretches to the bottom */
  border-radius: 0; /* Remove rounded corners if you want edge-to-edge */
  border: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1; /* Takes up full vertical height available */
`;
// ========== NAVIGATION STYLES ==========

export const Nav = styled.nav`
  background-color: var(--accent-color);
  padding: 1.25rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 10;
  border-bottom: 2px solid var(--border-color);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 580px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const NavPillButton = styled.a`
  color: var(--pill-text);
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  background-color: var(--pill-bg);
  padding: 0.55rem 1.75rem;
  border-radius: 9999px;
  border: 1.5px solid var(--border-color);
  transition: all 0.2s ease;
  box-shadow: 0 2px 0 var(--border-color);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 0 var(--border-color);
  }
`;

// ========== HERO STYLES ==========

export const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 2rem;
  padding: 4rem 3rem 5rem;
  position: relative;
  overflow: hidden;
  background-color: var(--bg-portal);

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 3rem 1.5rem;
  }

  .hero-text-block {
    z-index: 3;
  }

  .hero-illustration-block {
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// Decorative Scalloped Shapes matching the Figma mockup frame
export const ScallopedShape = styled.div`
  position: absolute;
  background-color: var(--scallop-color);
  width: 140px;
  height: 140px;
  border-radius: 40px;
  transform: rotate(45deg);
  z-index: 1;
  pointer-events: none;
  will-change: transform; /* Boosts smooth rendering performance */

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 140px;
    height: 140px;
    background-color: var(--scallop-color);
    border-radius: 40px;
  }

  &::before {
    transform: rotate(30deg);
  }

  &::after {
    transform: rotate(60deg);
  }

  /* Positioning classes */
  &.shape-top-left {
    top: -40px;
    left: -30px;
  }

  &.shape-top-center {
    top: -50px;
    left: 45%;
  }

  &.shape-bottom-center {
    bottom: -60px;
    left: 25%;
  }

  &.shape-right-middle {
    bottom: -30px;
    right: -40px;
  }
`;

export const HeroTitle = styled.h1`
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;
  color: var(--heading-color);
`;

export const HeroSubtitle = styled.p`
  color: var(--text-dark);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

export const Button = styled.button<{ $primary?: boolean }>`
  background-color: var(--button-bg);
  color: var(--button-text);
  border: 2px solid var(--border-color);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  padding: 0.65rem 2rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 0 var(--border-color);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 0 var(--border-color);
  }
`;

// ========== TEAMWORK SECTION STYLES ==========

export const TeamworkSection = styled.section`
  background-color: var(--accent-color);
  padding: 4rem 2rem;
  border-top: 2px solid var(--border-color);
  border-bottom: 2px solid var(--border-color);
  transition: background-color 0.3s ease;
`;

export const TeamworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

export const TeamworkCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;

  .card-image-wrapper {
    background: var(--card-bg);
    border-radius: 28px;
    padding: 1rem;
    border: 2px solid var(--border-color);
    box-shadow: 0 6px 0 var(--border-color);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 280px;
    aspect-ratio: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
  }

  h4 {
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--heading-color);
  }
`;

// ========== EDITORIAL SECTION STYLES ==========

export const EditorialSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 3.5rem;
  padding: 5rem 3rem;
  align-items: center;
  background-color: var(--bg-portal);
  position: relative;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 3rem 1.5rem;
  }
`;

export const EditorialImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .image-card-wrapper {
    position: relative;
    width: 100%;
    max-width: 600px;
    padding: 1.5rem;
    /* background: var(--card-bg); */
  }
`;

export const EditorialCardWrapper = styled.div`
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: var(--border-radius-lg, 28px);
  border: 2px solid var(--border-color);
  box-shadow: 0 8px 0 var(--border-color);
  position: relative;
  display: flex;
  flex-direction: column;

  .badge {
    align-self: flex-start;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    padding: 0.35rem 1rem;
    border-radius: 9999px;
    background-color: var(--accent-color);
    color: var(--heading-color);
    border: 1.5px solid var(--border-color);
    margin-bottom: 1.25rem;
  }

  .quote-mark {
    position: absolute;
    top: 1rem;
    right: 2rem;
    font-family: var(--font-heading);
    font-size: 5rem;
    line-height: 1;
    color: var(--accent-color);
    opacity: 0.3;
    pointer-events: none;
  }
`;

export const EditorialHeading = styled.h3`
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 2.5vw, 2.1rem);
  line-height: 1.3;
  color: var(--heading-color);
  margin-bottom: 1.25rem;
  font-weight: 400;
`;

export const EditorialTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--text-color);
    opacity: 0.9;
  }
`;

export const EditorialFooterNote = styled.div`
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1.5px dashed var(--border-color);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--heading-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// ========== FOOTER STYLES ==========

export const Footer = styled.footer`
  background-color: var(--accent-color);
  color: var(--text-color);
  padding: 4rem 3rem 3rem;
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 2.5rem;
  border-top: 2px solid var(--border-color);

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 3rem 1.5rem;
  }
`;

export const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;

  .brand-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;

    h3 {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--heading-color);
      margin-left: 5px;
    }

    .tagline {
      font-size: 0.75rem;
      opacity: 0.85;
      margin: 0;
      margin-left: 5px;
    }
  }

  .description {
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    max-width: 320px;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 0.75rem;

  a {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1.5px solid var(--border-color);
    color: var(--heading-color);
    text-decoration: none;
    font-size: 0.75rem;
    font-weight: bold;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--border-color);
      color: var(--accent-color);
    }
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;

  h5 {
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
    font-weight: 800;
    color: var(--heading-color);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  a {
    color: var(--text-color);
    text-decoration: none;
    font-size: 0.85rem;
    opacity: 0.9;
    transition: all 0.2s ease;

    &:hover {
      opacity: 1;
      text-decoration: underline;
    }
  }
`;

// Replace Crest with LogoImageWrapper in landingStyles.ts

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const LogoImageWrapper = styled.div<{ $small?: boolean }>`
  width: ${(props) => (props.$small ? "36px" : "48px")};
  height: ${(props) => (props.$small ? "36px" : "48px")};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 55px;
    height: 55px;
    object-fit: contain;
    border: solid black 1px;
    border-radius: 30px;
  }
`;

export const LogoText = styled.span`
  font-family: var(--font-main);
  font-weight: 800;
  font-size: 1.05rem;
  letter-spacing: 0.05em;
  color: var(--heading-color);
  text-transform: uppercase;
`;
