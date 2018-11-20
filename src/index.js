import 'babel-polyfill';
import express from 'express';
import proxy from 'express-http-proxy';
import renderer from './helpers/renderer';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import createStore from './helpers/createStore';

const app = express();

app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = 'localhost:3000'
        return opts;
    }
}));

// app.use('/hotelapi', proxy('http://react-ssr-api.herokuapp.com', {
//     proxyReqOptDecorator(opts) {
//         opts.headers['x-forwarded-host'] = 'localhost:3000'
//         return opts;
//     }
// }));

app.use(express.static('public'));
app.get('*', (req, res) => {
    const store = createStore(req);

    // url 정보를 matching 해서 분석할 수 있다.
    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null;
    });

    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);
        if(context.notFound) {
            res.status(404);
        }
        
        res.send(content);
    })
});

app.listen(3000, () => {
    console.log('Listening of port 3000');
})
