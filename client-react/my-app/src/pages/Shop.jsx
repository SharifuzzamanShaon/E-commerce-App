import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Card, Spin } from 'antd';
const { Meta } = Card;
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import ShopPageController from '../components/ShopPageController';
import ShopPageMenu from '../components/ShopPageMenu';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
const { Header, Content, Footer, Sider } = Layout;

function App() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);
    const navigate = useNavigate();
    const { searchKeyword } = useSelector((state) => state.product)

    useEffect(() => { console.log(searchKeyword) }, [searchKeyword])
    useEffect(() => {
        fetchCategories();
    }, [])

    // useEffect(() => {
    //     fetchProducts()
    // }, [page, limit]);

    useEffect(() => {
        let timeOut = setTimeout(() => {
            setSearchTerm(searchKeyword)
            setPage(1)
        }, 2000)
        return () => clearTimeout(timeOut);
    }, [searchKeyword])

    async function fetchCategories() {

    }
    const { data: allCategories, isError, isLoading } = useQuery('categories', () => {
        return axios.get("/product/category/all/category")
    })

    useEffect(() => {
        if (allCategories) {
            setCategories(allCategories.data)
        }
    }, [allCategories])

    const { data: allProduct } = useQuery({
        queryKey: ['products', page, searchTerm, limit],
        queryFn: () => { return axios.get(`/products/search/query?searchTerm=${searchKeyword}&limit=${limit}&page=${page}`) },
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5
    }
    )


    useEffect(() => {
        if (allProduct) {
            setProducts(allProduct.data.products)
            console.log(allProduct);
            const totalItem = searchTerm ? allProduct.data.products.length : allProduct.data.totalCount
            setTotalCount(totalItem)
        }
    }, [allProduct])
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const goToSinglePage = (id) => {
        navigate(`/shop/${id}`)
    }

    return (

        <div>

            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <div className='px-5 w-35'>
                        {
                            categories.length > 0 &&
                            <ShopPageMenu categories={categories} setProducts={setProducts}></ShopPageMenu>
                        }
                    </div>

                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    />
                    <Content
                        style={{
                            margin: '0 10px',
                        }}
                    >
                        <ShopPageController limit={limit} setLimit={setLimit} />
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <div className='container mx-auto px-4 py-4'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 z-0'>
                                    {
                                        products && products.length > 0 ?
                                            products.map((item, index) => {
                                                return (<Card className='z-0' key={index} onClick={() => goToSinglePage(item._id)} hoverable style={{ width: 240, }}
                                                    cover={<img alt="example" src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg" />}
                                                >
                                                    <Meta title={`${item.name}`} />
                                                    <h3>Price - {`${item.price} $`} </h3>
                                                </Card>)
                                            })

                                            : "Product not found"
                                    }
                                </div>
                            </div>
                            <Pagination totalCount={totalCount} setPage={setPage} page={page} limit={limit}></Pagination>
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </div>

    );

}



export default App;
