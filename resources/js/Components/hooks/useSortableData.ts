import { useState, useMemo } from 'react';

interface SortOptions {
    key: string | null;
    order: 'asc' | 'desc';
}

export const useSortableData = <T,>(data: T[]) => {
    const [sortOptions, setSortOptions] = useState<SortOptions>({ key: null, order: 'asc' });

    const sortedData = useMemo(() => {
        if (!sortOptions.key) return data;

        const sortedArray = [...data].sort((a, b) => {
            const valueA = getNestedValue(a, sortOptions.key!);
            const valueB = getNestedValue(b, sortOptions.key!);

            if (valueA < valueB) return sortOptions.order === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortOptions.order === 'asc' ? 1 : -1;
            return 0;
        });

        return sortedArray;
    }, [data, sortOptions]);

    const requestSort = (key: string) => {
        setSortOptions(prev => ({
            key,
            order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc',
        }));
    };

    return { sortedData, sortOptions, requestSort };
};

// Función auxiliar para obtener valores anidados
const getNestedValue = (obj: any, key: string): any => {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
};
