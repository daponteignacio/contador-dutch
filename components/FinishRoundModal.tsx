import { useState } from 'react';
import { View, Modal, StyleSheet, Text, Touchable, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface FinishRoundModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

export const FinishRoundModal = ({
    modalVisible,
    setModalVisible
}: FinishRoundModalProps) => {

    // TODO: Traer el obj juego y recorrer cada uno de los jugadores.

    const [points, setPoints] = useState(0);
    const [error, setError] = useState('Texto de error');

    const handleChange = (text: string) => {

        const number = parseInt(text);

        if (isNaN(number)) {
            setError('Debes ingresar un número');
            return;
        }

        setPoints(parseInt(text));
    }

    const handleAddPoints = (newPoints: number) => {
        setPoints(prev => prev + newPoints);
    }

    const handleSubtractPoints = (newPoints: number) => {
        if (points - newPoints < 0) return;
        setPoints(prev => prev - newPoints);
    }


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>Terminar ronda</Text>

                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.closeModalButton}>
                            <AntDesign name="closecircle" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalContent}>
                        <View style={{ marginBottom: 10, marginLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Juan Pérez</Text>
                            <Text>82 pts</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10,
                            gap: 1,
                        }}>
                            <TouchableOpacity style={[styles.subtractTenButton, styles.pointsButton]} onPress={() => handleSubtractPoints(10)}>
                                <Text>-10</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.oneButton, styles.pointsButton]} onPress={() => handleSubtractPoints(1)}>
                                <Text>-1</Text>
                            </TouchableOpacity>

                            <TextInput
                                value={points.toString()}
                                onChangeText={handleChange}
                                style={styles.input}
                            />

                            <TouchableOpacity style={[styles.oneButton, styles.pointsButton]} onPress={() => handleAddPoints(1)}>
                                <Text>+1</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.addTenButton, styles.pointsButton]} onPress={() => handleAddPoints(10)}>
                                <Text>+10</Text>
                            </TouchableOpacity>
                        </View>

                        { }
                        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
                    </View>

                    <View style={styles.modalFooter}>
                        <View style={styles.bottomModalButtons}>
                            <TouchableOpacity style={styles.bottomModalButton}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Anterior</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.bottomModalButton}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Siguiente</Text>
                            </TouchableOpacity>
                        </View>
                    </View>





                </View>
            </View>
        </Modal>
    )
}


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
        height: '50%',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 16,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },


    modalContent: {
        flex: 1,
    },

    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
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
    closeButtonText: {
        fontWeight: 'bold',
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
    pointsButton: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addTenButton: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    oneButton: {
    },
    subtractTenButton: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    input: {
        flex: 2,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
