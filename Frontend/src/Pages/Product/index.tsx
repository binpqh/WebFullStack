import React,{useState,useEffect} from 'react';
import {GetAllProduct, CreateProduct, UpdateProduct} from '../../Services/Product.Services';
import {IProductResult } from '../../Interfaces/IProductServices';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';

import { Button, Modal, Table } from 'antd';
import ModalProduct from './ModalProduct';


const Product = () => {
    const [products, setproducts] = useState<IProductResult[]>([]);
    const [productedit, setproductedit] = useState({});
    const [isOpenModal, setisOpenModal] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const results = await GetAllProduct();
            setproducts(results);
            
          };
          fetchData();
    }, [])
    const columns=[
        {
            key: 'productId',
            title : 'Id',
            dataIndex :'productId'
        },
        {
            
            key: 'productName',
            title : 'Product name',
            dataIndex :'productName'
        },
        {
            
            key: 'brandName',
            title : 'Brand name',
            dataIndex :'brandName'
        },
        {
            
            key: 'categgoryName',
            title : 'Category name',
            dataIndex :'categoryName'
        },
        {
            
            key: 'modelYear',
            title :'Year',
            dataIndex :'modelYear'
        },
        {
            
            key: 'listPrice',
            title : 'Price',
            dataIndex :'listPrice'
        },
        {
            key :'action',
            title : 'Action',
            render : (record : any)=>
            {
                return<>
                <EditOutlined onClick={()=>{showModal(record)}} />
                <DeleteOutlined onClick={()=>handleDeleteProduct(record.id)} style={{color : "orange",marginLeft : 12}}/>
                </> 
            }
        }
    ]
    const showModal =(record : any) =>
    {
        setisOpenModal(true);
        setproductedit(record);
    }
    const hideModal = ()=>
    {
        setisOpenModal(false);
    }
    const handleDeleteProduct=(id : number)=>
    {
        Modal.confirm(
            {
                title :"Are u sure?",
                okText :'Sure',
                okType : 'danger',
                onOk : ()=>
                {
                   
                }
            })
    }
    const handleFinish = async(values : any) =>{
        const isEdit = products.findIndex((item) => item.productId = values.id)
         if(isEdit<=0)
         {
            console.log(values);
             await UpdateProduct(values.id,values)
         }
         else
         {
            await CreateProduct(values)
         }
         setisOpenModal(false)
     }
  return (
    <>
    <Button onClick={showModal}>Create Employee</Button>
                {
                    isOpenModal && <ModalProduct isCreate={isOpenModal} item={productedit} title = "Create" onCancel={hideModal} onFinish={handleFinish}>
                    </ModalProduct>
                }
    <Table
            columns={columns}
            dataSource={products}
            rowKey="productId"
            />
    </>
  )
}

export default Product
