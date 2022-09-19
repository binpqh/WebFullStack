import styled from "styled-components";

export const WrapInput = styled.div`
  input {
    width: 100%;
    padding: 10px;
    outline: none;
    font-size: 16px;
    border: hidden;

    &:focus {
      border: show;
      box-shadow: 3px 3px 6px #ccc;
    }
  }
`;
