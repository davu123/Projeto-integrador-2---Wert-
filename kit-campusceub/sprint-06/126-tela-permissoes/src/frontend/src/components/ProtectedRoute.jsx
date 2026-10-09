import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, perfis }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (perfis && perfis.length > 0 && !perfis.includes(user?.perfil)) {
    if (location.pathname === '/') {
      return <Navigate to="/login" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}
