import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  .form-card {
    background-color: var(--bg-portal, rgba(255, 255, 255, 0.85));
    backdrop-filter: blur(12px);
    border: 1px solid var(--border-color, rgba(229, 231, 235, 0.8));
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
      border-bottom: 1px solid var(--border-color, rgba(229, 231, 235, 0.6));
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
      color: var(--heading-color, #111827);
      margin: 0;
    }
  }

  .input-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.25rem;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    &.single-col {
      grid-column: 1 / -1;
    }

    label {
      font-size: 0.825rem;
      font-weight: 600;
      color: var(--heading-color, #374151);
      display: flex;
      align-items: center;
      gap: 0.4rem;

      .field-icon {
        opacity: 0.5;
        font-size: 0.85rem;
      }
    }

    input,
    select {
      width: 100%;
      padding: 0.65rem 0.9rem;
      border: 1px solid var(--border-color, #d1d5db);
      border-radius: 10px;
      font-size: 0.875rem;
      background-color: var(--bg-container, #f9fafb);
      color: var(--heading-color, #111827);
      outline: none;
      transition: all 0.2s ease;

      &:focus {
        border-color: var(--accent-color, #2563eb);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
      }

      &:disabled {
        opacity: 0.65;
        cursor: not-allowed;
        background-color: var(--bg-secondary, #f3f4f6);
      }
    }

    .error-text {
      font-size: 0.75rem;
      color: #ef4444;
      font-weight: 500;
    }
  }

  .status-banner {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 500;

    &.success {
      background-color: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }

    &.error {
      background-color: #fef2f2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }
  }

  .existing-parent-box {
    background-color: var(--bg-secondary, #f3f4f6);
    border-radius: 12px;
    padding: 1rem;

    .success-tag {
      margin: 0 0 0.5rem 0;
      font-size: 0.825rem;
      font-weight: 600;
      color: #059669;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .children-list {
      font-size: 0.8rem;
      color: var(--heading-color, #374151);

      ul {
        margin: 0.3rem 0 0 1.25rem;
        padding: 0;
      }
    }
  }

  .form-submit-row {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;

    .submit-btn {
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
    }
  }

  .credentials-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
`;
