import storyReducer from './storyReducers'
import reactionsReducer from './reactionsReducer'
import authReducer from './authReducer'
import navReducers from './navReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    nav: navReducers,
    auth: authReducer,
    stories: storyReducer,
    reaction: reactionsReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer