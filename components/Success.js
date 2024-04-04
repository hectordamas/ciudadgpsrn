import React from 'react'
import {View, Image, TouchableOpacity, Linking} from 'react-native'
import {images, colores} from '../constants'
import { Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Success = ({navigation, name}) => {
    const goToWhatsapp = async () => await Linking.openURL(`https://api.whatsapp.com/send/?phone=584129749348&text=Hola, acabo de registrar mi local "${name}" en CiudadGPS. quisiera formalizar mi registro.`);


    return (
        <View style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between', alignItems:'center', paddingHorizontal:20}}>
            <View style={{width: '100%'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Inicio') }>
                    <MaterialCommunityIcons name='close' size={40} />
                </TouchableOpacity>
            </View>
            <View style={{width:'100%'}}>
                <Image source={images.success} style={{width:'100%', height:200}} resizeMode={'contain'}/>
                <Text variant="titleLarge" style={{marginBottom: 10}}>Tu local ha sido registrado exitosamente!</Text>
                <Text style={{marginBottom: 10}}>Para formalizar tu registro en nuestra plataforma, por favor reporta tu operación vía WhatsApp. {'\n'}De esta forma validaremos tu registro.</Text>
                <TouchableOpacity onPress={goToWhatsapp} style={{borderRadius:20, paddingVertical:10, backgroundColor: colores.black, flexDirection:'row', justifyContent:'center', alignItems: 'center', borderRadius: 5, marginTop: 20}}>
                    <MaterialCommunityIcons name='whatsapp' size={25} color={'#fff'} style={{marginRight: 5}}/>
                    <Text style={{fontFamily:'inter-medium', color:'#fff', letterSpacing:0.5}}> 
                        Reportar Via WhatsApp 
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop:20, width:'100%'}}></View>
        </View>
    )
}

export default Success