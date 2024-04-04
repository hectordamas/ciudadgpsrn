import React, { Component } from 'react';
import { SafeAreaView, StatusBar, Alert, Linking, Platform } from 'react-native';
import * as Font from 'expo-font';
import Main from './Main';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import * as Updates from 'expo-updates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { colores } from './constants';
import LogRocket from '@logrocket/react-native';
import LocationSpinner from './components/LocationSpinner';
import ErrorLocation from './components/ErrorLocation';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colores.primary,
    background: '#fff'
  },
};

class App extends Component {
  state = {
    location: null,
    error: false
  }

  async componentDidMount() {
    LogRocket.init('kpptgp/ciudadgps')
    await this.limpiarAsyncStorage();
    await this.getFont();
    await this.getLocationPermissions();
    await this.attemptGetLocation();
  }

  attemptGetLocation = async () => {
    await this.getLocation();
    const { location } = this.state;  
    if (!location && Platform.OS == 'android') {
      setTimeout(this.attemptGetLocation, 5000);
    }
  }

  getFont = async () => {
    await Font.loadAsync({
      'poppins': require('./assets/fonts/Poppins-Regular.ttf'),
      'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
      'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
      'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
      'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'roboto-black': require('./assets/fonts/Roboto-Black.ttf'),
      'inter-light': require('./assets/fonts/Inter-Light.ttf'),
      'inter': require('./assets/fonts/Inter-Regular.ttf'),
      'inter-medium': require('./assets/fonts/Inter-Medium.ttf'),
      'inter-bold': require('./assets/fonts/Inter-Bold.ttf'),
      'inter-black': require('./assets/fonts/Inter-Black.ttf'),
    });
  };

  getLocation = async () => {
    console.log('getLocation');
    try {
      const location = await Location.getCurrentPositionAsync({});
      console.log('Ubicación obtenida:', location);
      this.setState({location});
    } catch (error) {
      this.setState({error: true})
      console.error('Error al obtener la ubicación:', error);
    }
  };

  limpiarAsyncStorage = async () => {
    try {
      const shouldClearStorage = await AsyncStorage.getItem('shouldClearStorage');

      if (!shouldClearStorage) {
        await AsyncStorage.clear();
        await AsyncStorage.setItem('shouldClearStorage', 'true');
        console.log('Async Storage limpiado y variable de control creada exitosamente.');
      } else {
        console.log('No se requiere limpiar Async Storage.');
      }
    } catch (error) {
      console.error('Error al limpiar Async Storage:', error);
    }
  };

  getLocationPermissions = async () => {
    console.log('getLocationPermissions');
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status)
    if (status === 'granted') {
      this.getLocation();
    } else {
      console.log('Permission to access location denied');
      Alert.alert(
        'Permitir localización',
        'Para brindarte una óptima experiencia de usuario, debes permitirle a CiudadGPS acceder a tu ubicación. \n\nRecarga la aplicación cuando habilites el acceso en el panel de configuración',
        [
          { text: 'Recargar App', onPress: () => Updates.reloadAsync() },
          { text: 'Habilitar Ubicación', onPress: () => Linking.openSettings() },
        ]
      );
    }
  };

  render() {
    const { location, error } = this.state;

    if(error){
      return (
        <PaperProvider theme={theme}>
          <ExpoStatusBar style="auto" backgroundColor="transparent" translucent={true} />
          <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: StatusBar.currentHeight }}>
            <ErrorLocation />
          </SafeAreaView>    
        </PaperProvider>
      )
    }

    return (
      <PaperProvider theme={theme}>
        <ExpoStatusBar style="auto" backgroundColor="transparent" translucent={true} />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: StatusBar.currentHeight }}>
          {location ? <Main location={location} /> : <LocationSpinner /> }
        </SafeAreaView>    
      </PaperProvider>
    );
  }
}

export default App
