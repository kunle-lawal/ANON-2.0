export const createStory = (story) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make asyn call to database
        if (isEmpty(story)) {dispatch({type: 'EMPTY_VALUE'}); return 0}
        const firestore = getFirestore();
        // story.title = (story.title === '' || story.title === null) ? 'My True Story' : story.title;
        firestore.collection('stories').add({
            ...story,
            authorID: 1234,
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
            dispatch({ type: 'ADD_STORY', story: story });
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