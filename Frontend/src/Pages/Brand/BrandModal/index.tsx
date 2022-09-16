//author: hiki
import { useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { BrandClass } from "../../../Interfaces/BrandClass";
import { createBrand, updateBrand } from "../../../Features/Brand/BrandList/brandsSlice";

const BrandModal = ({ brand, isCreate, onCancel, handleFail, isContentCreate }: any) => {
  const dispatch = useDispatch<any>();

  const [data, setData] = useState<BrandClass>(brand);

  const handleFinish = (brand: BrandClass) => {
    const valueUpdateBrand: BrandClass = { brandId: data.brandId, brandName: brand.brandName };

    if (isContentCreate) {
      dispatch(createBrand(brand.brandName));
    } else {
      dispatch(updateBrand(valueUpdateBrand));
    }

    onCancel();
  };

  useEffect(() => {
    brand && setData(brand);
  }, [brand]);

  return (
    <div>
      <Modal
        open={isCreate}
        title={isContentCreate ? "Create Brand" : "Update Brand"}
        onCancel={onCancel}
        footer={null}
      >
        <Form
          name={brand.brandId}
          initialValues={data}
          wrapperCol={{ span: 16 }}
          onFinish={handleFinish}
          onFinishFailed={handleFail}
        >
          <Form.Item
            label="Brand name"
            name="brandName"
            rules={[{ required: true, message: "You must fill in this form!" }]}
          >
            <Input type="text" />
          </Form.Item>

          <Button htmlType="submit">{isContentCreate ? "Create" : "Update"}</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default BrandModal;
