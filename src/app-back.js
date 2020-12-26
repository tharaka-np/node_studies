const path = require('path');
const express = require('express');

console.log(__filename);
console.log(__dirname);

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.get('/help', (req, res) => {
    res.send(`${publicDirectoryPath}/help.html`);
});

app.get('/about', (req, res) => {
    res.send("About page");
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});