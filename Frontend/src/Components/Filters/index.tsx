//author: hiki
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Row, Input, Typography } from "antd";
import FiltersBrandSlice from "../../Features/Brand/Filters/filtersBrandSlice";

const { Search } = Input;

const Filters = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (e: any) => {
    setSearchText(e.target.value);
    dispatch(FiltersBrandSlice.actions.searchFilterChange(e.target.value));
  };

  return (
    <Row style={{ padding: 5, background: "#fff" }}>
      <Col span={2}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 5, textAlign: "left", marginLeft: 13 }}
        >
          Search
        </Typography.Paragraph>
      </Col>
      <Col span={22}>
        <Search placeholder="input search text" value={searchText} onChange={handleSearchTextChange} />
      </Col>
    </Row>
  );
};

export default Filters;
