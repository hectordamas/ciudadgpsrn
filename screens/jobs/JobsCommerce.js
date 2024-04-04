import React, { useCallback, useState } from "react";
import { ScrollView, View, Image, TouchableOpacity } from "react-native";
import { Appbar, Button, Divider, Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Moment from "moment";
import 'moment/locale/es';

import { colores, icons } from "../../constants";
import { Spinner } from "../../components";
const {EXPO_PUBLIC_API_URL} = process.env 

const JobsCommerce = ({navigation, route}) => {
    const {commerce_id} = route.params
    const [commerce, setCommerce] = useState(null)
    const [jobs, setJobs] = useState(null)
    const [loaded, setLoaded] = useState(false)
    
    const getData = async () => {
        await fetch(`${EXPO_PUBLIC_API_URL}/api/getCommerceJobsData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({commerce_id})
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            res.commerce && setCommerce(res.commerce)
            res.jobs && setJobs(res.jobs)
            setLoaded(true)
        })
        .catch(err => console.log(err))
    }
    
    const mount = useCallback(() => {
        setLoaded(false)
        getData()
    }, [commerce_id])

    useFocusEffect(mount)

    return (
        <View style={{flex: 1}}>
            <Appbar.Header statusBarHeight={0}  style={{height: 50, elevation: 4, // Elevación de la sombra (Android)
              shadowColor: '#000', // Color de la sombra (iOS)
              shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
              shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
              shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={
                    <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                        Vacantes Disponibles
                    </Text>} 
                />
            </Appbar.Header>

            {loaded ? 
                <ScrollView contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 20}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 10}}>
                        <Image 
                          source={{ uri: EXPO_PUBLIC_API_URL + commerce?.logo }} 
                          resizeMode="contain" 
                          style={{
                                width: 100, 
                                height: 100, 
                                backgroundColor: '#e9e9e9', 
                                borderWidth: 1, 
                                borderColor: '#e9e9e9',
                                borderRadius: 100
                            }}
                        />                    
                    </View>

                    <View style={{marginBottom: 15}}>
                        <Text style={{textAlign: 'center'}} variant="titleMedium">{commerce?.name}</Text>
                    </View>

                    <View style={{marginBottom: 15, flexDirection: 'row'}}>
                        <Button 
                            style={{backgroundColor: colores.darkButton, borderRadius: 5, marginRight: 5}}
                            icon={'briefcase-outline'} 
                            mode="contained"
                            onPress={() => navigation.navigate('Jobs')}
                            >
                                <Text style={{color: '#fff', fontFamily: 'inter-bold', fontSize: 11}}>Bolsa de Empleos</Text>
                        </Button>
                        <Button 
                            style={{borderRadius: 5, marginRight: 5}}
                            labelStyle={{color: colores.darkButton}}
                            icon={'store-outline'} 
                            mode="outlined"
                            onPress={() => navigation.navigate('Commerce', {commerce_id})}
                            >
                                <Text style={{color: colores.darkButton, fontFamily: 'inter-bold', fontSize: 11}}>Volver al Perfil</Text>
                        </Button>
                    </View>

                    {jobs.length > 0 ? 
                        <View>
                            <View>
                                <Divider />
                                <Text 
                                    variant="labelLarge"
                                    style={{paddingVertical: 10}}
                                >Empleos Publicados</Text>
                                <Divider />
                            </View>

                            {
                                jobs.map(item => {
                                    return (
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
                                                <Button 
                                                    mode="contained"
                                                    icon={'arrow-right'}
                                                    contentStyle={{flexDirection: 'row-reverse'}}
                                                    style={{backgroundColor: colores.darkButton}}
                                                    labelStyle={{marginVertical: 4}}
                                                    onPress={() => {
                                                        navigation.navigate('Job', {job_id: item.id})
                                                    }}
                                                    >
                                                    <Text style={{color: '#fff', fontFamily: 'inter-medium', fontSize: 10.5}}>Ver Más</Text>
                                                </Button>
                                            </View>
                                        </View> 
                                        <Divider />
                                    </View>
                                    )
                                })
                            }
                        </View> : 
                        <View>
                            <Text style={{textAlign: 'center'}}>No hay Vacantes Disponibles para este comercio</Text>
                        </View>
                    }
                </ScrollView>
                : 
                <Spinner />
            }
        </View>
    )
}

export default JobsCommerce