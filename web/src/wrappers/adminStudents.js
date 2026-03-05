import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--bg-color);
  padding: var(--spacing-2xl);
  font-family: var(--font-main);
  transition: var(--transition);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-2xl);
    padding: var(--spacing-lg);
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius-xl);
    background-color: var(--bg-color);
    box-shadow: var(--shadow);

    h1 {
      margin: 0;
      font-size: 2rem;
      color: var(--text-color);
      border: none;
      padding: 0;
      box-shadow: none;
    }

    button {
      background-color: var(--bg-color);
      color: var(--text-color);
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--border-radius-full);
      padding: var(--spacing-md) var(--spacing-xl);
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
      box-shadow: var(--shadow);
      min-width: 160px;
      font-size: 1rem;

      &:hover {
        background-color: var(--text-color);
        color: var(--bg-color);
        transform: translateY(-2px);
        box-shadow: var(--shadow-hover);
      }
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-xl);
  }

  .card {
    background-color: var(--bg-color);
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius-xl);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow);
    transition: var(--transition);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background-color: var(--text-color);
      opacity: 0.5;
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-hover);
    }

    h3 {
      margin: 0 0 var(--spacing-md) 0;
      color: var(--text-color);
      font-size: 1.5rem;
      border: none;
      padding: 0;
      box-shadow: none;
      border-bottom: 2px dashed var(--border-color);
      padding-bottom: var(--spacing-sm);
    }

    p {
      margin: var(--spacing-xs) 0;
      color: var(--text-color);
      font-size: 0.95rem;
      border: none;
      padding: var(--spacing-xs) 0;
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);

      strong {
        min-width: 60px;
        font-weight: 600;
        color: var(--text-color);
        opacity: 0.8;
      }
    }

    .actions {
      margin-top: var(--spacing-lg);
      display: flex;
      gap: var(--spacing-sm);

      button {
        flex: 1;
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--border-radius-full);
        border: var(--border-width) solid var(--border-color);
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 500;
        transition: var(--transition);
        background-color: var(--bg-color);
        color: var(--text-color);
        box-shadow: var(--shadow);

        &:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }
      }

      .reset {
        background-color: var(--bg-color);
        color: var(--text-color);

        &:hover {
          background-color: var(--text-color);
          color: var(--bg-color);
        }
      }

      .change {
        background-color: var(--text-color);
        color: var(--bg-color);

        &:hover {
          background-color: var(--bg-color);
          color: var(--text-color);
        }
      }
    }
  }

  /* Empty state styling */
  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: var(--spacing-2xl);
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius-xl);
    background-color: var(--bg-color);

    p {
      border: none;
      font-size: 1.2rem;
      color: var(--text-color);
      opacity: 0.7;
    }
  }

  /* Responsive design */
  @media (max-width: 768px) {
    padding: var(--spacing-lg);

    .header {
      flex-direction: column;
      gap: var(--spacing-md);
      text-align: center;

      h1 {
        font-size: 1.75rem;
      }

      button {
        width: 100%;
      }
    }

    .grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
    }
  }

  @media (max-width: 480px) {
    padding: var(--spacing-md);

    .header h1 {
      font-size: 1.5rem;
    }

    .card {
      padding: var(--spacing-lg);

      .actions {
        flex-direction: column;
      }
    }
  }
`;
