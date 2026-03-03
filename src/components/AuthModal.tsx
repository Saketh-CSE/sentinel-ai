import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { UserRole, AuthorityRole } from "@/data/types";

interface AuthModalProps {
  mode: "signin" | "signup";
  onClose: () => void;
  onSwitch: (mode: "signin" | "signup") => void;
}

const AUTHORITY_ROLES: AuthorityRole[] = ["Doctor", "Police", "Fire", "Rescue", "Volunteer"];

const AuthModal = ({ mode, onClose, onSwitch }: AuthModalProps) => {
  const { login, signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userRole, setUserRole] = useState<UserRole>("general");
  const [authorityRole, setAuthorityRole] = useState<AuthorityRole>("Doctor");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signin") {
      if (!login(email, password)) {
        setError("Invalid credentials. Try admin@demo.com / demo");
      } else {
        onClose();
      }
    } else {
      if (!name || !email || !password) {
        setError("Please fill all required fields");
        return;
      }
      const success = signup({
        name,
        email,
        password,
        role: userRole,
        authorityRole: userRole === "authority" ? authorityRole : undefined,
        location: userRole === "authority" ? location : undefined,
        contact: userRole === "authority" ? contact : undefined,
      });
      if (!success) {
        setError("Email already registered");
      } else {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={onClose}>
      <div className="card-elevated mx-4 w-full max-w-md rounded-xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{mode === "signin" ? "Sign In" : "Sign Up"}</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted"><X className="h-5 w-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <div>
                <Label>Full Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
              </div>
              <div>
                <Label>Account Type</Label>
                <div className="mt-1 flex gap-2">
                  {(["general", "authority"] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setUserRole(r)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${userRole === r ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"}`}
                    >
                      {r === "general" ? "General User" : "Emergency Authority"}
                    </button>
                  ))}
                </div>
              </div>
              {userRole === "authority" && (
                <>
                  <div>
                    <Label>Role</Label>
                    <select
                      value={authorityRole}
                      onChange={(e) => setAuthorityRole(e.target.value as AuthorityRole)}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                    >
                      {AUTHORITY_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, State" />
                  </div>
                  <div>
                    <Label>Contact Info</Label>
                    <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="+91-XXXXXXXXXX" />
                  </div>
                </>
              )}
            </>
          )}

          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full">{mode === "signin" ? "Sign In" : "Create Account"}</Button>

          <p className="text-center text-sm text-muted-foreground">
            {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button type="button" className="font-medium text-primary hover:underline" onClick={() => onSwitch(mode === "signin" ? "signup" : "signin")}>
              {mode === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </p>

          {mode === "signin" && (
            <p className="text-center text-xs text-muted-foreground">Demo: admin@demo.com / demo</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
