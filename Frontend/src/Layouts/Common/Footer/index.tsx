import styled from "styled-components";

const StyleSpan = styled.span`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  opacity: 0.75;
`;

const Footer = () => {
  return (
    <footer>
      <StyleSpan>All Rights Reserved 2022 @</StyleSpan>
    </footer>
  );
};

export default Footer;
