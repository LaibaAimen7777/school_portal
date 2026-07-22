import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  /* Header action button */
  .create-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--accent-color, #2563eb);
    color: #ffffff;
    border: none;
    border-radius: 12px;
    padding: 0.6rem 1.25rem;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.92;
      transform: translateY(-1px);
    }
  }

  /* Grid Layout */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 1.25rem;
  }

  /* Clean Modern Cards */
  .card {
    background-color: var(--bg-portal, rgba(255, 255, 255, 0.85));
    backdrop-filter: blur(12px);
    border: 1px solid var(--border-color, rgba(229, 231, 235, 0.8));
    border-radius: 16px;
    padding: 1.25rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      .card-icon {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background-color: var(--bg-secondary, #f3f4f6);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        color: var(--heading-color, #1f2937);
      }

      .student-badge {
        font-size: 0.75rem;
        font-weight: 600;
        background-color: var(--bg-secondary, #f3f4f6);
        color: var(--heading-color, #4b5563);
        padding: 0.25rem 0.6rem;
        border-radius: 20px;
      }
    }

    .card-body {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      margin-bottom: 1.25rem;
    }

    .info-row {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.85rem;
      color: var(--heading-color, #374151);

      .info-icon {
        opacity: 0.5;
        font-size: 0.9rem;
      }

      .label {
        font-weight: 500;
        opacity: 0.8;
      }

      .value {
        margin-left: auto;
        font-weight: 600;
      }
    }

    .actions {
      border-top: 1px solid var(--border-color, rgba(229, 231, 235, 0.6));
      padding-top: 0.85rem;

      .change-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background-color: var(--bg-secondary, #f3f4f6);
        color: var(--heading-color, #1f2937);
        border: none;
        border-radius: 10px;
        padding: 0.55rem;
        font-weight: 600;
        font-size: 0.825rem;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background-color: var(--accent-color, #2563eb);
          color: #ffffff;
        }
      }
    }
  }
`;

export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-box {
    background-color: var(--bg-portal, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 20px;
    padding: 1.75rem;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

    h4 {
      margin: 0 0 0.3rem 0;
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--heading-color, #111827);
    }

    .modal-subtitle {
      font-size: 0.825rem;
      margin: 0 0 1.25rem 0;
      opacity: 0.65;
    }

    input {
      width: 100%;
      padding: 0.7rem 1rem;
      border: 1px solid var(--border-color, #d1d5db);
      border-radius: 10px;
      font-size: 0.9rem;
      background-color: var(--bg-container, #f9fafb);
      color: var(--heading-color, #111827);
      outline: none;
      margin-bottom: 1.25rem;
      transition: border-color 0.2s ease;

      &:focus {
        border-color: var(--accent-color, #2563eb);
      }
    }

    .modal-actions {
      display: flex;
      gap: 0.75rem;

      button {
        flex: 1;
        padding: 0.6rem;
        border-radius: 10px;
        font-weight: 600;
        font-size: 0.85rem;
        cursor: pointer;
        border: none;
        transition: all 0.2s ease;
      }

      .cancel-btn {
        background-color: var(--bg-secondary, #f3f4f6);
        color: var(--heading-color, #374151);

        &:hover {
          background-color: #e5e7eb;
        }
      }

      .confirm-btn {
        background-color: var(--accent-color, #2563eb);
        color: #ffffff;

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
`;

export const ToastContainer = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--bg-portal, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 12px;
  padding: 0.75rem 1.25rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: ${(props) =>
    props.$visible ? "translateY(0)" : "translateY(16px)"};
  pointer-events: ${(props) => (props.$visible ? "auto" : "none")};

  .toast-icon {
    color: #10b981;
    font-size: 1.1rem;
  }

  span {
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--heading-color, #1f2937);
  }
`;
