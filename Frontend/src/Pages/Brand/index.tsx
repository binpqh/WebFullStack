import styled from "styled-components";
import { Button, Table, Modal } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import Filters from "../../Components/Filters";
import BrandModal from "./BrandModal";
import { BrandClass } from "../../Interfaces/BrandClass";
//import { brandsRemainingSelector } from "../../app/selectors";
import { deleteBrand,listBrandsSelect } from "../../Features/Brand/BrandList/brandsSlice";
//import Message from "../../Interfaces/Common/Message";

const HeaderPageBrand = styled.div`
  background-color: #f5f6fa;
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

const Brand = () => {
  const dispatch = useDispatch<any>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<number>>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isContentCreate, setIsContentCreate] = useState<boolean>(true);
  const [brandEdit, setBrandEdit] = useState<BrandClass>();
  const [brands, setBrands] = useState<BrandClass[] | undefined>([]);

  const getBrands = useSelector(listBrandsSelect);

  useEffect(() => {
    setBrands(getBrands);
  }, [getBrands]);

  // const openNotification = (message: Message) => {
  //   notification.open({
  //     message: message.TitleMessage,
  //     description: message.Description,
  //     onClick: () => {
  //       console.log("Notification Clicked!");
  //     },
  //   });
  // };

  const showModal = (brand: BrandClass) => {
    setIsOpenModal(true);
    setBrandEdit(brand);
  };

  const handleCreateBrand = (brand: any) => {
    setIsContentCreate(true);
    showModal(brand);
  };

  const hiddenModal = () => {
    setIsOpenModal(false);
  };

  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDeleteCategory = (brand: BrandClass) => {
    Modal.confirm({
      title: "Are u sure?",
      okText: "Sure",
      okType: "danger",
      onOk: async () => {
        dispatch(deleteBrand(brand.brandId));
      },
    });
  };

  const handleDeleteBrandChecked = () => {
    selectedRowKeys.forEach((item: number) => {
      dispatch(deleteBrand(item));
    });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "brandId",
      key: "brandId",
      width: "5%",
      align: "center" as "center",
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
      width: "85%",
    },
    {
      key: "action",
      title: "Action",
      width: "10%",
      align: "center" as "center",
      render: (brand: BrandClass) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                setIsContentCreate(false);
                showModal(brand);
              }}
              style={{ cursor: "pointer", marginRight: 7 }}
            />
            <DeleteOutlined
              onClick={() => handleDeleteCategory(brand)}
              style={{ color: "orange", marginLeft: 7, cursor: "pointer" }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <HeaderPageBrand>
      <Wrapper>
        <HeaderLeft>
          <h2>List Brands</h2>
        </HeaderLeft>

        <HeaderRight>
          <Button onClick={handleCreateBrand}>Create Brand</Button>

          {isOpenModal && (
            <BrandModal
              isCreate={isOpenModal}
              brand={brandEdit}
              isContentCreate={isContentCreate}
              onCancel={hiddenModal}
            ></BrandModal>
          )}

          <Button onClick={handleDeleteBrandChecked} danger type="primary">
            Delete Brand
          </Button>
        </HeaderRight>
      </Wrapper>
      <Filters />
      <Table
        rowSelection={rowSelection}
        pagination={{
          // position: ["bottomCenter"],
        }}
        columns={columns}
        dataSource={brands}
        rowKey="brandId"
      />
    </HeaderPageBrand>
  );
};

export default Brand;