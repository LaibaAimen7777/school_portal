import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  transition: var(--transition);

  .card {
    background-color: var(--bg-color);
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius-xl);
    box-shadow: var(--shadow);
    width: 550px;
    max-width: 100%;
    padding: var(--spacing-2xl);
    font-family: var(--font-main);
    transition: var(--transition);

    &:hover {
      box-shadow: var(--shadow-hover);
    }

    h1 {
      text-align: center;
      font-size: 2rem;
      color: var(--text-color);
      margin: 0 0 var(--spacing-xl) 0;
      border: none;
      padding: 0 0 var(--spacing-md) 0;
      border-bottom: 2px dashed var(--border-color);
      box-shadow: none;
    }

    h3 {
      font-size: 1.25rem;
      margin: var(--spacing-xl) 0 var(--spacing-lg) 0;
      border: none;
      padding: 0 0 var(--spacing-xs) 1rem;
      border-bottom: var(--border-width) solid var(--border-color);
      box-shadow: none;
      color: var(--text-color);
    }

    label {
      display: block;
      margin-bottom: var(--spacing-xs);
      font-weight: 500;
      color: var(--text-color);
      font-size: 0.95rem;
      letter-spacing: 0.02em;
    }

    input,
    select {
      width: 100%;
      padding: var(--spacing-md);
      margin-bottom: var(--spacing-md);
      border-radius: var(--border-radius-lg);
      border: var(--border-width) solid var(--border-color);
      background-color: var(--bg-color);
      color: var(--text-color);
      font-size: 1rem;
      transition: var(--transition);

      &:focus {
        outline: none;
        border-width: 2px;
        box-shadow: var(--shadow);
        transform: scale(1.01);
      }

      &::placeholder {
        color: var(--text-color);
        opacity: 0.5;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .error-text {
      color: #ff4444;
      font-size: 0.85rem;
      margin: -0.5rem 0 var(--spacing-md) 0;
      padding: 0;
      border: none;
      animation: shake 0.3s ease-out;

      @keyframes shake {
        0%,
        100% {
          transform: translateX(0);
        }
        25% {
          transform: translateX(5px);
        }
        75% {
          transform: translateX(-5px);
        }
      }
    }

    .success-text {
      color: #44ff44;
      font-size: 0.85rem;
      margin: -0.5rem 0 var(--spacing-md) 0;
      padding: var(--spacing-xs) var(--spacing-md);
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--border-radius-full);
      background-color: rgba(68, 255, 68, 0.1);
    }

    .info-text {
      margin: -0.5rem 0 var(--spacing-md) 0;
      padding: var(--spacing-sm) var(--spacing-md);
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--border-radius-full);
      background-color: var(--bg-color);
      font-size: 0.9rem;
      color: var(--text-color);
      border-style: dashed;
    }

    .seats-available {
      margin: var(--spacing-md) 0;
      padding: var(--spacing-md);
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--border-radius-lg);
      background-color: var(--bg-color);
      font-weight: 500;
      text-align: center;
    }

    .full-warning {
      margin: var(--spacing-md) 0;
      padding: var(--spacing-md);
      border: var(--border-width) solid #ff4444;
      border-radius: var(--border-radius-lg);
      background-color: rgba(255, 68, 68, 0.05);
      color: #ff4444;
      text-align: center;
      font-weight: 500;
    }

    button {
      width: 100%;
      padding: var(--spacing-md) var(--spacing-xl);
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--border-radius-full);
      background-color: var(--text-color);
      color: var(--bg-color);
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: var(--transition);
      margin-top: var(--spacing-lg);

      &:hover:not(:disabled) {
        background-color: var(--bg-color);
        color: var(--text-color);
        transform: translateY(-2px);
        box-shadow: var(--shadow-hover);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
    }

    /* Step indicators */
    .step-indicator {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--spacing-xl);
      padding: var(--spacing-md);
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--border-radius-full);
      background-color: var(--bg-color);
    }

    .step {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      color: var(--text-color);
      opacity: 0.5;
      transition: var(--transition);

      &.active {
        opacity: 1;
        font-weight: 600;
      }

      .step-number {
        width: 24px;
        height: 24px;
        border-radius: var(--border-radius-full);
        border: var(--border-width) solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.85rem;
      }
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    padding: var(--spacing-lg);

    .card {
      padding: var(--spacing-xl);
    }
  }

  @media (max-width: 480px) {
    padding: var(--spacing-md);

    .card {
      padding: var(--spacing-lg);

      h1 {
        font-size: 1.5rem;
      }

      h3 {
        font-size: 1.1rem;
      }
    }
  }
`;
