import styled from "styled-components";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

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

  return (
    <header>
      <Wrapper>
        <HeaderLeft>
          <h2 onClick={handleTitle}>
            <strong>{props.content}</strong> Management
          </h2>
        </HeaderLeft>

        <HeaderRight>
          <Button onClick={handleProduct}>Product</Button>

          <Button danger onClick={handleCategory}>
            Category
          </Button>
        </HeaderRight>
      </Wrapper>
    </header>
  );
};

export default Header;
