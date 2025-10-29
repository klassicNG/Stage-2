import React, { useState, useEffect } from "react";
// Import the Ticket type from the main page
import type { Ticket } from "~/types"; // Import from the new types file

// --- 1. Define Component Props ---
interface TicketFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ticketData: Omit<Ticket, "id">) => void; // Send back data without ID
  initialData: Ticket | null; // Null for Create, Ticket object for Edit
}

// --- Define the shape of the form state (subset of Ticket) ---
interface TicketFormData {
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
}

// --- Define the shape of the error state ---
type FormErrors = Partial<Record<keyof TicketFormData, string>>;

// --- 2. The Modal Component ---
const TicketFormModal: React.FC<TicketFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  // --- State for form fields ---
  const [formData, setFormData] = useState<TicketFormData>({
    title: "",
    description: "",
    status: "open", // Default status
    priority: "low", // Default priority
  });

  // --- State for validation errors ---
  const [errors, setErrors] = useState<FormErrors>({});

  // --- Effect to pre-fill form when editing ---
  useEffect(() => {
    if (initialData) {
      // Editing: Fill form with existing ticket data
      setFormData({
        title: initialData.title,
        description: initialData.description || "", // Handle optional description
        status: initialData.status,
        priority: initialData.priority,
      });
    } else {
      // Creating: Reset form to defaults
      setFormData({
        title: "",
        description: "",
        status: "open",
        priority: "low",
      });
    }
    // Clear errors when modal opens or initialData changes
    setErrors({});
  }, [initialData, isOpen]); // Rerun when these change

  // --- Handle input changes ---
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear the specific error when the user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // --- Validate the form ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Title is mandatory (Requirement)
    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    // Status is mandatory and must be one of the allowed values (Requirement)
    if (!formData.status) {
      newErrors.status = "Status is required.";
    } else if (!["open", "in_progress", "closed"].includes(formData.status)) {
      newErrors.status = 'Status must be "open", "in_progress", or "closed".';
    }

    // Description length validation (Optional field, but validate if present)
    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // --- Handle form submission ---
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh
    if (validateForm()) {
      // If valid, call the onSubmit prop passed from the parent page
      onSubmit(formData);
    }
  };

  // --- Render nothing if modal is not open ---
  if (!isOpen) {
    return null;
  }

  // --- 3. Modal JSX ---
  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      {/* Modal Content */}
      <div className="bg-white text-slate-900 p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          aria-label="Close modal"
        >
          &times; {/* Simple 'X' character */}
        </button>

        <h2 className="text-2xl font-bold mb-1 text-slate-800">
          {initialData ? `Edit Ticket #${initialData.id}` : "Create New Ticket"}
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Make changes to your ticket here. Click save when you're done.
        </p>

        {/* --- Form --- */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Title Field */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full py-2 px-3 rounded-md bg-gray-100 border ${errors.title ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-700`}
              required
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full py-2 px-3 rounded-md bg-gray-100 border ${errors.description ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-700`}
              placeholder="Provide more details about the issue..."
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Status Field */}
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full py-2 px-3 rounded-md bg-gray-100 border ${errors.status ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-700`}
              required
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">{errors.status}</p>
            )}
          </div>

          {/* Priority Field */}
          <div className="mb-6">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full py-2 px-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {/* No specific errors shown for priority in design */}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 border-t pt-6">
            <button
              type="button" // Important: Prevent form submission
              onClick={onClose}
              className="py-2 px-5 rounded-md text-slate-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-700 text-white py-2 px-5 rounded-md font-semibold hover:bg-green-800 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketFormModal;
