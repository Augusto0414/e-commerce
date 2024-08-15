import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface SidebarContextProps {
    expanded: boolean;
    setExpanded: Dispatch<SetStateAction<boolean>>;
}

// Crea el contexto con un valor predeterminado vacío
export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

// Define el proveedor del contexto
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};
