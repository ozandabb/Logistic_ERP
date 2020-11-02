import { SET_CURRENT_USER } from '../Action/types'
import isEmpty from 'lodash/isEmpty'

const initialState = {
    isAuthenticated: false,
    user: {},
    token:'',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            // console.log(!isEmpty(action.user))
            // console.log("boooooooooo",action.user)
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user,
                token: action.user.token,
            };
        default:
            return state
    }

}
