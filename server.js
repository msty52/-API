const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

const ScoreSchema = new mongoose.Schema({
    id: { type: String, default: 'global' },
    count: { type: Number, default: 0 }
});
const Score = mongoose.model('Score', ScoreSchema);

app.get('/get-score', async (req, res) => {
    let doc = await Score.findOne({ id: 'global' });
    if (!doc) doc = await Score.create({ count: 0 });
    res.json({ score: doc.count });
});

app.post('/click', async (req, res) => {
    let doc = await Score.findOne({ id: 'global' });
    if (!doc) doc = await Score.create({ count: 0 });
    doc.count += 1;
    await doc.save();
    res.json({ score: doc.count });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
