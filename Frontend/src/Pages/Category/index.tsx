import React,{useState,useEffect} from 'react';
import { CreateCategory, GetAllCategory, UpdateCategory } from '../../Services/Category.Services';
import { ICategoryInput, ICategoryResult } from './../../Interfaces/ICategoryServices';
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
    }, [])
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
                <DeleteOutlined onClick={()=>handleDeleteCategory(record.id)} style={{color : "orange",marginLeft : 12}}/>
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
    const handleDeleteCategory=(id : number)=>
    {
        Modal.confirm(
            {
                title :"Are u sure?",
                okText :'Sure',
                okType : 'danger',
                onOk : ()=>
                {
                    // gọi api delete rồi fetch data lại nè
                }
            })
    }
    const handleFinish = async(id:number,values : any) =>{
        console.log("Update method said :"+id + values.categoryName);
        const isEdit = categories.find((item) => item.id ===id)
        // console.log(values);
        
        //  if(isEdit)
        //  {
        //     console.log("Update method said :"+id + values.categoryName);
            await UpdateCategory({...values, categoryId: id});
        //  }
        //  else
        //  {
        //     await CreateCategory(values)
        //  }
         setisOpenModal(false)
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