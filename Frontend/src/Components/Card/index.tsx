import styled from "styled-components";

export const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #e6f2fe;
  width: 100%;
  max-width: 40%;
  margin: 30px auto;
  display: "flex";
  flex-direction: "column";
  padding: 0;
  border-radius: 5px;
  overflow: hidden;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;
