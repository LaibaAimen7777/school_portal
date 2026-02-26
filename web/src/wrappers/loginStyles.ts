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

  &::before {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    background: var(--accent-color);
    opacity: 0.1;
    border-radius: 50%;
    top: -100px;
    right: -100px;
  }

  &::after {
    content: "";
    position: absolute;
    width: 200px;
    height: 200px;
    background: var(--accent-color);
    opacity: 0.1;
    border-radius: 50%;
    bottom: -50px;
    left: -50px;
  }
`;

export const Card = styled.div`
  padding: 3rem 2.5rem;
  border-radius: 20px;
  background: var(--card-bg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 400px;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(128, 128, 128, 0.1);
  transition: all 0.3s ease;

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
  opacity: 0.7;
  z-index: 1;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid transparent;
  border-radius: 12px;
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;

  &::placeholder {
    color: var(--text-color);
    opacity: 0.5;
  }

  &:focus {
    border-color: var(--accent-color);
    background: var(--card-bg);
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: var(--accent-color);
  color: var(--button-text);
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: var(--accent-color);
    filter: brightness(1.1);
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
  font-size: 0.9rem;
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
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
  padding: 0.5rem;
  border-radius: 8px;
  background-color: rgba(255, 77, 77, 0.1);
`;

export const BackToHome = styled.a`
  display: block;
  text-align: center;
  margin-top: 2rem;
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.9rem;
  opacity: 0.6;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: var(--accent-color);
    opacity: 1;
  }
`;
