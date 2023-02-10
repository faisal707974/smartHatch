import { CLEAR_POPUP, START_POPUP } from '../constants/popUpCostants'


export const popupStartAction = () => async (dispatch, getstate) => {

    const { text } = getstate()
    try {
        dispatch({ type: START_POPUP, payload: text })
    } catch (err) {
        console.log(err)
    }
}

export const stopPopUpAction = () => async (dispatch, getstate) => {

    try {
        dispatch({ type: CLEAR_POPUP, payload: '' })
    } catch (err) {
        console.log(err)
    }
}