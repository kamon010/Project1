const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // เปิดใช้งาน CORS

app.get('/data', (req, res) => {
    res.json({ message: "Hello from Vercel!" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});