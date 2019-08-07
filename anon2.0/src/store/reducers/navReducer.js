const initState = {
    mobileToggled: false,
    openFullNav: false
}

const navReducer = (state = initState, action) => {
    switch (action.type) {
        case 'MOBILE_NAV_TOGGLED':
            if (!state.mobileToggled) { document.getElementById('body').style.overflow = "hidden" } else { document.getElementById('body').style.overflow = "auto";}
            return {
                ...state,
                mobileToggled: !state.mobileToggled
            }
        case 'MOBILE_NAV_RESET': 
            return {
                ...state,
                mobileToggled: false
            }
        case 'PAGINATE': 
            return {
                ...state,
                mobileToggled: false
            }
        case 'OPEN_FULL_NAV': 
            return {
                ...state,
                openFullNav: true
            }
        case 'CLOSE_FULL_NAV': 
            return {
                ...state,
                openFullNav: false,
            }
        case 'TOGGLE_FULL_NAV':
            return {
                ...state,
                openFullNav: !state.openFullNav
            }
        default:
            return state
    }
}

export default navReducer