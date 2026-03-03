import { useState } from "react";
import { Shield, LogOut, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "./AuthModal";

interface TopBarProps {
  onAuthorityPanel: () => void;
}

const TopBar = ({ onAuthorityPanel }: TopBarProps) => {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState<"signin" | "signup" | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">DisasterAI</span>
          </div>

          {/* Desktop */}
          <div className="hidden items-center gap-3 sm:flex">
            {user ? (
              <>
                <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                {user.role === "authority" && (
                  <Button variant="outline" size="sm" onClick={onAuthorityPanel}>
                    Authority Panel
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="mr-1 h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => setShowAuth("signin")}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => setShowAuth("signup")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="sm:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="border-t border-border px-4 pb-3 sm:hidden">
            {user ? (
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-sm font-medium">{user.name}</span>
                {user.role === "authority" && (
                  <Button variant="outline" size="sm" onClick={() => { onAuthorityPanel(); setMobileMenu(false); }}>
                    Authority Panel
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => { logout(); setMobileMenu(false); }}>
                  <LogOut className="mr-1 h-4 w-4" /> Logout
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => { setShowAuth("signin"); setMobileMenu(false); }}>Sign In</Button>
                <Button size="sm" onClick={() => { setShowAuth("signup"); setMobileMenu(false); }}>Sign Up</Button>
              </div>
            )}
          </div>
        )}
      </header>

      {showAuth && <AuthModal mode={showAuth} onClose={() => setShowAuth(null)} onSwitch={(m) => setShowAuth(m)} />}
    </>
  );
};

export default TopBar;
