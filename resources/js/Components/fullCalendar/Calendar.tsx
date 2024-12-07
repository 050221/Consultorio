import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

// Importaciones de shadcn/ui
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

// Importar estilos
import './estilos.css';

// Interfaces actualizadas
interface User {
  id: number;
  name: string;
  rol: 'admin' | 'patient' | string;
  email?: string;
  telefono?: string;
}

interface Cita {
  id: number;
  patient_id: number;
  fecha: string;
  hora: string;
  status: string;
  users: User | null;
}

interface FullCalendarEvent {
  id: string;
  title: string;
  start: string;
  className?: string;
  extendedProps?: {
    cita: Cita;
    status?: string;
    patientId?: number;
  };
}

const formatHora = (hora: string) => {
  // Convierte 24h a 12h con AM/PM
  const [horas, minutos] = hora.split(':');
  const h = parseInt(horas);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const formattedHours = h % 12 || 12;
  return `${formattedHours}:${minutos} ${ampm}`;
};

const getStatusEmoji = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmada': return '✅';
    case 'pendiente': return '⏳';
    case 'cancelada': return '❌';
    default: return '📅';
  }
};

export default function CitasCalendar() {
  const { citas } = usePage<InertiaPageProps & { citas: Cita[] }>().props;
  const [calendarEvents, setCalendarEvents] = useState<FullCalendarEvent[]>([]);

  useEffect(() => {
    const formattedEvents: FullCalendarEvent[] = citas.map((cita) => ({
      id: cita.id.toString(),
      title: `${getStatusEmoji(cita.status)} ${cita.users?.name || 'Sin asignar'} - ${formatHora(cita.hora)}`,
      start: cita.hora
        ? `${cita.fecha}T${cita.hora}`
        : cita.fecha,
      className: getStatusClassName(cita.status),
      extendedProps: {
        cita: cita,
        status: cita.status,
        patientId: cita.patient_id
      }
    }));

    setCalendarEvents(formattedEvents);
  }, [citas]);

  // Función para mapear estado a clase de color
  const getStatusClassName = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'confirmada': return 'event-confirmed';
      case 'pendiente': return 'event-pending';
      case 'cancelada': return 'event-cancelled';
      default: return 'event-default';
    }
  };

  const getEventStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmada':
        return 'rounded bg-green-100 text-green-800 font-semibold';
      case 'pendiente':
        return 'rounded bg-yellow-100 text-yellow-800 font-semibold';
      case 'cancelada':
        return 'rounded bg-red-100 text-red-800 font-semibold line-through';
      default:
        return 'rounded bg-gray-100 text-gray-800';
    }
  };

  // Renderizador personalizado de eventos
  const renderEventContent = (eventInfo: any) => {
    const cita = eventInfo.event.extendedProps.cita;
    const usuario = cita.users;

    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="cursor-pointer text-sm text-gray-800 dark:text-neutral-100 bg-sky-400  rounded border-sky-600 w-full h-full">
            {eventInfo.event.title}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 bg-white shadow-lg rounded-lg">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Detalles de la Cita</h3>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium">
                {usuario?.rol === 'patient' ? 'Paciente:' : 'Profesional:'}
              </span>
              <span>{usuario?.name || 'No especificado'}</span>

              <span className="font-medium">Fecha:</span>
              <span>{cita.fecha}</span>

              <span className="font-medium">Hora:</span>
              <span>{cita.hora}</span>

              <span className="font-medium">Estado:</span>
              <span className={`font-bold ${getEventStyle(cita.status)}`}>
                {cita.status}
              </span>
            </div>
            {usuario?.email && (
              <div className="mt-2 text-sm text-gray-600">
                ✉️ {usuario.email}
              </div>
            )}
            {usuario?.telefono && (
              <div className="text-sm text-gray-600">
                📞 {usuario.telefono}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="calendar-container p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Calendario de Citas</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        locales={[esLocale]}
        locale="es"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        height="auto"
        eventContent={renderEventContent}
      />
    </div>
  );
}