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



/** 
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface UseTablePaginationProps {
    initialPerPage?: number;
    path: string;
    resourceKey: string;
    withDateFilter?: boolean;
    withStatusFilter?: boolean;
}

export const useTablePagination = ({
    initialPerPage = 10,
    path,
    resourceKey,
    withDateFilter = false,  // Si es true, habilita el filtro por fecha
    withStatusFilter = false, // Si es true, habilita el filtro por estado
}: UseTablePaginationProps) => {
    const [perPage, setPerPage] = useState<number>(() => {
        const savedPerPage = localStorage.getItem('perPage');
        return savedPerPage ? parseInt(savedPerPage) : initialPerPage;
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [status, setStatus] = useState<string>(() => {
        const savedStatus = localStorage.getItem('status');
        return savedStatus || ''; // Si no hay valor, asigna cadena vacía
    });
    const [date, setDate] = useState<string>(() => {
        const savedDate = localStorage.getItem('date');
        return savedDate || ''; // Si no hay valor, asigna cadena vacía
    });

    const buildQueryParams = () => {
        const params: any = { per_page: perPage, search };

        // Solo agregar los filtros si están habilitados
        if (withStatusFilter && status) {
            params.status = status;
        }

        if (withDateFilter && date) {
            params.date = date;
        }

        return params;
    };

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

    const handleSearchChange = (value: string) => {
        setSearch(value);
        const params = buildQueryParams();
        fetchData(params);
    };

    const handlePerPageChange = (value: number) => {
        setPerPage(value);
        localStorage.setItem('perPage', String(value)); // Guardar el valor en el localStorage
        const params = buildQueryParams();
        fetchData(params);
    };

    const handleStatusChange = (value: string) => {
        setStatus(value);
        localStorage.setItem('status', value); // Guardar el valor en el localStorage
        const params = buildQueryParams();
        fetchData(params);
    };

    const handleDateChange = (value: string) => {
        setDate(value);
        localStorage.setItem('date', value); // Guardar la fecha seleccionada en el localStorage
        const params = buildQueryParams();
        fetchData(params);
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



// hooks/useTablePagination.ts
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface PaginationProps {
    initialPerPage: number;
    path: string;
    resourceKey: string;
}

export const useTablePagination = ({ initialPerPage, path, resourceKey }: PaginationProps) => {
    const [perPage, setPerPage] = useState<number>(() => 
        parseInt(localStorage.getItem('perPage') ?? initialPerPage.toString())
    );
    const [isLoading, setIsLoading] = useState(false);

    const handlePerPageChange = (value: number) => {
        setIsLoading(true);
        setPerPage(value);
        localStorage.setItem('perPage', value.toString());

        router.get(path, { per_page: value }, {
            preserveState: true,
            preserveScroll: true,
            only: [resourceKey],
            onFinish: () => setIsLoading(false)
        });
    };

    return { perPage, isLoading, handlePerPageChange };
};*/