import React from 'react'
import './style.css'
const Pagination = ({ totalCount, setPage, page, limit }) => {
    const hanldeSelectPage = (pageNo) => {
        if (pageNo >= 1 && pageNo <= Math.ceil(totalCount/limit)) {
            setPage(pageNo)
        }
    }
    return (
        <div className='pagination'>
            <span onClick={() => hanldeSelectPage(page - 1)} disable>◀</span>
            {
                [...Array(Math.ceil(totalCount / limit))].map((_, i) => {
                    return <span onClick={() => hanldeSelectPage(i + 1)} className={page == i + 1 ? 'activePage' : ''}>{i + 1}</span>
                })
            }
            <span onClick={() => hanldeSelectPage(page + 1)}>▶</span>
        </div>
    )
}

export default Pagination