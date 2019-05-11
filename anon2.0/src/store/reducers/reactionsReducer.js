const initState = {
    type: '',
    id: ''
}

let postsLiked = [];

// const saveStateLocally = () => {
//     localStorage.setItem("postLikes", JSON.stringify(postsLiked));
// }

const reactionReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATED_REACTION':
            const id = action.reaction.id;
            return {
                ...state,
                [id]: {
                    type: action.reaction.type
                }
            }
        default:
            return state;
    }
}

export default reactionReducer