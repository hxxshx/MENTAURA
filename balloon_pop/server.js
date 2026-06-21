require('dotenv').config();
console.log("MONGO_URI =", process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas connected'))
  .catch(err => console.log('❌ MongoDB error:', err));

// ================= SCHEMA =================
const gameScoreSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, default: 'Anonymous' },
  gameType: { type: String, required: true }, // e.g. "balloon-pop", "second-game"
  score: { type: Number, required: true },
  duration: { type: Number, required: true }, // in seconds
  date: { type: String, default: () => new Date().toISOString().slice(0, 10) },
  timestamp: { type: Date, default: Date.now }
});

const GameScore = mongoose.model('GameScore', gameScoreSchema);

// ================= ROUTES =================

// Save score
app.post('/api/save-score', async (req, res) => {
  try {
    const { userId, userName, gameType, score, duration } = req.body;

    if (!userId || !gameType || score === undefined || duration === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newScore = new GameScore({ userId, userName, gameType, score, duration });
    const saved = await newScore.save();

    console.log('✅ Score saved:', saved);
    res.json({ ok: true, message: 'Score saved successfully', score: saved.score });

  } catch (err) {
    console.error('❌ Error saving score:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Get last 10 scores for a user + specific game
app.get('/api/scores/:userId/:gameType', async (req, res) => {
  try {
    const { userId, gameType } = req.params;

    const scores = await GameScore.find({ userId, gameType })
      .sort({ timestamp: -1 })
      .limit(10);

    res.json(scores);

  } catch (err) {
    console.error('❌ Error fetching scores:', err);
    res.status(500).json({ error: err.message });
  }
});

// ================= SERVER START =================
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log('📦 API Endpoints:');
  console.log('  POST /api/save-score -> Save a game score');
  console.log('  GET  /api/scores/:userId/:gameType -> Fetch last 10 scores for a game');
});
