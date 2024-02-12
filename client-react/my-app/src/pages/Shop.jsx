import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`/product/category/all/category`);
            setCategories(response.data);

        }
        fetchData();
    }, []);
    console.log(categories)

    function Category({ category }) {
        return (
            <ul>
                <li className='pl-5'>
                    {category.name}
                    {category.subCatagories.length > 0 && (
                        <ul>
                            {category.subCatagories.map(subCategory => (
                                <Category key={subCategory._id} category={subCategory} />
                            ))}
                        </ul>
                    )}
                </li>
            </ul>
        );
    }


    return (
        <div>
            

            {categories && categories.map((category) => {
                return (
                    <Category category={category}></Category>
                )
            }
            )}
        </div >
    );

}



export default App;
