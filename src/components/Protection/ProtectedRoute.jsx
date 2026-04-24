import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export const KYCProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (user.kycStatus !== 'approved') {
        return <Navigate to="/dashboard/kyc" replace />;
    }

    return children;
};

export const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return children;
};
