const express = require('express');
const app = express();
app.use(express.json());

let globalScore = 0;

app.post('/click', (req, res) => {
    globalScore++; 
    res.json({ totalScore: globalScore });
});

app.listen(3000, () => console.log('Сервер запущен!'));
