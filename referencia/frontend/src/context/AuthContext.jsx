import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const AUTH_EXPIRED_EVENT = 'ecotrack-auth-expired';

function clearStoredAuth() {
  localStorage.removeItem('ecotrack-token');
  localStorage.removeItem('token');
  localStorage.removeItem('ecotrack-user');
  localStorage.removeItem('usuario');
}

function getStoredToken() {
  return localStorage.getItem('ecotrack-token') || localStorage.getItem('token') || '';
}

function getStoredUser() {
  const raw =
    localStorage.getItem('ecotrack-user') || localStorage.getItem('usuario');

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    clearStoredAuth();
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(getStoredToken);

  const login = (data) => {
    setToken(data.token);
    setUser(data.usuario);

    localStorage.setItem('ecotrack-token', data.token);
    localStorage.setItem('token', data.token);

    localStorage.setItem('ecotrack-user', JSON.stringify(data.usuario));
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
  };

  const logout = () => {
    setToken('');
    setUser(null);

    clearStoredAuth();
  };

  useEffect(() => {
    function handleAuthExpired() {
      setToken('');
      setUser(null);
    }

    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);

    return () => {
      window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
    };
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
