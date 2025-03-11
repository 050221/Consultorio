import { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { router } from "@inertiajs/react";

export const useFilters = (routeName: string, initialFilters: Record<string, string > = {}) => {
    const [filters, setFilters] = useState(initialFilters);
    const [isLoading, setIsLoading] = useState(false);

    const applyFilters = useCallback(
        debounce((updatedFilters) => {
            setIsLoading(true);
            router.get(
                route(routeName),
                updatedFilters,
                {
                    preserveState: true,
                    preserveScroll: true,
                    onFinish: () => setIsLoading(false),
                }
            );
        }, 300),
        [routeName]
    );

    const handleFilterChange = (key: string, value: string ) => {
        const updatedFilters = { ...filters, [key]: value };
        setFilters(updatedFilters);
        applyFilters(updatedFilters);
    };

    return { filters, isLoading, handleFilterChange };
};

/*
import { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { router } from "@inertiajs/react";

export const useFilters = (routeName: string) => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const applyFilters = useCallback(
        debounce((filters) => {
            setIsLoading(true);
            router.get(
                route(routeName),
                filters,
                {
                    preserveState: true,
                    preserveScroll: true,
                    onFinish: () => setIsLoading(false),
                }
            );
        }, 300),
        [routeName]
    );

    const handleFilterChange = (key: string, value: string | number) => {
        const newFilters = { search, status, date, [key]: value };

        switch (key) {
            case "search":
                setSearch(value as string);
                break;
            case "status":
                setStatus(value as string);
                break;
            case "date":
                setDate(value as string);
                break;
        }

        applyFilters(newFilters);
    };

    return { search, status, date, isLoading, handleFilterChange };
};
*/