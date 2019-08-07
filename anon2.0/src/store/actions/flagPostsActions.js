export const updateFlaggedPost = (post) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const storyCollection = firestore.collection('stories');
        const { fbDoc, userProfile, postID, reason, reasonType, userID} = post;
        storyCollection.doc(fbDoc).collection('flags').add({
            user: user.uid,
            reason: reason,
            reasonLevel: reasonType,
            time: new Date(),
            createdAt: new Date().getTime(),
            postID: postID,
            fbDoc: fbDoc,
        }).then (() => {
            updateUserFlagData({ firestore, firebase }, user.uid, fbDoc);
            incrementFlags({ firebase, firestore }, fbDoc);
            if (reasonType === 1 && user.uid !== userID) {
                addBanUsers({ firestore, firebase }, user.uid, userID);
            }
        })
    }
}

const updateUserFlagData = (data, uid, fbDoc) => {
    const { firestore } = data;
    firestore.collection('users').doc(uid).set({
        [fbDoc]: {
            flagged: true,
            banned: true
        }
    }, { merge: true })
}

const incrementFlags = (data, id) => {
    const { firebase, firestore } = data;
    firestore.collection('stories').doc(id).set({
        flags: firebase.firestore.FieldValue.increment(1),
    }, { merge: true })
}

const addBanUsers = (data, uid, fbDoc) => {
    const { firebase, firestore } = data;
    firestore.collection('users').doc(uid).set({
        banList: firebase.firestore.FieldValue.arrayUnion(fbDoc)
    }, { merge: true })
}
