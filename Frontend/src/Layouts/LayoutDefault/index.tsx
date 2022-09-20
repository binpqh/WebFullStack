import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "../Common/Header";
import Footer from "../Common/Footer";

interface Props {
  content: string;
}

const StyleContainer = styled.div`
  margin-bottom: 20;
`;

const LayoutDefault: React.FC<Props> = (props) => {
  return (
    <StyleContainer>
      <Header content={props.content} />
      <Outlet />
      <Footer />
    </StyleContainer>
  );
};

export default LayoutDefault;
