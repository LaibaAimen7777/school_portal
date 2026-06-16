import styled from "styled-components";

/* ===== Overlay ===== */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.55);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
`;

/* ===== Modal Box ===== */
export const ModalBox = styled.div`
  background: #ffffff;
  width: 520px;
  max-width: 95%;
  max-height: 90vh;

  border-radius: 12px;
  padding: 20px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);

  overflow-y: auto;
  animation: fadeIn 0.2s ease-in-out;
`;

/* ===== Header ===== */
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 15px;

  h2 {
    margin: 0;
  }
`;

/* ===== Close Button ===== */
export const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
`;

/* ===== Inputs ===== */
export const ModalInput = styled.input`
  width: 100%;
  padding: 8px;
  margin: 5px 0 12px 0;

  border: 1px solid #ddd;
  border-radius: 6px;
`;

export const ModalSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin: 5px 0 12px 0;

  border: 1px solid #ddd;
  border-radius: 6px;
`;

/* ===== Subject Row ===== */
export const SubjectRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

/* ===== Actions ===== */
export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  margin-top: 15px;
`;

/* ===== Button ===== */
export const Button = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

/* ===== Animation ===== */
export const FadeWrapper = styled.div`
  @keyframes fadeIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
