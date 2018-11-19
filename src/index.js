import 'babel-polyfill';
import express from 'express';
import renderer from './helpers/renderer';

import createStore from './helpers/createStore';

const app = express();

app.use(express.static('public'));
app.get('*', (req, res) => {
    const store = createStore();

    // Some logic to initialize
    // and load data into store

    res.send(renderer(req, store));
});

app.listen(3000, () => {
    console.log('Listening of port 3000');
})