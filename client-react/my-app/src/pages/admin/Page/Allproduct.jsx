import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import '../style.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Allproduct = () => {
  const [products, setProduct] = useState([])
  const navigate = useNavigate()
  const getAllProduct = async () => {
    try {
      const products = await axios.get('http://localhost:5000/api/v1/products/search/query');
      setProduct(products.data.products)
      console.log(products.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllProduct()
  }, []);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: () => (
        <p>Lka</p>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',

    },
    {
      title: 'Action',
      key: 'action',
      render: (item) => (
        <Space size="middle">
          <a onClick={() => goToEdit(item)}>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const goToEdit = (item) => {
    navigate('edit-product',{state:item});
    console.log(item)

  }
  return (
    <div className='all-product'>
      <Table columns={columns} dataSource={products} />
    </div>
  );
};
export default Allproduct; 
