const { MongoClient } = require('mongodb');

export default async function handler(req, res) {
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        await client.db().admin().ping(); // Пинг базы
        client.close();
        res.status(200).json({ status: "Подключение успешно!" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
