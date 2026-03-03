export type Severity = "normal" | "warning" | "critical";
export type SystemStatus = "normal" | "warning" | "critical";
export type UserRole = "general" | "authority";
export type AuthorityRole = "Doctor" | "Police" | "Fire" | "Rescue" | "Volunteer";

export interface User {
  name: string;
  email: string;
  role: UserRole;
  authorityRole?: AuthorityRole;
  location?: string;
  contact?: string;
  isAvailable?: boolean;
}
