import { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';
import debounce from 'lodash/debounce';

interface UseBasicTablePaginationProps {
    initialPerPage?: number;
    path: string;
    resourceKey: string;
}

export const useBasicTablePagination = ({
    initialPerPage = 10,
    path,
    resourceKey,
}: UseBasicTablePaginationProps) => {
    const [perPage, setPerPage] = useState<number>(() => {
        const savedPerPage = localStorage.getItem('perPage');
        return savedPerPage ? parseInt(savedPerPage) : initialPerPage;
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    const fetchData = (params: any) => {
        setIsLoading(true);

        router.get(path, params, {
            preserveState: true,
            preserveScroll: true,
            only: [resourceKey],
            onSuccess: () => setIsLoading(false),
            onError: () => setIsLoading(false),
        });
    };

    const debouncedFetchData = useMemo(
        () => debounce((params: any) => fetchData(params), 300),
        [] // Se crea una única instancia de debounce
    );

    const handleSearchChange = (value: string) => {
        setSearch(value);
        debouncedFetchData({ per_page: perPage, search: value });
    };

    const handlePerPageChange = (value: number) => {
        setPerPage(value);
        localStorage.setItem('perPage', String(value));
        fetchData({ per_page: value, search });
    };

    return {
        perPage,
        search,
        isLoading,
        handlePerPageChange,
        handleSearchChange,
    };
};


