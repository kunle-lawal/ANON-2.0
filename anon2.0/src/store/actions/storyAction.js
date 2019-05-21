export const createStory = (story, ids) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make asyn call to database
        var added = false;
        const firestore = getFirestore();
        const firebase = getFirebase();
        const {stories} = getState();
        const user = firebase.auth().currentUser;
        const userCollection = firestore.collection('users');

        const collection = story.underReview ? 'reviews' : 'stories';
        const userID = story.underReview ? user.uid : story.userID
        console.log(story)
        if(!story.passedReview && !story.underReview) {
            firestore.collection('reviews').doc(story.docID).delete().then(() => {
                dispatch({ type: 'DOCUMENT_DELETED', story: story });
            })
            return 0;
        }
        firestore.collection(collection).add({
            title: story.title,
            content: story.content,
            postID: ids.postId,
            commentsTotal: 0,
            time: new Date(),
            topic: (story.topic).toUpperCase(),
            createdAt: new Date().getTime(),
            userID: userID,
            safe: null,
            flags: 0,
            underReview: story.underReview,
            views: 0,
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
            console.log('not under review');
            if(!story.underReview) {
                userCollection.doc(user.uid).collection('posts').add({
                    "posts": {
                        title: story.title,
                        content: story.content,
                        postID: ids.postId,
                        createdAt: new Date().getTime(),
                        docId: docRef.id
                    }
                })
                firestore.collection('Ids').doc("postIds").update({
                    totalIds: firebase.firestore.FieldValue.increment(1)
                })
                firestore.collection('reviews').doc(story.docID).delete().then(() => {
                    dispatch({ type: 'DOCUMENT_DELETED', story: story });
                })
                // dispatch({ type: 'ADDED_STORY', story: story });
            } else {
                console.log('Under review');
                firestore.collection('users').doc(user.uid).set({
                    lastPost: Date.now()
                }, { merge: true })
                dispatch({ type: 'ADDED_STORY', story: story });
            }
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