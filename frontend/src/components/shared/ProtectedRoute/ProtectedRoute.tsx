import { PageLoader } from '@/components/shared/PageLoader/PageLoader';
import { useAuth } from '@/hooks/useAuth';
import { ROUTE_PATHS } from '@routes/routePaths';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <PageLoader />;
  if (!user) return <Navigate to={ROUTE_PATHS.HOME} replace />;

  return children;
};

export default ProtectedRoute;
