export const updateReaction = (reaction) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        // console.log(getState());
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const userCollection = firestore.collection('users').doc(user.uid);
        let type = reaction.type[0];
        // console.log(firestore.collection('stories').doc(user.uid).reactions);
        // console.log(reaction.userData.reactions[reaction.id]);
        // console.log(reaction.userData.reactions[reaction.id].reactions[type]);
        
        // console.log(firestore.collection('users').doc(user.uid).ui.reactions[type].liked);
        
        // const isLiked = likeExists(postsLiked, reaction.id, type);
        // if (!isLiked) {
        //     pushData(reaction.id, type);
        // } else {
        //     postsLiked.splice(isLiked, 1)
        //     likeAmt = -1;
        // }
        // console.log(reaction);
        // userCollection.set({
        //     [reaction.id]: {
        //         reaction: {
        //             [type]: {
        //                 liked: false
        //             }
        //         }
        //     }
        // }, { merge: true })
        const reactionType = reaction.userData.reactions[reaction.id] ? reaction.userData.reactions[reaction.id].reaction[type] : undefined;
        const reactionState = reactionType ? reaction.userData.reactions[reaction.id].reaction[type].liked : false;
        let uid = reaction.id;
        let likeAmt = 1;
        let liked = updateUserReactionData({ firestore, firebase }, user.uid, reaction.id, type, reactionState);
        likeAmt = liked ? -1 : 1;
        incrementReaction({firebase, firestore}, reaction.id, type, likeAmt);



        // if(!reaction) {
        //     firestore.collection('users').doc(user.uid).set({
        //         reactions: {
        //             [type]: {
        //                 liked: true
        //             }
        //         }
        //     })
        // }
        // console.log(firestore.collection('stories').doc(user.uid).reactions);
        // console.log(reaction);
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
        // console.log(postsLiked);
        // pushData(reaction.id, type);
        // console.log(postsLiked);
        // console.log(type, reaction.id);
        
    }
}


const updateUserReactionData = (data, uid, id, type, action) => {
    // console.log(action);
    // console.log(action);
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
    // console.log(action);
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
//     // console.log(postsLiked);
//     // console.log(likeExists(postsLiked, id, type));
//     // console.log();
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