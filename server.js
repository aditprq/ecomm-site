const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

const products = require('./products.json'); 

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', (req, res) => {
    const { category } = req.query;

    if (category) {
        const filteredProducts = products.filter(product => product.category === category);
        res.json(filteredProducts);
    } else {
        res.json(products);
    }
});

app.get('/api/search', (req, res) => {
    const { name } = req.query;

    if (name) {
        const searchResults = products.filter(product => product.title.toLowerCase().includes(name.toLowerCase()));
        res.json(searchResults);
    } else {
        res.json({ error: 'Please provide a name parameter for the search.' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, (err) => {
    if (err) {
        console.error('Unable to start server:', err);
    } else {
        console.log('Server started on port', PORT);
    }
});
