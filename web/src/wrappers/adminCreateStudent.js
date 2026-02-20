import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(160deg, #fdf6e3, #f7f3ec);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;

  .card {
    background-color: #fffefb;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    width: 500px;
    padding: 40px;
    font-family: "Poppins", sans-serif;
    position: relative;

    h1 {
      text-align: center;
      font-size: 28px;
      color: #333;
      margin-bottom: 30px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #555;
    }

    input,
    select {
      width: 100%;
      padding: 14px;
      margin-bottom: 20px;
      border-radius: 10px;
      border: 1px solid #ddd;
      font-size: 16px;
      transition: all 0.2s ease;
      &:focus {
        border-color: #0070f3;
        box-shadow: 0 0 5px rgba(0, 112, 243, 0.3);
        outline: none;
      }
    }

    button {
      width: 100%;
      background-color: #0070f3;
      color: white;
      padding: 14px;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        background-color: #005bb5;
        transform: translateY(-2px);
      }
    }
  }
`;
