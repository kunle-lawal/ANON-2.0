export const updateReaction = (reaction) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        // const userCollection = firestore.collection('users').doc(user.uid);
        let type = reaction.type[0];
        // console.log(type);
        // console.log((reaction.userData.reactions[type] === undefined) ? 'reaction.userData.reaction' : reaction.userData.reactions[type]);
        
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
// const saveData = () => {
//     localStorage.setItem('postsLiked', JSON.stringify(postsLiked));
// }

// const getData = () => {
//     postsLiked = JSON.parse(localStorage.getItem('postsLiked') || '[]');
// }

// const pushData = (id, type) => {
//     // if (postsLiked.hasOwnProperty(id)) {console.log(postsLiked.id)}
//     // const reactExits = likeExists(postsLiked, id, type) ? () :()
//     postsLiked.push(id + ":" + type)

//     // const key = likeExists(postsLiked, id, type)
//     // return (
//     //     (likeExists(postsLiked, id, type)) ? (
//     //         postsLiked.splice(key, 1)
//     //     ) : (
//     //         postsLiked.push(id + ":" + type)
//     //     )
//     // )
//     // postsLiked.push({
//     //     [id]: {
//     //         [type]: type
//     //     }
//     // })
//     // postsLiked.push(id+":"+type);
//     // console.log(postsLiked);
// }

// const likeExists = (arr, id, type) => {
//     const reaction = id+':'+type;
//     for(var key in arr){
//         // console.log(arr[key]);
//         if (arr[key] === reaction) {
//             // console.log(key);
//             return key;
//         }
//     }
//     return false;
// }