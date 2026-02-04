import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Auth */
import Login from "./auth/Login";
import Signup from "./auth/Signup";

/* Core */
import ProtectedRoute from "./ProtectedRoute";

/* Admin */
import AdminDashboard from "./admin/AdminDashboard";
const UsersView = lazy(() => import("./admin/UsersView"));

/* Admin – Users */
import TendorList from "./admin/users/TendorList";
import CoordinatorList from "./admin/users/CoordinatorList";
import GolaMakerAccounts from "./admin/users/GolaMakerAccounts";
import ArtisanRegistration from "./admin/users/ArtisanRegistration";

/* Admin – Masters */
import ProductMaster from "./admin/masters/ProductMaster";
import VariantMaster from "./admin/masters/VariantMaster";
import RateConfiguration from "./admin/masters/RateConfiguration";

/* Dashboards */
const TendorDashboard = lazy(() => import("./tendor/TendorDashboard"));
const CoordinatorDashboard = lazy(() =>
  import("./coordinator/CoordinatorDashboard")
);

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
            Loading application…
          </div>
        }
      >
        <Routes>
          {/* ================= AUTH ================= */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin – Users */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UsersView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/tendors"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <TendorList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/coordinators"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CoordinatorList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/gola-makers"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <GolaMakerAccounts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/artisans"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ArtisanRegistration />
              </ProtectedRoute>
            }
          />

          {/* Admin – Masters */}
          <Route
            path="/admin/masters/products"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ProductMaster />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/masters/variants"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <VariantMaster />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/masters/rates"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <RateConfiguration />
              </ProtectedRoute>
            }
          />

          {/* ================= TENDOR ================= */}
          <Route
            path="/tendor"
            element={
              <ProtectedRoute allowedRoles={['tendor']}>
                <TendorDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= COORDINATOR ================= */}
          <Route
            path="/coordinator"
            element={
              <ProtectedRoute allowedRoles={['coordinator']}>
                <CoordinatorDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= 404 ================= */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
                Page Not Found
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
