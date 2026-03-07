// app/teachers/Teachers.styles.ts
import styled from "styled-components";

export const TeachersContainer = styled.div`
  padding: var(--spacing-2xl);
  background-color: var(--bg-color);
  min-height: 100vh;
  position: relative;
  font-family: var(--font-main);

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

  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-md);
  }
`;

export const TeachersHeader = styled.div`
  margin-bottom: var(--spacing-2xl);
  position: relative;
  z-index: 1;

  .decorative-line {
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, var(--pop-color) 0%, transparent 100%);
    margin-top: var(--spacing-sm);
    transform: skew(-5deg);
  }
`;

export const TeachersTitle = styled.h1`
  font-size: 2.5rem;
  font-family: var(--font-heading);
  color: var(--text-color);
  margin: 0 0 var(--spacing-xs) 0;
  border: none;
  padding: 0;
  box-shadow: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transform: rotate(-0.1deg);

  .star {
    color: var(--pop-color);
    font-size: 2rem;
    opacity: 0.7;
    animation: twinkle 3s infinite ease-in-out;
  }

  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.5;
      transform: rotate(0deg) scale(1);
    }
    50% {
      opacity: 1;
      transform: rotate(5deg) scale(1.1);
    }
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  font-size: 1.2rem;
  color: var(--text-color);
  opacity: 0.7;
  font-style: italic;
  position: relative;

  &::before {
    content: "✧";
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translateY(-50%);
    color: var(--pop-color);
    font-size: 2rem;
    opacity: 0.3;
    animation: float 2s infinite ease-in-out;
  }

  &::after {
    content: "✦";
    position: absolute;
    top: 50%;
    right: 40%;
    transform: translateY(-50%);
    color: var(--pop-color);
    font-size: 2rem;
    opacity: 0.3;
    animation: float 2s infinite ease-in-out 0.5s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(-50%) rotate(0deg);
    }
    50% {
      transform: translateY(-60%) rotate(5deg);
    }
  }
`;

export const TableWrapper = styled.div`
  position: relative;
  z-index: 1;
  border: var(--border-width) solid var(--border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  overflow: hidden;
  box-shadow: var(--shadow);
  background-color: var(--bg-color);
  transform: rotate(-0.02deg);

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
    opacity: 0.2;
    z-index: 2;
  }

  &::after {
    content: "✧ ✧ ✧";
    position: absolute;
    bottom: -12px;
    right: 20px;
    color: var(--pop-color);
    font-size: 0.9rem;
    opacity: 0.4;
    letter-spacing: 4px;
    background: var(--bg-color);
    padding: 0 8px;
    transform: rotate(1deg);
  }

  @media (max-width: 768px) {
    overflow-x: auto;

    &::after {
      display: none;
    }
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: var(--bg-color);
  font-size: 0.95rem;

  thead {
    tr {
      background-color: var(--pop-color);
      position: relative;

      /* &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px dashed var(--border-color);
        opacity: 0.2;
        pointer-events: none;
      } */
    }

    th {
      color: var(--bg-color);
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.85rem;
      letter-spacing: 0.5px;
      padding: var(--spacing-md) var(--spacing-lg);
      text-align: left;
      border-right: 1px dashed rgba(255, 255, 255, 0.2);
      position: relative;

      &:last-child {
        border-right: none;
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 4px;
        left: var(--spacing-lg);
        right: var(--spacing-lg);
        height: 1px;
        background-color: var(--bg-color);
        opacity: 0.3;
      }
    }
  }

  tbody {
    tr {
      transition: var(--transition);
      border-bottom: 1px dashed var(--border-color);
      position: relative;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: rgba(191, 115, 83, 0.05);
        transform: scale(1.001);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        position: relative;
        z-index: 2;

        .code-badge {
          background-color: var(--pop-color);
          color: var(--bg-color);
        }
      }

      td {
        padding: var(--spacing-md) var(--spacing-lg);
        color: var(--text-color);
        border-right: 1px dashed var(--border-color);

        &:last-child {
          border-right: none;
        }

        strong {
          font-weight: 600;
          font-family: var(--font-heading);
        }

        .username {
          font-size: 0.9rem;
          opacity: 0.8;
          font-style: italic;
        }

        .code-badge {
          display: inline-block;
          width: 60px;
          padding: 2px 10px;
          background-color: var(--pop-color);
          color: var(--bg-color);
          border: 1px solid var(--border-color);
          border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
          font-size: 0.8rem;
          font-weight: 500;
          transition: var(--transition);
          transform: rotate(-0.5deg);
        }

        .subjects-list {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
      }
    }
  }
`;

export const SubjectBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background-color: var(--bg-color);
  color: var(--pop-color);
  border: 1px solid var(--pop-color);
  border-radius: 30px 30px 30px 30px/30px 30px 30px 30px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: var(--transition);
  transform: rotate(${Math.random() > 0.5 ? "-0.3deg" : "0.3deg"});

  &:hover {
    background-color: var(--pop-color);
    color: var(--bg-color);
    transform: rotate(${Math.random() > 0.5 ? "-1deg" : "1deg"}) scale(1.05);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-2xl);
  color: var(--text-color);
  opacity: 0.7;
  font-style: italic;

  .icon {
    color: var(--pop-color);
    font-size: 1.5rem;
    animation: pulse 2s infinite ease-in-out;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.5;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
  }
`;
