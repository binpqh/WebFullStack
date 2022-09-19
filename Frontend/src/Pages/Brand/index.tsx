import React,{useState,useEffect} from 'react';
import {GetAllBrand, CreateBrand, UpdateBrand,DeleteBrand} from '../../Services/Brand.Services';
import {IBrandResult } from '../../Interfaces/IBrandServices';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';

import { Button, Modal, Table } from 'antd';
import ModalBrand from './CUBrand';



const Brand = () => {
    const [brands, setBrands] = useState<IBrandResult[]>([]);
    const [brandEdit, setBrandEdit] = useState({});
    const [isOpenModal, setisOpenModal] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const results = await GetAllBrand();
            setBrands(results);
          };
          fetchData();
    }, [])

    const columns=[
        {
            key: 'brandId',
            title : 'Id',
            dataIndex :'brandId'
        },
        {
            
            key: 'brandName',
            title : 'Brand name',
            dataIndex :'brandName'
        },
        {
            key :'action',
            title : 'Action',
            render : (record : any)=>
            {
                return<>
                <EditOutlined onClick={()=>{showModal(record)}} />
                <DeleteOutlined onClick={()=>handleDeleteBrand(record)}
                 style={{color : "orange",marginLeft : 12}}
                 />
                </> 
            }
        }
    ]
    const showModal =(record : any) =>
    {
        setisOpenModal(true);
        setBrandEdit(record);
    }
   
    const hideModal = ()=>
    {
        setisOpenModal(false);
    } 
    const handleDeleteBrand=(values : any)=>
    {
        Modal.confirm(
            {
                title :"Are u sure?",
                okText :'Sure',
                okType : 'danger',
                onOk : async ()=>
                {
                     await console.log("id delete: ",values.brandId);
                     await DeleteBrand(values);
                    //  const results = await GetAllBrand();
                    // await setBrands(results);
                    
                }
            })
       
    }
    const handleFinish = async(values : any) =>{
        
        const isEdit = brands.findIndex((item) => item.brandId === values.brandId)       
         if(isEdit>=0)
         {
            console.log("Id của update:",values.brandId)
            await UpdateBrand(values);
            // const results = await GetAllBrand();
            // await setBrands(results);
            
         }
         else
         {
            
            console.log("Id của create:",values.brandId);
            await CreateBrand(values)
            
         }
         setisOpenModal(false)
     }
  return (
    <>
    <Button onClick={showModal}>Create </Button>
                {
                    isOpenModal && <ModalBrand isCreate={isOpenModal} item={brandEdit} title = "Create" onCancel={hideModal} onFinish={handleFinish}>
                    </ModalBrand>
                }
        <Table
            columns={columns}
            dataSource={brands}
            rowKey="brandId"
            />
    </>
  )
}

export default Brand
