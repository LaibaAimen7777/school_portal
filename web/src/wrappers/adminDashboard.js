import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f7f5f2; // soft background like your second image

  .sidebar {
    width: 250px;
    background-color: #ffffff;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  .content {
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
  }
`;
