import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Layout from '../components/layout/layout';
import OrderPage from '../pages/order/OrderPage';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path="pedido" element={<OrderPage />} />
                    <Route path="inventario" element={<></>} />
                    <Route path="bodega" element={<></>} />
                    <Route path="cliente" element={<></>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;