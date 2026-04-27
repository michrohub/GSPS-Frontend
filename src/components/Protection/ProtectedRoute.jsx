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

export const TermsProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return null;

    // Only students need to accept terms
    if (user && user.role === 'student' && !user.termsAccepted) {
        // If not on terms page, redirect to terms page
        if (location.pathname !== '/dashboard/terms') {
            return <Navigate to="/dashboard/terms" replace />;
        }
    }

    return children;
};
