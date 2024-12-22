const useCitas = (citas: CitasPageProps["citas"], filters: { searchText: string, filterStatus: string, filterDate: string }) => {
    return useMemo(() => {
        const { searchText, filterStatus, filterDate } = filters;
        return citas.data.filter(cita => {
            const matchesSearch = // lógica de búsqueda;
            const matchesStatus = // lógica de filtro por status;
            const matchesDate = // lógica de filtro por fecha;
            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [citas.data, filters]);
};