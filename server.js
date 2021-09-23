const path = require('path')
const express = require('express');

const app = express();

//html and css
app.use(express.static(path.join(__dirname, '_html_css')));

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log('Server runs'));