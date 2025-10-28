import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Correct import path

interface FormState {
  email: string;
  password: string;
}

// Define a test user for simulation
const TEST_USER = {
  email: "test@user.com",
  password: "password123",
};

const LoginPage: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({}); // Use Partial for errors
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // Validation function for Login
  const validateForm = async () => {
    const newErrors: Partial<FormState> = {};

    // 1. Basic format checks
    if (!formState.email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (formState.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    // 2. Simulated Authentication Check (if basic checks pass)
    if (Object.keys(newErrors).length === 0) {
      if (
        formState.email !== TEST_USER.email ||
        formState.password !== TEST_USER.password
      ) {
        // Generic error for security
        newErrors.email = "Invalid email or password.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submission handler for Login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh
    const isValid = await validateForm();

    if (isValid) {
      // On success: set session and redirect
      localStorage.setItem("ticketapp_session", "valid_token_abc");
      navigate("/dashboard");
    }
  };

  return (
    <main className="bg-slate-100 text-slate-600">
      <div className="flex min-h-screen justify-center items-center mx-auto max-w-[1440px]">
        <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-slate-800">
            Welcome Back
          </h2>
          <p className="mb-6 text-sm text-center mt-3">
            Enter your email and password to access your account
          </p>

          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="text-slate-800" htmlFor="email">
                Email Address
              </label>
              <input
                name="email"
                onChange={handleChange}
                value={formState.email} // Add value for controlled component
                className="w-full py-2 px-4 rounded-lg bg-gray-200 border-none mt-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                id="email"
                type="email"
                placeholder="johndoe@example.com"
              />
              <p className="text-red-500 text-sm h-4 mt-1">
                {errors.email && errors.email}
              </p>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="text-slate-800" htmlFor="password">
                Password
              </label>
              <input
                name="password"
                onChange={handleChange}
                value={formState.password} // Add value for controlled component
                className="w-full py-2 px-4 rounded-lg bg-gray-200 border-none mt-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                id="password"
                type="password"
                placeholder="Minimum 8 characters"
              />
              <p className="text-red-500 text-sm h-4 mt-1">
                {errors.password && errors.password}
              </p>
            </div>

            <button
              className="bg-green-800 text-slate-100 py-2.5 px-4 rounded-lg mt-3 w-full hover:bg-green-900 transition-colors"
              type="submit"
            >
              Login
            </button>

            <div className="mt-4 flex justify-center gap-1 items-center">
              <p>{`Don't have an account?`}</p>
              <a className="text-green-700 font-bold" href="/auth/signup">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
