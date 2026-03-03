import { useState, createContext, useContext, ReactNode } from "react";
import { User, UserRole, AuthorityRole } from "@/data/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (data: SignupData) => boolean;
  logout: () => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  authorityRole?: AuthorityRole;
  location?: string;
  contact?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: (User & { password: string })[] = [
  { name: "Admin Authority", email: "admin@demo.com", password: "demo", role: "authority", authorityRole: "Police", location: "Mumbai", contact: "+91-9999999999", isAvailable: true },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const found = DEMO_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  };

  const signup = (data: SignupData) => {
    if (DEMO_USERS.find((u) => u.email === data.email)) return false;
    const newUser: User = {
      name: data.name,
      email: data.email,
      role: data.role,
      authorityRole: data.authorityRole,
      location: data.location,
      contact: data.contact,
      isAvailable: data.role === "authority" ? true : undefined,
    };
    DEMO_USERS.push({ ...newUser, password: data.password });
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
