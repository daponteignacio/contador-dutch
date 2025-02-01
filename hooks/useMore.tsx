import { Linking, Platform, Alert } from "react-native";

export const useMore = () => {
    const handleRating = () => {
        const storeUrl = Platform.select({
            android: "https://play.google.com/store/apps/details?id=com.yourapp", // TODO: Reemplazar con el ID de tu app en Google Play
            ios: "https://apps.apple.com/app/id123456789", // TODO: Reemplazar con la URL de tu app en App Store
        });

        if (storeUrl) {
            Linking.openURL(storeUrl);
        } else {
            Alert.alert("Error", "No se pudo abrir la tienda.");
        }
    };

    const handleEmail = () => {
        const email = "daponteignacio@gmail.com";
        const subject = "Sugerencia para la app";
        const body = "";
        const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        Linking.openURL(emailUrl);
    };


    return {
        handleRating,
        handleEmail,
    };
};
