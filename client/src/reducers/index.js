import {combineReducers} from 'redux'
import alert from  './alert';
import auth from './auth'
import profile from './profile'

// console.log(auth)


export default  combineReducers({
    alert,
    auth,
    profile
})

