import Home from './components/home';
import UsersList from './components/UsersList';

export default [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/users',
        component: UsersList
    }
]