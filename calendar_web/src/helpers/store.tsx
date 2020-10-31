import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';


const middleware = [thunk]
const loggerMiddleware = createLogger();
export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
            ...middleware
        ))
);