import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Index Route (Homepage)
  index("routes/home.tsx"), // Uses your LandingPage

  // Authentication Routes
  route("auth/login", "routes/auth.login.tsx"), // Defines /auth/login
  route("auth/signup", "routes/auth.signup.tsx"), // Defines /auth/signup

  // Protected Routes (Assuming you create these route files)
  route("dashboard", "routes/dashboard.tsx"), // Defines /dashboard
  route("tickets/manage", "routes/tickets.manage.tsx"), // Defines /tickets/manage

  // Add any other top-level routes here if needed
] satisfies RouteConfig;
