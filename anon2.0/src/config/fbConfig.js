import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyBT9xbz88ZJ06unQVQSpmbSOt9hF_TVbaE",
    authDomain: "anon-71390.firebaseapp.com",
    databaseURL: "https://anon-71390.firebaseio.com",
    projectId: "anon-71390",
    storageBucket: "anon-71390.appspot.com",
    messagingSenderId: "629190899949"
};

firebase.initializeApp(config);
// firebase.firestore().settings({timestampsInSnapshots: true});
// const firestore = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true };
// firestore.settings(settings);

export default firebase;