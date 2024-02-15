import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Shop2() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchCategories();
    }, [])


    async function fetchCategories() {
        try {
            const res = await axios.get(`/product/category/all/category`);

            // const categories = await getCategory(res.data.length > 0 ? res.data : [])
            setCategories(res.data)

        } catch (error) {
            console.log(error);
        }
    }
    console.log(categories)

    const Category = ({ category }) => {
        return (
            <div>
                <p>{category.name}</p>
                {

                    category.subCatagories && category.subCatagories.length > 0 &&

                    (<p className='pl-5'>
                        {category.subCatagories.map((item, index) => {
                           return  <Category category={item} key={index}></Category>
                        })}
                    </p>)
                }
            </div>
        )
    }
    return (

        <div>
            <div>
                {
                    categories.length > 0 &&
                    categories.map((item) => {
                        return (
                            <Category category={item}></Category>
                            // <h3>{item.name}</h3>
                        )
                    })
                }

            </div><h3>KLjsj</h3>

        </div>

    );

}



export default Shop2;
