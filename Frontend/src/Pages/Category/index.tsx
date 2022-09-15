import React,{useState,useEffect} from 'react';
import { CreateCategory, DeteleCategory, GetAllCategory, UpdateCategory } from '../../Services/Category.Services';
import { ICategoryResult } from './../../Interfaces/ICategoryServices';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';

import { Button, Modal, Table } from 'antd';
import ModalPopup from './CUCategory';

const Category = () => {
    const [categories, setCategories] = useState<ICategoryResult[]>([]);
    const [categoryEdit, setcategoryEdit] = useState({});
    const [isOpenModal, setisOpenModal] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const results = await GetAllCategory();
            setCategories(results);
            
          };
          fetchData();
    }, [categories])
    const columns=[
        {
            key: 'categoryId',
            title : 'Id',
            dataIndex :'categoryId'
        },
        {
            
            key: 'categoryName',
            title : 'Category name',
            dataIndex :'categoryName'
        },
        {
            key :'action',
            title : 'Action',
            render : (record : any)=>
            {
                return<>
                <EditOutlined onClick={()=>{showModal(record)}} />
                <DeleteOutlined onClick={()=>handleDeleteCategory(record)} style={{color : "orange",marginLeft : 12}}/>
                </>
            }
        }
    ]
    const showModal =(record : any) =>
    {
        console.log("chekc có id hon nè"+record.categoryId+record.categoryName);
        
        setisOpenModal(true);
        setcategoryEdit(record);
    }
    const hideModal = ()=>
    {
        setisOpenModal(false);
    }
    const handleDeleteCategory=(record : any)=>
    {
        Modal.confirm(
            {
                title :"Are u sure?",
                okText :'Sure',
                okType : 'danger',
                onOk : async ()=>
                {
                    await console.log(record.categoryId);
                    await DeteleCategory(record);
                }
            })
    }
    const handleFinish = async(id:number,values : any) =>{
        const isEdit = categories.findIndex((item)=> item.categoryId === id)
        
         if(isEdit >= 0)
         {
            await UpdateCategory({categoryId: id,...values})
            .then((res) =>
            {
                const newlistCate = categories.map((item)=>
                {
                    if(item.categoryId === id)
                    {
                        item.categoryName = values.categoryName;
                    }
                    return item;
                })
                setCategories(newlistCate);
            }).catch((error)=>
            {
            }).finally(() => {
                setisOpenModal(false);
              });
         }
         else
         {
            await CreateCategory(values);
            setisOpenModal(false);
         }
     }
  return (
    <>
    <Button onClick={showModal}>Create Employee</Button>
                {
                    isOpenModal && <ModalPopup isCreate={isOpenModal} item={categoryEdit} title = "edwq" onCancel={hideModal} onFinish={handleFinish}>
                    </ModalPopup>
                }
    <Table
            columns={columns}
            dataSource={categories}
            rowKey="categoryId"
            />
    </>
    
    
  )
}

export default Category