import React, { useState, useEffect, useContext } from "react";
import FullCalendar from "@fullcalendar/react"; // Importa o adaptador React
import dayGridPlugin from "@fullcalendar/daygrid"; // Importa o plugin DayGrid
import interactionPlugin from "@fullcalendar/interaction"; // Importa o plugin de interação
import Modal from "react-modal";
import "../styles/CalendarPageStyle.css";
import api from "../axios/api";
import { AuthContext } from "../contexts/AuthContext";

Modal.setAppElement("#root");

function CalendarPage() {
  const { isLoggedIn } = useContext(AuthContext); // Obtem o status de login

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [form, setForm] = useState({
    description: "",
    startTime: "",
    endTime: "",
  });
  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchEvents(); // Busca eventos apenas se o usuário estiver logado
    }
  }, [isLoggedIn]);

  // Função para buscar eventos
  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  // Abrir modal ao clicar no dia
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr); // Define a data selecionada
    setIsModalOpen(true);
  };

  // Fechar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setForm({ description: "", startTime: "", endTime: "" });
  };

  // Atualizar campos do formulário
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Criar evento
  const handleCreateEvent = async () => {
    try {
      const dateStart = new Date(`${selectedDate}T${form.startTime}`);
      const dateEnd = new Date(`${selectedDate}T${form.endTime}`);

      const response = await api.post("/event/create", {
        description: form.description,
        dateStart,
        dateEnd,
      });

      // Atualizar lista de eventos
      setEvents([...events, response.data]);
      closeModal();
    } catch (error) {
      console.error("Erro ao criar evento:", error);
    }
  };

  // Exibir detalhes do evento
  const handleEventClick = (event) => {
    setEventDetails(event);
  };

  return (
    <div className="flex">
      {/* Calendário */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Meu Calendário</h1>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]} // Adiciona o plugin de interação
          initialView="dayGridMonth"
          dateClick={handleDateClick} // Registra o evento de clique
          events={events.map((event) => ({
            title: event.description,
            start: event.dateStart,
            end: event.dateEnd,
          }))}
        />
      </div>

      {/* Lista de eventos */}
      <div className="w-1/3 ml-4">
        <h2 className="text-xl font-bold mb-2">Eventos</h2>
        <ul>
          {events.map((event) => (
            <li
              key={event._id}
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => handleEventClick(event)}
            >
              {event.description} - {new Date(event.dateStart).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      {/* Modal para criar evento */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Criar Evento"
        className="modal-content bg-white p-4 rounded shadow-md max-w-md mx-auto mt-20"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">Criar Evento</h2>
        <div className="mb-2">
          <label className="block mb-1">Descrição:</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Hora de Início:</label>
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Hora de Término:</label>
          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
        </div>
        <button
          onClick={handleCreateEvent}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Criar Evento
        </button>
      </Modal>

      {/* Modal para detalhes do evento */}
      {eventDetails && (
        <Modal
          isOpen={!!eventDetails}
          onRequestClose={() => setEventDetails(null)}
          contentLabel="Detalhes do Evento"
          className="bg-white p-4 rounded shadow-md max-w-md mx-auto mt-20"
        >
          <h2 className="text-xl font-bold mb-4">{eventDetails.description}</h2>
          <p>Data: {new Date(eventDetails.dateStart).toLocaleDateString()}</p>
          <p>
            Horário: {new Date(eventDetails.dateStart).toLocaleTimeString()} -{" "}
            {new Date(eventDetails.dateEnd).toLocaleTimeString()}
          </p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => setEventDetails(null)}
          >
            Fechar
          </button>
        </Modal>
      )}
    </div>
  );
}

export default CalendarPage;
