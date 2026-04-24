import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout.jsx";
import DashboardLayout from "../Layout/DashboardLayout.jsx";

// Public Pages
import Home from "../pages/Home/Home.jsx";
import About from "../pages/About/About.jsx";
import HowItWorks from "../pages/HowItWorks/HowItWorks.jsx";
import Support from "../pages/Support/Support.jsx";
import Calculator from "../pages/Calculator/Calculator.jsx";
import Login from "../pages/Auth/Login.jsx";
import Signup from "../pages/Auth/Signup.jsx";
import OTPVerification from "../pages/Auth/OTPVerification.jsx";

// Dashboard Pages
import Overview from "../pages/Dashboard/Overview/Overview.jsx";
import KYCForm from "../pages/Dashboard/KYC/KYCForm.jsx";
import Payments from "../pages/Dashboard/Payments/Payments.jsx";
import Referrals from "../pages/Dashboard/Referrals/Referrals.jsx";
import Wallet from "../pages/Dashboard/Wallet/Wallet.jsx";
import Service from "../pages/Dashboard/Service/Service.jsx";

// Admin Pages
import KYCManagement from "../pages/Admin/KYCManagement.jsx";
import PaymentManagement from "../pages/Admin/PaymentManagement.jsx";
import UserManagement from "../pages/Admin/UserManagement.jsx";
import Analytics from "../pages/Admin/Analytics.jsx";
import LiveChat from "../pages/Admin/LiveChat.jsx";
import FeeApplicationManagement from "../pages/Admin/FeeApplicationManagement.jsx";

// Protection
import { ProtectedRoute, KYCProtectedRoute, AdminRoute } from "../components/Protection/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "how-it-works", element: <HowItWorks /> },
      { path: "support", element: <Support /> },
      { path: "calculator", element: <Calculator /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/verify-otp", element: <OTPVerification /> },
  
  // Student Dashboard
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <KYCProtectedRoute>
            <Overview />
          </KYCProtectedRoute>
        )
      },
      { path: "kyc", element: <KYCForm /> },
      {
        path: "payments",
        element: (
          <KYCProtectedRoute>
            <Payments />
          </KYCProtectedRoute>
        )
      },
      {
        path: "referrals",
        element: (
          <KYCProtectedRoute>
            <Referrals />
          </KYCProtectedRoute>
        )
      },
      {
        path: "wallet",
        element: (
          <KYCProtectedRoute>
            <Wallet />
          </KYCProtectedRoute>
        )
      },
      {
        path: "service",
        element: (
          <KYCProtectedRoute>
            <Service />
          </KYCProtectedRoute>
        )
      },
    ]
  },

  // Admin Panel
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <Analytics /> },
      { path: "kyc", element: <KYCManagement /> },
      { path: "payments", element: <PaymentManagement /> },
      { path: "users", element: <UserManagement /> },
      { path: "analytics", element: <Analytics /> },
      { path: "chat", element: <LiveChat /> },
      { path: "service", element: <FeeApplicationManagement /> },
    ]
  }
]);

export default router;
