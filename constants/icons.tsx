import { Feather, Ionicons } from "@expo/vector-icons";

export const icons = {
    index: (props: any) => <Feather name='home' size={24} color={props.color} />,
    partida: (props: any) => <Ionicons name='game-controller-outline' size={24} color={props.color} />,
    rules: (props: any) => <Feather name='list' size={24} color={props.color} />,
    more: (props: any) => <Feather name='more-horizontal' size={24} color={props.color} />,
}