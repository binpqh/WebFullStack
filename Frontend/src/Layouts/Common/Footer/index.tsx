import styled from "styled-components";

const StyleSpan = styled.span`
  display: flex;
  justify-content: center;
  opacity: 0.5;
`;

const Footer = () => {
  return (
    <footer>
      <StyleSpan>All Rights Reserved 2022 @</StyleSpan>
    </footer>
  );
};

export default Footer;
