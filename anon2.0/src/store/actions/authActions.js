export const signIn = (ids) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const  firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().signInAnonymously().then(() => {
            const user = firebase.auth().currentUser;
            firestore.collection('users').doc(user.uid).set({
                id: ids.totalIds
            })
            firestore.collection('Ids').doc("userIds").update({
                totalIds: firebase.firestore.FieldValue.increment(1)
            })
            dispatch({type: 'LOGIN_SUCCESS'})
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR'}, err)
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