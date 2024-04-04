import React, {useState} from 'react'
import {View, Modal, TouchableOpacity, ScrollView, Dimensions, Alert} from 'react-native'
import { Button, Checkbox, Divider, Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { colores } from '../../constants'

const PcategoriesModal = (props) => {
    const {
        visible, setVisible, 
        pcategories, 
        setSelectedPcategory, selectedPcategory, 
    } = props
    
    const height = Dimensions.get('screen').height
    const [selectedCategory, setSelectedCategory] = useState(selectedPcategory)

    const handleSubmit = async () => {
        if(!selectedCategory){
            return Alert.alert('', 'No has seleccionado ninguna categoria')
        }
        setVisible(false)
        setSelectedPcategory(selectedCategory)
    }

    return (
        <Modal transparent visible={visible}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0, 0.5)'}}>
                <View style={{backgroundColor: '#fff', width: '90%', height: height * 0.6, borderRadius: 5}}>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 15, padding: 15}}>
                        <Text 
                            variant='titleMedium' 
                            style={{fontFamily: 'inter-medium'}}>Selecciona una Categoria</Text>

                        <TouchableOpacity
                            onPress={() => { setVisible(false) }}>
                            <MaterialCommunityIcons name='close' size={25}/>
                        </TouchableOpacity>
                    </View>

                    {
                        pcategories?.length > 0 ?    
                            <>
                                <ScrollView>
                                    {pcategories.map((item) => {
                                        return (
                                            <View key={item.id}>
                                                <Checkbox.Item 
                                                    onPress={() => setSelectedCategory(item)}
                                                    label={item.name}  
                                                    status={selectedCategory?.id == item.id ? 'checked' : 'unchecked'}
                                                />
                                                <Divider />
                                            </View>
                                        )
                                    })}
                                </ScrollView>

                                <View style={{padding: 10}}>
                                    <Button 
                                        icon='check-all'
                                        mode='contained'
                                        style={{backgroundColor: colores.darkButton, borderRadius: 5}}
                                        labelStyle={{fontFamily: 'inter-bold'}}
                                        onPress={handleSubmit}
                                        >Guardar Seleccion</Button>
                                </View>
                            </> :
                            <View style={{flex: 1, justifyContent:  'center', alignItems: 'center', paddingHorizontal: 10}}>
                                <Text style={{marginBottom: 10, fontFamily: 'inter-bold', textAlign: 'center'}}>No hay Categorias Disponibles aun</Text>
                                <Text style={{textAlign: 'center'}}>Dirigete a las opciones del catalogo de productos, presiona el boton "Categorias" y selecciona la opcion "Crear Categoria"</Text>
                            </View>
                    }



                </View>

            </View>
        </Modal>
    )
}

export default PcategoriesModal