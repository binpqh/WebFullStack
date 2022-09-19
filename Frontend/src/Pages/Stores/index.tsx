
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal,Button, Table } from 'antd';
import ModalStore from './ModalStore';
import { PlusOutlined  } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from '../../app/hook';
import { fetchListStores,listStoreSelect,updateStore,deteleStore,createStore} from "./storeSlice";
const Store = () => {

  

    const stores  = useAppSelector(listStoreSelect);
    const dispatch = useAppDispatch();
    const [storesEdit, setstoresEdit] = useState({});
    const [isOpenModal, setisOpenModal] = useState(false);
    
    useEffect(()=>
    {
        dispatch(fetchListStores());
       
    })

    const columns = [
        {

            key: 'storeName',
            title: 'store name',
            dataIndex: 'storeName'
        },
        {

            key: 'phone',
            title: 'phone',
            dataIndex: 'phone'
        },
        {

            key: 'email',
            title: 'email',
            dataIndex: 'email'
        },
        {

            key: 'street',
            title: 'street',
            dataIndex: 'street'
        },
        {

            key: 'city',
            title: 'city',
            dataIndex: 'city'
        },
        {

            key: 'state',
            title: 'state',
            dataIndex: 'state'
        },
        {

            key: 'zipCode',
            title: 'zip Code',
            dataIndex: 'zipCode'
        },
        {
            key: 'action',
            title: 'Action',
            render: (record: any) => {
                return <>
                    <EditOutlined  onClick={()=>{showModal(record)}}/>
                    <DeleteOutlined onClick={() => handleDeleteStore(record)} style={{ color: "orange", marginLeft: 12 }} />
                </>
            }

        }
    ]
    const showModal =(record : any) =>
    {
        console.log("idStore: "+record.storeId);
        setisOpenModal(true);
        setstoresEdit(record);
    }
    const hideModal = ()=>
    {
        setisOpenModal(false);
    }
    const handleDeleteStore = (record: any) => {
        Modal.confirm(
            {
                title: "Are u sure?",
                okText: 'Sure',
                okType: 'danger',
                onOk: async () => {
                    await dispatch(deteleStore(record));
                    
                }
            })


    }

    const handleFinish = async(id:number,values : any) =>{
         const isEdit = stores.findIndex((item:any)=> item.storeId === id)
         if(isEdit>=0)
         {
             await dispatch(updateStore({storeId: id,...values}));
             setisOpenModal(false);
         }
         else
         {
            await dispatch(createStore(values));
            setisOpenModal(false);
         }
     }
     const rowSelection = {
        onChange: (selectedRowKeys:any, selectedRows:any) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps:(record:any)  => ({
          disabled: record.name === "Disabled User", // Column configuration not to be checked
          name: record.name,
          className: "checkbox-red"
        })
      };
      
    return (
        <>
            <Button onClick={showModal} type="primary" danger icon={<PlusOutlined />}>Create Store</Button>
            {
                isOpenModal &&
                <ModalStore   isCreate={isOpenModal} item={storesEdit} title="Store" onCancel={hideModal} onFinish={handleFinish} >
                </ModalStore>
            }
            <Table rowSelection={rowSelection} columns={columns} dataSource={stores} rowKey="storeId" />
        </>




    );
};

export default Store;
