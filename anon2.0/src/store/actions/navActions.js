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