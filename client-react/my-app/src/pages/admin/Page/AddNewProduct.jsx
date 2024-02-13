import { Button, Input, Select, Space, TreeSelect, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
const AddNewProduct = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [treeData, setTreeData] = useState([])
    const [newProduct, setNewProduct] = useState({ name: '', price: 10, brand: "", totalQty: 10, totalSold: 20, sizes: [], colors: ["black"], category: '', description: "" });
    const { currentUser } = useSelector((state) => state.user)

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }

    const options = [
        { label: "S", value: "S" },
        { label: "M", value: "M" },
        { label: "L", value: "L" },
        { label: "XL", value: "XL" },
        { label: "XXL", value: "XXL" }
    ];
    // const treeData = [...allCategories];

    const handleSelectSize = (value) => {
        setNewProduct({ ...newProduct, sizes: [...value] })
    };

    const onChange = (newValue) => {
        setNewProduct({ ...newProduct, category: newValue })
        console.log(newValue);
    };

    const handleSubmit = async () => {
        try {
            const config = {
                headers: {
                  "Content-type": "application/json",
                }
              };
            const res = await axios.post(`/products/add-product`, newProduct, config);
            if (res.status === 201) {
                success();
                setNewProduct("")
            } else {
                error('Faild to add the product')
            }

        } catch (error) {
            showError()
            console.log(error)
        }
        console.log(newProduct);
    }
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Product Update Success',
        });

    };
    const showError = (msg = "somthing error occured") => {
        messageApi.open({
            type: 'error',
            content: `${msg}`,
        });
    };
    useEffect(() => {
        fetchCategory()
    }, [])
    const fetchCategory = async () => {
        try {
            const { data } = await axios.get('/product/category/all/category')
            console.log(data)
            // setCategoryTree(data);
            async function recursive(data) {
                return Promise.all(data.map(async (item) => {

                    const { _id: value, name: title } = item;
                    let children = [];
                    item.subCatagories ? children = await recursive(item.subCatagories) : []
                    return { value, title, children }
                }))
            }
            const allCategories = await recursive(data);
            setTreeData(allCategories)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            {contextHolder}
            <h1 className='text-3xl font-semibold text-center my-7'>Add New Product</h1>
            <div className='flex flex-col gap-4'>
                <Input placeholder="Type here" type='text' name='name' prefix={"Product Name | "} value={newProduct.name} onChange={handleChange} />
                <Input placeholder="Type here" type='number' name='price' prefix={"Price | "} value={newProduct.price} onChange={handleChange} />
                <Input placeholder="Type here" type='text' name='brand' prefix={"Brand Name | "} value={newProduct.brand} onChange={handleChange} />
                <Input placeholder="Type here" type='number' name='totalQty' prefix={"Totoal Quantity | "} value={newProduct.totalQty} onChange={handleChange} />
                <Space style={{ width: '100%', }} direction="vartical">
                    <Select mode="multiple" allowClear style={{ width: '100%' }} placeholder=" select Size" defaultValue={[]} onChange={handleSelectSize} options={options} />
                    <TreeSelect
                        showSearch
                        style={{
                            width: '100%',
                        }}
                        value={newProduct.category}
                        dropdownStyle={{
                            maxHeight: 400,
                            overflow: 'auto',
                        }}
                        placeholder="Select category"
                        allowClear
                        treeDefaultExpandAll
                        onChange={onChange}
                        treeData={treeData.length > 0 ? treeData : []}
                    />
                </Space>

                <TextArea rows={4} placeholder="Type here" type='text' name='description' prefix={"Description | "} value={newProduct.description} onChange={handleChange} />
                <Button block onClick={handleSubmit}>Add Product</Button>

            </div>
            <div>
                {/* {
                    categoryTree && categoryTree.map((item) => {
                        function subCat(value) {
                            if (!value) {
                                return [];
                            }
                            return value.map((cat) => {
                                return (
                                    <>
                                        <p>{cat.name}</p>
                                        <p>{cat.subCatagories ? subCat(cat.subCatagories) : []}</p>
                                    </>
                                )
                            })
                        }
                        return (
                            <div>
                                <h2>{item.name}</h2>
                                <p>{item.subCatagories.length > 0 ? subCat(item.subCatagories) : []}</p>
                            </div>
                        )
                    })
                } */}
            </div>
        </div>
    )
}

export default AddNewProduct