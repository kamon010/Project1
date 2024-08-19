const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

const url = 'mongodb+srv://Kamonrat:<01042545k->@atlascluster.amtlq.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';
const client = new MongoClient(url);

// เพิ่มบรรทัดนี้เพื่อให้ Express เสิร์ฟไฟล์ HTML ของคุณ
app.use(express.static(path.join(__dirname, 'public')));

app.get('/data', async(req, res) => {
    try {
        await client.connect();
        const database = client.db('Project');
        const collection = database.collection('Project');

        const data = await collection.find({}).toArray();

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    } finally {
        await client.close();
    }
});

// เส้นทางสำหรับหน้าแรก
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});