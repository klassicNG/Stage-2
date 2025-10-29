// app/types.ts
export interface Ticket {
  id: string;
  title: string;
  description?: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
}
