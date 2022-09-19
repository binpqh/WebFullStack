import React,{useState,useEffect} from 'react';
import { createProduct, deteleProduct, fetchListProduct, listProductSelect, updateProduct } from "./productSlice";
import {IProductInput, IProductResult } from '../../Interfaces/IProductServices';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
import { useDispatch} from 'react-redux';
import { Button, Modal, Table } from 'antd';
import ModalProduct from './CUProduct';
import { useAppSelector } from "../../app/hook";
import { DeleteProduct } from '../../Services/Product.Services';


const Product = () => {
    const [products, setproducts] = useState<IProductResult[]>([]);
    const [productedit, setproductedit] = useState({});
    const [isOpenModal, setisOpenModal] = useState(false);
    const dispatch = useDispatch<any>();
    const getProduct = useAppSelector(listProductSelect);
    useEffect(() => {
        // const fetchData = async () => {
        //     const results = await GetAllProduct();
        //     setproducts(results);
        //   };
        //   fetchData();
        dispatch(fetchListProduct());
        setproducts(getProduct);
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
                <DeleteOutlined onClick={()=>handleDeleteProduct(record)}
                 style={{color : "orange",marginLeft : 12}}
                 />
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
    const handleDeleteProduct=(values : any)=>
    {
        Modal.confirm(
            {
                title :"Are u sure?",
                okText :'Sure',
                okType : 'danger',
                onOk : async ()=>
                {
                    //  //await console.log("id delete: ",values.productId);
                    //  await DeleteProduct(values);
                    //  const results = await GetAllProduct();
                    // await setproducts(results);
                    await dispatch(DeleteProduct(values))
                    
                }
            })
       
    }
    const handleFinish = async(values : any) =>{
        
        // const isEdit = products.findIndex((item) => item.productId === values.productId)
        // console.log("Check isEdit"+isEdit);
        
        //  if(isEdit>=0)
        //  {
        //     console.log(values)
        //     await UpdateProduct(values);
        //     const results = await GetAllProduct();
        //     await setproducts(results);
        //  }
        //  else
        //  {
        //     console.log("sq",values.productId);
            
        //     console.log("Chạy nhầm xún create rồi", values);
        //     await CreateProduct(values)
            
        //  }
        //  setisOpenModal(false)
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