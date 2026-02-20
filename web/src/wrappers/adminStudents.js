import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(160deg, #fdf6e3, #f7f3ec);
  padding: 50px;
  font-family: "Poppins", sans-serif;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    h1 {
      font-size: 32px;
      color: #333;
    }

    button {
      background-color: #0070f3;
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.2s ease;

      &:hover {
        background-color: #005bb5;
        transform: translateY(-2px);
      }
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
  }

  .card {
    background-color: #fffefb;
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
    transition: 0.2s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 25px 40px rgba(0, 0, 0, 0.12);
    }

    h3 {
      margin-bottom: 10px;
      color: #222;
    }

    p {
      margin: 5px 0;
      color: #555;
      font-size: 14px;
    }

    .actions {
      margin-top: 15px;
      display: flex;
      gap: 10px;

      button {
        flex: 1;
        padding: 8px;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
      }

      .reset {
        background-color: #ffb703;
        color: white;
      }

      .change {
        background-color: #0070f3;
        color: white;
      }
    }
  }
`;
