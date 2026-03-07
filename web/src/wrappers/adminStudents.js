import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--bg-color);
  padding: var(--spacing-2xl);
  font-family: var(--font-main);
  transition: var(--transition);
  position: relative;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(
        circle at 25px 25px,
        var(--text-color) 1px,
        transparent 1px
      ),
      linear-gradient(to right, var(--text-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--text-color) 1px, transparent 1px);
    background-size:
      50px 50px,
      50px 50px,
      50px 50px;
    background-position: -1px -1px;
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-2xl);
    padding: var(--spacing-lg) var(--spacing-xl);
    border: var(--border-width) solid var(--border-color);
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    background-color: var(--bg-color);
    box-shadow: var(--shadow);
    position: relative;
    transform: rotate(-0.02deg);
    z-index: 1;

    &::after {
      /* content: "✧ ✧ ✧"; */
      position: absolute;
      bottom: -12px;
      right: 20px;
      color: var(--pop-color);
      font-size: 0.9rem;
      opacity: 2;
      letter-spacing: 4px;
      background: var(--bg-color);
      padding: 0 8px;
      transform: rotate(1deg);
    }

    h1 {
      font-size: 2.5rem;
      font-family: var(--font-heading);
      color: var(--text-color);
      border: none;
      padding: 0;
      box-shadow: none;
      margin: 0;
      position: relative;
      transform: rotate(-0.1deg);
      letter-spacing: -0.02em;

      &::after {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 60%;
        height: 2px;
        background: linear-gradient(
          90deg,
          var(--pop-color) 0%,
          transparent 100%
        );
        border-radius: 2px;
        transform: skew(-5deg);
      }
    }

    button {
      background-color: var(--bg-color);
      color: var(--text-color);
      border: var(--border-width) solid var(--border-color);
      border-radius: 40px 40px 40px 40px/40px 40px 40px 40px;
      padding: var(--spacing-md) var(--spacing-xl);
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
      box-shadow: var(--shadow);
      min-width: 160px;
      font-size: 1rem;
      font-family: var(--font-main);
      position: relative;
      transform: rotate(0.1deg);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      svg {
        color: var(--pop-color);
        transition: var(--transition);
      }

      &::before {
        content: "";
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border: 1px solid var(--border-color);
        border-radius: inherit;
        opacity: 0;
        transition: var(--transition);
      }

      &:hover {
        background-color: var(--pop-color);
        color: var(--bg-color);
        transform: translateY(-2px) rotate(-0.1deg);
        box-shadow: var(--shadow-hover);
        border-color: var(--pop-color);

        svg {
          color: var(--bg-color);
        }

        &::before {
          opacity: 0.3;
        }
      }
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--spacing-xl);
    position: relative;
    z-index: 1;
  }

  .card {
    background-color: var(--bg-color);
    border: var(--border-width) solid var(--border-color);
    border-radius: 225px 15px 255px 15px/15px 255px 15px 225px;
    padding: var(--spacing-xl);
    box-shadow: var(--shadow);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    transform: rotate(${Math.random() > 0.5 ? "0.1deg" : "-0.1deg"});

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(
        90deg,
        var(--pop-color) 0%,
        var(--text-color) 50%,
        var(--pop-color) 100%
      );
      opacity: 0.3;
    }

    &::after {
      content: "";
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      bottom: 8px;
      border: 1px dashed var(--pop-color);
      border-radius: inherit;
      opacity: 0;
      transition: var(--transition);
      pointer-events: none;
    }

    &:hover {
      transform: translateY(-4px)
        rotate(${Math.random() > 0.5 ? "0.3deg" : "-0.2deg"});
      box-shadow: var(--shadow-hover);
      border-color: var(--pop-color);

      &::after {
        opacity: 0.2;
      }

      .card-icon {
        color: var(--pop-color);
        transform: rotate(2deg) scale(1.1);
      }
    }

    .card-icon {
      position: absolute;
      top: var(--spacing-lg);
      right: var(--spacing-lg);
      color: var(--text-color);
      opacity: 0.2;
      font-size: 2rem;
      transition: var(--transition);
    }

    h3 {
      margin: 0 0 var(--spacing-md) 0;
      color: var(--text-color);
      font-size: 1.5rem;
      font-family: var(--font-heading);
      border: none;
      padding: 0;
      box-shadow: none;
      border-bottom: 2px dashed var(--border-color);
      padding-bottom: var(--spacing-sm);
      padding-right: 2rem;
      position: relative;

      &::before {
        content: "✦";
        position: absolute;
        right: 0;
        bottom: var(--spacing-sm);
        color: var(--pop-color);
        font-size: 1rem;
        opacity: 0.8;
      }
    }

    p {
      color: var(--text-color);
      font-size: 0.95rem;
      border: none;
      padding: var(--spacing-xs) 0;
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      margin: var(--spacing-xs) 0;
      border-bottom: 1px dotted var(--border-color);

      &:last-of-type {
        border-bottom: none;
      }

      strong {
        min-width: 70px;
        font-weight: 600;
        color: var(--pop-color);
        opacity: 0.9;
        text-transform: uppercase;
        font-size: 0.8rem;
        letter-spacing: 0.5px;
      }

      svg {
        color: var(--pop-color);
        font-size: 1rem;
        opacity: 0.7;
      }
    }

    .actions {
      margin-top: var(--spacing-lg);
      display: flex;
      gap: var(--spacing-sm);
      position: relative;

      button {
        flex: 1;
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: 40px 40px 40px 40px/40px 40px 40px 40px;
        border: var(--border-width) solid var(--border-color);
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 500;
        transition: var(--transition);
        background-color: var(--bg-color);
        color: var(--text-color);
        box-shadow: var(--shadow);
        font-family: var(--font-main);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transform: rotate(${Math.random() > 0.5 ? "0.1deg" : "-0.1deg"});

        svg {
          transition: var(--transition);
        }

        &::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border: 1px solid var(--border-color);
          border-radius: inherit;
          opacity: 0;
          transition: var(--transition);
        }

        &:hover {
          transform: translateY(-2px)
            rotate(${Math.random() > 0.5 ? "0.3deg" : "-0.2deg"});
          box-shadow: var(--shadow-hover);

          &::before {
            opacity: 0.3;
          }
        }
      }

      .reset {
        background-color: var(--bg-color);
        color: var(--text-color);

        svg {
          color: var(--pop-color);
        }

        &:hover {
          background-color: var(--text-color);
          color: var(--bg-color);
          border-color: var(--pop-color);

          svg {
            color: var(--bg-color);
          }
        }
      }

      .change {
        background-color: var(--pop-color);
        color: var(--bg-color);
        border-color: var(--pop-color);

        svg {
          color: var(--bg-color);
        }

        &:hover {
          background-color: var(--bg-color);
          color: var(--pop-color);
          border-color: var(--pop-color);

          svg {
            color: var(--pop-color);
          }
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
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    background-color: var(--bg-color);
    box-shadow: var(--shadow);
    position: relative;
    transform: rotate(-0.1deg);

    &::before {
      content: "✧";
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%) rotate(5deg);
      color: var(--pop-color);
      font-size: 1.5rem;
      background: var(--bg-color);
      padding: 0 10px;
    }

    &::after {
      content: "✦ ✦ ✦";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      color: var(--pop-color);
      font-size: 0.9rem;
      opacity: 0.5;
      letter-spacing: 4px;
      background: var(--bg-color);
      padding: 0 8px;
    }

    p {
      border: none;
      font-size: 1.2rem;
      color: var(--text-color);
      opacity: 0.7;
      font-style: italic;
      margin: var(--spacing-lg) 0;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    svg {
      color: var(--pop-color);
      font-size: 3rem;
      opacity: 0.5;
      margin-bottom: var(--spacing-lg);
    }
  }

  /* Responsive design */
  @media (max-width: 768px) {
    padding: var(--spacing-lg);

    .header {
      flex-direction: column;
      gap: var(--spacing-md);
      text-align: center;
      padding: var(--spacing-lg);

      &::after {
        right: 50%;
        transform: translateX(50%) rotate(1deg);
        bottom: -10px;
      }

      h1 {
        font-size: 2rem;

        &::after {
          left: 50%;
          transform: translateX(-50%) skew(-5deg);
          width: 80%;
        }
      }

      button {
        width: 100%;
        min-width: unset;
      }
    }

    .grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
    }

    .card {
      padding: var(--spacing-lg);

      .actions {
        flex-direction: row;

        @media (max-width: 480px) {
          flex-direction: column;
        }
      }
    }
  }

  @media (max-width: 480px) {
    padding: var(--spacing-md);

    .header {
      h1 {
        font-size: 1.75rem;
      }
    }

    .card {
      padding: var(--spacing-md);

      h3 {
        font-size: 1.25rem;
      }

      p {
        font-size: 0.85rem;

        strong {
          min-width: 60px;
        }
      }

      .actions {
        flex-direction: column;
        gap: var(--spacing-xs);

        button {
          padding: var(--spacing-sm);
        }
      }
    }
  }
`;
