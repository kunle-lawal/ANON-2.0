const initState = {
    stories: [''],
    addedStory: false,
    error: ""
}

const storyStateReducer = (state = [], action) => {
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
            // const storyArr = state.stories;
            // storyArr.push(action.storyData);
            return state
            // break;
        default:
            return state
    }
}

export default storyStateReducer