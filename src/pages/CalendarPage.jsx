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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
      fetchUserEvents(); // Busca eventos apenas se o usuário estiver logado
    }
  }, [isLoggedIn]);

  // Função para buscar eventos
  // const fetchEvents = async () => {
  //   try {
  //     const response = await api.get("/events");
  //     setEvents(response.data);
  //   } catch (error) {
  //     console.error("Erro ao buscar eventos:", error);
  //   }
  // };

  //Função para buscar eventos do usuario
  const fetchUserEvents = async () => {
    try {
      const response = await api.get("/user/profile"); // Rota que retorna o perfil do usuário com eventos
      setEvents(response.data.eventos); // Atualiza o estado com os eventos do usuário
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      alert("Erro ao carregar eventos. Tente novamente mais tarde.");
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
      // Exibir mensagem de sucesso
      alert("Evento criado com sucesso!");
      closeModal();
    } catch (error) {
      alert("Não é possível criar mais de um evento no mesmo horário.");
      console.error("Erro ao criar evento:", error);
    }
  };

  // Exibir detalhes do evento
  const handleEventClick = (event) => {
    setEventDetails(event);
    setForm({
      description: event.description,
      startTime: new Date(event.dateStart).toISOString().substr(11, 5),
      endTime: new Date(event.dateEnd).toISOString().substr(11, 5),
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEventDetails(null);
    setForm({ description: "", startTime: "", endTime: "" });
  };

  const handleEditEvent = async () => {
    try {
      const dateStart = new Date(
        `${eventDetails.dateStart.substr(0, 10)}T${form.startTime}`
      );
      const dateEnd = new Date(
        `${eventDetails.dateEnd.substr(0, 10)}T${form.endTime}`
      );

      const response = await api.put(`/event/edit/${eventDetails._id}`, {
        description: form.description,
        dateStart,
        dateEnd,
      });

      setEvents(
        events.map((event) =>
          event._id === eventDetails._id ? response.data : event
        )
      );
      closeEditModal();
      alert("Evento editado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar evento:", error);
      alert("Erro ao editar o evento. Tente novamente mais tarde.");
    }
  };

  // const handleDeleteEvent = async (eventId) => {
  //   if (window.confirm("Tem certeza que deseja excluir este evento?")) {
  //     try {
  //       await api.delete(`/event/delete/${eventId}`);
  //       setEvents(events.filter((event) => event._id !== eventId)); // Atualiza a lista de eventos
  //       setEventDetails(null); // Fecha o modal
  //       alert("Evento excluído com sucesso!");
  //     } catch (error) {
  //       console.error("Erro ao excluir evento:", error);
  //       alert("Erro ao excluir o evento. Tente novamente mais tarde.");
  //     }
  //   }
  // };

  const handleDeleteEvent = async () => {
    if (window.confirm("Tem certeza que deseja excluir este evento?")) {
      try {
        await api.delete(`/event/delete/${eventDetails._id}`);
        setEvents(events.filter((event) => event._id !== eventDetails._id));
        closeEditModal();
        alert("Evento excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir evento:", error);
        alert("Erro ao excluir o evento. Tente novamente mais tarde.");
      }
    }
  };
  return (
    <div className="flex">
      {/* Calendário */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Meu Calendário</h1>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]} // Adiciona o plugin de interação
          initialView="dayGridMonth"
          dateClick={handleDateClick} // Registra o evento de clique
          events={events.map((event) => ({
            title: event.description,
            start: event.dateStart,
            end: event.dateEnd,
            extendedProps: event,
          }))}
          eventClick={(info) => handleEventClick(info.event.extendedProps)}
        />
      </div>

      {/* Lista de eventos */}
      <div className="w-1/3 p-6">
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
            required
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
            required
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
            required
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
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          contentLabel="Editar Evento"
          className="modal-content bg-white p-4 rounded shadow-md max-w-md mx-auto mt-20"
          overlayClassName="modal-overlay"
        >
          <h2 className="text-xl font-bold mb-4">Editar Evento</h2>
          <div className="mb-2">
            <label className="block mb-1">Descrição:</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
              required
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
              required
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
              required
            />
          </div>
          <button
            onClick={handleEditEvent}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 mr-2"
          >
            Salvar
          </button>
          <button
            onClick={handleDeleteEvent}
            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
          >
            Excluir
          </button>
        </Modal>
      )}
    </div>
  );
}

export default CalendarPage;
