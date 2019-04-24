const initState = {
    mobileToggled: false
}

const navReducer = (state = initState, action) => {
    switch (action.type) {
        case 'MOBILE_NAV_TOGGLED':
            return {
                mobileToggled: !state.mobileToggled
            }
        case 'MOBILE_NAV_RESET': 
            return {
                mobileToggled: false
            }
        case 'PAGINATE': 
            return {
                mobileToggled: false
            }
        default:
            return state
    }
}

export default navReducer