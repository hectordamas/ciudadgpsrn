import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { Text, Button } from 'react-native-paper';
import * as Updates from 'expo-updates';

const width = Dimensions.get('screen').width;

const LocationSpinner = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [showReload, setShowReload] = useState(false);

  const texts = [
    'Estamos Cargando tu ubicación, por favor espera...',
    'Dentro de poco podrás encontrar los comercios más cercanos a ti...',
    'Estamos buscando los datos necesarios, por favor espera...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    const timeout = setTimeout(() => {
      setShowReload(true);
    }, 9000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleReload = () => Updates.reloadAsync()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        source={require('../location-animation.json')}
        autoPlay
        loop
        style={{
          width: width - 20,
          height: 300
        }}
      />

      {showReload ? (
          <View style={{width: '70%'}}>
            <Text variant="titleMedium" style={{textAlign: 'center', marginBottom: 10}}>
              Parece que tu busqueda ha tardado mucho {'\n'} ¿Quieres recargar la aplicación?
            </Text>
            <Button onPress={handleReload} icon={'reload'}  mode='elevated'>Recargar Aplicación</Button>
          </View>
        ) : <Text variant="titleMedium" style={{ width: '70%', textAlign: 'center' }}>{texts[textIndex]}</Text>
      }
    </View>
  );
};

export default LocationSpinner;