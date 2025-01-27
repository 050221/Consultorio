import { useState } from 'react';
import { router } from '@inertiajs/react';

interface UseTablePaginationProps {
    initialPerPage2?: number;
    path: string
    resourceKey: string;
}
export const useTablePagination = ({
    initialPerPage2 = 10,
    path, resourceKey
    }: UseTablePaginationProps) => {
    const [perPage2, setPerPage2] = useState<number>(() => {
        const savedPerPage = localStorage.getItem('perPage2');
        return savedPerPage ? parseInt(savedPerPage) : initialPerPage2;
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handlePerPageChange2 = (value: number) => {
        setIsLoading(true);
        setPerPage2(value);
        router.get(
            path,
            { per_page2: value },
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
        perPage2,
        isLoading,
        handlePerPageChange2
    };
};