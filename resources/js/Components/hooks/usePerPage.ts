import { router } from "@inertiajs/react";
import { useCallback, useState, useMemo } from "react";
import debounce from "lodash/debounce";

export const usePerPage = (initialPerPage = 10, routeName: string) => {
    const [perPage, setPerPage] = useState(initialPerPage);
    const [isLoading, setIsLoading] = useState(false);

    
    const handlePerPageChange = useCallback(
        debounce((value: number) => {
            setPerPage(value);
            setIsLoading(true);

            router.get(
                route(routeName),
                { per_page: value },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onFinish: () => setIsLoading(false),
                }
            );
        }, 300), 
        [routeName]
    );

    const memoizedPerPage = useMemo(() => perPage, [perPage]);

    return { perPage: memoizedPerPage, handlePerPageChange, isLoading };
};
