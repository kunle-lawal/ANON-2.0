export const updateReaction = (reaction) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        // const userCollection = firestore.collection('users').doc(user.uid);
        let type = reaction.type[0];

        // const isLiked = likeExists(postsLiked, reaction.id, type);
        // if (!isLiked) {
        //     pushData(reaction.id, type);
        // } else {
        //     postsLiked.splice(isLiked, 1)
        //     likeAmt = -1;
        // }
        // userCollection.set({
        //     [reaction.id]: {
        //         reaction: {
        //             [type]: {
        //                 liked: false
        //             }
        //         }
        //     }
        // }, { merge: true })
        // const reactionType = reaction.userData.reactions[reaction.id] ? reaction.userData.reactions[reaction.id].reaction : undefined;
        // const reactionState = reactionType ? reaction.userData.reactions[reaction.id].reaction[type] : false;
        // let likeAmt = 1;
        // let liked = updateUserReactionData({ firestore, firebase }, user.uid, reaction.id, type, (reactionState ? reactionState.liked : false));
        // likeAmt = liked ? -1 : 1;
        // incrementReaction({firebase, firestore}, reaction.id, type, likeAmt);
        
        let liked = updateUserReactionData({ firestore, firebase }, user.uid, reaction.docID, type, (reaction.userData.reactions === null) ? false : ((reaction.userData.reactions[type] === undefined) ? false : reaction.userData.reactions[type].liked));
        let likeAmt = liked ? -1 : 1;
        incrementReaction({ firebase, firestore }, reaction.docID, type, likeAmt);

        // if(!reaction) {
        //     firestore.collection('users').doc(user.uid).set({
        //         reactions: {
        //             [type]: {
        //                 liked: true
        //             }
        //         }
        //     })
        // }
        // firestore.collection('users').doc(user.uid).set({
        //     reactions: {
        //         [type]: {
        //             liked: 
        //         }
        //     }
        // })
        // firestore.collection('stories').doc(reaction.id).set({
        //     reactions: {
        //         [type]: {
        //             total: firebase.firestore.FieldValue.increment(likeAmt),
        //         },
        //     }
        // }, { merge: true })
        // pushData(reaction.id, type);
        
    }
}


const updateUserReactionData = (data, uid, id, type, action) => {
    const {firestore} = data;
    firestore.collection('users').doc(uid).set({
        [id]: {
            reaction: {
                [type]: {
                    liked: !action
                }
            }
        }
    }, {merge: true})
    return action
}

const incrementReaction = (data, id, type, likeAmt) => {
    const {firebase, firestore} = data;
    firestore.collection('stories').doc(id).set({
        reactions: {
            [type]: {
                total: firebase.firestore.FieldValue.increment(likeAmt),
            },
        }
    }, { merge: true })
}

export const updateBookmark = (bookmark) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const {story} = bookmark
        // const userCollection = firestore.collection('users').doc(user.uid);
        let bookmarked = updateUserBookmarkData({ firestore, firebase }, user.uid, story, (bookmark.userData.profile === null) ? false : ((bookmark.userData.profile.bookmarked === undefined) ? false : bookmark.userData.profile.bookmarked));
        // return 0;
        if(bookmarked){
            let removed = removeBookmark({ firebase, firestore }, user.uid, story);
            if(removed){
                dispatch({
                    type: "REMOVED_BOOKMARK",
                    bookmark: {
                        id: story.id,
                        bookmarked: false
                    }
                })
            }
        } else {
            let added = addBookmark({ firebase, firestore }, user.uid, story);
            if(added) {
                dispatch({
                    type: "ADDED_BOOKMARK",
                    bookmark: {
                        id: story.id,
                        bookmarked: true
                    }
                })
            }
        }
    }
}

const updateUserBookmarkData = (data, uid, story, action) => {
    const { firestore } = data;
    firestore.collection('users').doc(uid).set({
        [story.id]: {
            bookmarked: !action
        }
    }, { merge: true })
    
    return action
}

const addBookmark = (data, uid, story) => {
    const { firestore } = data;
    const userBookmarkCollection = firestore.collection('users').doc(uid).collection('bookmarks');
    userBookmarkCollection.doc(story.id).set({
        bookmarkedStory: story
    }).then(() => {
        return true;
    }).catch(() => {
        return false;
    })
}

const removeBookmark = (data, uid, story) => {
    const { firestore } = data;
    firestore.collection('users').doc(uid).collection('bookmarks').doc(story.id).delete().then(() => {
        return true;
    }).catch((error) => {
        return false;
    })
}