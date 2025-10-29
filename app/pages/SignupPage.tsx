import React, { useState } from "react";
import { useNavigate } from "react-router";

interface FormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Define the test user to show in the alert
const TEST_USER = {
  email: "test@user.com",
  password: "password123",
};

const SignupPage: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({}); // Use Partial for errors
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = async () => {
    const newErrors: Partial<FormState> = {};
    if (!formState.fullName) {
      newErrors.fullName = "Full Name is required";
    }
    if (!formState.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formState.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    if (formState.password !== formState.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await validateForm();

    if (isValid) {
      // Show alert with test credentials
      alert(
        "Signup Successful!\n\nPlease use these test credentials to log in:\n\n" +
          `Email: ${TEST_USER.email}\n` +
          `Password: ${TEST_USER.password}`
      );
      // Redirect to the Login page
      navigate("/auth/login");
    }
  };

  return (
    <main className="bg-slate-100 text-slate-600">
      <div className="flex min-h-screen justify-center items-center mx-auto max-w-[1440px]">
        <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-slate-800">
            Create Your Resolv Account
          </h2>
          <p className="mb-6 text-sm text-center mt-3">
            start managing your tickets efficiently today!
          </p>

          {/* This is the critical fix! */}
          <form onSubmit={handleSignup}>
            {/* Full Name Field */}
            <div className="mb-4">
              <label className="text-slate-800" htmlFor="fullName">
                Full Name
              </label>
              <input
                name="fullName"
                onChange={handleChange}
                value={formState.fullName}
                className="w-full py-2 px-4 rounded-lg bg-gray-200 border-none mt-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                id="fullName"
                type="text"
                placeholder="John Doe"
              />
              <p className="text-red-500 text-sm h-4 mt-1">
                {errors.fullName && errors.fullName}
              </p>
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="text-slate-800" htmlFor="email">
                Email Address
              </label>
              <input
                name="email"
                onChange={handleChange}
                value={formState.email}
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
                value={formState.password}
                className="w-full py-2 px-4 rounded-lg bg-gray-200 border-none mt-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                id="password"
                type="password"
                placeholder="Minimum 8 characters"
              />
              <p className="text-red-500 text-sm h-4 mt-1">
                {errors.password && errors.password}
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label className="text-slate-800" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                onChange={handleChange}
                value={formState.confirmPassword}
                className="w-full py-2 px-4 rounded-lg bg-gray-200 border-none mt-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
              />
              <p className="text-red-500 text-sm h-4 mt-1">
                {errors.confirmPassword && errors.confirmPassword}
              </p>
            </div>

            <button
              className="bg-green-800 text-slate-100 py-2.5 px-4 rounded-lg mt-7 w-full hover:bg-green-900 transition-colors"
              type="submit"
            >
              Sign Up
            </button>
            <div className="mt-4 flex justify-center gap-1 items-center">
              <p>Already have an account?</p>
              <a className="text-green-800 font-bold" href="/auth/login">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;

