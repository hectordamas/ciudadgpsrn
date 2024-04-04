import React, {useState, useEffect, useContext} from 'react'
import {View, Text, Image, TextInput, Alert, Modal, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { NumericFormat } from 'react-number-format';
import { Appbar, Button } from 'react-native-paper';
import { Shadow } from 'react-native-shadow-2';


import {colores} from '../../constants'
import { PcategoriesModal, Spinner } from '../../components'
import { Contexto } from '../../functions/Context';

const {EXPO_PUBLIC_API_URL} = process.env;    

const ProductsEdit = ({navigation, route}) => {
    const contexto = useContext(Contexto)
    const [loaded, setLoaded] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState('')
    const [processing, setProcessing] = useState(false)
    const [imageName, setImageName] = useState('')
    const [selectedPcategory, setSelectedPcategory] = useState(null)
    const [pcategories, setPcategories] = useState([])
    
    const [modalVisible, setModalVisible] = useState(false);

    let {product_id, commerce_id} = route.params

    const updateProduct = async () => {
        if(!name){
            return Alert.alert('Ha ocurrido un error', 'El nombre del producto es obligatorio')
        }
        if(!price || price == 0){
            return Alert.alert('Ha ocurrido un error', 'El precio debe ser mayor a 0')
        }
        setProcessing(true)

        let formData = new FormData();
        formData.append('name', name || '');
        formData.append('price', price || '');
        formData.append('image', image || '');
        formData.append('description', description || '');
        formData.append('product_id', product_id || '');
        formData.append('commerce_id', commerce_id || '');
        formData.append('pcategory_id', selectedPcategory?.id || '')

        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/products/update`, {
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
            Alert.alert('', 'Tu Producto se ha modificado con éxito')
        })
        .catch(err => console.log(err))
    }

    const fetchData = async () => {
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/products/${product_id}/edit`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
                'Authorization': contexto?.token
            }
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
            if(result.product){
                setName(result.product.name)
                setPrice(result.product.price)
                setDescription(result.product.description)
                setImageName(result.product.image)
                setSelectedPcategory(result.product?.pcategory)
                result.pcategories && setPcategories(result.pcategories)
                setLoaded(true)
            }
        })
        .catch(err => console.log(err))
    }

    pickImage = async () => {
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

    useEffect(() => {
        let isMounted = true

        setLoaded(false)
        isMounted && fetchData();
              
        return () => {
            isMounted = false
        };
    }, [product_id])

    return (
        <KeyboardAvoidingView 
                style={{flex:1, backgroundColor: '#fff'}} 
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                keyboardVerticalOffset={60}
            >

            <Modal transparent={true} visible={processing}>
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
                  <Appbar.Content title={<Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:15}}>Editar Producto</Text>} />
            </Appbar.Header>

            {
                loaded ? 
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

                    <ScrollView style={{paddingHorizontal: 20, paddingVertical: 10}}>
                        <View style={{alignItems: 'center'}}>
                            <Image source={{uri: EXPO_PUBLIC_API_URL + imageName}} style={{height: 100, width: 100}} resizeMode='contain'/>
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
                            <Text style={{fontFamily: 'roboto-medium', marginBottom: 5}}>Nombre:</Text>
                            <TextInput value={name} style={{borderWidth: .2, borderColor: '#757575', borderRadius: 3, paddingHorizontal: 10, paddingVertical: 5}} onChangeText={(text) => setName(text)}/>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <Text style={{fontFamily: 'roboto-medium', marginBottom: 5}}>Precio:</Text>
                            <TextInput value={String(price)} style={{borderWidth: .2, borderColor: '#757575', borderRadius: 3, paddingHorizontal: 10, paddingVertical: 5}} keyboardType='numeric' onChangeText={(text) => setPrice(text)}/>
                            <NumericFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={formattedValue => <Text style={{color: colores.dangerButton, fontSize: 11, fontFamily: 'roboto-bold'}}>{formattedValue}</Text>} />
                        </View>

                        <View style={{marginBottom: 20}}>
                        <Text style={{fontFamily: 'roboto-medium', marginBottom: 5}}>Descripción del Producto:</Text>
                            <TextInput  value={description} multiline style={{borderWidth: .2, borderColor: '#757575', borderRadius: 3, paddingHorizontal: 10, paddingVertical: 5}}  onChangeText={(text) => setDescription(text)} />
                        </View>

                        <View style={{marginBottom: 10}}>
                            <Button 
                                style={{borderRadius: 5}}
                                mode='contained-tonal' 
                                icon={'tray-arrow-up'} 
                                onPress={pickImage}>Cambiar Imagen del Producto</Button>

                            {image && <Text style={{marginTop: 3, marginBottom: 10}}>{image?.name}</Text>}
                        </View>

                    </ScrollView> 

                    <Shadow style={{width: '100%'}} containerStyle={{width: '100%'}}>
                       <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                           <Button 
                               icon={'note-edit-outline'} 
                               mode='contained' 
                               labelStyle={{marginVertical: 15, fontFamily: 'inter-bold', letterSpacing: 0.5}} 
                               style={{backgroundColor: colores.darkButton, borderRadius: 5}} 
                               onPress={updateProduct}>
                             Editar Producto
                           </Button>
                       </View>
                    </Shadow>
                </>
                : <Spinner />
            }      
        </KeyboardAvoidingView>
    )
}

export default ProductsEdit