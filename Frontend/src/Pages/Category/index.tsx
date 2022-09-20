import React,{useState,useEffect} from 'react';
import { createCategory, deteleCategory, fetchListCategory, listCategorySelect, updateCategory } from "./categorySlice";
import { ICategoryResult } from './../../Interfaces/ICategoryServices';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
import { useAppSelector } from "../../app/hook";
import { Button, Modal, Table } from 'antd';
import ModalPopup from './CUCategory';
import { useDispatch, useSelector } from 'react-redux';

const Category = () => {
    const [categories, setCategories] = useState<ICategoryResult[]>([]);
    const [categoryEdit, setcategoryEdit] = useState({});
    const [isOpenModal, setisOpenModal] = useState(false);
    const getCategory = useAppSelector(listCategorySelect);
    const dispatch = useDispatch<any>();
    useEffect(() => {
        // const fetchData = async () => {
        //     const results = await GetAllCategory();
        //     setCategories(results);
            
        //   };
        //   fetchData();
        dispatch(fetchListCategory());
        setCategories(getCategory);
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
                onOk : ()=>
                {
                    // useEffect(() => {
                    //     const fetchData = async () => {
                    //         const results = await DeteleCategory(id);
                    //         setCategories(results);
                            
                    //       };
                    //       fetchData();
                    await dispatch(deteleCategory(record))
                    },
                    
                })
            }
    
    const handleFinish = async(values : any) =>{
        // const isEdit = categories.find((item) => item.categoryId = values.id)
        //  if(isEdit)
        //  {
        //     console.log(values);
        //      await (await UpdateCategory(values.id,values))
        //  }
        //  else
        //  {
        //     await CreateCategory(values)
        //  }
        //  setisOpenModal(false)
     };
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
  );
};

export default Category;
