import { router } from "@inertiajs/react";
import { useCallback, useState } from "react";

export const usePerPage = (initialPerPage = 10, routeName: string) => {
    const [perPage, setPerPage] = useState(initialPerPage);
    const [isLoading, setIsLoading] = useState(false);

    const handlePerPageChange = useCallback((value: number) => {
        setPerPage(value);
        setIsLoading(true);

        router.get(
            route(routeName),
            { per_page: value },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setIsLoading(false), // Actualizamos isLoading cuando la solicitud termina
            }
        );
    }, [routeName]);

    return { perPage, handlePerPageChange, isLoading };
};
