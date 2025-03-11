import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

interface UseDeleteItemConfig {
    baseUrl: string;
    resourceName: string;
    onSuccess?: () => void;
    onError?: (error: any) => void;
    confirmTitle?: string;
    confirmText?: string;
    successMessage?: string;
    errorMessage?: string;
}

export const useDeleteItem = ({
    baseUrl,
    resourceName,
    onSuccess,
    onError,
    confirmTitle = '¿Estás seguro?',
    confirmText = 'Esta acción no se puede deshacer.',
    successMessage,
    errorMessage,
}: UseDeleteItemConfig) => {
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const handleDelete = async (id: number) => {
        if (isDeleting !== null) return;

        const result = await Swal.fire({
            title: confirmTitle,
            text: confirmText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'bg-sky-500 text-white font-semibold py-2 px-6 rounded hover:bg-sky-600 focus:ring-2 focus:ring-sky-300 transition-all duration-200 ease-in-out cursor-pointer border-2 border-sky-300 shadow-md hover:shadow-lg active:scale-95 mr-2',
                cancelButton: 'bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600',
            },
            buttonsStyling: false,
        });

        if (result.isConfirmed) {
            setIsDeleting(id);
            try {
                await Inertia.delete(`${baseUrl}/${id}`);

                await Swal.fire({
                    title: 'Eliminado',
                    text: successMessage || `El ${resourceName} ha sido eliminado.`,
                    icon: 'success',
                    showConfirmButton: false,
                    
                });

                onSuccess?.();
            } catch (error) {
                await Swal.fire({
                    title: 'Error',
                    text: errorMessage || `No se pudo eliminar el ${resourceName}.`,
                    icon: 'error',
                    showConfirmButton: false,
                });

                onError?.(error);
            } finally {
                setIsDeleting(null);
            }
        }
    };

    return {
        handleDelete,
        isDeleting
    };
};