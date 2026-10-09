import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import AgenciesPage from './pages/AgenciesPage';
import UsersPage from './pages/UsersPage';
import LotsPage from './pages/LotsPage';
import EquipmentFormPage from './pages/EquipmentFormPage';
import EquipmentListPage from './pages/EquipmentListPage';
import DestinationsPage from './pages/DestinationsPage';
import ReportsPage from './pages/Reports';
import DashboardPage from './pages/DashboardPage';
import { perfisDaRota } from './auth/acesso';

function RotaProtegida({ path, children }) {
  return (
    <ProtectedRoute perfis={perfisDaRota(path)}>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route path="/" element={<RotaProtegida path="/"><DashboardPage /></RotaProtegida>} />
      <Route path="/agencias" element={<RotaProtegida path="/agencias"><AgenciesPage /></RotaProtegida>} />
      <Route path="/usuarios" element={<RotaProtegida path="/usuarios"><UsersPage /></RotaProtegida>} />
      <Route path="/lotes" element={<RotaProtegida path="/lotes"><LotsPage /></RotaProtegida>} />
      <Route path="/equipamentos/novo" element={<RotaProtegida path="/equipamentos/novo"><EquipmentFormPage /></RotaProtegida>} />
      <Route path="/equipamentos" element={<RotaProtegida path="/equipamentos"><EquipmentListPage /></RotaProtegida>} />
      <Route path="/destinacoes" element={<RotaProtegida path="/destinacoes"><DestinationsPage /></RotaProtegida>} />
      <Route path="/relatorios" element={<RotaProtegida path="/relatorios"><ReportsPage /></RotaProtegida>} />
      <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
    </Routes>
  );
}
