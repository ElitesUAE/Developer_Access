// App.jsx - FINAL VERSION WITH AUTHENTICATION
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BlogTable from "./Pages/BlogTable";
import PropertyTable from "./Pages/PropertyTable";
import CreatePropertyPage from "./Pages/CreatePropertyPage";
import EditPropertyPage from "./Pages/EditPropertyPage";
import AdminLeadsPage from "./Pages/AdminLeadsPage";
import AdminContact from "./Pages/AdminContact";
import NewsletterSubscribersPage from "./Pages/NewsletterSubscribersPage";
import CallbackRequestsPage from "./Pages/CallbackRequestsPage";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminManagementPage from "./Pages/AdminManagementPage.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";
import AdminSignIn from "./Pages/AdminSignIn.jsx";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* ✅ Default Route - Sign In Page */}
          <Route path="/" element={<AdminSignIn />} />

          {/* ✅ Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="leads" element={<AdminLeadsPage />} />
            <Route path="blogs" element={<BlogTable />} />
            <Route path="properties" element={<PropertyTable />} />
            <Route path="properties/create" element={<CreatePropertyPage />} />
            <Route path="properties/edit/:id" element={<EditPropertyPage />} />
            <Route path="contact" element={<AdminContact />} />
            <Route path="newsletter" element={<NewsletterSubscribersPage />} />
            <Route path="admins" element={<AdminManagementPage />} />
            <Route path="callbacks" element={<CallbackRequestsPage />} />
          </Route>

          {/* Catch all - redirect to sign in */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
