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
        });

        if (result.isConfirmed) {
            setIsDeleting(id);
            try {
                await Inertia.delete(`${baseUrl}/${id}`);
                
                await Swal.fire({
                    title: 'Eliminado',
                    text: successMessage || `El ${resourceName} ha sido eliminado.`,
                    icon: 'success',
                });

                onSuccess?.();
            } catch (error) {
                await Swal.fire({
                    title: 'Error',
                    text: errorMessage || `No se pudo eliminar el ${resourceName}.`,
                    icon: 'error',
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