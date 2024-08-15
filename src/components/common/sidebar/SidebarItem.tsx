import { ReactNode } from "react";
import { useSidebar } from "./context/SidebarContext";
import { Link } from "react-router-dom";

interface SidebarItemProps {
    icon: ReactNode;
    text: string;
    href: string;
    active?: boolean;
    alert?: boolean;
}

export default function SidebarItem({ icon, text, href, active = false, alert = false }: SidebarItemProps) {
    const { expanded } = useSidebar();

    return (
        <li
            className={`
                relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer
                transition-colors group
              ${active
                    ? "bg-gradient-to-tr from-gray-800 to-gray-900 text-bone"
                    : "hover:bg-gray-hover text-gray-500"
                }
    `}
        >
            <Link to={href} className="flex items-center w-full">
                {icon}
                <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
                {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-bone ${expanded ? "" : "top-2"}`} />}
                {!expanded && (
                    <div
                        className={`
                            absolute left-full rounded-md px-2 py-1 ml-6 bg-dark-blue text-bone text-sm
                            invisible opacity-20 -translate-x-3 transition-all
                            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                    >
                        {text}
                    </div>
                )}
            </Link>
        </li>
    );
}
