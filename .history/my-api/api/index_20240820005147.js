const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/data', (req, res) => {
    res.json({ message: "Hello from Vercel!" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});