import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, TextInput, ScrollView, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { icons, colores } from '../constants';


const MultiSelect = ({ modalVisible, handleSetSelectedCategories, handleVisible, dataCategories }) => {
    const [dataFiltered, setDataFiltered] = useState(dataCategories);
    const [textFilter, setTextFilter] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleFilter = (text) => {
        setTextFilter(text);
        if (text) {
            const filteredData = dataCategories.filter((item) =>
                item.name ? item.name.toUpperCase().includes(text.toUpperCase()) : false
            );
            setDataFiltered(filteredData);
        } else {
            setDataFiltered(dataCategories);
        }
    };

    const handleToggleCategory = (category) => {
        const index = selectedCategories.findIndex((c) => c.id === category.id);

        if (index === -1) {
            setSelectedCategories([...selectedCategories, category]);
        } else {
            setSelectedCategories(selectedCategories.filter((c) => c.id !== category.id));
        }
    };

    const handleSubmit = () => {
        handleSetSelectedCategories(selectedCategories);
        handleVisible(!modalVisible);
    };

    return (
        <Modal animationType="slide" visible={modalVisible} transparent={true}>
            <View style={styles.modalViewContainer}>
                <View style={styles.modalViewContainerCard}>
                    <View style={styles.titleModelviewContainer}>
                        <Text style={styles.titleModelview}>Seleccionar Elementos ({selectedCategories?.length})</Text>
                    </View>

                    <View style={styles.modalViewInputContainer}>
                        <TextInput
                            style={styles.modalViewInputSearch}
                            value={textFilter}
                            placeholder="Buscar Categoría"
                            onChangeText={handleFilter}
                        />
                    </View>

                    <ScrollView style={styles.modalScrollView}>
                        {dataFiltered.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.modalViewItem}
                                onPress={() => handleToggleCategory(item)}>
                                <View style={{maxWidth: '90%'}}>
                                    <Text style={styles.modalViewItemName}>{item.name}</Text>
                                </View>
                                <View>
                                    {selectedCategories.some((c) => c.id === item.id) && (
                                        <Image source={icons.check} style={styles.modalViewItemIcon} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.modalViewButtonSubmitContainer}>
                        <Button 
                            mode='contained' 
                            icon={'check-all'}
                            labelStyle={{fontFamily: 'inter-medium'}}
                            onPress={handleSubmit}
                        >Guardar Selección</Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalViewContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalViewContainerCard: {
        backgroundColor: '#fff',
        width: '95%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 20,
    },
    titleModelview: {
        fontSize: 15,
        fontFamily: 'inter-bold',
    },
    titleModelviewContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    modalViewInputContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    modalViewInputSearch: {
        fontFamily: 'inter',
        width: '100%',
        borderWidth: 0.5,
        borderRadius: 2,
        paddingLeft: 10,
        paddingVertical: 5,
        borderColor: '#bdbdbd'
    },
    modalScrollView: {
        height: '50%',
    },
    modalViewItem: {
        borderTopWidth: 0.2,
        borderColor: '#e9e9e9',
        paddingVertical: 10,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalViewItemIcon: {
        width: 20,
        height: 20,
    },
    modalViewItemName: {
        fontFamily: 'inter',
    },
    modalViewButtonSubmitContainer: {
        width: '100%',
        paddingTop: 20,
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalViewButtonSubmit: {
        width: '100%',
        borderRadius: 20,
        paddingVertical: 10,
        backgroundColor: colores.primary,
        flexDirection: 'row',
    },
    modalViewButtonSubmitText: {
        fontFamily: 'inter',
        color: '#fff',
    },
});

export default MultiSelect;
