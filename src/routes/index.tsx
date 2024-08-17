import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Layout from '../components/layout/layout';
import OrderPage from '../pages/order/OrderPage';
import ProductPage from '../pages/product/ProductPage';
import { CategoryPage, CreateProductPage, ViewProductPage } from '../pages/';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path="pedido" element={<OrderPage />} />
                    <Route path="inventario" element={<></>} />
                    <Route path="descuento" element={<></>} />
                    <Route path="producto" element={<ProductPage />}>
                        <Route index element={<ViewProductPage />} />
                        <Route path='create' element={<CreateProductPage />} />
                        <Route path='details' element={<ViewProductPage />} />
                    </Route>
                    <Route path="category" element={<CategoryPage />} />
                    <Route path="bodega" element={<></>} />
                    <Route path="cliente" element={<></>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;