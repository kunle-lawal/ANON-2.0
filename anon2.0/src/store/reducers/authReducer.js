const initState = {}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            // console.log(action)
            break
        case 'LOGIN_SUCCESS':
            // console.log('SUCCESSFUL LOGIN')
            break
        case 'USER_DELETED':
            // console.log('User deleted')
            break
        default:
            break;
    }
    return 0;
}

export default authReducer