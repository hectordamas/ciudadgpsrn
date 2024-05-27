import React, { useContext, useCallback, useState, useEffect, memo } from "react";
import {View, ScrollView, Switch, Modal, ActivityIndicator, Alert} from "react-native"
import { Appbar, Button, Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { Contexto } from "../../functions/Context";
import Day from "./Day";
import { Spinner } from "../../components";
import { Shadow } from "react-native-shadow-2";
import { colores } from "../../constants";

const HoursIndex = ({navigation, route}) => {
    const {EXPO_PUBLIC_API_URL} = process.env
    const contexto = useContext(Contexto)
    const {commerce_id} = route.params
    const [days, setDays] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [hourEnable, setHourEnable] = useState(false)

    const submit = () => {
        setProcessing(true)
        setTimeout(() => {
            setProcessing(false)
            Alert.alert('', 'Tu horario se ha guardado con exito')
        }, 1000)
    }

    const setEnable = async () => {
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/setHourEnable`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': contexto?.token
            },
            body: JSON.stringify({
                hourEnable: hourEnable ? 'Y' : null, 
                commerceId: commerce_id
            })
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const handleMount = async () => {
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/hours`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': contexto?.token
            },
            body: JSON.stringify({commerceId: commerce_id})
        })
        .then(res => res.json())
        .then(res => {
            res.days && setDays(res.days)
            res.commerce && setHourEnable(res.commerce?.hourEnable ? true : false)
        })
        .catch(err => console.log(err))
        .finally(() => {
            setLoaded(true)
        })
    }

    const callback = useCallback(() => {
        setLoaded(false)
        handleMount()
    }, [commerce_id])

    useFocusEffect(callback)

    useEffect(() => {
        setEnable()
        console.log(hourEnable)
    }, [hourEnable])

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Modal visible={processing} transparent>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <ActivityIndicator color={'#fff'} size={60}/>
                </View>
            </Modal>

            <Appbar.Header statusBarHeight={0} style={{
                  height: 50, 
                  elevation: 4,             // Elevación de la sombra (Android)
                  shadowColor: '#000',      // Color de la sombra (iOS)
                  shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                  shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                  shadowRadius: 2, 
                  zIndex: 10, 
                  backgroundColor: '#fff'
                }}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={<Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:15}}>Horarios de Atención</Text>} />
            </Appbar.Header>

            {loaded ?
                <>
                    <ScrollView contentContainerStyle={{paddingVertical: 10}}>
                        <View style={{paddingHorizontal: 15}}>
                            <Text variant="titleMedium" style={{paddingVertical: 10, fontFamily: 'inter-medium'}}>Establece tus Horarios de Atención</Text>
                            <Text style={{fontFamily: 'inter', fontSize: 12}}>Selecciona los días de la semana en el que tu negocio está operativo y establece una hora de apertura y cierre por cada uno.</Text>
                        </View>

                        {days?.map((item, key) => 
                            <Day 
                                item={item} 
                                key={key} 
                                navigation={navigation} 
                                commerceId={commerce_id}
                                token={contexto?.token}
                            />)
                        }
                    </ScrollView>
                    <Shadow style={{width: '100%'}} containerStyle={{width: '100%'}}>
                       <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10}}>
                                <View>
                                    <Text style={{fontFamily: 'inter-medium'}}>Activar Horario</Text>
                                </View>
                                <View> 
                                    <Switch 
                                        trackColor={{false: '#767577', true: '#6C63FF'}}
                                        thumbColor='#f4f3f4'
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => setHourEnable(!hourEnable) }
                                        value={hourEnable}
                                    /> 
                                </View>
                            </View>

                            <View>
                                <Button
                                    onPress={submit} 
                                    mode="contained"
                                    icon={'check-all'}
                                    style={{backgroundColor: colores.darkButton, borderRadius: 5}}
                                >Guardar Cambios</Button>
                            </View>
                       </View>
                    </Shadow>
                </> : <Spinner />          
            }
        </View>
    )
}


export default memo(HoursIndex)