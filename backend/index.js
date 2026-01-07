const express = require("express");
const { db, initDb } = require("./db");
const blogsRouter = require("./routes/blogs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env.local"),
  silent: true,
});

const app = express();
app.use(express.json());
app.use(cors());

// Environment Variables
// Database config moved to db.js
const jwtSecret = process.env.JWT_SECRET || "your-super-secret-key";
const port = process.env.PORT || 5000;
const googleClientId =
  process.env.GOOGLE_CLIENT_ID ||
  "612878658844-2kegk8lptok4k091024l39i7bduup1s7.apps.googleusercontent.com";

const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(googleClientId);

async function verifyGoogleToken(token) {
  // Since frontend sends access_token from useGoogleLogin
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user info from Google");
  }

  const payload = await res.json();
  return payload;
}

initDb();

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "dashboard-backend",
    port: port,
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "dashboard-backend",
    database: "connected",
    port: port,
  });
});

// Register Blog Routes
app.use("/api/blogs", blogsRouter);

// --- Routes ---

// Signup Route
app.post("/api/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Check if user exists
    const existing = await db.execute({
      sql: "SELECT * FROM users WHERE email = ?",
      args: [email],
    });

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const result = await db.execute({
      sql: "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?) RETURNING id",
      args: [firstName || "", lastName || "", email, hashedPassword],
    });

    const userId = result.rows[0].id;

    // Generate JWT for immediate login
    const token = jwt.sign({ id: userId, email: email }, jwtSecret, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: userId,
        firstName: firstName || "",
        lastName: lastName || "",
        email: email,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get All Users Route (For demonstration as requested)
app.get("/api/users", async (req, res) => {
  try {
    const result = await db.execute(
      "SELECT id, first_name as firstName, last_name as lastName, email, created_at FROM users ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const result = await db.execute({
      sql: "SELECT * FROM users WHERE email = ?",
      args: [email],
    });

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: "24h",
    });

    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Google Auth Route
app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Token required" });

  try {
    const payload = await verifyGoogleToken(token);
    const { email, given_name, family_name, picture } = payload;

    // Check if user exists
    const existing = await db.execute({
      sql: "SELECT * FROM users WHERE email = ?",
      args: [email],
    });

    let user;
    let userId;

    if (existing.rows.length > 0) {
      user = existing.rows[0];
      userId = user.id;
    } else {
      // Create new user (passwordless/placeholder)
      const hashedPassword = await bcrypt.hash(Math.random().toString(36), 10);
      const result = await db.execute({
        sql: "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?) RETURNING id",
        args: [given_name, family_name, email, hashedPassword],
      });
      userId = result.rows[0].id;
      user = {
        id: userId,
        first_name: given_name,
        last_name: family_name,
        email,
      };
    }

    // Generate JWT
    const jwtToken = jwt.sign({ id: userId, email: email }, jwtSecret, {
      expiresIn: "24h",
    });

    res.json({
      token: jwtToken,
      user: {
        id: userId,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        avatar: picture, // Pass google avatar if available, can be used in frontend
      },
    });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(401).json({ error: "Invalid google token" });
  }
});

// Verify Token Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Protected Get Me Route
app.get("/api/me", authenticateToken, async (req, res) => {
  try {
    const result = await db.execute({
      sql: "SELECT id, name, email FROM users WHERE id = ?",
      args: [req.user.id],
    });
    if (result.rows.length === 0)
      return res.status(404).json({ error: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
