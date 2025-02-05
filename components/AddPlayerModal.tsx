import { useContext, useEffect, useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AppContext } from '@/context';
import { colors } from '@/styles/colors';
import { UIContext } from '@/context/ui';

interface AddPlayerModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

export const AddPlayerModal = ({
    modalVisible,
    setModalVisible,
}: AddPlayerModalProps) => {
    const { addPlayer } = useContext(AppContext);


    const {
        dynamicTextColor,
        dynamicBackgroundColor,
        dynamicCardBackgroundColor,
        dynamicCardTextColor,
        dynamicButtonBackgroundColor,
        dynamicButtonTextColor,
    } = useContext(UIContext);


    const [playerName, setPlayerName] = useState('');
    const [error, setError] = useState('');

    const closeModal = () => {
        setPlayerName('');
        setModalVisible(false);
    }

    const handleAddPlayer = () => {
        if (playerName.trim() === '') {
            setError('El nombre no puede estar vacío');
            return;
        }

        addPlayer(playerName);
        setPlayerName('');
    }

    useEffect(() => {
        let timeOut: NodeJS.Timeout;

        if (error) {
            timeOut = setTimeout(() => {
                setError('');
            }, 3000);
        }

        return () => clearTimeout(timeOut);
    }, [error]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { backgroundColor: dynamicCardBackgroundColor }]}>
                    <View style={styles.modalHeader}>

                        <Text style={[styles.modalHeaderText, { color: 'white' }]}>Nuevo jugador</Text>

                        <TouchableOpacity onPress={closeModal} style={styles.closeModalButton}>
                            <AntDesign name="closecircle" size={24} color={dynamicTextColor} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalContent}>

                        <Text style={{ color: dynamicCardTextColor, marginBottom: 10 }}>Nombre del jugador</Text>
                        <TextInput
                            style={[styles.input, { color: dynamicCardTextColor, borderColor: dynamicCardTextColor }]}
                            placeholder="Introduce el nombre"
                            placeholderTextColor={dynamicCardTextColor}
                            onChangeText={setPlayerName}
                            value={playerName}
                        />

                    </View>

                    <Text style={{ color: colors.red[400], textAlign: 'center', marginVertical: 10 }}>{error}</Text>

                    <View style={styles.modalFooter}>
                        <View style={styles.bottomModalButtons}>
                            <TouchableOpacity
                                style={[styles.bottomModalButton, { backgroundColor: dynamicButtonBackgroundColor }]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={{ color: dynamicButtonTextColor, textAlign: 'center' }}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.bottomModalButton, { backgroundColor: dynamicButtonBackgroundColor }]}
                                onPress={handleAddPlayer}
                            >
                                <Text style={{ color: dynamicButtonTextColor, textAlign: 'center' }}>Añadir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 16,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeModalButton: {
        padding: 10,
        borderRadius: 10,
    },
    modalContent: {
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomModalButtons: {
        alignSelf: 'baseline',
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomModalButton: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 10,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        height: 50,
        marginBottom: 20,
    },
});