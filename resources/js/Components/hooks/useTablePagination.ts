// hooks/useTablePagination.ts
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface UseTablePaginationProps {
    initialPerPage?: number;
    path: string
    resourceKey: string;
}

export const useTablePagination = ({
    initialPerPage = 10,
    path, resourceKey
    }: UseTablePaginationProps) => {

    const [perPage, setPerPage] = useState<number>(() => {
        const savedPerPage = localStorage.getItem('perPage');
        return savedPerPage ? parseInt(savedPerPage) : initialPerPage;
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handlePerPageChange = (value: number) => {
        setIsLoading(true);
        setPerPage(value);

        router.get(
            path,
            { per_page: value },
            {
                preserveState: true,
                preserveScroll: true,
                only: [resourceKey], 
                onSuccess: () => setIsLoading(false),
                onError: () => setIsLoading(false)
            }
        );
    };

    return {
        perPage,
        isLoading,
        handlePerPageChange
    };
};