import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.json({
        message: 'postman'
    });
});

app.listen(3333, () => console.log('running on port 3333'));