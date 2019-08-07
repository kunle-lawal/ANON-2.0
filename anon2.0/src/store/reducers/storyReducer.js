const initState = {
    loaded: false,
    totalStories: 0,
    topic_limit: 6
}

const storyReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADDED_STORY':
            window.location = '/'
            return {
                ...state,
            }
        case 'CREATED_STORY_ERROR':
            return state
        case 'EMPTY_VALUE':
            return {
                ...state,
                addedStory: false,
                error: "Make sure you have a Title and a Story"
            }
        case 'APPEND_STORY':
            return {
                ...state,
                loaded: true,
                totalStories: action.storyInfo.totalStories
            }
        case 'LOAD_MORE': 
            return {
                ...state,
                topic_limit: state.topic_limit + 6
            }
            break;
        default:
            return state
    }
}



export default storyReducer