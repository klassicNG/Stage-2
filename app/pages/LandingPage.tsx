import React from "react";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import { Link } from "react-router";
import { FaCog, FaBolt, FaShieldAlt } from "react-icons/fa";

const LandingPage: React.FC = () => {
  return (
    <main className="bg-slate-50 text-slate-800 font-sans">
      {/* Navbar */}
      <Navbar isLoggedIn={false} />
      {/* Header */}
      <header className="relative bg-gradient-to-b from-green-100 to-green-50">
        {/* Wavy seperator */}
        <div className="absolute bottom-0 w-full z-0">
          <img
            src="../assets/wave.svg"
            alt="Wavy separator"
            className="w-full"
          />
        </div>
        {/* Container */}
        <div className="relative max-w-[1440px] mx-auto px-6 py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-4">
          {/* Decorative Circles */}
          <div className="absolute w-24 h-24 bg-green-300 rounded-full top-10 left-6 blur-lg opacity-60"></div>
          <div className="absolute w-20 h-20 bg-green-300 rounded-full bottom-30 lg:bottom-60 right-8 blur-lg opacity-50"></div>

          {/* LEFT SIDE: Text & Buttons */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2 lg:ml-28 gap-5 z-10">
            {/* Brand first */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-800 tracking-tight">
              Resolv
            </h1>

            {/* Tagline */}
            <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-md">
              Get it done. Resolve issues, fast. No waiting, no stress — just
              results.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {/* "Get Started" links to Signup */}
              <Link
                to="/auth/signup"
                className="bg-green-800 hover:bg-green-900 text-white py-2.5 px-6 rounded-lg shadow-sm transition-all duration-200 text-center" // Added text-center for consistency
              >
                Get Started
              </Link>
              {/* "Login" links to Login */}
              <Link
                to="/auth/login"
                className="bg-white border border-green-800 text-green-800 py-2.5 px-6 rounded-lg hover:bg-green-50 transition-all duration-200 text-center" // Added text-center
              >
                Login
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: Hero Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end lg:mr-28 z-10">
            <img
              src="../assets/hero-img.png"
              alt="Hero illustration"
              className="w-60 sm:w-72 md:w-[380px] lg:w-[420px] object-contain drop-shadow-md"
            />
          </div>
        </div>
      </header>
      <section
        id="features"
        className="max-w-[1440px] mx-auto px-6 py-16 mt-10"
      >
        <h2 className="font-bold text-3xl text-center w-full">
          Streamline Your Workflow
        </h2>
        {/* Features */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center p-8">
          <div className="bg-white p-6 rounded-lg shadow-md w-full flex flex-col mx-auto items-center hover:shadow-lg transition-shadow duration-200">
            <div className="text-green-800 text-7xl mb-4">
              <FaCog />{" "}
            </div>
            <h3 className="font-semibold text-xl mb-2">
              Effortless Management
            </h3>
            <p className="text-slate-600 w-60 px-4">
              Organize, track, and prioritize tickets with an intuitive
              interface designed for maximum efficiency.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-full flex flex-col mx-auto items-center hover:shadow-lg transition-shadow duration-200">
            <div className="text-green-800 text-7xl mb-4">
              <FaBolt />{" "}
            </div>
            <h3 className="font-semibold text-xl mb-2">Rapid Resolution</h3>
            <p className="text-slate-600 w-60 px-4">
              Speed up your support process with quick access to ticket details
              and collaborative tools.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-full flex flex-col md:mx-[50%] lg:mx-auto items-center hover:shadow-lg transition-shadow duration-200">
            <div className="text-green-800 text-7xl mb-4">
              <FaShieldAlt />{" "}
            </div>
            <h3 className="font-semibold text-xl mb-2">Secure & Reliable</h3>
            <p className="text-slate-600 w-60 px-4">
              Ensure your data is safe with robust security measures and a
              dependable platform.
            </p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer id="contact" />
    </main>
  );
};

export default LandingPage;
