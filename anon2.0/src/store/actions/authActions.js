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

        auth.createUserWithEmailAndPassword(authInfo.email, authInfo.password).then(() => {
            const user = firebase.auth().currentUser;
            firestore.collection('users').doc(user.uid).set({
                first_name: authInfo.first_name,
                last_name: authInfo.last_name
            })
            dispatch({ type: 'SIGNUP_SUCCESSFUL' })
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err: err })
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

export const changeName = (newName) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        
        firestore.collection('users').doc(user.uid).set({
            first_name: newName.first_name,
            last_name: newName.last_name
        }, { merge: true })
    }
}

export const showAuthModule = () => {
    return (dispatch, getState) => {
        dispatch({type: 'SHOW_SIGNUP_MODULE'});
    }
}

export const showSignInModule = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SHOW_SIGNIN_MODULE' });
    }
}

export const closeAuthModule = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'CLOSE_MODULE' });
    }
}