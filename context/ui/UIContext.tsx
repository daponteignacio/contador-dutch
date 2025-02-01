import { createContext } from 'react';


interface ContextProps {
    isDarkMode: boolean
    dynamicBackgroundColor: string
    dynamicTextColor: string
    dynamicCardBackgroundColor: string
    dynamicCardTextColor: string
    dynamicButtonBackgroundColor?: string
    dynamicButtonTextColor?: string
    toggleDarkMode: () => void;
}


export const UIContext = createContext({} as ContextProps);