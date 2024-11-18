import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={false}
      events={[
        { title: 'event 1', date: '2024-11-01' },
        { title: 'event 2', date: '2024-11-12' }
      ]}
    />
  )
}
