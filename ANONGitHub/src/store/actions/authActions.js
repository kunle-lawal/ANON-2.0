export const signIn = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const  firebase = getFirebase();
        firebase.auth().signInAnonymously().then(() => {
            dispatch({type: 'LOGIN_SUCCESS'})
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR'})
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        console.log('Signing Out');
        firebase.auth().signOut().then(() => {
            dispatch({type: 'LOGOUT_SUCCESS'})
        }).catch((err) => {
            dispatch({type: 'LOGOUT_ERROR'})
        })
    }
}