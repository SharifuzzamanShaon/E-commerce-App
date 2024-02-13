import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Input, message, Select, Space } from 'antd';
import '../style.css'
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';
import axios from 'axios';


const EditProduct = () => {
    const location = useLocation();
    const { currentUser } = useSelector((state) => state.user)
    const [messageApi, contextHolder] = message.useMessage();
    const [size, setSize] = useState('middle');
    const [editProduct, setEditProdcut] = useState({});
    useEffect(() => {
        getProduct()
    }, [])
    const getProduct = async () => {
        const res = await axios.get(`/products/${location.state._id}`)
        console.log(res);
        setEditProdcut({
            id: res.data.product._id,
            name: res.data.product.name,
            price: res.data.product.price,
            description: res.data.product.description,
            sizeOptions: res.data.product.sizes
        })
    }
    const handleChange = (e) => {
        setEditProdcut({ ...editProduct, [e.target.name]: e.target.value })
    }
    const handleUpdate = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${currentUser.token}`
            }
        }
        const res = await axios.patch(`/products/patch/${editProduct.id}`, editProduct, config);
        console.log(res);
        if (res.status === 200) {
            success();
            setEditProdcut(...res.data.updateProduct)
        }
    }
    const handleSize = () => {
        //     console.log(`Selected: ${value}`);
    };
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Product Update Success',
        });

    };
    return (
        <div className='edit-product'>
            <h4>Edit Product {editProduct.name}</h4>
            {contextHolder}
            <div>
                <Input placeholder="Type here" name='name' prefix={"Product Name | "} value={editProduct.name} onChange={handleChange} />
                <Input placeholder="Type here" name='price' prefix={"Price | "} value={editProduct.price} onChange={handleChange} />
                <TextArea rows={4} placeholder="Type here" name='description' prefix={"Description | "} value={editProduct.description} onChange={handleChange} />
                <Button block onClick={handleUpdate}>Default</Button>
            </div>
        </div>
    )
}

export default EditProduct