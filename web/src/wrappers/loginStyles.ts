// wrappers/loginStyles.ts
import styled from "styled-components";
import { FaUser, FaLock } from "react-icons/fa";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color);
  position: relative;
  overflow: hidden;

  /* Animated gradient background */
  &::before {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    background: var(--accent-color);
    opacity: 0.15;
    border-radius: 50%;
    top: -150px;
    right: -100px;
    animation: float 20s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    background: var(--secondary-color);
    opacity: 0.1;
    border-radius: 50%;
    bottom: -100px;
    left: -80px;
    animation: float 15s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(30px, 20px) scale(1.1);
    }
  }
`;

export const Card = styled.div`
  padding: 3rem 2.5rem;
  border-radius: 32px;
  background: rgba(var(--bg-color-rgb), 0.45);
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  width: 420px;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(var(--border-color-rgb), 0.5);
  transition: all 0.3s ease;

  /* Dark mode glass effect */
  [data-theme="dark"] & {
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.8);

    [data-theme="dark"] & {
      background: rgba(15, 23, 42, 0.8);
    }
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--accent-color);
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent-color);
  font-size: 1.2rem;
  z-index: 1;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem 3rem 1rem 3rem;
  border: 1.5px solid rgba(128, 128, 128, 0.2);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;

  [data-theme="dark"] & {
    background: rgba(30, 41, 59, 0.5);
    border-color: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: var(--text-color);
    opacity: 0.5;
  }

  &:focus {
    border-color: var(--accent-color);
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 0 4px rgba(55, 67, 117, 0.1);

    [data-theme="dark"] & {
      background: rgba(30, 41, 59, 0.8);
      box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.2);
    }
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--accent-color);
  color: var(--button-text);
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    filter: brightness(1.05);
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ForgotPassword = styled.a`
  display: block;
  text-align: right;
  margin-top: 1rem;
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.85rem;
  opacity: 0.7;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: var(--accent-color);
    opacity: 1;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  text-align: center;
  padding: 0.5rem;
  border-radius: 12px;
  background: rgba(255, 77, 77, 0.1);
  backdrop-filter: blur(4px);
`;

export const BackToHome = styled.a`
  display: block;
  text-align: center;
  margin-top: 2rem;
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.85rem;
  opacity: 0.6;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: auto;
  margin-left: auto;
  margin-right: auto;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--accent-color);
    transition: var(--transition);
  }

  &:hover {
    color: var(--accent-color);
    opacity: 1;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const TogglePassword = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent-color);
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 2;
  transition: var(--transition);

  &:hover {
    opacity: 0.7;
  }
`;

// Optional: Add a glass divider or social login section
export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  }

  span {
    padding: 0 1rem;
    font-size: 0.8rem;
    color: var(--text-color);
    opacity: 0.6;
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const SocialButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-color);

  [data-theme="dark"] & {
    background: rgba(30, 41, 59, 0.5);
    border-color: rgba(255, 255, 255, 0.1);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: translateY(-2px);

    [data-theme="dark"] & {
      background: rgba(30, 41, 59, 0.8);
    }
  }
`;
