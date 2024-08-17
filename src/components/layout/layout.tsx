import { Outlet } from 'react-router-dom';
import { HomeIcon, Truck, Package, Warehouse, UserIcon, Tag, LayoutPanelLeft, ShoppingBasket } from "lucide-react";
import { SidebarProvider } from '../common/sidebar/context/SidebarContext';
import Sidebar from '../common/sidebar/Sidebar';
import SidebarItem from '../common/sidebar/SidebarItem';

const Layout = () => {
    return (
        <SidebarProvider>
            <div className="flex h-screen">
                <div className="flex-shrink-0">
                    <Sidebar>
                        <SidebarItem
                            icon={<HomeIcon />}
                            text="Inicio"
                            href="/"
                        />
                        <SidebarItem
                            icon={<ShoppingBasket />}
                            text="Produto"
                            href="/producto"
                        />
                        <SidebarItem
                            icon={<Truck />}
                            text="Pedido"
                            href="/pedido"
                        />
                        <SidebarItem
                            icon={<LayoutPanelLeft />}
                            text="Categoria"
                            href="/category"
                        />
                        <SidebarItem
                            icon={<Tag />}
                            text="Descuento"
                            href="/descuento"
                        />
                        <SidebarItem
                            icon={<Package />}
                            text="Inventario"
                            href="/inventario"
                        />
                        <SidebarItem
                            icon={<Warehouse />}
                            text="Bodega"
                            href="/bodega"
                        />
                        <SidebarItem
                            icon={<UserIcon />}
                            text="Cliente"
                            href="/cliente"
                        />
                    </Sidebar>
                </div>
                <div className="flex-1 overflow-auto">
                    <main className="p-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default Layout;
