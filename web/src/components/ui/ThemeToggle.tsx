// components/ThemeToggle.tsx
"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import styled from "styled-components";

export const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState<"isomania" | "piship">(
    "isomania",
  );

  const toggleTheme = () => {
    const newTheme = currentTheme === "isomania" ? "piship" : "isomania";
    setCurrentTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Save preference
  };

  useEffect(() => {
    // Load saved theme preference
    const savedTheme = localStorage.getItem("theme") as
      | "isomania"
      | "piship"
      | null;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  return (
    <ThemeToggleContainer>
      <ThemeToggleButton
        onClick={toggleTheme}
        $isIsomania={currentTheme === "isomania"}
      >
        <SunIcon $isActive={currentTheme === "isomania"} />
        <MoonIcon $isActive={currentTheme === "piship"} />
      </ThemeToggleButton>
    </ThemeToggleContainer>
  );
};

// Styled components for the toggle
const ThemeToggleContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

interface ThemeToggleButtonProps {
  $isIsomania: boolean;
}

const ThemeToggleButton = styled.button<ThemeToggleButtonProps>`
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
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
  }
`;

interface IconProps {
  $isActive: boolean;
}

const SunIcon = styled(FaSun)<IconProps>`
  color: ${(props) => (props.$isActive ? "#fff" : "#f39c12")};
  font-size: 20px;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
`;

const MoonIcon = styled(FaMoon)<IconProps>`
  color: ${(props) => (props.$isActive ? "#fff" : "#bdc3c7")};
  font-size: 18px;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
`;
