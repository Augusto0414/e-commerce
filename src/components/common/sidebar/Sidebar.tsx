import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useSidebar } from "./context/SidebarContext";

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const { expanded, setExpanded } = useSidebar();

    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-dark-blue border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src="https://img.logoipsum.com/243.svg"
                        className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                            }`}
                        alt=""
                    />
                    <button
                        onClick={() => setExpanded((prev) => !prev)}
                        className="p-1.5 rounded-lg bg-gray-950 text-white"
                    >
                        {expanded ? <ChevronFirst color="white" /> : <ChevronLast color="white" />}
                    </button>
                </div>

                <ul className="flex-1 px-3">{children}</ul>

                <div className="border-t border-gray-hover flex p-3">
                    <img
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        alt=""
                        className="w-10 h-10 rounded-md"
                    />
                    <div
                        className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold text-bone">John Doe</h4>
                            <span className="text-xs text-bone">johndoe@gmail.com</span>
                        </div>
                        <MoreVertical size={20} color="gray" />
                    </div>
                </div>
            </nav>
        </aside>
    );
}
