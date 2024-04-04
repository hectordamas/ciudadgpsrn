import React from 'react';
import {Text, StyleSheet, View, Image, Dimensions} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import {images, colores} from '../constants'

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: colores.primary,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
        fontFamily: 'inter-medium',
        fontSize: 28,
        paddingHorizontal: 35,
        marginBottom:5
    },
    subtitle: {
        fontFamily: 'inter',
        paddingHorizontal: 35,
        fontSize: 16,
    },
    slide: {
        flex:1,
        justifyContent:'center',
        backgroundColor: '#fff'
    }
});

const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="chevron-forward-outline"
          color="#fff"
          size={24}
        />
      </View>
    );
}

const _renderDoneButton = () => {
  return (
    <View style={styles.buttonCircle}>
      <Icon
        name="checkmark-done-outline"
        color={colores.white}
        size={25}
      />
    </View>
  );
}


const slides = [
  {
    key: 'one',
    title: '¡Bienvenido a CiudadGPS!',
    subtitle: '¡Somos la App que te conecta!\nDescubre todo lo que CiudadGPS tiene para ofrecerte',
    image: images.location_mobile,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Descubre locales cercanos a ti',
    subtitle: 'Explora un amplio directorio de información sobre locales establecidos en tu zona',
    image: images.map_white,
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: '¡Comienza ahora!',
    subtitle: 'Aprovecha al máximo nuestra App haciendo tu primera búsqueda',
    image: images.marker,
    backgroundColor: '#22bcb5',
  },
];


const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={{height: '30%', width: '100%', resizeMode: 'contain'}}/>
        <Image source={images.logo_ciudadgps_color} style={{height: '5%', width, resizeMode: 'contain', marginBottom:30}}/>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    );
}
  
const OnboardingScreen = ({initialize}) => {

    return <AppIntroSlider 
          renderItem={_renderItem} 
          data={slides} 
          onDone={initialize}
          renderDoneButton={_renderDoneButton}
          renderNextButton={_renderNextButton}
          activeDotStyle={{backgroundColor: colores.primary}}
      />

} 

export default OnboardingScreen;
