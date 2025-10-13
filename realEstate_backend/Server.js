import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // ✅ Import DB connection
import BlogRoutes from "./routes/blogRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

import contactRoutes from "./routes/contactRoutes.js";

import popupRoute from "./routes/PopupRoute.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import callbackRoutes from "./routes/callbackRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
const userAllow = process.env.ALLOW_USER;
const adminALLOW = process.env.ALLOW_ADMIN;
// Middleware
app.use(
  cors({
    origin: [userAllow, adminALLOW,"http://localhost:5173/"], // ✅ allow frontend
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/blogs", BlogRoutes); // ✅ better naming
app.use("/api/properties", propertyRoutes);
// Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/leads", popupRoute);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/callbacks", callbackRoutes);

//auth for admin
app.use("/api/auth", authRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("Applicaton is running securely & successfully.✅");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
