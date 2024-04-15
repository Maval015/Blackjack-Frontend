import { createContext, useEffect, useMemo, useState } from "react";

type UserContext = {
  user: string | null;
  setUser: (user: string | null) => void;
};

export const UserAuthContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
});

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (!localUser && user !== null) {
      localStorage.setItem("user", user);
    }
  }, [user])

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(localUser);
    }
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
}
