
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal,Button, Table } from 'antd';
import ModalStore from './ModalStore';
import { PlusOutlined  } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from '../../app/hook';
import styled from "styled-components";
import { fetchListStores,listStoreSelect,updateStore,deteleStore,createStore} from './storeSlice';
const HeaderPageCategory = styled.div`
  background-color: #f5f6fa;
  width: 100%;
  max-width: 70%;
  margin: 20px auto;
  display: "flex";
  flex-direction: "column";
  padding: 0;
  border-radius: 5px;
  box-shadow: 0 0 7px 0 #ccc;
  overflow: hidden;
`;

const Wrapper = styled.div`
  background-color: #435d7d;
  color: #fff;
  padding: 0px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const HeaderLeft = styled.div`
  padding-bottom: 4px;
  margin: 0;
  color: #fff;
  h2 {
    color: #fff;
    font-weight: 500;
    margin: 5px 0;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
`;
const Store = () => {

    const stores  = useAppSelector(listStoreSelect);
    const dispatch = useAppDispatch();
    const [storesEdit, setstoresEdit] = useState({});
    const [isOpenModal, setisOpenModal] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<Array<number>>([]);
    
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
    
      const onSelectChange = (newSelectedRowKeys: any) => {
        setSelectedRowKeys(newSelectedRowKeys);
      };
    
      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };
    
      const handleDeleteStoreChecked = () => {
        selectedRowKeys.forEach((id:any,values:any) => {
        //console.log("id",id);
          dispatch(deteleStore({storeId:id,...values}));
        });
      };
      
    return (
        <><HeaderPageCategory>
        <Wrapper>
          <HeaderLeft>
            <h2>List Stores</h2>
          </HeaderLeft>
  
          <HeaderRight>
            
              <Button onClick={showModal} icon={<PlusOutlined />}>Create Store</Button>
              {isOpenModal && (
                 <ModalStore   isCreate={isOpenModal} item={storesEdit} title="Store" onCancel={hideModal} onFinish={handleFinish} >
                 </ModalStore>
              )}
                <Button onClick={handleDeleteStoreChecked} danger type="primary">
            Delete Store
          </Button>
            
          
          </HeaderRight>
        </Wrapper>
  
        <Table rowSelection={rowSelection} columns={columns} dataSource={stores} rowKey="storeId" />
      </HeaderPageCategory>
           
        </>




    );
};

export default Store;