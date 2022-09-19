import styled from "styled-components";

interface PropsWrapButton {
  isSuccess?: boolean;
}

export const WrapButton = styled.div<PropsWrapButton>`
  button {
    background: ${(props) => (props.isSuccess ? "#05c46b" : "#0fbcf9")};
    width: 130px;
    font-weight: bold;
    border-radius: 5px;
    margin-bottom: 20px;
    cursor: pointer;
  }
`;

interface PropsButton {
  background?: string;
  hoverBackground?: string;
}

export const Button = styled.button<PropsButton>`
  background: ${(props) => (props.background !== null ? props.background : "#1B9CFC")};
  border-color: transparent;
  border-radius: 20px;
  font-weight: 500;
  font-size: larger;
  margin-bottom: 10px;
  width: 100%;
  cursor: pointer;
  &:hover {
    background: ${(props) => (props.hoverBackground !== null ? props.hoverBackground : "#D6A2E8")};
  }
`;
