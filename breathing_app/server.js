require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Check if MONGO_URI exists
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ MONGO_URI not found! Please check your .env file.");
  process.exit(1);
}

// MongoDB connection
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Session Schema
const sessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String },
  gameType: { type: String, default: 'breathing' },
  durationSec: { type: Number, required: true },
  pace: { type: String },
  cycles: { type: Number, default: 0 },
  date: { type: String }, // YYYY-MM-DD
  timestamp: { type: Date, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);

// Default route
app.get("/", (req, res) => {
  res.send("Breathing Game Backend is running! 🌱");
});

// POST route - Save new session
app.post("/api/session", async (req, res) => {
  try {
    console.log("📝 Saving new session:", req.body);
    const newSession = new Session({
      userId: req.body.userId,
      userName: req.body.userName,
      gameType: req.body.gameType || 'breathing',
      durationSec: req.body.durationSec,
      pace: req.body.pace,
      cycles: req.body.cycles,
      date: req.body.date,
      timestamp: req.body.timestamp ? new Date(req.body.timestamp) : new Date()
    });

    const savedSession = await newSession.save();
    console.log("✅ Session saved successfully:", savedSession._id);
    res.json({ ok: true, success: true, message: "Session saved successfully", sessionId: savedSession._id });
    
  } catch (error) {
    console.error("❌ Error saving session:", error);
    res.status(500).json({ ok: false, error: error.message, message: "Failed to save session" });
  }
});

// GET route - Fetch user sessions
app.get("/api/sessions/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(`📖 Loading sessions for user: ${userId}`);
    const sessions = await Session.find({ userId }).sort({ timestamp: -1 }).limit(20);
    res.json(sessions);
  } catch (error) {
    console.error("❌ Error loading sessions:", error);
    res.status(500).json({ error: error.message, message: "Failed to load sessions" });
  }
});

// DELETE route - Clear all sessions for a user
app.delete("/api/sessions/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(`🗑 Clearing all sessions for user: ${userId}`);
    const result = await Session.deleteMany({ userId });
    res.json({ ok: true, success: true, message: `Deleted ${result.deletedCount} sessions` });
  } catch (error) {
    console.error("❌ Error clearing sessions:", error);
    res.status(500).json({ ok: false, error: error.message, message: "Failed to clear sessions" });
  }
});

// GET route - User stats
app.get("/api/stats/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const totalSessions = await Session.countDocuments({ userId });
    const totalTime = await Session.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$durationSec" } } }
    ]);
    res.json({
      totalSessions,
      totalTimeSeconds: totalTime[0]?.total || 0,
      totalTimeMinutes: Math.round((totalTime[0]?.total || 0)/60)
    });
  } catch (error) {
    console.error("❌ Error loading stats:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Visit: http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   POST /api/session - Save breathing session`);
  console.log(`   GET  /api/sessions/:userId - Get user sessions`);
  console.log(`   DELETE /api/sessions/:userId - Clear all user sessions`);
  console.log(`   GET  /api/stats/:userId - Get user statistics`);
});
