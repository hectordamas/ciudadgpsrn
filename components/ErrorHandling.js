import React from 'react'
import {Alert} from 'react-native'
import * as Updates from "expo-updates";

export default class ErrorHandling extends React.Component{
    render(){
        return Alert.alert('Ha ocurrido un error', 'La red es inestable o hay problemas para conectar con el servidor', [
          {text: 'Recargar Aplicación', onPress: () => Updates.reloadAsync() },
        ])
    }
}