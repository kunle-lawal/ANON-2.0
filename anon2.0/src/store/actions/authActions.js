export const signIn = (ids) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const  firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().signInAnonymously().then(() => {
            // console.log('Got here')
            // console.log('Got here 1')
            const user = firebase.auth().currentUser;
            // console.log(user.uid);
            firestore.collection('users').doc(user.uid).set({
                id: ids.totalIds
            })
            // console.log('Got here 3')
            firestore.collection('Ids').doc("userIds").update({
                totalIds: firebase.firestore.FieldValue.increment(1)
            })
            // console.log('Got here 4')
            dispatch({type: 'LOGIN_SUCCESS'})
        }).catch((err) => {
            // console.log(err.message);
            dispatch({type: 'LOGIN_ERROR'}, err)
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        // console.log('Signing Out');
        firebase.auth().signOut().then(() => {
            dispatch({type: 'LOGOUT_SUCCESS'})
        }).catch((err) => {
            dispatch({type: 'LOGOUT_ERROR'})
        })
    }
}