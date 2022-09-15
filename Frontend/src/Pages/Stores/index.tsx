
import React,{useState,useEffect} from 'react';
import {  GetAllStore,DeteleStore } from '../../Services/Stores.Services';
import { IStoreResult } from './../../Interfaces/IStoreServices';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
import { Modal, Table } from 'antd';




const Store = () => {
    const [stores, setStores] = useState<IStoreResult[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const results = await GetAllStore();
            setStores(results);
            
          };
          fetchData();
    }, [stores])
    
const columns=[
    {
        key: 'storeId',
        title : 'Id',
        dataIndex :'storeId'
    },
    {
        
        key: 'storeName',
        title : 'store name',
        dataIndex :'storeName'
    },
    {
        
        key: 'phone',
        title : 'phone',
        dataIndex :'phone'
    },
    {
        
        key: 'email',
        title : 'email',
        dataIndex :'email'
    },
    {
        
        key: 'street',
        title : 'street',
        dataIndex :'street'
    },
    {
        
        key: 'city',
        title : 'city',
        dataIndex :'city'
    },
    {
        
        key: 'zipCode',
        title : 'zip Code',
        dataIndex :'zipCode'
    },
    {
        key :'action',
        title : 'Action',
        render : (record : any)=>
        {
            return<>
            <EditOutlined  />
            <DeleteOutlined  onClick={()=>handleDeleteCategory(record.storeId)} style={{color : "orange",marginLeft : 12}}/>
            </>
        }
      
    }
]
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
                     DeteleStore(id);
                     //console.log("id store:",id);
                }
            })
            
            alert("Post deleted!");
    }

  return (
    <div>
      <Table  columns={columns} dataSource={stores} />
    </div>
  );
};

export default Store;
