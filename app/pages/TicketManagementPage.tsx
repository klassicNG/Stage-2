import React, { useState } from "react";
import Navbar from "~/components/Navbar"; // Your existing Navbar
import Footer from "~/components/Footer"; // Your existing Footer
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

// --- 1. DEFINE TICKET DATA STRUCTURE (from task requirements) ---
export interface Ticket {
  id: string;
  title: string;
  description?: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
}

// --- MOCK DATA FOR SIMULATION ---
const MOCK_TICKETS: Ticket[] = [
  {
    id: "TKT-001",
    title: "Website login form is broken",
    description:
      "Users are reporting they cannot log in. The submit button is disabled.",
    status: "in_progress",
    priority: "high",
  },
  {
    id: "TKT-002",
    title: "Update homepage copy",
    description: "Marketing needs the new tagline added to the hero section.",
    status: "open",
    priority: "medium",
  },
  {
    id: "TKT-003",
    title: "Server migration",
    description: "Migrate all services from AWS to Azure.",
    status: "closed",
    priority: "low",
  },
];

// --- 2. TICKET CARD COMPONENT (Can be in a new file) ---
// This is the reusable card for the "Read" view
interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onEdit,
  onDelete,
}) => {
  // Get colors based on task requirements
  const statusColors = {
    open: "bg-green-100 text-green-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    closed: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[ticket.status]}`}
          >
            {ticket.status.replace("_", " ")}
          </span>
          <span className="text-sm text-gray-500 font-medium">{ticket.id}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{ticket.title}</h3>
        <p className="text-slate-600 text-sm mb-4">
          {ticket.description || "No description provided."}
        </p>
      </div>
      <div className="flex justify-between items-center border-t pt-4">
        <span className="text-sm font-medium capitalize">
          Priority: {ticket.priority}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(ticket)}
            className="text-blue-600 hover:text-blue-800"
            aria-label="Edit ticket"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(ticket)}
            className="text-red-600 hover:text-red-800"
            aria-label="Delete ticket"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 3. MAIN PAGE COMPONENT ---
const TicketManagementPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);

  // State for modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State for tracking the ticket being C/U/D
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);

  // --- CRUD FUNCTIONS ---

  // C: Open modal for creating
  const handleOpenCreate = () => {
    setCurrentTicket(null); // Clear ticket to signal "Create" mode
    setIsModalOpen(true);
  };

  // U: Open modal for updating
  const handleOpenEdit = (ticket: Ticket) => {
    setCurrentTicket(ticket); // Set ticket to signal "Edit" mode
    setIsModalOpen(true);
  };

  // D: Open confirmation modal
  const handleOpenDelete = (ticket: Ticket) => {
    setCurrentTicket(ticket);
    setIsDeleteModalOpen(true);
  };

  // --- This would be your <TicketFormModal> component ---
  const handleSaveTicket = (formData: Omit<Ticket, "id">) => {
    // This is where you'd validate the formData

    if (currentTicket) {
      // UPDATE logic
      setTickets(
        tickets.map((t) =>
          t.id === currentTicket.id ? { ...t, ...formData } : t
        )
      );
    } else {
      // CREATE logic
      const newTicket: Ticket = {
        ...formData,
        id: `TKT-${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
      };
      setTickets([newTicket, ...tickets]);
    }
    setIsModalOpen(false);
    setCurrentTicket(null);
  };

  // --- This would be your <DeleteConfirmModal> component ---
  const handleConfirmDelete = () => {
    if (!currentTicket) return;

    // DELETE logic
    setTickets(tickets.filter((t) => t.id !== currentTicket.id));

    setIsDeleteModalOpen(false);
    setCurrentTicket(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={true} />

      {/* Main Content Area - Dark background as shown */}
      <main className="flex-grow bg-slate-900 text-white">
        {/* Centered Content Container */}
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Manage Tickets</h1>
            <button
              onClick={handleOpenCreate}
              className="bg-green-700 text-white py-2 px-5 rounded-lg font-semibold hover:bg-green-800 transition-colors flex items-center gap-2"
            >
              <FaPlus />
              Create New Ticket
            </button>
          </div>

          {/* "Read" View: Ticket Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* --- MODALS --- */}
      {/* We are simulating the modals from your design. In a real app, these would be separate components. */}

      {/* Create/Edit Modal (Simplified) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white text-slate-900 p-8 rounded-lg shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              {currentTicket
                ? `Edit Ticket #${currentTicket.id}`
                : "Create New Ticket"}
            </h2>
            {/* This would be a full form component, but we are just showing the shell.
              You would pass `handleSaveTicket` as the onSubmit prop.
            */}
            <p>This is where the ticket form for Create/Edit would go.</p>
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveTicket(/* pass form data */)}
                className="bg-green-700 text-white py-2 px-4 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (Matches design) */}
      {isDeleteModalOpen && currentTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white text-slate-900 p-8 rounded-lg shadow-2xl w-full max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">
              Are you absolutely sure?
            </h2>
            <p className="text-slate-600 mb-6">
              This action cannot be undone. This will permanently delete the
              ticket:
              <br />
              <strong className="font-medium">{currentTicket.title}</strong>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white py-2 px-6 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketManagementPage;
