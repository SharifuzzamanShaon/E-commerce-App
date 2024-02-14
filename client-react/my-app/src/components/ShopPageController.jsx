import { Breadcrumb } from 'antd'
import React from 'react'

const ShopPageController = ({ setLimit, limit }) => {

    return (
        <div className='flex justify-between'>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className='layout' style={{
                margin: '16px 0',
                // width: "10px"
            }}>
                <div className='flex '>
                    <h2 className='font-medium cursor-pointer' onClick={() => setLimit(4)}> 4 | </h2>
                    <h2 className='font-medium cursor-pointer' onClick={() => setLimit(6)}> 6 | </h2>
                    <h2 className='font-medium cursor-pointer' onClick={() => setLimit(8)}> 8  </h2>
                </div>
            </div>
        </div>
    )
}

export default ShopPageController