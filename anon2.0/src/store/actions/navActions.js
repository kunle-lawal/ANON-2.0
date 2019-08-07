export const toggleMobileNav = () => {
    return(dispatch, getstate) => {
        dispatch({ type: 'MOBILE_NAV_TOGGLED'});
    }
}

export const resetView = () => {
    return (dispatch, getstate) => {
        dispatch({ type: 'MOBILE_NAV_RESET' });
    }
}

export const paginate = (val) => {
    return (dispatch, getstate) => {
        dispatch({type: 'PAGINATE'}, val);
    }
}

export const openFullNav = () => {
    return (dispatch) => {
        dispatch({type:'OPEN_FULL_NAV'});
    }
}

export const closeFullNav = () => {
    return (dispatch) => {
        dispatch({ type: 'CLOSE_FULL_NAV' });
    }
}

export const toggleFullNav = () => {
    return (dispatch) => {
        dispatch({ type: 'TOGGLE_FULL_NAV' });
    }
}