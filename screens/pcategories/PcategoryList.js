import React, { useCallback, useState, useContext} from 'react'
import { View, ScrollView, TouchableOpacity, Alert, Modal} from 'react-native'
import { Appbar, Button, Divider, Text, ActivityIndicator} from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { colores } from '../../constants'
import { Spinner } from '../../components'
import { Contexto } from '../../functions/Context'

const {EXPO_PUBLIC_API_URL} = process.env

const PcategoryList = ({route, navigation}) => {
    const {token} = useContext(Contexto)
    const [loaded, setLoaded] = useState(false)
    const [pcategories, setPcategories] = useState([])
    const [processing, setProcessing] = useState(false)

    const {commerce_id} = route.params

    const getPCategories = async () => {
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/pcategories`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': token
            },
            body: JSON.stringify({commerce_id})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            res.pcategories && setPcategories(res.pcategories)
            setLoaded(true)
        })
        .catch(err => console.log(err))
    }

    const handleDelete = async (id) => {
        setProcessing(true)
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/pcategories/${id}/destroy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': token
            },
            body: JSON.stringify({pcategory_id: id})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            res.pcategories && setPcategories(res.pcategories)
            setProcessing(false)
        })
        .catch(err => console.log(err))
    }

    const mount = useCallback(() => {
        setLoaded(false)
        getPCategories()
    }, [commerce_id])

    useFocusEffect(mount)

    return (
        <View style={{flex: 1}}>
            <Modal visible={processing} transparent>
                <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator color='#fff' size={60}/>
                </View>
            </Modal>

            <Appbar.Header statusBarHeight={0} style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
                  shadowColor: '#000',      // Color de la sombra (iOS)
                  shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                  shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                  shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                  <Appbar.Content title={<Text style={{fontFamily:'inter-medium', fontSize:15}}>Categorias</Text>} />
            </Appbar.Header>


            {loaded ? 
                pcategories.length > 0 ? 
                    <ScrollView contentContainerStyle={{paddingVertical: 10}}>

                        <View style={{marginVertical: 10, paddingHorizontal: 20, flexDirection: 'row'}}>
                            <Button 
                                onPress={() => navigation.navigate('PcategoryCreate', {commerce_id}) }
                                icon={'plus-box-multiple-outline'}
                                labelStyle={{fontFamily: 'inter-medium'}}
                                style={{borderRadius: 5, backgroundColor:  colores.darkButton, marginRight: 5}}
                                mode='contained'>
                                    <Text style={{color: '#fff', fontSize: 12, fontFamily: 'inter-medium'}}>Nueva Categoria</Text>
                            </Button>

                            <Button 
                                onPress={() => navigation.navigate('ProductsIndex', {commerce_id}) }
                                icon={'book-open-page-variant-outline'}
                                labelStyle={{fontFamily: 'inter-medium', color: colores.darkButton}}
                                style={{borderRadius: 5, flex: 1}}
                                mode='outlined'>
                                    <Text style={{color: colores.darkButton, fontSize: 12, fontFamily: 'inter-medium'}}>Catalogo</Text>
                            </Button>
                        </View>


                        <Text variant='titleMedium' style={{paddingHorizontal: 20, paddingVertical: 10}}>Lista de Categorias</Text>
                        <Divider />
                        {
                            pcategories.map((item) => {
                                return (
                                    <View key={item.id}>
                                        <View style={{flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 20}}>
                                            <View>
                                                <Text style={{fontFamily: 'inter-medium'}}>{item.name}</Text>
                                            </View>
                                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                               <TouchableOpacity style={{width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: colores.successButton, borderRadius: 3, marginRight: 3}}
                                                   onPress={() => navigation.navigate('PcategoryEdit', {pcategory_id: item.id, commerce_id, pcategoryName: item.name}) }
                                               >
                                                   <MaterialCommunityIcons name="square-edit-outline" size={16} color="#fff" />                                        
                                               </TouchableOpacity>
                                               <TouchableOpacity style={{width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: colores.dangerButton, borderRadius: 3}}
                                                   onPress={() => Alert.alert('Estás seguro(a) de ejecutar esta acción?', 'Si aceptas, el item seleccionado se eliminará permanentemente', [
                                                            {text: 'Cancelar', style: 'cancel'}, 
                                                            {text: 'Aceptar', onPress: () => handleDelete(item.id)} 
                                                        ])}
                                                    >
                                                   <MaterialCommunityIcons name="trash-can-outline" size={16} color="#fff" />
                                               </TouchableOpacity>
                                           </View>
                                        </View>
                                        <Divider />
                                    </View>
                                )
                            })
                        }
                    </ScrollView> : 
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{marginBottom: 20, fontFamily: 'inter'}}>No hay Categorias Disponibles aun</Text>
                        <Button 
                            onPress={() => navigation.navigate('PcategoryCreate', {commerce_id}) }
                            icon={'plus-box-multiple-outline'}
                            mode='contained'
                            labelStyle={{fontFamily: 'inter-medium'}}
                            style={{backgroundColor: colores.darkButton, borderRadius: 5, width: '80%'}}
                        >Crear Nueva Categoria</Button>
                    </View> 
                : <Spinner />
            }


        </View>
    )
}

export default PcategoryList