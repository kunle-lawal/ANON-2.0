import { database } from "firebase";

export const addComment = (theComment) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make asyn call to database
        var added = false;
        const firestore = getFirestore();
        const firebase = getFirebase();
        const { comments } = getState();
        const storyCollection = firestore.collection('stories');
        const { comment, fbDocument, userProfile } = theComment;
        const user = firebase.auth().currentUser;
        if (comments.addedComments){return 0}
        storyCollection.doc(fbDocument).collection('comments').add({
            comment: comment,
            user: userProfile.id,
            time: new Date(),
            createdAt: new Date().getTime()
        }).then(() => {
            firestore.collection('stories').doc(fbDocument).set({
                commentsTotal: firebase.firestore.FieldValue.increment(1)
            }, {merge: true})
            firestore.collection('users').doc(user.uid).set({
                lastComment: Date.now()
            }, { merge: true })
            dispatch({ type: 'ADDED_COMMENT', story: comment });
        }).catch((err) => {
            dispatch({ type: 'CREATED_COMMENT_ERROR', err });
        })
    }
}

const isEmpty = (obj) => {
    for (var key in obj) {
        if (obj[key] === null || obj[key] === '')
            return true;
    }
    return false;
}