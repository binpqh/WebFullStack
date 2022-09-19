import React,{useState, useEffect} from 'react'
import { Modal,Form,Input,Button } from 'antd' 

const ModalBrand = ({title, item, isCreate, onCancel, onFinish, handleFail}:any) => {

    const [data, setData] = useState(item);

    const handleFinish = (values : any) => {
        onFinish(data.brandId,values)
    }
    useEffect(() => {
    
        item && setData(item)
    }, [item]);
  return (
    <>
    <Modal open={isCreate} title = {title} onCancel={onCancel}            
                footer={null}
                >
                    <Form name={item.categoryId} labelCol={{ span: 4 }} initialValues={data} wrapperCol={{ span: 16 }} onFinish={handleFinish} onFinishFailed={handleFail}>
                        <Form.Item label='Brand name' name='brandName'  rules={[{required : true,message:'You must fill in this form!'}]}>
                            <Input  type="text" />
                        </Form.Item>
                       
                        <Button htmlType='submit' >
                            Save
                        </Button>
                    </Form> 
                </Modal>
    </>
  )
}


export default ModalBrand