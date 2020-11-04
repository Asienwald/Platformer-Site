import { combineReducers } from 'redux'
import envReducer from './envReducers'
import dataReducer from './dataReducers';


const rootReducer = combineReducers({
    env: envReducer,
    data: dataReducer
})


export default rootReducer;

