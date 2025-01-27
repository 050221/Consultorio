import { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';
import debounce from 'lodash/debounce';

interface useAdvancedTablePaginationsProps {
    initialPerPage?: number;
    path: string;
    resourceKey: string;
}

export const useAdvancedTablePagination = ({
    initialPerPage = 10,
    path,
    resourceKey,
}: useAdvancedTablePaginationsProps) => {
    
    const [perPage, setPerPage] = useState<number>(() => {
        const savedPerPage = localStorage.getItem('perPageAdvanced');
        return savedPerPage ? parseInt(savedPerPage) : initialPerPage;
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [status, setStatus] = useState<string>(() => {
        const savedStatus = localStorage.getItem('status');
        return savedStatus || '';
    });
    const [date, setDate] = useState<string>(() => {
        const savedDate = localStorage.getItem('date');
        return savedDate || '';
    });

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
        [resourceKey] // Agregado 'resourceKey' como dependencia
    );
    

    const handleSearchChange = (value: string) => {
        setSearch(value);
        debouncedFetchData({ per_page: perPage, search: value, status, date });
    };

    const handlePerPageChange = (value: number) => {
        setPerPage(value);
        localStorage.setItem('perPageAdvanced', String(value));
        fetchData({ per_page: value, search, status, date });
    };

    const handleStatusChange = (value: string) => {
        setStatus(value);
        localStorage.setItem('status', value);
        fetchData({ per_page: perPage, search, status: value, date });
    };

    const handleDateChange = (value: string) => {
        setDate(value);
        localStorage.setItem('date', value);
        fetchData({ per_page: perPage, search, status, date: value });
    };

    return {
        perPage,
        search,
        status,
        date,
        isLoading,
        handlePerPageChange,
        handleSearchChange,
        handleStatusChange,
        handleDateChange,
    };
};
