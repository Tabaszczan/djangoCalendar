import {combineReducers} from 'redux';
import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';
import {alert} from './alert.reducer';
import {events} from './eventUser.reducer'

const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    events,
});

export default rootReducer;