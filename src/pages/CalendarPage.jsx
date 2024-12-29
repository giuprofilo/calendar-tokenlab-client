import React from "react";
import FullCalendar from "@fullcalendar/react"; // Importa o adaptador React
import dayGridPlugin from "@fullcalendar/daygrid"; // Importa o plugin DayGrid

function CalendarPage() {
  return (
    <div>
      <h1>Meu Calendário</h1>
      <FullCalendar
        plugins={[dayGridPlugin]} // Carrega o plugin DayGrid
        initialView="dayGridMonth" // Define a visão inicial como mensal
        events={[
          { title: "Evento 1", date: "2024-01-01" },
          { title: "Evento 2", date: "2024-01-07" },
        ]}
      />
    </div>
  );
}

export default CalendarPage;
