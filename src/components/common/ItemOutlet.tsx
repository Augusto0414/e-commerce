import React from 'react'
import { Outlet } from 'react-router-dom'

const ItemOutlet: React.FC = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default ItemOutlet
