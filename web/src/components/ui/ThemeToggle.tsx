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
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
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
    <ThemeToggleContainer onClick={toggleTheme}>
      <ToggleInner $isIsomania={currentTheme === "isomania"}>
        {currentTheme === "isomania" ? (
          <FaSun className="icon" />
        ) : (
          <FaMoon className="icon" />
        )}
      </ToggleInner>
    </ThemeToggleContainer>
  );
};

const ThemeToggleContainer = styled.button`
  /* border-radius: 30px 30px 30px 30px/30px 30px 30px 30px; */
  /* min-width: 90px; */
  padding: 0;
  margin: 0;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 60px;
  height: 60px;
  transition: var(--transition);
  transform: rotate(-2deg);
  box-shadow: none;

  &::before {
    content: "✧";
    position: absolute;
    top: -8px;
    left: -5px;
    color: var(--pop-color);
    font-size: 1rem;
    opacity: 0.6;
    transform: rotate(-15deg);
    animation: twinkleSmall 2s infinite ease-in-out;
  }

  &::after {
    content: "✦";
    position: absolute;
    bottom: -8px;
    right: -5px;
    color: var(--pop-color);
    font-size: 1rem;
    opacity: 0.6;
    transform: rotate(15deg);
    background: transparent;
    animation: twinkleSmall 2s infinite ease-in-out 0.5s;
  }

  @keyframes twinkleSmall {
    0%,
    100% {
      opacity: 0.4;
      transform: rotate(-15deg) scale(1);
    }
    50% {
      opacity: 0.9;
      transform: rotate(-10deg) scale(1.2);
    }
  }

  &:hover {
    transform: rotate(-4deg) scale(1.08);
    background-color: transparent;
    box-shadow: none;

    &::before,
    &::after {
      opacity: 1;
    }
  }

  &:active {
    transform: rotate(0deg) scale(0.95);
  }
`;

interface ToggleInnerProps {
  $isIsomania: boolean;
}

const ToggleInner = styled.div<ToggleInnerProps>`
  width: 50%;
  height: 100%;
  background-color: ${(props) =>
    props.$isIsomania ? "var(--pop-color)" : "var(--text-color)"};
  border: 3px solid var(--border-color);
  border-radius: 50%;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  position: relative;

  .icon {
    color: var(--bg-color);
    font-size: 1.6rem;
    filter: drop-shadow(2px 2px 0px var(--border-color));
    transition: var(--transition);
    animation: ${(props) =>
      props.$isIsomania ? "spinSun 10s linear infinite" : "none"};
  }

  @keyframes spinSun {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border: 1px dashed var(--pop-color);
    border-radius: 50%;
    opacity: 0.4;
    pointer-events: none;
    animation: rotate 10s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    border: 1px solid var(--border-color);
    border-radius: 50%;
    opacity: 0.2;
    pointer-events: none;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  &:hover {
    transform: scale(1.05);

    .icon {
      animation: ${(props) =>
        props.$isIsomania ? "spinSun 5s linear infinite" : "bounce 0.5s ease"};
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-10deg);
    }
    75% {
      transform: rotate(10deg);
    }
  }
`;
