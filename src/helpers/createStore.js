import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../client/reducers';

export default (req) => {
    const axiosInstance1 = axios.create({
        baseURL: 'http://react-ssr-api.herokuapp.com',
        headers: { cookie: req.get('cookie') || '' }
    });

    const axiosInstance2 = axios.create({
        baseURL: 'http://hotels.polarium.tech:28080',
        headers: { cookie: req.get('cookie') || '' }
    });

    const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance1), thunk.withExtraArgument(axiosInstance2)));

    return store;
}