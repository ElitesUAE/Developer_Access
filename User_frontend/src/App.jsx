// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import HomePage from "./Pages/HomePage.jsx";
// import Navbar from "./components/Navbar.jsx";
// import Footer from "./components/Footer.jsx";
// import About from "./Pages/About.jsx";
// import ContactUs from "./Pages/ContactUs.jsx";
// import PropertiesPage from "./Pages/PropertiesPage.jsx";
// import PropertyDetailsPage from "./Pages/PropertyDetailsPage.jsx";
// import BlogPage from "./Pages/BlogPage.jsx";
// import BlogDetailsPage from "./Pages/BlogDetailsPage.jsx";
// import Layout from "./Pages/Layout.jsx";
// import ThankYou from "./Pages/ThankYou.jsx";
// function App() {
//   return (
//     <>
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 3000,
//           style: {
//             background: "#363636",
//             color: "#fff",
//           },
//           success: {
//             duration: 3000,
//             iconTheme: {
//               primary: "#10B981",
//               secondary: "#fff",
//             },
//           },
//           error: {
//             duration: 4000,
//             iconTheme: {
//               primary: "#EF4444",
//               secondary: "#fff",
//             },
//           },
//         }}
//       />

//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           {/* public routes */}
//           <Route element={<Layout />}>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contactus" element={<ContactUs />} />
//             <Route path="/properties" element={<PropertiesPage />} />
//             <Route path="/property/:id" element={<PropertyDetailsPage />} />
//             <Route path="/blogs" element={<BlogPage />} />
//             <Route path="/blogs/:id" element={<BlogDetailsPage />} />
//           </Route>
//         </Routes>
//         <Footer />
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./Pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import About from "./Pages/About.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import PropertiesPage from "./Pages/PropertiesPage.jsx";
import PropertyDetailsPage from "./Pages/PropertyDetailsPage.jsx";
import BlogPage from "./Pages/BlogPage.jsx";
import BlogDetailsPage from "./Pages/BlogDetailsPage.jsx";
import Layout from "./Pages/Layout.jsx";
import ThankYou from "./Pages/ThankYou.jsx";
import Policy from "./Pages/Policy.jsx";

function AppContent() {
  const location = useLocation();

  // pages where Navbar/Footer should be hidden
  const hideLayout = location.pathname === "/thankyou";

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:id" element={<BlogDetailsPage />} />
          <Route path="/privacy-policy" element={<Policy />} />
        </Route>

        {/* Thank You Page – No Navbar, No Footer */}
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: "#363636", color: "#fff" },
        }}
      />

      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
}
