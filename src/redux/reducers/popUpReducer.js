import { CLEAR_POPUP, START_POPUP } from '../constants/popUpCostants'

export const popupReducer = (state = '', action) => {
    switch (action.type) {
        case START_POPUP:
            return action.payload
        case CLEAR_POPUP:
            return ""
        default:
            return state
    }
}