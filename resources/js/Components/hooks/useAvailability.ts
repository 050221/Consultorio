import { useState } from 'react';

interface AvailabilityDay {
    active: boolean;
    start: string;
    end: string;
}

interface Availability {
    [key: string]: AvailabilityDay;
}

 export const diasSemana = [
    { key: 'monday', label: 'Lunes' },
    { key: 'tuesday', label: 'Martes' },
    { key: 'wednesday', label: 'Miércoles' },
    { key: 'thursday', label: 'Jueves' },
    { key: 'friday', label: 'Viernes' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' },
];

const useAvailability = (initialData: string, setFormData: (field: string, value: string) => void) => {
    const [availabilityData, setAvailabilityData] = useState<Availability>(JSON.parse(initialData));

    const handleAvailabilityChange = (day: string, field: string, value: any) => {
        const newAvailability = {
            ...availabilityData,
            [day]: {
                ...availabilityData[day],
                [field]: value,
            },
        };
        setAvailabilityData(newAvailability);
        setFormData('availability', JSON.stringify(newAvailability));
    };

    return {
        availabilityData,
        handleAvailabilityChange,
    };
};

export default useAvailability;
