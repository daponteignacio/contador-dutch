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
                isDarkMode: true,
                dynamicBackgroundColor: colors.blue[950],
                dynamicTextColor: colors.blue[200],
                dynamicCardBackgroundColor: colors.blue[900],
                dynamicCardTextColor: colors.blue[200],
                dynamicButtonBackgroundColor: colors.blue[950],
                dynamicButtonTextColor: colors.blue[200],
            }
        case '[Ui] - SET_LIGHT_COLORS':
            return {
                ...state,
                isDarkMode: false,
                dynamicBackgroundColor: colors.blue[200],
                dynamicTextColor: colors.blue[900],
                dynamicCardBackgroundColor: colors.blue[50],
                dynamicCardTextColor: colors.blue[900],
                dynamicButtonBackgroundColor: colors.blue[100],
                dynamicButtonTextColor: colors.blue[900],
            }

        default:
            return state;
    }

}