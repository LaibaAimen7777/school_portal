import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--bg-color);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--shadow-hover);
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-top: 0;
  margin-bottom: 2rem;
  padding: var(--spacing-lg);
  background: linear-gradient(
    135deg,
    var(--bg-color) 0%,
    rgba(0, 0, 0, 0.02) 100%
  );
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  color: var(--text-color);
  margin-left: 0.5rem;
`;

export const Input = styled.input`
  padding: 1rem 1.2rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  font-size: 1rem;
  transition: var(--transition);
  background-color: var(--bg-color);
  color: var(--text-color);

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
`;

export const SubjectsSection = styled.div`
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  margin: 0.5rem 0;
  background: linear-gradient(
    135deg,
    var(--bg-color) 0%,
    rgba(0, 0, 0, 0.02) 100%
  );
`;

export const SubjectsTitle = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px dashed var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SubjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const SubjectItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-full);
  transition: var(--transition);
  background-color: var(--bg-color);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
    background-color: var(--text-color);

    & label {
      color: var(--bg-color);
    }
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  color: var(--text-color);
  transition: var(--transition);
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin: 0;
  cursor: pointer;
  accent-color: var(--text-color);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-sm);
  transition: var(--transition);

  &:checked {
    background-color: var(--text-color);
    border-color: var(--text-color);
  }

  &:focus {
    outline: 2px solid var(--text-color);
    outline-offset: 2px;
  }
`;

// Option 2: Change SelectedCount to render as span
export const SelectedCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-full);
  background-color: var(--text-color);
  color: var(--bg-color);
  font-weight: 600;
  font-size: 1.1rem;
`;

export const SelectedInfo = styled.div`
  // Changed from p to div
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0.75rem 1rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-sm);
  background-color: var(--bg-color);
  font-size: 0.95rem;
  color: var(--text-color);
  flex-wrap: wrap; // Add this to handle wrapping on small screens
  gap: 0.5rem; // Add gap for better spacing when wrapped
`;

// Alternative: Change SelectedSubjectsList to span
export const SelectedSubjectsList = styled.span`
  // Changed from div to span
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  /* width: 100%;  */
`;

export const SelectedSubjectTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-full);
  background-color: var(--text-color);
  color: var(--bg-color);
  font-size: 0.9rem;
  font-weight: 500;
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: var(--bg-color);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  margin-left: 1rem;
  border-radius: var(--border-radius-full);
  transition: var(--transition);

  &:hover {
    transform: scale(1.2);
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    outline: 2px solid var(--bg-color);
    outline-offset: 2px;
  }
`;

export const Button = styled.button`
  padding: 1rem 2rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-full);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  background-color: var(--bg-color);
  color: var(--text-color);
  margin-top: 1rem;
  min-width: 200px;
  align-self: center;

  &:hover:not(:disabled) {
    background-color: var(--text-color);
    color: var(--bg-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ResponseCard = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background: linear-gradient(
    135deg,
    var(--bg-color) 0%,
    rgba(0, 0, 0, 0.02) 100%
  );
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ResponseTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-md);
  display: inline-block;
`;

export const ResponseItem = styled.p`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.75rem 0;
  padding: 0.75rem 1rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-md);
  background-color: var(--bg-color);

  strong {
    min-width: 100px;
  }
`;

export const TemporaryPassword = styled.span`
  font-family: var(--font-mono);
  background-color: var(--text-color);
  color: var(--bg-color);
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-sm);
  letter-spacing: 1px;
`;

// Add these to your existing styled components

export const CredentialCard = styled(ResponseCard)`
  position: relative;
  margin-bottom: 1rem;

  @media print {
    border: 2px solid black;
    background: white;
    color: black;
    box-shadow: none;

    button {
      display: none;
    }
  }
`;

export const CredentialHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media print {
    h4 {
      color: black;
      border-color: black;
    }
  }
`;

export const PrintButton = styled(Button)`
  min-width: auto;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  margin: 0;
  background-color: var(--bg-color);
  color: var(--text-color);
  border-color: var(--border-color);

  &:hover {
    background-color: var(--text-color);
    color: var(--bg-color);
  }
`;

export const PDFButton = styled(Button)`
  min-width: auto;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  margin: 1rem 0 0 auto;
  display: block;
  background-color: var(--text-color);
  color: var(--bg-color);

  &:hover {
    background-color: var(--bg-color);
    color: var(--text-color);
    transform: translateY(-2px);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;

  @media print {
    display: none;
  }
`;

export const PasswordValue = styled(TemporaryPassword)`
  font-size: 1.1rem;
  padding: 0.25rem 1rem;
`;

export const PrintStyles = createGlobalStyle`
  @media print {
    body * {
      visibility: hidden;
    }

    #credentialCard, #credentialCard * {
      visibility: visible;
    }

    #credentialCard {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      background-color: white !important;
      color: black !important;
      border: 2px solid black !important;
      box-shadow: none !important;
      padding: 20px !important;
      margin: 0 !important;
    }

    /* Hide all buttons when printing */
    button, .adminCreateTeacher__PDFButton-sc-*, .adminCreateTeacher__PrintButton-sc-* {
      display: none !important;
    }
  }
`;
