import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, Select, } from 'antd'
import { IProductInput } from '../../../Interfaces/IProductServices';
import { GetAllCategory } from '../../../Services/Category.Services';
import { ICategoryResult } from '../../../Interfaces/ICategoryServices';
import { IBrandResult } from '../../../Interfaces/IBrandServices';
import { GetAllBrand } from '../../../Services/Brand.Services';


const Option = Select;
const ModalProduct = ({ props,title, item, isCreate, onCancel, onFinish, handleFail }: any) => {

    const [data, setData] = useState(item);
    const [category, setCategory] = useState<ICategoryResult[]>([]);
    const [brand,setBrand]= useState<IBrandResult[]>([]);
    const handleFinish = (values: any) => {
        values.productId = item.productId;

        console.log("Modal said : "+item.productId);
        onFinish(data.productId,values)
        console.log(values);

    }
    useEffect(() => {
        item && setData(item)
        const fetch = async () => {
            const results = await GetAllCategory();
            setCategory(results);
            
            // console.log("dl category", item);
        }
        fetch();
    }, [item]);

  useEffect(() => {
        item && setData(item)
        const fetch = async () => {
            const results = await GetAllBrand();
            setBrand(results);
        
        }
        fetch();
    }, [item]);

    return (
        <>
            <Modal open={isCreate} title={title} onCancel={onCancel}
                footer={null}
            >
                <Form name={title} labelCol={{ span: 6 }} initialValues={data} wrapperCol={{ span: 16 }} onFinish={handleFinish} onFinishFailed={handleFail}>

                    <Form.Item label='Product name' name='productName' rules={[{ required: true, message: 'You must fill in this form!' }]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label='Brand Id' name='brandId' rules={[{ required: true, message: 'You must fill in this form!' }]}>

                    <Select placeholder="Select Name Brand" defaultValue={data.brandName}  >
                            {
                                brand.map((brand) => {

                                    return (<Option value={brand.brandId} key={brand.brandId}>{brand.brandName}</Option>);
                                })
                            }


                        </Select>
                    </Form.Item>
                    <Form.Item label='Category Id' name='categoryId' rules={[{ required: true, message: 'You must fill in this form!' }]}>
                        <Select placeholder="Select Name Category" defaultValue={data.categoryName}  >
                            {
                                category.map((category) => {

                                    return (<Option value={category.categoryId} key={category.categoryId}>{category.categoryName}</Option>);
                                })
                            }


                        </Select>

                    </Form.Item>
                    <Form.Item label='Model year' name='modelYear' rules={[{ required: true, message: 'You must fill in this form!' }]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label='Price' name='listPrice' rules={[{ required: true, message: 'You must fill in this form!' }]}>
                        <Input type="text" />
                    </Form.Item>
                    <Button htmlType='submit' >
                        Save
                    </Button>
                </Form>
            </Modal>
        </>
    )
}


export default ModalProduct