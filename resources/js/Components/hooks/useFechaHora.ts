import { useState } from "react";

export function useFechaHora() {
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [error, setError] = useState("");

    const handleDateChange = (date: string) => {
        setFecha(date);
        setError(""); // Limpiar error al cambiar la fecha
    };

    const handleTimeChange = (time: string) => {
        const selectedTime = time;
        const currentTime = new Date();

        if (fecha === currentTime.toISOString().split("T")[0]) {
            const [selectedHour, selectedMinute] = selectedTime.split(":").map(Number);
            const currentHour = currentTime.getHours();
            const currentMinute = currentTime.getMinutes();

            if (selectedHour < currentHour || (selectedHour === currentHour && selectedMinute < currentMinute)) {
                setError("No puedes seleccionar una hora pasada.");
                return;
            }
        }

        setHora(selectedTime);
        setError("");
    };

    return {
        fecha,
        hora,
        error,
        handleDateChange,
        handleTimeChange,
    };
}
