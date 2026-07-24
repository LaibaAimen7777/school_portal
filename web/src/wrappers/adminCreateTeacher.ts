import styled, { createGlobalStyle } from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  .form-card {
    /* Uses inherited panel/glass variables instead of forced solid light background */
    background: var(--bg-portal, transparent);
    border: 1px solid var(--border-color, rgba(229, 231, 235, 0.3));
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .form-section {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    &:not(:last-child) {
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border-color, rgba(229, 231, 235, 0.2));
    }
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .step-badge {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: var(--accent-color, #2563eb);
      color: #ffffff;
      font-size: 0.85rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--heading-color, inherit);
      margin: 0;
    }
  }

  .input-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem;
  }

  .form-submit-row {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  .status-banner {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 500;
    margin-top: 0.5rem;

    &.error {
      background-color: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
  }

  .credentials-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Label = styled.label`
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--heading-color, inherit);
  display: flex;
  align-items: center;
  gap: 0.4rem;

  .field-icon {
    opacity: 0.55;
    font-size: 0.85rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--border-color, rgba(209, 213, 219, 0.4));
  border-radius: 10px;
  font-size: 0.875rem;
  background-color: var(--bg-container, transparent);
  color: var(--heading-color, inherit);
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: var(--accent-color, #2563eb);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SubjectsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  .assignment-rows {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .assignment-row {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 1rem;
    align-items: flex-end;
    background-color: var(--bg-container, rgba(255, 255, 255, 0.03));
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid var(--border-color, rgba(229, 231, 235, 0.3));

    .select-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;

      select {
        width: 100%;
        padding: 0.65rem 0.9rem;
        border: 1px solid var(--border-color, rgba(209, 213, 219, 0.4));
        border-radius: 10px;
        font-size: 0.875rem;
        background-color: var(--bg-container, transparent);
        color: var(--heading-color, inherit);
        outline: none;
        transition: all 0.2s ease;

        option {
          background-color: var(--bg-portal, #ffffff);
          color: var(--heading-color, #111827);
        }

        &:focus {
          border-color: var(--accent-color, #2563eb);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        &:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      }
    }

    .remove-row-btn {
      height: 42px;
      width: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      border: 1px solid rgba(239, 68, 68, 0.3);
      background-color: rgba(239, 68, 68, 0.08);
      color: #ef4444;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background-color: rgba(239, 68, 68, 0.2);
      }

      &:disabled {
        border-color: var(--border-color, transparent);
        background-color: transparent;
        color: rgba(156, 163, 175, 0.4);
        cursor: not-allowed;
      }
    }
  }

  .add-row-btn {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.1rem;
    border-radius: 10px;
    border: 1px dashed var(--accent-color, #2563eb);
    background-color: rgba(37, 99, 235, 0.05);
    color: var(--accent-color, #2563eb);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: rgba(37, 99, 235, 0.12);
      border-style: solid;
    }
  }
`;

export const SubjectsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SelectedCount = styled.span`
  background-color: rgba(37, 99, 235, 0.15);
  color: var(--accent-color, #2563eb);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Button = styled.button`
  background-color: var(--accent-color, #2563eb);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const CredentialCard = styled.div`
  background: var(--bg-portal, transparent);
  border: 1px solid var(--border-color, rgba(229, 231, 235, 0.4));
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CredentialHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--border-color, rgba(243, 244, 246, 0.2));
`;

export const ResponseTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--heading-color, inherit);
`;

export const ResponseItem = styled.div`
  font-size: 0.9rem;
  color: var(--heading-color, inherit);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  strong {
    min-width: 150px;
    opacity: 0.7;
    font-weight: 500;
  }
`;

export const PasswordValue = styled.code`
  background-color: rgba(241, 245, 249, 0.1);
  color: var(--heading-color, inherit);
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-family: monospace;
  font-weight: 700;
  font-size: 0.95rem;
  border: 1px solid var(--border-color, rgba(203, 213, 225, 0.3));
  letter-spacing: 0.5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const PrintButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: 1px solid var(--border-color, rgba(209, 213, 219, 0.4));
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--heading-color, inherit);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export const PDFButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  background-color: #10b981;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;

export const PrintStyles = createGlobalStyle`
  @media print {
    body * {
      visibility: hidden;
    }
    #credentialCard, #credentialCard * {
      visibility: visible;
      color: #000000 !important;
    }
    #credentialCard {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      border: none;
      box-shadow: none;
      background: #ffffff !important;
    }
    ${PrintButton}, ${PDFButton}, ${ButtonGroup} {
      display: none !important;
    }
  }
`;
