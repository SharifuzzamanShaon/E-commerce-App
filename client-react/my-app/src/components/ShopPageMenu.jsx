import axios from 'axios';
import React from 'react'

const ShopPageMenu = ({ categories, setProducts }) => {

    const handleCategoryItem = async(id) => {
        const res =await axios.get(`/product/category/${id}`)
        setProducts(res.data)
    }
    const Category = ({ category }) => {
        return (
            <div>
                <p className='text-white font-semibold cursor-pointer hover:bg-cyan-600 pl-1 w-32' onClick={()=>handleCategoryItem(category._id)}>{category.name}</p>
                {
                    category.subCatagories.length > 0 && (
                        <p className='pl-5 cursor-pointer'>
                            {category.subCatagories.map((item, index) => {
                                return <Category category={item} key={index}></Category>
                            })}
                        </p>
                    )}
            </div>
        )
    }
    return (
        <div className=''>
            <h3 className='drop-shadow-sm font-bold'>Categories</h3>
            {
                categories.length > 0 &&
                categories.map((item) => {
                    return <Category key={item._id} category={item}></Category>
                })
            }
        </div>
    )
}

export default ShopPageMenu