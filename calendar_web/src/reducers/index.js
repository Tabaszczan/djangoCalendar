import {combineReducers} from 'redux';
import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';
import {alert} from './alert.reducer';
import {events} from './eventUser.reducer'
import {groups} from "./groups.reducer";
import {users} from "./getUsers.reducer";
import {eventsGroup} from "./eventGroup.reducer";

const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    events,
    groups,
    users,
    eventsGroup,
});

export default rootReducer;