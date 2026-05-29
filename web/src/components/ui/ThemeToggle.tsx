// components/ThemeToggle.tsx
"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import styled from "styled-components";

export const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  return (
    <ThemeToggleContainer onClick={toggleTheme} aria-label="Toggle theme">
      <ToggleSlider $isLight={currentTheme === "light"}>
        <ToggleKnob $isLight={currentTheme === "light"}>
          {currentTheme === "light" ? (
            <SunIcon className="icon" />
          ) : (
            <MoonIcon className="icon" />
          )}
        </ToggleKnob>
      </ToggleSlider>
    </ThemeToggleContainer>
  );
};

const ThemeToggleContainer = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: var(--transition);

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

interface ToggleSliderProps {
  $isLight: boolean;
}

const ToggleSlider = styled.div<ToggleSliderProps>`
  width: 72px;
  height: 36px;
  background-color: ${(props) =>
    props.$isLight ? "var(--accent-color)" : "var(--card-bg)"};
  border-radius: 36px;
  border: 1px solid var(--border-color);
  transition: var(--transition);
  position: relative;
  box-shadow: var(--shadow-sm);

  &:hover {
    box-shadow: var(--shadow);
  }
`;

const ToggleKnob = styled.div<ToggleSliderProps>`
  width: 30px;
  height: 30px;
  background-color: var(--bg-color);
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${(props) => (props.$isLight ? "3px" : "calc(100% - 33px)")};
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  .icon {
    font-size: 16px;
    transition: var(--transition);
  }
`;

const SunIcon = styled(FaSun)`
  color: #f7b32b;
`;

const MoonIcon = styled(FaMoon)`
  color: #babde2;
`;
