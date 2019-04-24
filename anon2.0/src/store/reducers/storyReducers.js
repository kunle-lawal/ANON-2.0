const initState = {
    stories: [
        {id: '1', title: 'This is the way to go', content: 'blah blah blah'},
        {id: '2', title: 'This is the way to go', content: 'blah blah blah' },
        {id: '3', title: 'This is the way to go', content: 'blah blah blah' }
    ],
    addedStory: false,
    error: ""
}

const storyReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADDED_STORY':
            // console.log('adding');
            window.location = '/'
            return {
                ...state,
            }
        case 'CREATED_STORY_ERROR':
            // console.log(action.err)
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