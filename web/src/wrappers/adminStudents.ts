import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(
    --bg-color
  ); /* Kept consistent with canvas background */
  padding: var(--spacing-xl);
  font-family: var(--font-main);
  transition: var(--transition);
  position: relative;
  overflow-x: hidden;

  /* Ambient Glass Light Layers to show off card blurs */
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 35vw;
    height: 35vw;
    min-width: 280px;
    border-radius: 50%;
    filter: blur(140px);
    z-index: 0;
    pointer-events: none;
    opacity: 0.35;
    transition: var(--transition);

    [data-theme="dark"] & {
      opacity: 0.15;
      filter: blur(180px);
    }
  }

  &::before {
    top: -5%;
    right: -5%;
    background: radial-gradient(
      circle,
      var(--accent-color) 0%,
      transparent 70%
    );
  }

  &::after {
    bottom: 10%;
    left: -5%;
    background: radial-gradient(
      circle,
      var(--secondary-color) 0%,
      transparent 70%
    );
  }

  .header {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xl);
    padding: var(--spacing-lg) var(--spacing-xl);

    /* Frosted Header Glass */
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.04);

    [data-theme="dark"] {
      background: rgba(43, 7, 10, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
    }

    h1 {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--heading-color);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.85rem;
      letter-spacing: -0.01em;

      svg {
        color: var(--accent-color);
        opacity: 0.9;
      }
    }

    button {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      background-color: var(--accent-color);
      color: var(--button-text);
      border: none;
      border-radius: 12px;
      padding: 0.7rem 1.5rem;
      font-weight: 600;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      cursor: pointer;
      transition: var(--transition);
      box-shadow: 0 4px 14px rgba(var(--accent-color-rgb), 0.2);

      svg {
        font-size: 1rem;
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(var(--accent-color-rgb), 0.3);
        filter: brightness(1.08);
      }

      &:active {
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1.25rem;
      text-align: center;
      padding: var(--spacing-xl);

      h1 {
        font-size: 1.4rem;
        flex-direction: column;
        gap: 0.5rem;
      }

      button {
        width: 100%;
        justify-content: center;
      }
    }
  }

  .grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--spacing-xl);
  }

  .card {
    /* Main Content Card Frosted Profile */
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: var(--spacing-xl);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.03);

    [data-theme="dark"] & {
      background: rgba(61, 13, 18, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.04);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
    }

    &:hover {
      transform: translateY(-6px);
      background: rgba(255, 255, 255, 0.6);
      border-color: rgba(var(--accent-color-rgb), 0.4);
      box-shadow: var(--shadow-hover);

      [data-theme="dark"] & {
        background: rgba(61, 13, 18, 0.5);
        border-color: rgba(var(--accent-color-rgb), 0.3);
      }

      .card-icon {
        transform: scale(1.1) rotate(8deg);
        opacity: 0.15;
        color: var(--accent-color);
      }
    }

    .card-icon {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      color: var(--text-color);
      opacity: 0.06;
      font-size: 3.5rem;
      transition: var(--transition);
      pointer-events: none;
    }

    h3 {
      margin: 0 0 1.25rem 0;
      color: var(--heading-color);
      font-size: 1.35rem;
      font-weight: 700;
      padding-right: 3rem;
      letter-spacing: -0.01em;
    }

    .info-row {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      margin: 0;
      padding: 0.7rem 0;
      border-bottom: 1px solid rgba(var(--text-color-rgb), 0.08);
      color: var(--text-color);
      font-size: 0.95rem;

      &:last-of-type {
        border-bottom: none;
        margin-bottom: 0.5rem;
      }

      svg {
        color: var(--accent-color);
        font-size: 1rem;
        min-width: 20px;
        opacity: 0.8;
      }

      strong {
        min-width: 75px;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 0.05em;
        opacity: 0.6;
      }

      .value {
        font-weight: 500;
      }
    }

    .actions {
      margin-top: var(--spacing-xl);
      display: flex;
      gap: 0.75rem;

      button {
        flex: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.7rem 1rem;
        border-radius: 12px;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition);
        border: 1px solid rgba(var(--text-color-rgb), 0.15);
        background: rgba(255, 255, 255, 0.3);
        color: var(--text-color);

        [data-theme="dark"] & {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        svg {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        &:active {
          transform: translateY(0);
        }
      }

      .reset {
        &:hover {
          background-color: #e63946;
          border-color: #e63946;
          color: white;

          svg {
            color: white;
            opacity: 1;
          }
        }
      }

      .change {
        &:hover {
          background-color: var(--accent-color);
          border-color: var(--accent-color);
          color: var(--button-text);

          svg {
            color: var(--button-text);
            opacity: 1;
          }
        }
      }
    }

    @media (max-width: 480px) {
      padding: var(--spacing-lg);

      .actions {
        flex-direction: column;
        gap: 0.6rem;
      }
    }
  }

  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-md);
  }
`;

/* STYLES FOR PREMIUM IN-SCREEN NOTIFICATION SYSTEM */
// prettier-ignore
export const ToastContainer = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 16px;
  border: 1px solid var(--accent-color);
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  transform: translateY(${(props) => (props.$visible ? "0" : "150%")});
  opacity: ${(props) => (props.$visible ? "1" : "0")};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  color: var(--text-color);
  font-weight: 500;
  max-width: 380px;

  [data-theme="dark"] & {
    background: rgba(31, 5, 7, 0.85);
  }

  .toast-icon {
    color: var(--accent-color);
    font-size: 1.2rem;
  }
`;

/* STYLES FOR OVERLAY DIALOG SLIDE MODAL */
// prettier-ignore
export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  pointer-events: ${(props) => (props.$isOpen ? "all" : "none")};
  transition: opacity 0.3s ease;

  .modal-box {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    padding: 2rem;
    border-radius: 24px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    transform: scale(${(props) => (props.$isOpen ? "1" : "0.9")});
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.15);

    [data-theme="dark"] & {
      background: rgba(61, 13, 18, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    h4 {
      margin: 0 0 1rem 0;
      color: var(--heading-color);
      font-size: 1.25rem;
      font-weight: 700;
    }

    input {
      width: 100%;
      padding: 0.8rem 1rem;
      border-radius: 12px;
      border: 1px solid rgba(var(--text-color-rgb), 0.2);
      background: rgba(255, 255, 255, 0.5);
      color: var(--text-color);
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 1.5rem;
      outline: none;
      transition: var(--transition);

      [data-theme="dark"] & {
        background: rgba(0, 0, 0, 0.2);
        border-color: rgba(255, 255, 255, 0.1);
      }

      &:focus {
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(var(--accent-color-rgb), 0.15);
      }
    }

    .modal-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;

      button {
        padding: 0.6rem 1.25rem;
        border-radius: 10px;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        border: none;
        transition: var(--transition);
      }

      .cancel-btn {
        background: transparent;
        color: var(--text-color);
        border: 1px solid rgba(var(--text-color-rgb), 0.2);
        &:hover { background: rgba(var(--text-color-rgb), 0.05); }
      }

      .confirm-btn {
        background: var(--accent-color);
        color: var(--button-text);
        &:hover { filter: brightness(1.1); transform: translateY(-1px); }
      }
    }
  }
`;
