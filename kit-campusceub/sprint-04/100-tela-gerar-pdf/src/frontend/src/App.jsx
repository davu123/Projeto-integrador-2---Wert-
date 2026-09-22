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

function HomePlaceholder() {
  return (
    <>
      <h1>EcoTrack Wert</h1>
      <p>Área autenticada. Use o menu para cadastrar agências, usuários, lotes, equipamentos, destinação e relatórios.</p>
    </>
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
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <HomePlaceholder />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/agencias"
        element={
          <ProtectedRoute>
            <Layout>
              <AgenciesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/usuarios"
        element={
          <ProtectedRoute>
            <Layout>
              <UsersPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/lotes"
        element={
          <ProtectedRoute>
            <Layout>
              <LotsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/equipamentos/novo"
        element={
          <ProtectedRoute>
            <Layout>
              <EquipmentFormPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/equipamentos"
        element={
          <ProtectedRoute>
            <Layout>
              <EquipmentListPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/destinacoes"
        element={
          <ProtectedRoute>
            <Layout>
              <DestinationsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/relatorios"
        element={
          <ProtectedRoute>
            <Layout>
              <ReportsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
    </Routes>
  );
}
