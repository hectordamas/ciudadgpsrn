import React, {useCallback, useState} from 'react'
import {View, Image, Dimensions, Linking, ScrollView, StatusBar, Share, Alert} from 'react-native'
import { Spinner } from '../components'
import { Appbar, Button, IconButton, Text } from 'react-native-paper'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import { colores, images } from '../constants'

import Moment from 'moment';
import 'moment/locale/es';
const {EXPO_PUBLIC_API_URL} = process.env;    
import { useFocusEffect } from '@react-navigation/native'
const {width} = Dimensions.get('screen')

const Job = ({navigation, route}) => {
    const [job, setJob] = useState(null)
    const [loaded, setLoaded] = useState(false)
    let {job_id} = route.params
    let message = `¡Hola! Estoy interesado/a en la oferta laboral de ${job?.title} publicada en CiudadGPS. ¿Podemos hablar más sobre ella?`
    let subject = `Oferta laboral publicada en CiudadGPS: ${job?.title}` 

    const mapLink = () => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${job?.commerce.lat},${job?.commerce.lon}`)
    const shareJob = async () => {
      try {
        await Share.share({
          uri: `${EXPO_PUBLIC_API_URL}/empleos/${job.id}/redirect`, 
          title: `Empleos CiudadGPS | ${job?.name} en CiudadGPS`,
          message: `${EXPO_PUBLIC_API_URL}/empleos/${job.id}/redirect`,
        });
      } catch (error) {
        Alert.alert(error.message);
      }
    }

    const fetchData = async () => {    
      await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/jobs/${job_id}/edit`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(result => result.json())
      .then((result) => {
        if(result.job) {
          setJob(result.job)
          setLoaded(true)
          console.log(result.job)
        }
      })
      .catch(err => console.log(err))
    }    

    useFocusEffect(
      useCallback(() => {
        setLoaded(false)
        fetchData()
      }, [job_id])
    )

    return (
        <>
          {loaded ? 
              <View style={{flex:1, backgroundColor: '#fff'}}>
                  <Appbar.Header  statusBarHeight={0}  style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
                    shadowColor: '#000',      // Color de la sombra (iOS)
                    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                    shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                    shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                      <Appbar.BackAction onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Inicio')} />
                      <Appbar.Content title={
                          <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                              Bolsa de Empleos
                          </Text>} 
                      />
                      <Appbar.Action icon="magnify" onPress={() => navigation.navigate('SearchJobs')} />
                  </Appbar.Header>
      
                  <ScrollView>
                    <View style={{height: 180}}>
                      <MapView 
                        style={{width: '100%', height: 180}} 
                        initialRegion={{
                          latitude: job?.commerce?.lat, 
                          longitude: job?.commerce?.lon,
                          latitudeDelta: 0.02,
                          longitudeDelta: 0.02,
                        }}
                        provider={PROVIDER_GOOGLE}
                      >
                        <Marker coordinate={{
                          latitude: job?.commerce?.lat, 
                          longitude: job?.commerce?.lon,
                        }}/>
                      </MapView>

                      <View
                        style={{
                          position: 'absolute', 
                          top: 10, 
                          left: 10,
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          paddingHorizontal: 10, 
                          borderRadius: 10
                        }} 
                      >
                        <Image 
                          source={images.logo_ciudadgps_color}
                          resizeMode='contain'
                          style={{width: 100, height: 40}}
                        />
                      </View>

                      <Button 
                        labelStyle={{fontFamily: 'inter-bold', letterSpacing: 0.3}}
                        style={{position: 'absolute', bottom: 10, right: 10, borderRadius: 5}} 
                        mode='elevated' 
                        icon={'map-marker'}
                        onPress={mapLink}
                      >
                        Ver Ubicación
                      </Button>

                      <View style={{marginTop: -30, zIndex: 10, paddingHorizontal: 15}}>
                        <View style={{height: 80, width: 80, borderRadius: 100, elevation: 5, shadowColor: "#000",
                            shadowOffset: {
                            	width: 0,
                            	height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84
                          }}>
                          <Image 
                            source={{uri: EXPO_PUBLIC_API_URL + job?.commerce?.logo}} 
                            style={{height: 80, width: 80, backgroundColor: '#e9e9e9', borderRadius: 100}} 
                          />
                        </View>
                      </View>
                    </View>

                    <View style={{paddingHorizontal: 15}}>
                      <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 90, paddingTop: 5, justifyContent: 'space-between'}}>
                          <View style={{flexWrap: 'wrap'}}>
                            <Text numberOfLines={2} style={{fontSize: 15, fontFamily: 'inter-bold', width:  width * 0.67, textTransform: 'capitalize', marginVertical: 3}}>{job?.commerce?.name}</Text>
                            <Text numberOfLines={1} style={{fontSize: 11, fontFamily: 'inter-medium'}}>{Moment(job?.created_at).fromNow()}</Text>
                          </View>                          
                      </View>

                      <View>
                        <Text style={{marginTop: 10}}>
                          <Text style={{fontFamily: 'inter-bold'}}>Cargo: </Text>
                          <Text>{job?.title}</Text>
                        </Text>  

                        <Text style={{marginTop: 10}}>
                          <Text style={{fontFamily: 'inter-bold'}}>Detalles del Cargo: </Text>
                          <Text>{job?.description}</Text>
                        </Text> 

                        <Text style={{marginTop: 10}}>
                          <Text style={{fontFamily: 'inter-bold'}}>Dirección: </Text>
                          <Text>{job?.commerce?.address}</Text>
                        </Text> 

                      </View>

                      <View style={{marginTop: 10}}>
                        <Text style={{fontFamily: 'inter-bold'}}>Contactar a {job?.commerce?.name} </Text>
                      </View>
                          
                      <View style={{marginVertical: 10, flexDirection: 'row'}}>
                        {job?.whatsapp && 
                          <Button 
                            labelStyle={{color: colores.darkButton}}
                            style={{marginRight: 5, borderRadius: 3}} 
                            mode='elevated' 
                            icon={'whatsapp'} 
                            onPress={() => Linking.openURL(`https://api.whatsapp.com/send/?phone=${job.whatsapp}&text=${message}`)}
                          >
                            WhatsApp
                          </Button>
                        }
                        {job?.email && 
                          <Button 
                            style={{borderRadius: 3, flex:1, backgroundColor: colores.darkButton}}
                            mode='contained' 
                            icon={'email-outline'} 
                            onPress={() => Linking.openURL(`mailto:${job.email}?subject=${subject}&body=${message}`)}
                          >
                            Correo Electrónico
                          </Button>}
                      </View>

                      <View>
                        <Button 
                          onPress={() => {
                            navigation.navigate('JobsCommerce', {commerce_id: job?.commerce?.id}) 
                          }}
                          icon={'briefcase-outline'}
                          mode='outlined'
                          labelStyle={{color: colores.darkButton}}
                        >Ver Todas las Vacantes</Button>
                      </View>

                      <IconButton 
                        mode='contained'
                        containerColor={colores.primary}
                        iconColor='#fff'
                        size={18}
                        style={{position: 'absolute', top: 10, right: 10, borderRadius: 5, zIndex: 1000}} 
                        icon={'share-variant-outline'}
                        onPress={shareJob}
                      />

                    </View>
                        
                  </ScrollView>
              </View> : <Spinner />
          }
        </>
    ) 
}

export default Job