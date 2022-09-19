import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button } from 'antd'

const ModalStore = ({ title, item, isCreate, onCancel, onFinish, handleFail }: any) => {

    const [data, setData] = useState(item);

    const handleFinish = (values: any) => {
        onFinish(data.storeId, values)
    }
    useEffect(() => {

        item && setData(item)
    }, [item]);

    const validateMessages = {

         // eslint-disable-next-line
        required: '${label} is required!',
        types: {
             // eslint-disable-next-line
            email: '${label} is not a valid email!',
        },
       
    };

    return (
        <>
            <Modal open={isCreate} title={title} onCancel={onCancel} footer={null} >

                <Form name={item.categoryId} labelCol={{ span: 5 }} initialValues={data} wrapperCol={{ span: 16 }} onFinish={handleFinish} onFinishFailed={handleFail} validateMessages={validateMessages}>
                    <Form.Item label='Name' name='storeName' rules={[
                        {
                            required: true,
                        },
                    ]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label='Phone' name='phone' rules={[
                        {
                            required: true,
                        },
                    ]} >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label='Email' name='email' rules={[
                        {
                            required: true,
                            type: 'email',
                        },
                    ]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label='Street' name='street'  rules={[
                        {
                            required: true,
                            
                        },
                    ]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label='City' name='city'  rules={[
                        {
                            required: true,
                           
                        },
                    ]}>
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item label='State' name='state'  rules={[
                        {
                            required: true,
                          
                        },
                    ]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label='Zipcode' name='zipCode' rules={[
                        {
                            required: true,
                            max:5,
                            
                        },
                    ]}>
                        <Input type="text" />
                    </Form.Item>

                        <div style={{textAlign:'center'}}>
                        <Button htmlType='submit' type="primary" danger style={{  }}>
                            Save
                        </Button>
                        <Button style={{ marginLeft: 10 }} onClick={onCancel}>
                            Cancel
                        </Button>
                        </div>
                </Form>
            </Modal>
        </>
    )
}


export default ModalStore