import React from 'react'
import {View, Image, Text, TouchableOpacity, StatusBar, Platform} from 'react-native'
import {images, colores} from '../constants'

export default class Error extends React.Component{
    render(){
        const {navigation} = this.props
        return (
            <View style={{backgroundColor:'#fff', flex:1, justifyContent:'center', alignItems:'center', paddingHorizontal:20, paddingTop: Platform.OS == 'android' ? 0 : 50}}>
                                    <StatusBar backgroundColor={colores.white} barStyle={'dark-content'}/>

                <View style={{width:'100%', justifyContent:'center', alignItems:'center',}}>
                    <Image source={images.error} style={{width:'100%', height:300}} resizeMode={'contain'}/>
                    <Text style={{fontFamily:'inter', textAlign:'center', fontSize:15}}>Existe un error en la conexión. Por favor, reintente la solicitud.</Text>
                </View>
                <View style={{marginTop:20, width:'100%'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Inicio') } style={{borderRadius:20, paddingVertical:10, backgroundColor:colores.black, flexDirection:'row', justifyContent:'center'}}>
                        <Text style={{fontFamily:'inter-bold', color:'#fff', textTransform:'uppercase', letterSpacing:0.5}}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}