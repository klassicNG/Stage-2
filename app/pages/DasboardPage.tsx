import React from "react";
import Navbar from "~/components/Navbar"; // Import your existing Navbar
import Footer from "~/components/Footer"; // Import your existing Footer
import {
  FaTicketAlt,
  FaComments,
  FaSpinner,
  FaCheckCircle,
  FaTasks,
} from "react-icons/fa";

// This is a new component for the stat cards to keep the code clean (DRY)
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color }) => {
  return (
    <div className="bg-white text-slate-900 p-6 rounded-xl shadow-lg flex flex-col">
      <div className={`text-3xl mb-3 ${color}`}>{icon}</div>
      <p className="text-slate-600 text-sm">{title}</p>
      <p className="text-4xl font-bold mt-1">{value}</p>
    </div>
  );
};

// The main Dashboard Page component
const DashboardPage: React.FC = () => {
  return (
    // Note: We pass `isLoggedIn={true}` to our existing Navbar
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={true} />

      {/* Main Content Area - Dark background as shown in your design */}
      <main className="flex-grow bg-slate-900 text-white">
        {/* Centered Content Container */}
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

          {/* 4-Column Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={<FaTicketAlt />}
              title="Total Tickets"
              value="2,350"
              color="text-blue-500" // You can change these colors
            />
            <StatCard
              icon={<FaComments />}
              title="Open Tickets"
              value="450"
              color="text-green-500"
            />
            <StatCard
              icon={<FaSpinner />}
              title="In Progress"
              value="210"
              color="text-yellow-500"
            />
            <StatCard
              icon={<FaCheckCircle />}
              title="Closed"
              value="1,690"
              color="text-gray-500"
            />
          </div>

          {/* Manage Tickets CTA Button */}
          <div className="text-center mt-12">
            <button className="bg-green-700 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-green-800 transition-colors">
              <FaTasks className="inline-block mr-2" />
              Manage Tickets
            </button>
          </div>
        </div>
      </main>

      {/* Re-using the consistent footer as required by the task */}
      <Footer />
    </div>
  );
};

export default DashboardPage;
