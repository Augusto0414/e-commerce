import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Layout from '../components/layout/layout';
import OrderPage from '../pages/order/OrderPage';
import { CategoryPage, CreateProductPage, SubCategoryPage, ViewProductPage } from '../pages/';
import { ItemOutlet } from '../components';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path="pedido" element={<OrderPage />} />
                    <Route path="inventario" element={<></>} />
                    <Route path="descuento" element={<></>} />
                    <Route path="producto" element={<ItemOutlet />}>
                        <Route index element={<ViewProductPage />} />
                        <Route path="details" element={<ViewProductPage />} />
                        <Route path="create" element={<CreateProductPage />} />
                    </Route>
                    <Route path="category" element={<ItemOutlet />}>
                        <Route index element={<CategoryPage />} />
                        <Route path="subcategory" element={<SubCategoryPage />} />
                    </Route>
                    <Route path="bodega" element={<></>} />
                    <Route path="cliente" element={<></>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
