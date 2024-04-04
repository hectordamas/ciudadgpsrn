import React, {useState, useCallback, useContext} from 'react'
import {View, Text, TouchableOpacity, Image, ScrollView, Alert, Modal, ActivityIndicator} from 'react-native'
import { Appbar, Button, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'
import { Shadow } from 'react-native-shadow-2';
import {fetch} from 'cross-fetch'
import Moment from 'moment';
import 'moment/locale/es';

import { Contexto } from '../../functions/Context'
import {icons, images, colores} from '../../constants'
import { Spinner } from '../../components'

const {EXPO_PUBLIC_API_URL} = process.env;    

const JobsIndex = ({navigation, route}) => {
    const contexto = useContext(Contexto)
    const [jobs, setJobs] = useState([])
    const {commerce_id} = route.params
    const [loaded, setLoaded] = useState(false)
    const [processing, setProcessing] = useState(false);

    const destroyJob = async (job_id) => {
        setProcessing(true)
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/jobs/destroy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': contexto?.token
            },
            body: JSON.stringify({job_id, commerce_id}) 
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            setProcessing(false)
            setJobs(prevJobs => prevJobs.filter((item) => item.id !== job_id))
            Alert.alert('', 'Anuncio de Empleo eliminado con éxito')
        })
        .catch(e => console.log(e))
    }


    const fetchData = async () => {
        setLoaded(false)
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/getJobs?commerce_id=${commerce_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': contexto?.token
            }
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result)
            result.jobs && setJobs(result.jobs)
            setLoaded(true)
        })
        .catch(err => console.log(err))
    }

    useFocusEffect(
        useCallback(() => {
            setLoaded(false)
            fetchData()
        }, [commerce_id])    
    )

    return (
        <View style={{flex:1, backgroundColor: '#fff'}}>

            <Modal visible={processing} transparent={true}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <ActivityIndicator size={60} color={'#fff'}/>
                </View>
            </Modal>

            <Appbar.Header statusBarHeight={0}  style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
              shadowColor: '#000',      // Color de la sombra (iOS)
              shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
              shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
              shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
              <Appbar.BackAction onPress={() => navigation.goBack()} />
              <Appbar.Content title={<Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:15}}>Empleos Publicados</Text>} />
            </Appbar.Header>


            {
                loaded ? 
                <>
                    {jobs.length > 0 ? 
                        <>
                            <ScrollView contentContainerStyle={{paddingVertical: 5}}>
                                <View style={{paddingHorizontal: 20}}>
                                    {jobs.map((item) => 
                                    <View key={item.id}>
                                        <View 
                                            style={{flex:1, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, justifyContent: 'space-between'}}>
                                            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                                                <View style={{marginRight: 10}}>
                                                    <MaterialCommunityIcons name='briefcase-outline' size={40} color={colores.darkButton}/>
                                                </View>
                                                <View>
                                                    <Text numberOfLines={2} style={{fontFamily: 'inter-bold'}}>{item.title}</Text>
                                                    <Text numberOfLines={1} style={{fontSize: 12, fontFamily: 'inter-medium'}}>{item?.commerce?.name}</Text>
                                                    <Text style={{fontSize: 11}}>{Moment(item.created_at).fromNow()}</Text>
                                                </View>
                                            </View>
                                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
                                                <TouchableOpacity style={{width: 35, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: colores.darkButton, borderRadius: 3, marginRight: 5}}
                                                    onPress={() => navigation.navigate('JobsEdit', {job_id: item.id, commerce_id}) }
                                                >
                                                    <Image source={icons.edit} style={{width: 20, height: 20, tintColor: '#fff'}} resizeMode='contain'/> 
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{width: 35, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: colores.dangerButton, borderRadius: 3}}
                                                    onPress={() => Alert.alert('Estás seguro(a) de ejecutar esta acción?', 'Si aceptas, el item seleccionado se eliminará permanentemente', [{text: 'Cancelar', style: 'cancel'}, {text: 'Aceptar', onPress: () => destroyJob(item.id)} ]) }
                                                >
                                                    <Image source={icons.trash} style={{width: 20, height: 20, tintColor: '#fff'}} resizeMode='contain'/> 
                                                </TouchableOpacity>
                                            </View>
                                        </View> 
                                        <Divider />
                                    </View>
                                    )}
                                </View>
  
                            </ScrollView> 

                            <Shadow style={{width: '100%'}} containerStyle={{width: '100%'}}>
                               <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                                   <Button 
                                       icon={'briefcase-plus-outline'} 
                                       mode='contained' 
                                       labelStyle={{marginVertical: 15, fontFamily: 'inter-bold', letterSpacing: 0.5}} 
                                       style={{backgroundColor: colores.darkButton, borderRadius: 5}} 
                                       onPress={() => navigation.navigate('JobsCreate', {commerce_id})}
                                       >
                                     Publicar un Nuevo Empleo
                                   </Button>
                               </View>
                            </Shadow>

                        </>: 
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <View>
                                <Image source={images.cv} style={{height: 200}} resizeMode='contain'/>
                            </View>
                            <Text style={{textTransform: 'capitalize', fontFamily: 'inter-bold', marginBottom: 15, textAlign: 'center'}}>Aún no has publicado empleos {'\n'}en la Bolsa</Text>
                            <Button 
                                labelStyle={{marginVertical: 15, fontFamily: 'inter-bold', letterSpacing: 0.5}}
                                style={{backgroundColor: colores.darkButton, borderRadius: 5, paddingHorizontal: 15}}
                                icon={'briefcase-outline'} 
                                mode='contained' 
                                onPress={() => navigation.navigate('JobsCreate', {commerce_id})}>Publicar un Nuevo Empleo</Button>
                        </View>
                    }
                </> :  <Spinner />
            }
        </View>
    )
}

export default React.memo(JobsIndex)