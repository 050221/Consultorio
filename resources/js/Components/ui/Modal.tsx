import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    preventOutsideClick?: boolean; // Nueva prop para controlar el cierre
    showCloseButton?: boolean; // Opcional: controla si se muestra el botón X
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    preventOutsideClick = false,
    showCloseButton = true
}: ModalProps) {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog 
                as="div" 
                className="relative z-50"
                onClose={preventOutsideClick ? () => {} : onClose} // Si preventOutsideClick es true, el onClose no se ejecutará
            >
                {/* Fondo oscuro */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                {/* Contenedor del modal */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    {title && (
                                        <Dialog.Title as="h2" className="text-2xl font-bold text-gray-900 ">
                                            {title}
                                        </Dialog.Title>
                                    )}
                                    
                                    {showCloseButton && (
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-500"
                                            onClick={onClose}
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}