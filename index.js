const express = require('express');
const app = express();
const port = 3000;

// Use middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded());

app.use((req, res) => {
    res.send(req.body);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
