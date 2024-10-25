import { X } from "lucide-react";

type SidebarDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const SidebarDialog = ({ isOpen, onClose, title, children }: SidebarDialogProps): JSX.Element => {
    return (
        <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-custom transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}
            style={{ transition: 'transform 0.3s ease-in-out' }}
        >

            <div className='flex items-center justify-end px-4 py-4'>
                <button
                    onClick={onClose}
                    className='text-gray-600 hover:text-blue-500 text-lg'
                >
                    <X size={24} />
                </button>
            </div>
            <section className='px-4'>
                <header>
                    <h2 className='text-2xl px-4 py-2 font-semibold'>{title}</h2>
                </header>
                {children}
            </section>
        </div>
    )
}

export default SidebarDialog
