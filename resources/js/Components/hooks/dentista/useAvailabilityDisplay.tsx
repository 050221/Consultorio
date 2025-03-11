import { formatHora } from '@/Components/utils/dateUtils';
import { useMemo } from 'react';

interface AvailabilityDay {
    active: boolean;
    start: string;
    end: string;
}

interface Availability {
    [key: string]: AvailabilityDay;
}


// Hook para formatear la disponibilidad
export const useAvailabilityDisplay = (availabilityJson: string) => {
    const availabilityData = useMemo(() => {
        try {
            return JSON.parse(availabilityJson) as Availability;
        } catch (e) {
            return null;
        }
    }, [availabilityJson]);

    const diasSemana = {
        monday: 'Lunes',
        tuesday: 'Martes',
        wednesday: 'Miércoles',
        thursday: 'Jueves',
        friday: 'Viernes',
        saturday: 'Sábado',
        sunday: 'Domingo'
    };

    const formatearHorario = (day: AvailabilityDay) => {
        if (!day.active) return 'No disponible';
        return `${formatHora(day.start)} a ${formatHora(day.end)}`;
    };

    return {
        availabilityData,
        diasSemana,
        formatearHorario
    };
};

// Componente para mostrar la disponibilidad
export const AvailabilityDisplay = ({ availabilityJson }: { availabilityJson: string }) => {
    const { availabilityData, diasSemana, formatearHorario } = useAvailabilityDisplay(availabilityJson);

    if (!availabilityData) return <p className="text-red-500">Formato de disponibilidad inválido</p>;

    return (
        <div className="grid gap-2">
            {Object.entries(availabilityData).map(([day, dayData]) => (
                dayData.active && (
                    <div key={day} className="flex items-center gap-2">
                        <span className="font-medium min-w-[100px]">{diasSemana[day as keyof typeof diasSemana]}:</span>
                        <span className="text-gray-600">{formatearHorario(dayData)}</span>
                    </div>
                )
            ))}
        </div>
    );
};
