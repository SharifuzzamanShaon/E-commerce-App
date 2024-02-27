import { Button, Input, Select, Space, TreeSelect, message, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const productOption = { name: '', price: "", brand: "", totalQty: "", sizes: [], colors: ["black"], images: null, category: '', description: "" }
const AddNewProduct = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [treeData, setTreeData] = useState([])
    const [newProduct, setNewProduct] = useState({ ...productOption });
    const { currentUser } = useSelector((state) => state.user)

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }

    const sizeOptions = [
        { label: "S", value: "S" },
        { label: "M", value: "M" },
        { label: "L", value: "L" },
        { label: "XL", value: "XL" },
        { label: "XXL", value: "XXL" }
    ];
    const colorOptions = [
        { label: "red", value: "red" },
        { label: "green", value: "green" },
        { label: "blue", value: "blue" },
        { label: "blue", value: "pink" },
        { label: "yellow", value: "yellow" },
        { label: "gray", value: "gray" }
    ]
    // const treeData = [...allCategories];

    const handleSelectSize = (value) => {
        setNewProduct({ ...newProduct, sizes: [...value] })
    };
    const handleSelectColor = (value) => {
        setNewProduct({ ...newProduct, colors: [...value] })
    }

    const onChange = (newValue) => {
        setNewProduct({ ...newProduct, category: newValue })
        console.log(newValue);
    };

    const handleSubmit = async () => {
        try {
            console.log(newProduct);
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const res = await axios.post(`/products/add-product`, newProduct, config);
            console.log(res);
            if (res.status === 201) {
                success();
                setNewProduct(...productOption)
            } else {
                showError(res.response.data.error)
            }

        } catch (error) {
            // showError(error.response.data.error)
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
    const [selectedImage, setSelectedImage] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setSelectedImage(reader.result);
                console.log(reader.result);
                setNewProduct({ ...newProduct, images: reader.result })
            };

            reader.readAsDataURL(file);
        }
    };
    const handleRemoveImage = () => {
        setSelectedImage(null);
    };
    console.log(newProduct);

    return (
        <div className='p-3 max-w-lg mx-auto'>
            {contextHolder}
            <h1 className='text-3xl font-semibold text-center my-7'>Add New Product</h1>
            <div className='flex flex-col gap-4'>
                <Input placeholder="Type here" type='text' name='name' prefix={"Product Name | "} value={newProduct.name} onChange={handleChange} />
                <Input placeholder="Type here" type='number' name='price' prefix={"Price | "} value={newProduct.price} onChange={handleChange} />
                <Input placeholder="Type here" type='text' name='brand' prefix={"Brand Name | "} value={newProduct.brand} onChange={handleChange} />
                <Input placeholder="Type here" type='number' name='totalQty' prefix={"Totoal Quantity | "} value={newProduct.totalQty} onChange={handleChange} />

                <input type='file' onChange={handleFileChange} accept='image/*'></input>
                {selectedImage && (
                    <div>
                        <h3>Preview:</h3>
                        <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        <button onClick={handleRemoveImage}>Remove Image</button>
                    </div>
                )}
                <Select mode="multiple" allowClear style={{ width: '100%' }} placeholder=" select Size" defaultValue={[]} onChange={handleSelectSize} options={sizeOptions} />
                <Select mode="multiple" allowClear style={{ width: '100%' }} placeholder=" select color" defaultValue={[]} onChange={handleSelectColor} options={colorOptions} />
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
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChange}
                    treeData={treeData.length > 0 ? treeData : []}
                />
                {/* </Space> */}

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



/**
 * 
 * njb
 */