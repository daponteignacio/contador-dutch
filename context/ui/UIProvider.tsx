import { FC, useEffect, useReducer } from 'react';
import { UIContext } from './UIContext';
import { uiReducer } from './uiReducer';
import { Appearance, useColorScheme } from 'react-native';
import { colors } from '@/styles/colors';

export interface UIState {
    isDarkMode: boolean;
    dynamicBackgroundColor: string;
    dynamicTextColor: string;
    dynamicCardBackgroundColor: string;
    dynamicCardTextColor: string;
    dynamicButtonBackgroundColor?: string;
    dynamicButtonTextColor?: string;
}


const UI_INITIAL_STATE: UIState = {
    isDarkMode: true,
    dynamicBackgroundColor: colors.blue[950],
    dynamicTextColor: colors.blue[200],
    dynamicCardBackgroundColor: colors.blue[900],
    dynamicCardTextColor: colors.blue[200],
    dynamicButtonBackgroundColor: colors.blue[950],
    dynamicButtonTextColor: colors.blue[200],
}


interface Props {
    children: React.ReactNode;
}

export const UIProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    useEffect(() => {
        Appearance.setColorScheme("dark");
    }, []);

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    const toggleDarkMode = () => {
        Appearance.setColorScheme(isDarkMode ? "light" : "dark");
    }


    useEffect(() => {
        if (isDarkMode) {
            dispatch({ type: '[Ui] - SET_DARK_COLORS' });
        } else {
            dispatch({ type: '[Ui] - SET_LIGHT_COLORS' });
        }
    }, [isDarkMode]);



    return (
        <UIContext.Provider value={{
            ...state,
            toggleDarkMode
        }}>
            {children}
        </UIContext.Provider>
    )
};