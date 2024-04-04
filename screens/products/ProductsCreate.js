import React, {useState, useContext, useCallback} from 'react'
import {View, Image, TextInput, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, Modal, TouchableOpacity} from 'react-native'
import * as ImagePicker from 'expo-image-picker';

import { useFocusEffect } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';
import { Appbar, Button, Text} from 'react-native-paper';
import { NumericFormat } from 'react-number-format';

import { Contexto } from '../../functions/Context';
import {colores, images} from '../../constants'
import { Spinner, PcategoriesModal } from '../../components'

const {EXPO_PUBLIC_API_URL} = process.env;   

const ProductsCreate = ({navigation, route}) => {
    const {commerce_id} = route.params
    const contexto = useContext(Contexto)
    const [loaded, setLoaded] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState('')
    const [processing, setProcessing] = useState(false)
    const [selectedPcategory, setSelectedPcategory] = useState(null)
    const [pcategories, setPcategories] = useState([])

    const [modalVisible, setModalVisible] = useState(false);

    const createProduct = async () => {
        if(!name){
            return Alert.alert('Ha ocurrido un error', 'El nombre del producto es obligatorio')
        }
        if(!price || price == 0){
            return Alert.alert('Ha ocurrido un error', 'El precio debe ser mayor a 0')
        }
        if(!image){
            return Alert.alert('Ha ocurrido un error', 'Debes asignar una imagen a tu producto')
        }
        setProcessing(true)

        let formData = new FormData();
        formData.append('name', name || '');
        formData.append('price', price || '');
        formData.append('image', image || '');
        formData.append('description', description || '');
        formData.append('pcategory_id', selectedPcategory?.id || '')
        formData.append('commerce_id', commerce_id || '')

        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/products/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Requested-With' : 'XMLHttpRequest',
                'Authorization': contexto?.token
            },
            body: formData
        })
        .then((res) => res.json())
        .then((res) => {
            setProcessing(false)
            console.log(res)
            navigation.navigate('ProductsIndex', {commerce_id})
            Alert.alert('', 'Tu Producto se ha creado con éxito')
        })
        .catch(err => console.log(err))
    }

    const getData = async () => {
        setLoaded(false)
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/products/create`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': contexto?.token
            },
            body: JSON.stringify({commerce_id})
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            setName('')
            setPrice('')
            setDescription('')
            setImage(null)
            setSelectedPcategory(null)
            res?.pcategories && setPcategories(res?.pcategories)
            setLoaded(true)
        })
        .catch((err) => console.log(err))
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });
        
        if (!result.canceled) {
            let localUri = result.uri;
            let filename = localUri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
          
            setImage({uri: localUri, name: filename, type: type})
        }
    }

    const handleMount = useCallback(() => {
        setLoaded(false)
        getData()
    }, [commerce_id])

    useFocusEffect(handleMount)

    return (
        <KeyboardAvoidingView style={{flex:1, backgroundColor: '#fff'}} 
            behavior={Platform.OS == 'ios' ? 'padding' : null}
            keyboardVerticalOffset={120}
            >

            <Modal transparent visible={processing}>
                <View style={{flex:1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={60} color={'#fff'} />
                </View>
            </Modal>


            <Appbar.Header statusBarHeight={0} style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
                  shadowColor: '#000',      // Color de la sombra (iOS)
                  shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                  shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                  shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                  <Appbar.Content title={<Text style={{fontFamily:'inter-medium', fontSize:15}}>Crear un Nuevo Producto</Text>} />
            </Appbar.Header>
            {loaded ? 
            <>
                <PcategoriesModal 
                    pcategories={pcategories}
                    setVisible={setModalVisible}
                    visible={modalVisible}
                    selectedPcategory={selectedPcategory}
                    setSelectedPcategory={setSelectedPcategory}
                    navigation={navigation}
                    commerce_id={commerce_id}
                />

                <ScrollView contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 10}}>
                    <View style={{alignItems: 'center', marginVertical: 10}}>
                        <Image source={images.empty_cart} style={{height: 150}} resizeMode='contain'/>
                    </View>

                    
                    <View style={{marginBottom: 15}}>
                        <Button 
                            mode='outlined' 
                            icon={'plus-box-multiple-outline'} 
                            labelStyle={{color: colores.darkButton}}
                            style={{borderRadius: 5}} 
                            onPress={() => setModalVisible(true)}>Selecciona una Categoria</Button>
                        {selectedPcategory && <Text style={{marginTop: 3, fontFamily: 'inter-medium', color: colores.dangerButton}}>{selectedPcategory?.name}</Text>}
                    </View>

                    <View style={{marginBottom: 20}}>
                        <Text style={{fontFamily: 'inter-medium', marginBottom: 5}}>Nombre del Producto (<Text style={{color: colores.dangerButton}}>*</Text>):</Text>
                        <TextInput defaultValue={name} style={{borderWidth: 1, borderColor: '#e9e9e9', borderRadius: 3, paddingHorizontal: 10, paddingVertical: 5}} onChangeText={(text) => setName(text)}/>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontFamily: 'inter-medium', marginBottom: 5}}>Precio (<Text style={{color: colores.dangerButton}}>*</Text>):</Text>
                        <TextInput defaultValue={price} style={{borderWidth: 1, borderColor: '#e9e9e9', borderRadius: 3, paddingHorizontal: 10, paddingVertical: 5}} keyboardType='numeric' onChangeText={(text) => setPrice(text)}/>
                        <NumericFormat defaultValue={price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={formattedValue => <Text style={{color: colores.primary, fontSize: 11, fontFamily: 'roboto-bold'}}>{formattedValue}</Text>} />
                    </View>
                    
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontFamily: 'roboto-medium', marginBottom: 5}}>Descripción del Producto:</Text>
                        <TextInput defaultValue={description}  multiline style={{borderWidth: 1, borderColor: '#e9e9e9', borderRadius: 3, paddingHorizontal: 10, paddingVertical: 5}} onChangeText={(text) => setDescription(text)}/>
                    </View>

                    <View>
                        <Button 
                            mode='contained-tonal' 
                            icon={'tray-arrow-up'} 
                            style={{borderRadius: 5}} 
                            onPress={pickImage}>Subir Imagen del Producto (<Text style={{color: colores.dangerButton}}>*</Text>)</Button>
                        {image && <Text style={{marginTop: 3, marginBottom: 10}}>{image?.name}</Text>}
                    </View>

                </ScrollView> 
                <Shadow style={{width: '100%'}} containerStyle={{width: '100%'}}>
                   <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                       <Button 
                           icon={'plus'} 
                           mode='contained' 
                           labelStyle={{marginVertical: 15, fontFamily: 'inter-bold', letterSpacing: 0.5}} 
                           style={{backgroundColor: colores.darkButton, borderRadius: 5}} 
                           onPress={createProduct}>
                         Crear Producto
                       </Button>
                   </View>
                </Shadow>
            </>
                : <Spinner />
            }      
        </KeyboardAvoidingView>
    )
}

export default ProductsCreate