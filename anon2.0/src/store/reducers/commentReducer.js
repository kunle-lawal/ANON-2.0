const initState = {
    comments: [
        [ "Comment 1" ],
        [ "Comment 2" ],
        [ "Comment 3" ]
    ],
    addedComment: false,
    error: ""
}

const storyReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADDED_COMMENT':
            return {
                ...state,
            }
        case 'CREATED_COMMENT_ERROR':
            return state
        case 'EMPTY_VALUE':
            return {
                ...state,
                addedStory: false,
                error: "Make sure you have a Title and a Story"
            }
        default:
            return state
    }
}

export default storyReducer