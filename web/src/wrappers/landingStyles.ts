import styled from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa";

// Main container
export const Container = styled.div`
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: all 0.3s ease;
  position: relative;
  overflow-x: hidden;
`;

// Navigation
export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  background-color: var(--nav-bg, var(--bg-color));

  @media (max-width: 768px) {
    padding: 1.5rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: var(--accent-color);
`;

export const NavMenu = styled.div`
  display: flex;
  gap: 2.5rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const NavLink = styled.a`
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 1px;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

// Hero Section
export const Hero = styled.section`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  position: relative;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  color: var(--text-color);

  span {
    color: var(--accent-color);
    display: block;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 400;
    letter-spacing: 4px;
    margin-bottom: 1rem;
  }
`;

// Quote Section
export const QuoteSection = styled.section`
  max-width: 800px;
  margin: 4rem auto;
  padding: 4rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
`;

export const QuoteText = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--text-color);
  opacity: 0.9;
`;

export const QuoteAuthor = styled.p`
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent-color);
`;

// Explore Section
export const ExploreSection = styled.section`
  padding: 6rem 4rem;
  background-color: var(--secondary-color);

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 800;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--heading-color, var(--text-color));
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

// Card
export const Card = styled.div`
  padding: 2rem;
  background-color: var(--card-bg, rgba(255, 255, 255, 0.05));
  border-radius: 8px;
  transition: transform 0.3s ease;
  border: 1px solid rgba(128, 128, 128, 0.1);

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--accent-color);
`;

export const CardDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.8;
  color: var(--text-color);
`;

// Buttons
export const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

interface ButtonProps {
  $primary?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: 1rem 2.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid var(--accent-color);
  border-radius: 4px;
  background-color: ${(props) =>
    props.$primary ? "var(--accent-color)" : "transparent"};
  color: ${(props) =>
    props.$primary
      ? "var(--button-text, var(--bg-color))"
      : "var(--text-color)"};

  &:hover {
    background-color: var(--accent-color);
    color: var(--button-text-hover, var(--bg-color));
  }
`;

// Question Section
export const QuestionBox = styled.div`
  max-width: 600px;
  margin: 6rem auto;
  padding: 0 2rem 4rem;
  text-align: left;
`;

export const Question = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: var(--text-color);
`;

export const Answer = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  opacity: 0.8;
  margin-bottom: 2.5rem;
  color: var(--text-color);
`;

// Floating Image
export const FloatingImage = styled.div`
  margin-bottom: 2rem;
  animation: float 3s ease-in-out infinite;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--accent-color);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
`;

// Theme Toggle
export const ThemeToggle = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

interface ThemeToggleButtonProps {
  $isIsomania: boolean;
}

export const ThemeToggleButton = styled.button<ThemeToggleButtonProps>`
  width: 70px;
  height: 34px;
  background-color: ${(props) => (props.$isIsomania ? "#f1c40f" : "#2c3e50")};
  border-radius: 34px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  position: relative;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
  }
`;

interface IconProps {
  $isActive: boolean;
}

export const SunIcon = styled(FaSun)<IconProps>`
  color: ${(props) => (props.$isActive ? "#fff" : "#f39c12")};
  font-size: 20px;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
`;

export const MoonIcon = styled(FaMoon)<IconProps>`
  color: ${(props) => (props.$isActive ? "#fff" : "#bdc3c7")};
  font-size: 18px;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
`;
