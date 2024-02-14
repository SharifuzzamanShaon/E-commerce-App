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
const { Header, Content, Footer, Sider } = Layout;

function App() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);
    const navigate = useNavigate();
    useEffect(() => {
        fetchCategories();
    }, [])
    useEffect(() => {
        fetchProducts()
    }, [page, limit]);

    async function fetchCategories() {
        try {
            const res = await axios.get(`/product/category/all/category`);
            if (res.data) {
                async function getCategory(arr) {
                    return Promise.all(arr.map(async (item) => {
                        const { _id: id, name: label } = item;
                        let children = [];
                        if (item.subCatagories && item.subCatagories.length > 0) {
                            children = await getCategory(item.subCatagories);
                        }
                        return { id, label, children }
                    }))
                }
                const categories = await getCategory(res.data.length > 0 ? res.data : [])
                setCategories(categories)
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function fetchProducts() {
        try {
            const res = await axios.get(`/products/search/query?searchTerm=${searchTerm}&limit=${limit}&page=${page}`);
            if (res.data) {
                setProducts(res.data.products);
                setTotalCount(res.data.totalCount)
                console.log(products);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const items = [
        ...categories
    ]

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
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
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
                            margin: '0 16px',
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
                            <div className='container mx-auto px-4 py-8'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                                    {
                                        products && products.length > 0 ?
                                            products.map((item) => {
                                                return (<Card onClick={() => goToSinglePage(item._id)} hoverable style={{ width: 240, }}
                                                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                                >
                                                    <Meta title={`${item.name}`} />
                                                    <h3>Price - {`${item.price} $`} </h3>
                                                </Card>)
                                            })

                                            : <Spin />
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
