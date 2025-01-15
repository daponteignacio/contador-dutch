import { createContext } from 'react';


interface ContextProps {
    dynamicBackgroundColor: string
    dynamicTextColor: string
    dynamicCardBackgroundColor: string
    dynamicCardTextColor: string
    dynamicButtonBackgroundColor?: string
    dynamicButtonTextColor?: string
    toggleDarkMode: () => void;
}


export const UIContext = createContext({} as ContextProps);