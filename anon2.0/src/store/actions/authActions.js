export const signIn = (authInfo) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const  firebase = getFirebase();
        const firestore = getFirestore();
        const auth = firebase.auth();
        auth.signInWithEmailAndPassword(authInfo.email, authInfo.password).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR' }, err)
        })
    }
}

export const signUp = (authInfo) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const auth = firebase.auth();

        auth.createUserWithEmailAndPassword(authInfo.email, authInfo.password) .then(() => {
            const user = firebase.auth().currentUser;
            firestore.collection('Ids').doc("userIds").update({
                totalIds: firebase.firestore.FieldValue.increment(1)
            })
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR' }, err)
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({type: 'LOGOUT_SUCCESS'})
        }).catch((err) => {
            dispatch({type: 'LOGOUT_ERROR'})
        })
    }
}