import styled from "styled-components";
import { Button, Table, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
const HeaderProduct = styled.div`
  background-color: #575fcf;
  width: 100%;
  max-width: 70%;
  margin: 20px auto;
  display: "flex";
  flex-direction: "column";
  padding: 0;
  border-radius: 5px;
  box-shadow: 0 0 7px 0 #ccc;
  overflow: hidden;
`;

const Wrapper = styled.div`
  background-color: #435d7d;
  color: #fff;
  padding: 0px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const HeaderLeft = styled.div`
  padding-bottom: 4px;
  margin: 0;
  color: #fff;
  h2 {
    color: #fff;
    font-weight: 500;
    margin: 5px 0;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
`;

const Category = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [categoryIdDelete, setCategoryIdDelete] = useState<number>(0);
  const [modalText, setModalText] = useState("Content of the modal");

  const handleAddCategory = () => {
    navigate("/category/add");
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const dataCategories = [
    { categoryId: "1", categoryName: "Football" },
    { categoryId: "2", categoryName: "Game" },
    { categoryId: "3", categoryName: "volleyball" },
  ];

  const handleEditCategory = (categoryId: number) => {
    navigate(`/category/edit/${categoryId}`);
  };

  const showModal = (categoryId: number) => {
    setOpen(true);
    setModalText("Are you sure you want delete category with id: " + categoryId);
    setCategoryIdDelete(categoryId);
  };

  const handleOk = () => {
    //call api delete

    console.log("categoryIdDelete: ", categoryIdDelete);

    setOpen(false);
    setCategoryIdDelete(0);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDeleteCategoryChecked = () => {
    // call api delete list category checked with id

    console.log(selectedRowKeys);
  };

  const columns = [
    {
      key: "categoryId",
      title: "Id",
      dataIndex: "categoryId",
      width: "7%",
      align: "center" as "center",
    },
    {
      key: "categoryName",
      title: "Category name",
      dataIndex: "categoryName",
    },
    {
      key: "action",
      title: "Action",
      width: "10%",
      align: "center" as "center",
      render: (item: any) => {
        return (
          <div>
            <EditOutlined style={{ cursor: "pointer" }} onClick={() => handleEditCategory(item.categoryId)} />
            <DeleteOutlined
              onClick={() => showModal(item.categoryId)}
              style={{ color: "orange", marginLeft: 12, cursor: "pointer" }}
            />
          </div>
        );
      },
    },
  ];

  //console.log("Current State: ", selectedRowKeys);

  return (
    <HeaderProduct>
      <Wrapper>
        <HeaderLeft>
          <h2>List Category</h2>
        </HeaderLeft>

        <HeaderRight>
          <Button onClick={handleAddCategory}>Add Category</Button>

          <Button onClick={handleDeleteCategoryChecked} danger type="primary">
            Delete Category
          </Button>
        </HeaderRight>
      </Wrapper>
      <Table rowSelection={rowSelection} columns={columns} dataSource={dataCategories} rowKey="categoryId" />

      <Modal title="Delete Confirmation" open={open} onOk={handleOk} onCancel={handleCancel}>
        <p>{modalText}</p>
      </Modal>
    </HeaderProduct>
  );
};

export default Category;
