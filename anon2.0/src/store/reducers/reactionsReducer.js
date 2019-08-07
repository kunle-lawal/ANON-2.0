const initState = {
    type: '',
    id: '',
}

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
        case 'ADDED_BOOKMARK': 
            return {
                ...state,
                [action.bookmark.id]: {
                    bookmarked: action.bookmark.bookmarked
                }
            }
        case 'REMOVED_BOOKMARK':
            return {
                ...state,
                [action.bookmark.id]: {
                    bookmarked: action.bookmark.bookmarked
                }
            }
        default:
            return state;
    }
}

export default reactionReducer