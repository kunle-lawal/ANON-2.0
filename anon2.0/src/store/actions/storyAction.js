export const createStory = (story, ids) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make asyn call to database
        var added = false;
        const firestore = getFirestore();
        const firebase = getFirebase();
        const {stories} = getState();
        const user = firebase.auth().currentUser;
        const userCollection = firestore.collection('users').doc(user.uid);
        // console.log(ids.postId);
        // if(stories.addedStory){return 0}
        // story.title = (story.title === '' || story.title === null) ? 'My True Story' : story.title;
        firestore.collection('stories').add({
            title: story.title,
            content: story.content,
            postID: ids.postId,
            time: new Date(),
            createdAt: new Date().getTime(),
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
        }).then(() => {
            // story.adding = false;
            // console.log("make user story")
            userCollection.collection('posts').doc(user.uid).set({
                "posts": {
                    ["post" + ids.postId]: {
                        title: story.title,
                        content: story.content,
                        postID: ids.postId,
                        uid: user.uid
                    }
                }
            }, { merge: true })
            // console.log("Add id");
            // console.log(firebase.firestore.FieldValue.increment(1));
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

const log = (x) => {
    console.log(x);
}