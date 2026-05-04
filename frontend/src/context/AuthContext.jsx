import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('ecotrack-token') || '');
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('ecotrack-user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = (data) => {
    setToken(data.token);
    setUser(data.usuario);
    localStorage.setItem('ecotrack-token', data.token);
    localStorage.setItem('ecotrack-user', JSON.stringify(data.usuario));
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('ecotrack-token');
    localStorage.removeItem('ecotrack-user');
  };

  const value = useMemo(() => ({ token, user, isAuthenticated: Boolean(token), login, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
