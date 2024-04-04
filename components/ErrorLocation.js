import React from "react";
import { Linking, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Button , Text} from "react-native-paper";
import { colores } from "../constants";
import * as Updates from 'expo-updates';

const ErrorLocation = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LottieView
              source={require('../error-location.json')}
              autoPlay
              loop
              style={{
                width: '70%',
              }}
            />

            <View style={{width: '85%'}}>
                <Text variant="titleMedium" style={{marginBottom: 5}}>Parece que ha habido un problema al obtener tu ubicación:</Text>
                <Text style={{marginBottom: 10}}>Por favor activa tu ubicación en la configuración de tu teléfono y recarga la aplicación</Text>

                <Button 
                    mode="contained" 
                    icon={'refresh'} 
                    onPress={() => Updates.reloadAsync() }
                    style={{marginBottom: 10, borderRadius: 5}}>
                    <Text variant='titleMedium' style={{color: '#fff'}}>Recargar Aplicación</Text>
                </Button>

                <Button 
                    mode="elevated" 
                    icon={'cog'} 
                    labelStyle={{color: colores.darkButton}} 
                    onPress={() => Linking.openSettings() }
                    style={{borderRadius: 5}}>
                    <Text variant='titleMedium' style={{color: colores.darkButton}}>Ir a Configuración</Text>
                </Button>
            </View>
        </View>
    )
}

export default ErrorLocation