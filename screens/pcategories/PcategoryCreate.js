import React, {useCallback, useContext, useRef, useState} from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, View, Modal, Alert} from 'react-native'
import { ActivityIndicator, Appbar, Button, Text } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import { colores } from '../../constants'
import { Contexto } from '../../functions/Context'
const {EXPO_PUBLIC_API_URL} = process.env;   

const PcategoryCreate = ({route, navigation}) => {
    const [name, setName] = useState('')
    const [processing, setProcessing] = useState(false)
    const {commerce_id} = route.params
    const {token} = useContext(Contexto)
    const textinput = useRef()

    const focusTextInput = () => {
        setTimeout(() => { textinput?.current?.focus() }, 250)
    }

    const mount = useCallback(() => {
        setName('')
        
        focusTextInput()
    }, [commerce_id])
    
    const handleSubmit = async () => {
        setProcessing(true)
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/pcategories/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': token
            },
            body: JSON.stringify({commerceId: commerce_id, name})
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            setProcessing(false)
            navigation.navigate('PcategoryList', {commerce_id})

            Alert.alert('', 'Categoria creada con exito!')
        })
        .catch(err => console.log(err))
    }

    useFocusEffect(mount)

    return (
        <KeyboardAvoidingView 
                style={{flex: 1}}
                keyboardVerticalOffset={60}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
            >

            <Appbar.Header statusBarHeight={0} style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
                  shadowColor: '#000',      // Color de la sombra (iOS)
                  shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                  shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                  shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                  <Appbar.Content title={<Text style={{fontFamily:'inter-medium', fontSize:15}}>Crear una Categoria</Text>} />
            </Appbar.Header>

            <Modal visible={processing} transparent>
                <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator color='#fff' size={60}/>
                </View>
            </Modal>

            <ScrollView contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 20}}>
                
                <View style={{
                        borderBottomColor: colores.primaryButton, 
                        borderBottomWidth: .5, 
                        paddingVertical: 10, 
                        marginBottom: 15
                    }}>
                    <TextInput 
                        placeholderTextColor={colores.primaryButton}
                        cursorColor={colores.primaryButton}
                        placeholder='Nombre de la Categoria' 
                        ref={textinput}
                        onSubmitEditing={handleSubmit}
                        defaultValue={name}
                        onChangeText={(val) => setName(val)}
                    />
                </View>

                <Button 
                    onPress={handleSubmit}
                    icon={'check-all'} 
                    mode='contained'
                    labelStyle={{fontFamily: 'inter-medium'}}
                    style={{
                        borderRadius: 5, 
                        backgroundColor: colores.darkButton,
                        marginBottom: 10
                    }}>Registrar Categoria</Button>

                <Button 
                    onPress={() => navigation.navigate('PcategoryList', {commerce_id}) }
                    mode='elevated'
                    style={{borderRadius: 5}}
                    labelStyle={{fontFamily: 'inter-medium', color: colores.darkButton}}
                    icon={'format-list-bulleted-square'} 
                    >Lista de Categorias</Button>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default PcategoryCreate