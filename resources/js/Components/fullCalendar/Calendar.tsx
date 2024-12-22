import { useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { formatDate, formatHora, getEventStyle, getStatusEmoji, getStatusClassName } from '@/Components/utils/dateUtils';
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import './estilos.css';
import { Cita } from '@/types';

interface CalendarProps {
  citas: Cita[];
}

const CitasCalendar:React.FC<CalendarProps> = ({
  citas
}) => {
  
  const calendarEvents = useMemo(() => {
    return citas.map((cita) => ({
      id: cita.id.toString(),
      title: `${getStatusEmoji(cita.status)} ${cita.users.name} `,
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
          <div className="cursor-pointer text-sm text-gray-800 dark:text-neutral-100 bg-sky-200  rounded border-sky-600 w-full h-full">
            {eventInfo.event.title}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 bg-white shadow-lg rounded-lg">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Detalles de la Cita</h3>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium">
                {'Paciente:'}
              </span>
              <span>{usuario?.name || 'No especificado'}</span>

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