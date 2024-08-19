const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const url = 'mongodb+srv://Kamonrat:<01042545k->@atlascluster.amtlq.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';
const client = new MongoClient(url);

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});