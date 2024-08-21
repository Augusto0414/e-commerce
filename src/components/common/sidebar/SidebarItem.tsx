import { ReactNode, useState } from "react";
import { useSidebar } from "./context/SidebarContext";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SidebarSubItemProps {
    text: string;
    href: string;
}

interface SidebarItemProps {
    icon: ReactNode;
    text: string;
    href: string;
    alert?: boolean;
    subItems?: SidebarSubItemProps[];
}

export default function SidebarItem({ icon, text, href, alert = false, subItems = [] }: SidebarItemProps) {
    const { expanded } = useSidebar();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSubItems = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <li className="relative flex items-center my-3 font-medium rounded-md cursor-pointer transition-colors group">
                <NavLink
                    to={href}
                    className={({ isActive }) =>
                        `flex items-center w-full py-2 px-3 rounded-lg ${isActive
                            ? "bg-gradient-to-tr from-gray-700 to-gray-800 text-white font-bold shadow-md"
                            : "hover:bg-gray-700 hover:shadow-md text-gray-400 hover:text-white"
                        }`
                    }
                    onClick={subItems.length > 0 ? toggleSubItems : undefined}
                >
                    {icon}
                    <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
                    {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-red-500 ${expanded ? "" : "top-2"}`} />}
                    {expanded && subItems.length > 0 && (
                        <div className="ml-auto">
                            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                    )}
                    {!expanded && (
                        <div
                            className={`
                absolute left-full rounded-md px-2 py-1 ml-6 bg-dark-blue text-white text-sm
                invisible opacity-20 -translate-x-3 transition-all z-50
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
              `}
                        >
                            {text}
                        </div>
                    )}
                </NavLink>
            </li>
            {isOpen && subItems.length > 0 && (
                <ul className={`pl-8 transition-all ${expanded ? "block" : "hidden"}`}>
                    {subItems.map((subItem, index) => (
                        <li key={index} className="my-2">
                            <NavLink
                                to={subItem.href}
                                className={({ isActive }) =>
                                    `flex items-center py-2 px-3 rounded-lg ${isActive
                                        ? "bg-gray-600 text-white"
                                        : "hover:bg-gray-600 text-gray-400 hover:text-white"
                                    }`
                                }
                            >
                                {subItem.text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}