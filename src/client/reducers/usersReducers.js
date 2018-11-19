import { FETCH_USERS } from '../actions';

export default (state = [], action) => {
    console.log('reducers user called');
    switch(action.type) {
    case FETCH_USERS:
        return action.payload.data;
    default:
        return state;
    }
}