const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        await client.connect();
        const db = client.db('Cluster0'); // Твое точное имя базы
        const collection = db.collection('global_score');

        if (req.method === 'GET') {
            const doc = await collection.findOne({ _id: 'clicks' });
            res.status(200).json({ count: doc ? doc.count : 0 });
        } else if (req.method === 'POST') {
            const result = await collection.findOneAndUpdate(
                { _id: 'clicks' },
                { $inc: { count: 1 } },
                { upsert: true, returnDocument: 'after' }
            );
            res.status(200).json({ count: result.value.count });
        }
    } catch (e) {
        res.status(500).json({ error: "Ошибка БД: " + e.message });
    }
}
