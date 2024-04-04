import React from 'react';
import {View, ScrollView, Image, TouchableOpacity, StyleSheet, Alert, Modal, ActivityIndicator, KeyboardAvoidingView, TextInput} from 'react-native';
import {colores, icons} from '../constants';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import PhoneInput from "react-native-phone-number-input";
import {Spinner, Success, Processing, MultiSelect, TagInput} from '../components';
import { Appbar, Button, Text } from 'react-native-paper';
const {EXPO_PUBLIC_API_URL} = process.env;    
import { Contexto } from '../functions/Context';
import { Platform } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const initialState = {
    success:false,
    error: false,
    processing:false,
    loaded:false,
    multiselectVisible:false,
    imageBrowserVisible:false,
    name: null,
    user_email:null,
    telephone_code: 'VE',
    telephone_number_code:'+58',
    telephone_number: null,
    telephone:null,
    info: null,
    logo: null,
    photos: [],
    selectedCategories: [],
    categoryName: null,
    lat: null,
    lon: null,
    whatsapp_code:'VE',
    whatsapp_number_code:'+58',
    whatsapp_number: null,
    whatsapp:null,
    facebook:null,
    twitter: null,
    instagram:null,
    tiktok: null,
    web:null,
    threads: null,
    address:null,
    youtube: null,
    logoURL: null,
    tags: {tag: '', tagsArray: []}, 
    imgs: [],
    uploading: false,
    commerce_id: null,
    photos: [],
    url: null, 
    urlName: null
}

export default class Edit extends React.Component{
    constructor (props){
        super(props)
        this.RichText = React.createRef();
    }

    state = initialState

    static contextType = Contexto

