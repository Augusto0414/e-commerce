import React from 'react'
import { Route } from 'react-router-dom'
import CreateProductPage from '../pages/product/CreateProductPage'

const ProductRoutes: React.FC = () => {
    return (
        <>
            <Route index element={<CreateProductPage />} />
            <Route path='default' element={<CreateProductPage />} />
            <Route path='details' element={<CreateProductPage />} />
        </>
    )
}

export default ProductRoutes
