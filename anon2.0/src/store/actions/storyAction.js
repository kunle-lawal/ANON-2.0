export const createStory = (story, ids) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make asyn call to database
        var added = false;
        const firestore = getFirestore();
        const firebase = getFirebase();
        const {stories} = getState();
        const user = firebase.auth().currentUser;
        const userCollection = firestore.collection('users');
        firestore.collection('stories').add({
            title: story.title,
            content: story.content,
            postID: ids.postId,
            commentsTotal: 0,
            time: new Date(),
            createdAt: new Date().getTime(),
            userID: user.uid,
            reactions: {
                laugh: {
                    type: 'laugh',
                    total: 0,
                    active: false
                },
                shook: {
                    type: 'shook',
                    total: 0,
                    active: false
                },
                thumb: {
                    type: 'thumb',
                    total: 0,
                    active: false
                }
            }
        }).then((docRef) => {
            userCollection.doc(user.uid).collection('posts').add({
                "posts": {
                    title: story.title,
                    content: story.content,
                    postID: ids.postId,
                    createdAt: new Date().getTime(),
                    docId: docRef.id
                }
            })
            firestore.collection('users').doc(user.uid).set({
                lastPost: Date.now()
            }, { merge: true })
            firestore.collection('Ids').doc("postIds").update({
                totalIds: firebase.firestore.FieldValue.increment(1)
            })
            dispatch({ type: 'ADDED_STORY', story: story });
        }).catch((err) => {
            dispatch({ type: 'CREATED_STORY_ERROR', err });
        })
    }
}

const isEmpty = (obj) => {
    for( var key in obj) {
        if (obj[key] === null || obj[key] === '')
            return true;
    }
    return false;
}