import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

interface Props {
  content: string;
}

const Wrapper = styled.div`
  background-color: #1e272e;
  color: #fff;
  padding: 10px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 4px;
  color: #fff;
  h2 {
    margin: 0;
    font-weight: 450;
    line-height: 1.3;
    color: #fff;
    strong {
      font-weight: 550;
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
`;

const Header: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const handleTitle = () => {
    navigate("/");
  };

  const handleProduct = () => {
    navigate("/");
  };

  const handleCategory = () => {
    navigate("/category");
  };

  const handleBrand = () => {
    navigate("/brand");
  };

  const handleStore = () => {
    navigate("/store");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header>
      <Wrapper>
        <HeaderLeft>
          {/* <h2 onClick={handleTitle}>
            <strong>{props.content}</strong> Management
          </h2> */}

          <Button onClick={handleProduct} style={{ color: "white" }}>
            Product
          </Button>

          <Button onClick={handleStore} style={{ color: "white" }}>
            Store
          </Button>

          <Button onClick={handleCategory} style={{ color: "white" }}>
            Category
          </Button>

          <Button onClick={handleBrand} style={{ color: "white" }}>
            Brand
          </Button>
        </HeaderLeft>

        <HeaderRight>
          <Button onClick={handleLogin} style={{ color: "white" }}>
            Login
          </Button>
        </HeaderRight>
      </Wrapper>
    </header>
  );
};

export default Header;
