// src/utils/dateUtils.ts
export const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('es-MX', {
        dateStyle: 'medium',
    }).format(date);
};
