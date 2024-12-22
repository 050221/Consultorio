// src/utils/dateUtils.ts

/**
 * Convierte una hora en formato 12 horas a formato 24 horas.
 * @param hora12 - Hora en formato 12 horas (ejemplo: "3:30 p.m.").
 * @returns La hora en formato 24 horas (ejemplo: "15:30").
 * @throws Error si el formato de hora es inválido.
 */

// Formatea un timestamp como fecha y hora legibles
export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Mexico_City',
  });
};

// Convierte una cadena de fecha a un formato local
export const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeZone: 'America/Mexico_City',
  }).format(date);
};

// Convierte una cadena de fecha a un formato local
export const formatDateComplete = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'long',
    timeZone: 'America/Mexico_City',
  }).format(date);
};

// Convierte hora de 24h a 12h con AM/PM
export const formatHora = (hora: string): string => {
  const [horas, minutos] = hora.split(':').map(Number);
  const ampm = horas >= 12 ? 'PM' : 'AM';
  const formattedHours = horas % 12 || 12;
  return `${formattedHours}:${minutos.toString().padStart(2, '0')} ${ampm}`;
};

// Convierte hora de 12h a 24h
export const convertirHoraA24Horas = (hora12: string): string => {
  if (!hora12 || !/^\d{1,2}:\d{2}\s[aApP]\.?[mM]\.?$/.test(hora12)) {
    throw new Error("Formato de hora inválido. Ejemplo esperado: '3:30 p.m.'");
  }
  const [time, modifier] = hora12.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier.toLowerCase().includes('p') && hours < 12) hours += 12;
  if (modifier.toLowerCase().includes('a') && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Mapea estado a clase de estilo

// Función para mapear estado a clase de color
export const getStatusClassName = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'confirmada': return 'event-confirmed';
    case 'pendiente': return 'event-pending';
    case 'cancelada': return 'event-cancelled';
    default: return 'event-default';
  }
};

export const getEventStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmada':
      return 'rounded-lg bg-green-100 text-green-800 font-semibold p-1';
    case 'pendiente':
      return 'rounded-lg bg-yellow-100 text-yellow-800 font-semibold p-1';
    case 'cancelada':
      return 'rounded-lg bg-red-100 text-red-800 font-semibold line-through p-1';
    default:
      return 'rounded-lg bg-gray-100 text-gray-800 p-1';
  }
};


export const getStatusEmoji = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmada': return '✅';
    case 'pendiente': return '⏳';
    case 'cancelada': return '❌';
    default: return '📅';
  }
};









