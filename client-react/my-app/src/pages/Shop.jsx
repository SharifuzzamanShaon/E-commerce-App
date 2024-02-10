import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('0')
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`/product/category/all/category/${categoryId}`);
            setCategories(...categories, response.data);
            console.log(categories)
        }
        fetchData();
    }, [categoryId]);
    const fetchCategory = async (item) => {
        setCategoryId(item)
    }
    return (
        <div>
            <h1>Category Tree</h1>
            <ul>
                {categories && categories.map(category => {
                    return (
                        <li>
                            <button>{category.name}</button>
                            <ul>
                                {
                                   category && category.subCatagories.map((item) => {
                                        return (
                                            <li className='pl-5'>
                                                <button onClick={()=>fetchCategory(item._id)}>{item.name}</button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}



export default App;
