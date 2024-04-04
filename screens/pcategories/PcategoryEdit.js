import React, {useRef, useContext, useCallback, useState} from 'react'
import { View, KeyboardAvoidingView, Platform, ScrollView, TextInput, Modal, Alert} from 'react-native'
import { ActivityIndicator, Appbar, Button, Text } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'

import { colores } from '../../constants'
import { Contexto } from '../../functions/Context'
import { Spinner } from '../../components'

const {EXPO_PUBLIC_API_URL} = process.env

const PcategoryEdit = ({route, navigation}) => {
    const {commerce_id, pcategory_id, pcategoryName} = route.params
    const [processing, setProcessing] = useState(false)
    const [name, setName] = useState(pcategoryName)
    const [loaded, setLoaded] = useState(false)
    const {token} = useContext(Contexto)
    const textinput = useRef()

    const focusTextInput = () => {
        setLoaded(true)
        setTimeout(() => {
            textinput?.current?.focus()
        }, 250)
    }
    
    const mount = useCallback(() => {
        focusTextInput()
    }, [pcategory_id])
    
    useFocusEffect(mount)

    const handleSubmit = async () => {
        setProcessing(true)
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/pcategories/${pcategory_id}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': token
            },
            body: JSON.stringify({pcategory_id, name})
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            setProcessing(false)
            navigation.canGoBack() && navigation.goBack();
            Alert.alert('', 'Categoria Actualizada con exito')

        })
        .catch((err) => console.log(err))
        .finally(() => {
            
        })
    }

    

    return (
        <KeyboardAvoidingView 
            style={{flex: 1}}
            behavior={Platform.OS == 'ios' ? 'padding' : null}
            keyboardVerticalOffset={60}
            >
            
            <Modal visible={processing} transparent>
                <View style={{flex:1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator color='#fff' size={60}/>
                    <Text style={{color: '#fff', marginTop: 20}}>Procesando Informacion</Text>
                </View>
            </Modal>

            <Appbar.Header statusBarHeight={0} style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
                  shadowColor: '#000',      // Color de la sombra (iOS)
                  shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                  shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                  shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                  <Appbar.Content title={<Text style={{fontFamily:'inter-medium', fontSize:15}}>Editar Categoria</Text>} />
            </Appbar.Header>

            { loaded ? 
            
                <ScrollView contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 20}}>

                    <View style={{borderBottomColor: colores.primaryButton, borderBottomWidth: .5, paddingVertical: 10, marginBottom: 15}}>
                        <TextInput
                            placeholderTextColor={colores.primaryButton}
                            cursorColor={colores.primaryButton}
                            placeholder='Nombre de la Categoría'
                            ref={textinput}
                            defaultValue={name}
                            onChangeText={(val) => setName(val)}
                            onSubmitEditing={handleSubmit}
                        />
                    </View>

                    <Button 
                        onPress={handleSubmit}
                        mode='contained'
                        style={{backgroundColor: colores.darkButton, marginBottom: 10, borderRadius: 5}}
                        icon={'check-all'}    
                    >Guardar Cambios</Button>

                    <Button 
                        onPress={() => navigation.navigate('PcategoryList', {commerce_id}) }
                        mode='elevated'
                        style={{borderRadius: 5}}
                        labelStyle={{fontFamily: 'inter-medium', color: colores.darkButton}}
                        icon={'format-list-bulleted-square'} 
                    >Lista de Categorias</Button>

                </ScrollView> : <Spinner />
            }
 
        </KeyboardAvoidingView>
    )
}

export default PcategoryEdit