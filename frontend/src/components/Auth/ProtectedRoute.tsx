import { useRouter } from 'next/router';
import { useGlobalContext } from '../../Context/GlobalContext';
import { useAuth } from '../../Context/AuthContext';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user: globalUser, loading: globalLoading } = useGlobalContext();
  const { jwtToken, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!globalLoading && !authLoading && (!globalUser || !jwtToken)) {
      router.push('/login');
    } else if (!globalLoading && !authLoading && globalUser && !globalUser.email?.endsWith('.edu')) {
      router.push('/login?error=edu-email-required');
    }
  }, [globalUser, jwtToken, globalLoading, authLoading, router]);

  if (globalLoading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!globalUser || !jwtToken || !globalUser.email?.endsWith('.edu')) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 