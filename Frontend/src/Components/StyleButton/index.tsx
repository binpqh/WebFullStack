import styled from "styled-components";

interface Props {
  isSuccess?: boolean;
}

export const WrapButton = styled.div<Props>`
  button {
    background: ${(props) => (props.isSuccess ? "#05c46b" : "#0fbcf9")};
    width: 130px;
    font-weight: bold;
    border-radius: 5px;
    margin-bottom: 20px;
    cursor: pointer;
  }
`;
