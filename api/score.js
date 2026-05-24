import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
    try {
        await client.connect();
        const db = client.db('Cluster0');
        const collection = db.collection('global_score');

        if (req.method === 'GET') {
            const doc = await collection.findOne({ _id: 'clicks' });
            return res.status(200).json({ count: doc ? doc.count : 0 });
        } 
        
        if (req.method === 'POST') {
            const result = await collection.findOneAndUpdate(
                { _id: 'clicks' },
                { $inc: { count: 1 } },
                { upsert: true, returnDocument: 'after' }
            );

            const count = result.count || (result.value ? result.value.count : 0);
            return res.status(200).json({ count: count });
        }
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
