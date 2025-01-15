import { colors } from '@/styles/colors';
import { UIState } from './UIProvider';


type UiActionType =
    | { type: '[Ui] - ActionName' }
    | { type: '[Ui] - SET_DARK_COLORS' }
    | { type: '[Ui] - SET_LIGHT_COLORS' }




export const uiReducer = (state: UIState, action: UiActionType): UIState => {

    switch (action.type) {
        case '[Ui] - ActionName':
            return {
                ...state,
            }
        case '[Ui] - SET_DARK_COLORS':
            return {
                ...state,
                dynamicBackgroundColor: colors.grey[950],
                dynamicTextColor: colors.grey[200],
                dynamicCardBackgroundColor: colors.grey[900],
                dynamicCardTextColor: colors.grey[200],
                dynamicButtonBackgroundColor: colors.grey[950],
                dynamicButtonTextColor: colors.grey[200],
            }
        case '[Ui] - SET_LIGHT_COLORS':
            return {
                ...state,
                dynamicBackgroundColor: colors.grey[50],
                dynamicTextColor: colors.grey[900],
                dynamicCardBackgroundColor: colors.white,
                dynamicCardTextColor: colors.grey[900],
                dynamicButtonBackgroundColor: colors.grey[100],
                dynamicButtonTextColor: colors.grey[900],
            }

        default:
            return state;
    }

}