    getData = async () => {
        let {commerce_id} = this.props.route.params
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/commerce/${commerce_id}/edit`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'multipart/form-data', 
                'Authorization': this.context?.token
            },  
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            let {commerce} = res
            let {name, logo, user_email, telephone, telephone_number, telephone_code, telephone_number_code, info, category, categories, tags, 
            facebook, twitter, instagram, web, youtube, address, lat, lon, whatsapp, whatsapp_number, whatsapp_code, whatsapp_number_code, imgs, tiktok, threads, url, urlName} = commerce
            this.setState({name, logoURL: logo, user_email, telephone_number, telephone_code, telephone,telephone_number_code,
            info, selectedCategories: categories, facebook, twitter, instagram, web, youtube, address, lat, lon, whatsapp, whatsapp_number, whatsapp_code, whatsapp_number_code, imgs, tiktok, threads, url, urlName}) 
            this.setState(Object.assign(this.state.tags, {tagsArray: tags.map((t) => t.name), loaded: true}))
        }) 
        .catch(err => console.log(err))
    }
    
    handleSubmit = async () => {
        const {name, user_email, telephone, telephone_number, telephone_code, telephone_number_code, info, tags,
        selectedCategories, lat, lon, whatsapp_code, whatsapp_number, whatsapp_number_code, whatsapp, facebook, instagram, web, 
        youtube, twitter, address, rif, threads, tiktok, url, urlName} = this.state
        const {alert} = Alert
        let {commerce_id} = this.props.route.params
        if(!name){
            return alert('Campo Requerido', 'El Nombre del Negocio es obligatorio para completar el proceso de registro');
        }if(!user_email){
            return alert('Campo Requerido', 'El Correo Electrónico es obligatorio para completar el proceso de registro');
        }if(!telephone){
            return alert('Campo Requerido', 'El Número de Teléfono es obligatorio para completar el proceso de registro');
        }if(!info){
            return alert('Campo Requerido', 'los Detalles del Establemiento son obligatorios para completar el proceso de registro');
        }

        this.setState({processing:true})
        let formData = new FormData();
        formData.append('name', name || '');
        formData.append('rif', rif || '');
        formData.append('user_email', user_email || '');
        formData.append('telephone_code', telephone_code || '');
        formData.append('telephone_number', telephone_number || '');
        formData.append('telephone_number_code', telephone_number_code || '');
        formData.append('telephone', telephone || '');
        formData.append('info', info || '');
        if(selectedCategories){
            selectedCategories.map(item => formData.append('selectedCategories[]', item.id))
        }        
        let tagsCount = 0;
        tags.tagsArray.map((item) => {
            formData.append(`tags${tagsCount}`, item); 
            tagsCount++;
        })
        formData.append('tagsCount', tagsCount);
        formData.append('address', address || '');
        formData.append('youtube', youtube || '');
        formData.append('lat', lat || '');
        formData.append('lon', lon || '');
        formData.append('whatsapp_code', whatsapp_code || '');
        formData.append('whatsapp_number', whatsapp_number || '');
        formData.append('whatsapp_number_code', whatsapp_number_code || '');
        formData.append('whatsapp', whatsapp || '');
        formData.append('facebook', facebook || '');
        formData.append('instagram', instagram || '');
        formData.append('web', web || '');
        formData.append('twitter', twitter || '');
        formData.append('threads', threads || '');
        formData.append('tiktok', tiktok || '');
        formData.append('url', url || '');
        formData.append('urlName', urlName || '');

        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/commerce/${commerce_id}/update`, { 
            method: 'POST', 
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': this.context?.token
            }, 
            body: formData
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("SUCCESS RESPONSE:" + JSON.stringify(result))
            this.setState({processing:false})
            alert('', 'Información actualizada con éxito')
        })
        .catch((error) => {
            console.log("ERROR RESPONSE:" + error)
            alert('Ha ocurrido un error', 'Por favor intente su registro nuevamente', [
                { text: 'OK', onPress: () => this.setState({processing:false}) },
            ])
        })
    }

    handleDraggableMarker = ({latitude, longitude}) => this.setState({lat: latitude, lon: longitude})
    handleVisible = bool => this.setState({multiselectVisible: bool})

    handleSetSelectedCategories = selectedCategories => selectedCategories && this.setState({selectedCategories}) 
    
    updateTagState = tags => this.setState({tags})
    updatePhotos = async () => {
        let photos = this.state.photos
        this.setState({uploading: true})
        let formData = new FormData();
        let photosCount = 0;
        photos.map((item) => {
            formData.append(`photos${photosCount}`, item); 
            photosCount++;
        })
        formData.append('photosCount', photosCount);
        let {commerce_id} = this.props.route.params
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/photos/${commerce_id}/update`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': this.context?.token
            }, 
            body: formData
        })
        .then(res => res.json())
        .then((res) => {
        console.log(res)
           this.setState({imgs: res.imgs, uploading: false}, () => Alert.alert('', 'Archivos cargados con éxito!'))
        })
        .catch(err => console.log(err))
    }

    deleteImage = async (photoId) => {
        this.setState({uploading: true})
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/photos/${photoId}/destroy`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
                'Authorization': this.context?.token
            },
        })
        .then(res => res.json())
        .then(res => { console.log(res); this.setState({imgs: res.imgs, uploading: false}, () => Alert.alert('', 'Imagen eliminada con éxito!')) })
        .catch(err => console.log(err))
    }

    askForDelete = (photoId) => Alert.alert('Continuar', 'Estás seguro de eliminar esta imagen?', [ {text: 'Cancelar', style: 'cancel'}, {text: 'Aceptar', onPress: () => this.deleteImage(photoId) } ])

    updateLogo = async () => {
        this.setState({uploading: true})
        let {commerce_id} = this.props.route.params
        let formData = new FormData()
        formData.append('logo', this.state.logo)
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/logo/${commerce_id}/update`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': this.context?.token
            }, 
            body: formData
        })
        .then(res => res.json())
        .then(res => this.setState({logoURL: res.logo, uploading: false}, () => Alert.alert('', 'Logo actualizado con éxito!')) )
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
          
            this.setState({logo: { uri: localUri, name: filename, type: type} }, this.updateLogo)  
        }
    }

    pickMultipleImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            allowsMultipleSelection: true
        });

        if(!result.canceled){
            let photos = result?.assets.map((asset) => {
                let uri = asset.uri
                let name = uri.split('/').pop()
                let match = /\.(\w+)$/.exec(name);
                let type = match ? `image/${match[1]}` : `image`;
                return {uri, name, type};
            })
            this.setState({ photos }, this.updatePhotos);
        }
    }

    componentDidMount = () => {
        let {commerce_id} = this.props.route.params
        let {navigation} = this.props
        navigation.addListener('focus', () => this.setState({...initialState, commerce_id}, this.getData)) 
    }

    render(){
        const {navigation} = this.props;
        const {processing, success, loaded, multiselectVisible} = this.state
        const {categories} = this.context
        const {name, user_email, telephone_code, whatsapp_code,  info, selectedCategories, lat, lon, tags, facebook, twitter, instagram, web,
             youtube, address, telephone_number, whatsapp_number, logoURL, imgs, uploading, rif, tiktok, threads, url, urlName} = this.state

        if(success){
            return <Success navigation={navigation} />
        }

        return(
            <KeyboardAvoidingView 
                style={{flex: 1}} 
                behavior={Platform.OS == 'android' ? null : 'padding'}
                keyboardVerticalOffset={60} 

            >
            {loaded ? (
                <View style={{...styles.container}}>
                    {processing && <Processing />}

                    <Modal visible={uploading} transparent={true}>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0, 0.6)'}}>
                            <ActivityIndicator size={50} color={'#fff'}/>
                        </View>
                    </Modal>

                    <MultiSelect 
                        dataCategories={categories} 
                        modalVisible={multiselectVisible} 
                        handleVisible={this.handleVisible} 
                        handleSetSelectedCategories={this.handleSetSelectedCategories}
                    />

                    <Appbar.Header statusBarHeight={0}  style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
                      shadowColor: '#000',      // Color de la sombra (iOS)
                      shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                      shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                      shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                        <Appbar.BackAction onPress={() => navigation.goBack()} />
                        <Appbar.Content title={
                            <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                                Actualizar Información
                            </Text>} 
                        />
                    </Appbar.Header>
    
                    <ScrollView contentContainerStyle={{paddingHorizontal:15, backgroundColor:'#fff', paddingTop: 30}}>
    
                        <View style={{marginHorizontal:10}}>
    
                            <View style={{alignItems:'center', justifyContent:'center'}}>

                                <View style={{alignItems: 'center'}}>
                                    <Image source={{uri: EXPO_PUBLIC_API_URL + logoURL}} style={{width: 80, height: 80, borderRadius: 100, borderColor: '#e9e9e9', borderWidth: 1, marginBottom: 10, backgroundColor: '#e9e9e9'}}/>

                                    <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 0, backgroundColor: colores.darkButton, padding: 2, borderRadius: 5}} 
                                        onPress={this.pickImage}>
                                        <Image source={icons.camera} style={{width: 25, height: 25, tintColor: '#fff'}} onPress={this.pickImage}/>
                                    </TouchableOpacity>
                                </View>

                                <View style={{marginTop: 10, marginBottom: 20}}>
                                    <Text style={{fontSize: 16, fontFamily: 'inter-bold', textAlign: 'center'}}>{name}</Text>
                                </View>

                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Nombre del Negocio:</Text>
                                    </View>
                                    <TextInput style={styles.textInput} 
                                        onChangeText={val => this.setState({name: val}) }
                                        value={name}
                                        multiline
                                        returnKeyType='next'
                                    />
                                </View>

                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>RIF o Documento de Identidad:</Text>
                                    </View>
                                    <TextInput style={styles.textInput} 
                                        onChangeText={val => this.setState({rif: val}) }
                                        value={rif}
                                    />
                                </View>
    
                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Correo Electrónico:</Text>
                                    </View>
                                    <TextInput style={styles.textInput}  
                                        onChangeText={val => this.setState({user_email: val}) }
                                        value={user_email}
                                    />
                                </View>

                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Teléfono:</Text>
                                    </View>
                                    <PhoneInput 
                                        defaultCode={telephone_code}
                                        defaultValue={telephone_number}
                                        layout="first"
                                        placeholder="412 1234567"
                                        codeTextStyle={{fontSize:12}}
                                        textContainerStyle={{backgroundColor:'#fff', paddingVertical:0}}
                                        textInputStyle={{fontFamily:'roboto', fontSize:12, marginTop:5, paddingVertical:5}}
                                        containerStyle={{borderWidth:0.2, borderRadius:2, width:'100%', paddingVertical:2}}
                                        onChangeCountry={val => this.setState({telephone_code: val.cca2, telephone_number_code: val.callingCode})}
                                        onChangeText={val => this.setState({telephone_number: val}) }
                                        onChangeFormattedText={val => this.setState({telephone: val}) }
                                    /> 
                                </View>
    
                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Detalles:</Text>
                                    </View>
                                    <View style={{fontFamily:'roboto', paddingTop:5, paddingBottom:0}}>
                                        <TextInput 
                                            multiline
                                            defaultValue={info}
                                            onChangeText={val => this.setState({info: val}) }
                                            style={styles.textInput}
                                        />
                                    </View>
                                </View>
    
                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Categoría:</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({multiselectVisible: !multiselectVisible})} style={{borderWidth:0.2, borderRadius:2, paddingVertical:5, paddingHorizontal:10, height:40, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                        <View>
                                            <Text style={{fontFamily:'roboto'}}>Seleccionar Categorias</Text>
                                        </View>
                                        <View>
                                            <Image source={icons.dropdown} style={{width:7, height:7}}/>
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{fontFamily: 'inter-medium', fontSize: 11}}>{selectedCategories?.length > 0 && selectedCategories?.length + ' Selecionadas'}</Text>
                                </View>

                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Etiquetas:</Text>
                                    </View>
                                    <TagInput
                                        updateState={this.updateTagState}
                                        tags={tags}
                                        inputStyle={{fontSize:12, borderWidth:0.2, borderRadius:2, marginRight:0, marginLeft:0, paddingLeft:10, width:'100%', fontFamily:'roboto'}}
                                        inputContainerStyle={{paddingHorizontal:0, marginHorizontal:0, width:'100%'}}
                                        containerStyle={{paddingHorizontal:0, marginHorizontal:0, width:'100%'}}
                                        labelStyle={{color: '#000', fontFamily:'roboto', marginBottom:5, fontSize: 14}}
                                        keysForTag={','}
                                        placeholder="Separa tus etiquetas con coma (,) y espacio"                            
                                    />
                                </View>
    
                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Dirección:</Text>
                                    </View>
                                    <TextInput style={styles.textInput}  
                                        onChangeText={val => this.setState({address: val}) }
                                        value={address}
                                        multiline
                                    />
                                </View>

                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Video Promocional: </Text>
                                    </View>
                                    <TextInput style={styles.textInput}  
                                        placeholder="Youtube ID o Enlace"
                                        onChangeText={val => this.setState({youtube: val}) }
                                        value={youtube}
                                    />
                                </View>

                                <View style={{marginBottom:20, width:'100%'}}>
                                    <Text style={{marginBottom:10, fontFamily:'inter-bold', fontSize: 12}}>
                                        Señala la Ubicación del Establecimiento:
                                    </Text>
    
                                    <View>
                                        <MapView style={{width:'100%', height:300}} 
                                            region={{
                                                latitude:lat, 
                                                longitude:lon,
                                                latitudeDelta: 0.0100,
                                                longitudeDelta: 0.0100,
                                            }}
                                            provider={PROVIDER_GOOGLE}
                                            >                                 
                                            <Marker
                                               draggable
                                               title={'Tú estás aquí'}
                                               coordinate={{
                                                    latitude:lat, 
                                                    longitude:lon,
                                                }}
                                                onDragEnd={(e) => this.handleDraggableMarker(e.nativeEvent.coordinate)}
                                            />
                                        </MapView>
                                    </View>
                                </View>
    
                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Whatsapp:</Text>
                                    </View>
                                    <PhoneInput 
                                        defaultCode={whatsapp_code}
                                        defaultValue={whatsapp_number}
                                        layout="first"
                                        placeholder="412 1234567"
                                        codeTextStyle={{fontSize:12}}
                                        flagButtonStyle ={{fontSize:15}}
                                        textContainerStyle={{backgroundColor:'#fff', paddingVertical:0}}
                                        textInputStyle={{fontFamily:'roboto', fontSize:12, marginTop:5, paddingVertical:5}}
                                        containerStyle={{borderWidth:0.2, borderRadius:2, width:'100%', paddingVertical:2}}
                                        onChangeCountry={val => this.setState({whatsapp_code: val.cca2, whatsapp_number_code: val.callingCode})}
                                        onChangeText={val => this.setState({whatsapp_number: val}) }
                                        onChangeFormattedText={val => this.setState({whatsapp: val}) }
                                    />                            
                                </View>
    
                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Facebook:</Text>
                                    </View>
                                    <TextInput style={{borderWidth:0.2, borderRadius:2, paddingLeft:10, fontFamily:'roboto', paddingVertical:5}}
                                        placeholder="Enlace de Facebook"
                                        onChangeText={val => this.setState({facebook: val})}
                                        defaultValue={facebook}
                                    />
                                </View>
    
                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Instagram:</Text>
                                    </View>
                                    <TextInput style={{borderWidth:0.2, borderRadius:2, paddingLeft:10, fontFamily:'roboto', paddingVertical:5}}
                                        onChangeText={val => this.setState({instagram: val})}
                                        defaultValue={instagram}
                                        placeholder="Enlace de Instagram"
                                    />
                                </View>

                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Twitter:</Text>
                                    </View>
                                    <TextInput style={{borderWidth:0.2, borderRadius:2, paddingLeft:10, fontFamily:'roboto', paddingVertical:5}}
                                        onChangeText={val => this.setState({twitter: val})}
                                        defaultValue={twitter}
                                        placeholder="Enlace de Twitter"
                                    />
                                </View>

                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Tiktok:</Text>
                                    </View>
                                    <TextInput style={{borderWidth:0.2, borderRadius:2, paddingLeft:10, fontFamily:'roboto', paddingVertical:5}}
                                        onChangeText={val => this.setState({tiktok: val})}
                                        defaultValue={tiktok}
                                        placeholder="Enlace de Tiktok"
                                    />
                                </View>

                                
                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Threads:</Text>
                                    </View>
                                    <TextInput style={{borderWidth:0.2, borderRadius:2, paddingLeft:10, fontFamily:'roboto', paddingVertical:5}}
                                        onChangeText={val => this.setState({threads: val})}
                                        defaultValue={threads}
                                        placeholder="Enlace de Threads"
                                    />
                                </View>
    
                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Página Web:</Text>
                                    </View>
                                    <TextInput style={{borderWidth:0.2, borderRadius:2, paddingLeft:10, fontFamily:'roboto', paddingVertical:5}}
                                        onChangeText={val => this.setState({web: val})}
                                        defaultValue={web}
                                        placeholder="Enlace de tu Página Web"
                                    />
                                </View>

                                <View style={{marginBottom: 20, width: '100%'}}>
                                    <Text variant='titleMedium'>Enlace de Interes</Text>
                                </View>

                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Nombre del Enlace:</Text>
                                    </View>
                                    <TextInput style={{borderWidth:0.2, borderRadius:2, paddingLeft:10, fontFamily:'roboto', paddingVertical:5}}
                                        onChangeText={val => this.setState({urlName: val})}
                                        defaultValue={urlName}
                                        placeholder="Nombre del Enlace"
                                    />
                                </View>

                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>URL:</Text>
                                    </View>
                                    <TextInput style={{borderWidth:0.2, borderRadius:2, paddingLeft:10, fontFamily:'roboto', paddingVertical:5}}
                                        onChangeText={val => this.setState({url: val})}
                                        defaultValue={url}
                                        placeholder="URL del enlace"
                                    />
                                </View>

    
                                <View style={{marginBottom: 10, width:'100%'}}>
                                    <Text style={{fontSize: 16, fontFamily: 'inter-bold'}}>Imágenes del Local:</Text>
                                </View>

                                <View style={{marginBottom: 20, width:'100%', flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
                                    {
                                      imgs?.map((item) => {
                                            return (
                                                <View key={item.id} style={{padding: 2, width: 100, height: 100}}>
                                                    <TouchableOpacity style={{zIndex:10 ,backgroundColor: '#000', position: 'absolute', top: 0, right: 0, padding: 3}} onPress={() => this.askForDelete(item.id)}>
                                                      <Image source={icons.close} style={{width: 12, height: 12, tintColor: '#fff'}}/>
                                                    </TouchableOpacity>
                                                    <Image source={{uri: EXPO_PUBLIC_API_URL + item.uri}} style={{width: '100%', height: '100%', resizeMode: 'cover', backgroundColor: '#e9e9e9'}}/>
                                                </View>
                                            )
                                        }
                                      )
                                    }

                                    <View style={{padding: 2, width: 100, height: 100}}>
                                        <TouchableOpacity style={{height: '100%', backgroundColor: colores.black, width: '100%', alignItems: 'center', justifyContent: 'center'}}
                                            onPress={this.pickMultipleImages}>
                                          <Image source={icons.gallery} style={{width: 30, height: 30, resizeMode: 'contain', tintColor: colores.white}}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>


                            </View>
                        </View>
    
                    </ScrollView>

                    <Shadow style={{width: '100%'}} containerStyle={{width: '100%'}}>
                        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                            <Button 
                                icon={'content-save-all-outline'} 
                                mode='contained' 
                                labelStyle={{marginVertical: 15, fontFamily: 'inter-bold', letterSpacing: 0.5}} 
                                style={{backgroundColor: colores.darkButton, borderRadius: 5}} 
                                onPress={this.handleSubmit} >
                                Guardar Cambios
                            </Button>
                        </View>
                    </Shadow>
                </View>
                ) : <Spinner />
            }
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex:1},
    backButton: {flexDirection:'row', alignItems:'center', justifyContent:'center'},
    formGroup: {marginBottom:20, width:'100%'},
    textInput: {borderWidth: .5, borderRadius:2, paddingVertical: 7, paddingLeft:12, fontFamily:'inter', borderColor: '#bdbdbd'},
    inputFile: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: colores.black,
        borderRadius: 5
    }
})
