import { useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { formatDate, formatHora, getEventStyle, getStatusEmoji, getStatusClassName } from '@/Components/utils/dateUtils';
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import './estilos.css';
import { Cita, Servicio } from '@/types';


interface CalendarProps {
  citas: Cita[];
}

const CitasCalendar: React.FC<CalendarProps> = ({
  citas
}) => {
  // Configuración de eventos para el calendario  
  const calendarEvents = useMemo(() => {
    return citas.map((cita) => ({
      id: cita.id.toString(),
      title: `${getStatusEmoji(cita.status)} ${cita.patient.name || 'Paciente sin nombre'}`,
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
  }, [citas]);

  // Renderizador personalizado de eventos
  const renderEventContent = (eventInfo: any) => {
    const cita = eventInfo.event.extendedProps.cita;
    const usuario = cita.users;

    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="cursor-pointer text-sm text-gray-800 dark:text-neutral-100 dark:bg-sky-400  rounded border-sky-600 w-full h-full">
            {eventInfo.event.title}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 bg-white shadow-lg rounded-lg">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Detalles de la Cita</h3>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium">Paciente:</span>
              <span>{cita.patient?.name || 'No especificado'}</span>

              <span className="font-medium">Dentista:</span>
              <span>{cita.doctor?.name || 'No especificado'}</span>

              <span className="font-medium">Servicio(s):</span>
              {cita.servicio && cita.servicio.length > 0 ? (
                <span className="text-base font-medium text-gray-900">
                  {cita.servicio.map((servicio: Servicio) => servicio.value).join(", ")}
                </span>
              ) : (
                <p className="text-lg font-medium text-gray-900">No especificado</p>
              )}
              <span className="font-medium">Fecha:</span>
              <span>{formatDate(cita.fecha)}</span>

              <span className="font-medium">Hora:</span>
              <span>{formatHora(cita.hora)}</span>

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
          {!!cita.is_emergency && (
            <div className=" bg-red-100 border border-red-500 text-red-700 rounded-lg w-full flex items-center p-1 p md:p-2 mt-3 shadow-md animate-pulse">
              <span className="flex items-center font-bold">
                <svg className="w-5 h-5 mr-2 text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-9-4a1 1 0 112 0v4a1 1 0 01-2 0V6zm1 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clipRule="evenodd" />
                </svg>
                Cita urgente
              </span>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="calendar-container p-4 bg-white shadow-md rounded-lg w-full max-w-screen-lg mx-auto overflow-auto">
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

export default CitasCalendar;