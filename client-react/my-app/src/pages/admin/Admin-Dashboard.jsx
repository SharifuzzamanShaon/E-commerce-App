import React, { useState } from 'react';
import './style.css'
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
// const items = [
//     getItem('Order', 'order', <PieChartOutlined />),
//     getItem('Product', '2', <DesktopOutlined />),
//     getItem('Option 3', '3', <ContainerOutlined />),
//     getItem('Navigation One', 'sub1', <MailOutlined />, [
//         getItem('Option 5', '5'),
//         getItem('Option 6', '6'),
//         getItem('Option 7', '7'),
//         getItem('Option 8', '8'),
//     ]),
// ];
const Admindashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const navigate = useNavigate()
    const handleNavigate = (key) => {
        { navigate(key) }
    }
    return (
        <div className='admin-dashboard'>
            <div style={{ width: 220, }}>
                <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16, }}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <Menu
                    onClick={((key) => handleNavigate(key.key))}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={[
                        { label: "order", key: "order", icon: <PieChartOutlined /> },
                        {
                            label: "product", icon: <PieChartOutlined />, children: [
                                { label: "All Products", key: "products", icon: <PieChartOutlined /> },
                                { label: "Add New Product", key: "add-product", icon: <PieChartOutlined /> },
                                { label: "Edit Product", key: "products/edit-product", icon: <PieChartOutlined /> },
                                { label: "View Product", key: "view-product", icon: <PieChartOutlined /> }
                            ]
                        },
                        { label: "Customers", key: "Customers", icon: <PieChartOutlined /> },
                        { label: "Review", key: "product", icon: <PieChartOutlined /> },
                        { label: "product", key: "product", icon: <PieChartOutlined /> },
                        { label: "product", key: "product", icon: <PieChartOutlined /> },
                        { label: "product", key: "product", icon: <PieChartOutlined /> }
                    ]}
                />
            </div>
           
        </div >
    );
};
export default Admindashboard