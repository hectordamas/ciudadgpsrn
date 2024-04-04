import React, {useState, useContext, useCallback} from 'react'
import {View, Text, TouchableOpacity, Image, TextInput, Modal, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView, Platform} from 'react-native'
import {icons, colores, images} from '../../constants'
import PhoneInput from "react-native-phone-number-input";
import { Appbar, Button } from 'react-native-paper';
import { Shadow } from 'react-native-shadow-2';

const {EXPO_PUBLIC_API_URL} = process.env;    
import { useFocusEffect } from '@react-navigation/native';
import { Contexto } from '../../functions/Context';

const JobsCreate = ({navigation, route}) => {
    const contexto = useContext(Contexto)
    const [job, setJob] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState(null)
    const [whatsapp_code, setWhatsapp_code] = useState('VE')
    const [whatsapp_number_code, setWhatsapp_number_code] = useState('+58')
    const [whatsapp_number, setWhatsapp_number] = useState(null)
    const [processing, setProcessing] = useState(false)
    const {commerce_id} = route.params

    const storeData = async () => {
        if(!job){
            return Alert.alert('Ha ocurrido un error', 'El cargo es obligatorio')
        }
        if(!description){
            return Alert.alert('Ha ocurrido un error', 'La descripción es obligatoria')
        }
        if(!email){
            return Alert.alert('Ha ocurrido un error', 'La correo electrónico es obligatorio')
        }
        if(!whatsapp){
            return Alert.alert('Ha ocurrido un error', 'La whatsapp es obligatorio')
        }
        setProcessing(true)
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/jobs/store`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": contexto?.token
            },
            body: JSON.stringify({
                job, description, email, whatsapp, whatsapp_code, whatsapp_number_code, whatsapp_number, commerce_id
            })
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result)
            setProcessing(false)
            Alert.alert('', 'Empleo publicado con éxito')
            navigation.navigate('JobsIndex', {commerce_id})
        })
        .catch(err => console.log(err)) 
    }

    useFocusEffect(useCallback(() => {
        setJob('')
        setDescription('')
        setEmail('')
        setWhatsapp('')
    }, []))

    return (
    <KeyboardAvoidingView 
        keyboardVerticalOffset={60}
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        style={{flex:1, backgroundColor: '#fff'}}>
        <Modal visible={processing} transparent={true}>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)'}}>
                <ActivityIndicator color={'#fff'} size={60}/>
            </View>
        </Modal>
        <Appbar.Header statusBarHeight={0} style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
              shadowColor: '#000',      // Color de la sombra (iOS)
              shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
              shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
              shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
              <Appbar.BackAction onPress={() => navigation.goBack()} />
              <Appbar.Content title={<Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:15}}>Publicar un Nuevo Empleo</Text>} />
        </Appbar.Header>

        <ScrollView style={{paddingHorizontal: 20}}>

            <View style={{alignItems: 'center'}}>
                <Image source={images.cv} style={{height: 150}} resizeMode='contain'/>
            </View>
            
            <View style={{marginBottom: 20}}>
                <Text style={{fontFamily: 'inter-medium', marginBottom: 5}}>Cargo:</Text>
                <TextInput value={job} onChangeText={(val) => setJob(val)} style={{borderWidth: .2, borderColor: '#757575', borderRadius: 3, paddingHorizontal: 10, paddingVertical: 5}}/>
            </View>

            <View style={{marginBottom: 20}}>
                <Text style={{fontFamily: 'inter-medium', marginBottom: 5}}>Descripción del Cargo:</Text>
                <TextInput value={description} onChangeText={(val) => setDescription(val)} style={{borderWidth: .2, borderColor: '#757575', borderRadius: 3, paddingHorizontal: 10, paddingVertical: 5}} multiline />
            </View>

            <View style={{marginBottom: 20}}>
                <Text style={{fontFamily: 'inter-medium', marginBottom: 5}}>Correo Electrónico de Contacto:</Text>
                <TextInput value={email} onChangeText={(val) => setEmail(val)} style={{borderWidth: .2, borderColor: '#757575', borderRadius: 3, paddingHorizontal: 10, paddingVertical: 5}}/>
            </View>

            <View style={{marginBottom:20, width:'100%'}}>
               <View>
                   <Text style={{marginBottom: 5, fontFamily:'inter-medium', fontSize: 12}}>WhatsApp de Contacto:</Text>
               </View>
               <PhoneInput 
                   defaultCode={'VE'}
                   layout="first"
                   placeholder="412 1234567"
                   codeTextStyle={{fontSize:12}}
                   flagButtonStyle ={{fontSize:15}}
                   textContainerStyle={{backgroundColor:'#fff', paddingVertical:0}}
                   textInputStyle={{fontFamily:'inter', fontSize:12, marginTop:5, paddingVertical:5}}
                   containerStyle={{borderWidth:0.2, borderRadius:2, width:'100%', paddingVertical:2}}
                   onChangeCountry={val => { 
                        setWhatsapp_code(val.cca2)
                        setWhatsapp_number_code(val.callingCode)
                   }}
                   onChangeText={val => setWhatsapp_number(val) }
                   onChangeFormattedText={val => setWhatsapp(val) }
               />                            
            </View>


        </ScrollView>       

        <Shadow style={{width: '100%'}} containerStyle={{width: '100%'}}>
           <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
               <Button 
                   icon={'briefcase-outline'} 
                   mode='contained' 
                   labelStyle={{marginVertical: 15, fontFamily: 'inter-bold', letterSpacing: 0.5}} 
                   style={{backgroundColor: colores.darkButton, borderRadius: 5}} 
                   onPress={storeData}>
                 Publicar Empleo
               </Button>
           </View>
        </Shadow>
    </KeyboardAvoidingView>
    )
}

export default JobsCreate