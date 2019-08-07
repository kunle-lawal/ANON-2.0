export const appendStories = (queryParam) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        let totalStories;
        firestore.collection('Ids').doc('postIds').get().then((snapShot) => {
            // dispatch({ type: 'APPEND_STORY' })
            totalStories = snapShot.data().totalIds;
            dispatch({ 
                type: 'APPEND_STORY',
                storyInfo: {
                    totalStories: totalStories,
                } 
            })
        })
    }
}

export const appendTopics = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        let totalStories;
        firestore.collection('Ids').doc('postIds').get().then((snapShot) => {
            // dispatch({ type: 'APPEND_STORY' })
            totalStories = snapShot.data().totalIds;
            dispatch({
                type: 'APPEND_TOPIC',
                storyInfo: {
                    totalStories: totalStories,
                }
            })
        })
    }
}

export const loadMore = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({type: 'LOAD_MORE'})
    }
}