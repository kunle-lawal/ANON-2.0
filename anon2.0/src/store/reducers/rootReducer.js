import storyStateReducer from './storyStateReducer'
import storyReducer from './storyReducer'
import commentReducer from './commentReducer'
import reactionsReducer from './reactionsReducer'
import authReducer from './authReducer'
import navReducers from './navReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    nav: navReducers,
    auth: authReducer,
    storyState: storyStateReducer,
    stories: storyReducer,
    comments: commentReducer,
    reaction: reactionsReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer