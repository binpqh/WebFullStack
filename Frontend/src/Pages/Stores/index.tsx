
import React, { useState, useEffect } from 'react';
import { GetAllStore, DeteleStore, CreateStore, UpdateStore } from '../../Services/Stores.Services';
import { IStoreResult } from './../../Interfaces/IStoreServices';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal,Button, Table } from 'antd';
import ModalStore from './ModelStore';
import { PlusOutlined  } from "@ant-design/icons";




const Store = () => {
    const [stores, setStores] = useState<IStoreResult[]>([]);
    const [storesEdit, setstoresEdit] = useState({});
    const [isOpenModal, setisOpenModal] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const results = await GetAllStore();
            setStores(results);

        };
        fetchData();
    }, [stores])

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
        // console.log("ListStore: "+JSON.stringify(record));
        
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
                    await console.log("idStore:", record.storeId);
                    await DeteleStore(record);
                    
                }
                

            })


    }

    const handleFinish = async(id:number,values : any) =>{
            const isEdit = stores.findIndex((item)=> item.storeId === id)
         if(isEdit >= 0)
         {
            await UpdateStore({storeId: id,...values})
            .then((res) =>
            {
                const newlistCate = stores.map((item)=>
                {
                    if(item.storeId === id)
                    {
                       item.storeName=values.storeName;
                       item.phone=values.phone;
                       item.email=values.emails;
                       item.city=values.city;
                       item.street=values.street;
                       item.state=values.state;
                       item.zipCode=values.zipCode;
                    }
                    return item;
                })
                setStores(newlistCate);
            }).catch((error)=>
            {
            }).finally(() => {
                setisOpenModal(false);
              });
         }
         else
         {
            
        //await console.log("ListStoreCreate: "+JSON.stringify(values));
        await CreateStore(values);

        setisOpenModal(false);

         }
       
     }

    return (
        <>
            <Button onClick={showModal} type="primary" danger icon={<PlusOutlined />}>Create Store</Button>
            {
                isOpenModal &&
                <ModalStore   isCreate={isOpenModal} item={storesEdit} title="Store" onCancel={hideModal} onFinish={handleFinish} >
                </ModalStore>
            }
            <Table columns={columns} dataSource={stores} rowKey="storeId" />
        </>




    );
};

export default Store;
