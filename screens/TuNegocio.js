import React from 'react';
import {View, ScrollView, Image, TouchableOpacity, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import {colores, icons, images} from '../constants';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import PhoneInput from "react-native-phone-number-input";
import {Spinner, Success, Processing, MultiSelect, TagInput} from '../components';
import { Contexto } from '../functions/Context';
import { Appbar, Button, Text } from 'react-native-paper';
import { Shadow } from 'react-native-shadow-2';
const {EXPO_PUBLIC_API_URL} = process.env;    

const initialState = {
    success:false,
    error: false,
    processing:false,
    loaded:false,
    multiselectVisible:false,
    browserVisible:false,
    name:  null,
    user_name: null,
    user_lastname: null,
    user_email: null,
    telephone_code: 'VE',
    telephone_number_code:'+58',
    telephone_number: null,
    telephone: null,
    info:  null,
    logo: null,
    photos: [],
    selectedCategories: [],
    categoryName: null,
    lat: null,
    lon: null,
    whatsapp_code:'VE',
    whatsapp_number_code:'+58',
    whatsapp_number: null,
    whatsapp: null,
    facebook: null,
    twitter:  null,
    threads:  null,
    tiktok: null,
    instagram: null,
    web: null,
    selectedPayment: "Efectivo",
    address: null,
    youtube:  null,
    rif: null,
    tags: {
        tag: '',
        tagsArray: []
    },
    categories: [],
    url: null,
    urlName: null
}

export default class TuNegocio extends React.Component{
    constructor (props){
        super(props)
        this.RichText = React.createRef();
        this.name = React.createRef();
        this.userName = React.createRef();
    }

    state = initialState

    static contextType = Contexto

    componentDidMount = () => {
        this.setState({loaded: false, success: false})
        this.props.navigation.addListener("focus", async () => {
            await fetch(`${EXPO_PUBLIC_API_URL}/api/categories`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'X-Requested-With' : 'XMLHttpRequest'},
            })
            .then(r => r.json())
            .then(res => {  
                const {latitude, longitude} = this.context.location.coords;
                if(res.categories){
                    this.setState({lat: latitude, lon: longitude, categories: res.categories, loaded: true, success: false})
                }          
            })
            .catch((e) => console.log(e))
        });
    }
    
    handleSubmit = async () => {
        const {name, user_name, user_email, user_lastname, telephone, telephone_number, telephone_code, telephone_number_code, info, logo, tags,
        selectedCategories, lat, lon, whatsapp_code, whatsapp_number, whatsapp_number_code, whatsapp, facebook, instagram, web, selectedPayment, youtube, twitter
        , address, rif, photos, tiktok, threads, url, urlName} = this.state
        const {user} = this.context
        if(!name){
            return Alert.alert('Campo Requerido', 'El Nombre del Negocio es obligatorio para completar el proceso de registro');
        }if(!user_name){
            return Alert.alert('Campo Requerido', 'El Nombre es obligatorio para completar el proceso de registro');
        }if(!rif){
            return Alert.alert('Campo Requerido', 'El RIF o Documento de Identidad es obligatorio para completar el proceso de registro');
        }if(!user_email){
            return Alert.alert('Campo Requerido', 'El Correo Electrónico es obligatorio para completar el proceso de registro');
        }if(!user_lastname){
            return Alert.alert('Campo Requerido', 'El Apellido es obligatorio para completar el proceso de registro');
        }if(!telephone){
            return Alert.alert('Campo Requerido', 'El Número de Teléfono es obligatorio para completar el proceso de registro');
        }if(!info){
            return Alert.alert('Campo Requerido', 'los Detalles del Establecimiento son obligatorios para completar el proceso de registro');
        }if(!logo){
            return Alert.alert('Campo Requerido', 'El logotipo del Establecimiento es obligatorio para completar el proceso de registro');
        }if(photos.length < 1){
            return Alert.alert('Campo Requerido', 'Las Fotos del Establecimiento son obligatorias para completar el proceso de registro');
        }

        this.setState({processing:true})

        let formData = new FormData();
        formData.append('name', name || '');
        formData.append('rif', rif || '');
        formData.append('user_name', user_name || '');
        formData.append('user_email', user_email || '');
        formData.append('user_lastname', user_lastname || '');
        formData.append('telephone_code', telephone_code || '');
        formData.append('telephone_number', telephone_number || '');
        formData.append('telephone_number_code', telephone_number_code || '');
        formData.append('telephone', telephone || '');
        formData.append('info', info || '');
        formData.append('logo', logo || '');
        let photosCount = 0;
        photos.map((item) => {
            formData.append(`photos${photosCount}`, item); 
            photosCount++;
        })
        formData.append('photosCount', photosCount);
        if(selectedCategories){
            selectedCategories.map(item => formData.append('selectedCategories[]', item.id))
        }
        formData.append('lat', lat);
        formData.append('lon', lon);
        formData.append('whatsapp_code', whatsapp_code || '');
        formData.append('whatsapp_number', whatsapp_number || '');
        formData.append('whatsapp_number_code', whatsapp_number_code || '');
        formData.append('whatsapp', whatsapp || '');
        formData.append('facebook', facebook || '');
        formData.append('instagram', instagram || '');
        formData.append('web', web || '');
        formData.append('payment', selectedPayment || '');
        formData.append('twitter', twitter || '');
        formData.append('tiktok', tiktok || '');
        formData.append('threads', threads || '');
        formData.append('address', address || '');
        formData.append('url', url || '');
        formData.append('urlName', urlName || '');
        formData.append('userId', user?.id || '');
        
        let tagsCount = 0;
        tags.tagsArray.map((item) => {
            formData.append(`tags${tagsCount}`, item); 
            tagsCount++;
        })
        formData.append('tagsCount', tagsCount);
        formData.append('youtube', youtube || '');

        await fetch(`${EXPO_PUBLIC_API_URL}/api/commerce/store`, { 
            method: 'POST', 
            headers: {'Content-Type': 'multipart/form-data'}, 
            body: formData
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result)
            if(result.success){
                this.setState({success: true, processing: false})
            }else{
                Alert.alert('Ha ocurrido un error', 'Por favor intente su registro nuevamente', [
                    { text: 'OK', onPress: () => this.setState({ processing: false }) },
                ])
            }
        })
        .catch((error) => {
            console.log("ERROR RESPONSE: " + error)
            Alert.alert('Ha ocurrido un error', 'Por favor intente su registro nuevamente', [
                { text: 'OK', onPress: () => this.setState({ processing:false }) },
            ])
        })
    }

    handleDraggableMarker = coord => this.setState({lat: coord.latitude, lon: coord.longitude})
    
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
          
            this.setState({logo: { uri: localUri, name: filename, type: type} })  
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
            this.setState({ photos });
        }
    }

    handleVisible = bool => this.setState({multiselectVisible: bool})

    handleSetSelectedCategories = selectedCategories => selectedCategories && this.setState({selectedCategories}) 

    updateTagState = (tags) => this.setState({tags})

    render(){
        const {navigation} = this.props;
        const {processing, success, loaded, multiselectVisible, categories} = this.state
        const {name, user_name, user_email, user_lastname, telephone_code, whatsapp_code,  info, logo, selectedCategories, lat, lon, tags, facebook, twitter, instagram, web, youtube, address, telephone_number, whatsapp_number, rif, photos, tiktok, threads, url, urlName} = this.state

        if(success){
            return <Success navigation={navigation} name={name} />
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

                    <MultiSelect 
                        dataCategories={categories} 
                        modalVisible={multiselectVisible} 
                        handleVisible={this.handleVisible} 
                        handleSetSelectedCategories={this.handleSetSelectedCategories}
                    />
                    <Appbar.Header  statusBarHeight={0}  style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
                      shadowColor: '#000',      // Color de la sombra (iOS)
                      shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                      shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                      shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                        <Appbar.BackAction onPress={() => navigation.goBack()} />
                        <Appbar.Content title={
                            <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                                Registra Tu Negocio
                            </Text>} 
                        />
                    </Appbar.Header>
    
                    <ScrollView style={{paddingHorizontal:20, backgroundColor:'#fff'}} contentContainerStyle={{paddingBottom: 10}}>
    
                        <View style={{marginHorizontal:10}}>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <Image source={images.agreement} style={{width:320, height:280}}/>
                            </View>
    
                            <View style={{marginBottom:10}}>
                                <Text style={{fontSize:20, fontFamily:'inter-medium'}}>Registra Tu Negocio:</Text>
                            </View>
                            <View style={{marginBottom:20}}>
                                <Text style={{fontSize:15, fontFamily:'inter'}}>¡Regístrate y comienza a promocionar tu negocio junto a nosotros!</Text>
                            </View>
    
                            <View style={{alignItems:'center', justifyContent:'center'}}>
    
                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Nombre del Negocio: <Text style={{color: 'red', fontSize: 18}}>*</Text></Text>
                                    </View>
                                    <TextInput style={styles.textInput} 
                                        onChangeText={val => this.setState({name: val}) }
                                        value={name}
                                        returnKeyType='next'
                                    />
                                </View>

                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>RIF o Documento de Identidad: <Text style={{color: 'red', fontSize: 18}}>*</Text></Text>
                                    </View>
                                    <TextInput style={styles.textInput} 
                                        onChangeText={val => this.setState({rif: val}) }
                                        value={rif}
                                        returnKeyType='next'
                                    />
                                </View>
    
                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Nombre: <Text style={{color: 'red', fontSize: 18}}>*</Text></Text>
                                    </View>
                                    <TextInput style={styles.textInput} 
                                        onChangeText={val => this.setState({user_name: val}) }
                                        autoComplete="name"
                                        value={user_name}
                                        returnKeyType='next'
                                    />
                                </View>
    
                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Apellido: <Text style={{color: 'red', fontSize: 18}}>*</Text></Text>
                                    </View>
                                    <TextInput style={styles.textInput} 
                                        onChangeText={val => this.setState({user_lastname: val}) }
                                        value={user_lastname}
                                        returnKeyType='next'
                                    />
                                </View>
    
                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Correo Electrónico: <Text style={{color: 'red', fontSize: 18}}>*</Text></Text>
                                    </View>
                                    <TextInput style={styles.textInput}  
                                        onChangeText={val => this.setState({user_email: val}) }
                                        value={user_email}
                                        autoComplete="email"
                                        returnKeyType='next'
                                    />
                                </View>

                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Teléfono Fijo o Móvil: <Text style={{color: 'red', fontSize: 18}}>*</Text></Text>
                                    </View>
                                    <PhoneInput 
                                        defaultCode={telephone_code}
                                        defaultValue={telephone_number}
                                        layout="first"
                                        placeholder="412 1234567"
                                        codeTextStyle={{fontSize:12}}
                                        textContainerStyle={{backgroundColor:'#fff', paddingVertical:0}}
                                        textInputStyle={{fontFamily:'inter', fontSize:12, marginTop:5, paddingVertical:5}}
                                        containerStyle={{borderWidth:0.2, borderRadius:2, width:'100%', paddingVertical:2}}
                                        onChangeCountry={val => this.setState({telephone_code: val.cca2, telephone_number_code: val.callingCode})}
                                        onChangeText={val => this.setState({telephone_number: val}) }
                                        onChangeFormattedText={val => this.setState({telephone: val}) }
                                    /> 
                                </View>
    
                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Descripción: <Text style={{color: 'red', fontSize: 18}}>*</Text></Text>
                                    </View>
                                    <View style={{fontFamily:'inter', paddingBottom:0}}>
                                        <TextInput 
                                            defaultValue={info}
                                            onChangeText={val => this.setState({info: val}) }
                                            placeholder={'Describe tu negocio: Incluye información relevante como tus productos o servicios, la misión de tu empresa y qué la hace única en el mercado.'}
                                            style={styles.textInput}
                                            multiline
                                        />                                     
                                    </View>
                                </View>
    
                                <View style={{width:'100%', marginBottom:20}}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-medium', fontSize: 12}}>Logo del Comercio: <Text style={{color: 'red', fontSize: 18}}>*</Text></Text>
                                    </View>
                                    <Button 
                                        labelStyle={{fontFamily: 'inter-medium', fontSize: 12, marginVertical: 5}}
                                        mode='contained' 
                                        style={{borderRadius: 5, backgroundColor: colores.darkButton}} 
                                        icon={'image-multiple-outline'} 
                                        onPress={this.pickImage}>Adjuntar</Button>
                                    {logo && <Text> {logo.name}</Text>}
                                </View>
    

                                <View style={{width:'100%', marginBottom:20}}>
                                    <View>
                                        <Text style={{marginBottom: 5, fontFamily:'inter-medium', fontSize: 12}}>Imágenes del Local: <Text style={{color: 'red', fontSize: 18}}>*</Text></Text>
                                    </View>
                                    <Button 
                                        labelStyle={{fontFamily: 'inter-medium', fontSize: 12, marginVertical: 5}}
                                        mode='contained' 
                                        style={{borderRadius: 5, backgroundColor: colores.darkButton}} 
                                        icon={'image-multiple-outline'} 
                                        onPress={this.pickMultipleImages}>Adjuntar</Button>
                                    {photos.length > 0 && <Text style={{marginTop:5}}>{photos.length} elementos seleccionados</Text>}
                                </View>
    
                                <View style={{marginBottom:10, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Categorías: <Text style={{color: 'red', fontSize: 18}}>*</Text></Text>
                                    </View>

                                    <TouchableOpacity onPress={() => this.setState({multiselectVisible: !multiselectVisible})} style={{borderWidth:0.2, borderRadius:2, paddingVertical:5, paddingHorizontal:10, height:40, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                        <View>
                                            <Text style={{fontFamily:'inter'}}>Seleccionar Categorías</Text>
                                        </View>
                                        <View>
                                            <Image source={icons.dropdown} style={{width:7, height:7}}/>
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{fontFamily: 'inter-medium', fontSize: 11}}>{selectedCategories?.length > 0 && selectedCategories.length + ' Selecionadas'}</Text>
                                </View>

                                <View style={{marginBottom:10, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Etiquetas:</Text>
                                    </View>
                                    <TagInput
                                        updateState={this.updateTagState}
                                        tags={tags}
                                        inputStyle={{fontSize:12, borderWidth:0.2, borderRadius:2, marginRight:0, marginLeft:0, paddingLeft:10, width:'100%', fontFamily:'inter'}}
                                        inputContainerStyle={{paddingHorizontal:0, marginHorizontal:0, width:'100%'}}
                                        containerStyle={{paddingHorizontal:0, marginHorizontal:0, width:'100%'}}
                                        labelStyle={{color: '#000', fontFamily:'roboto', marginBottom:5, fontSize: 14}}
                                        keysForTag={','}
                                        placeholder="Separa tus etiquetas con coma (,) y espacio"                            
                                    />
                                </View>
    
                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Dirección:</Text>
                                    </View>
                                    <TextInput style={styles.textInput}  
                                        onChangeText={val => this.setState({address: val}) }
                                        value={address}
                                        returnKeyType='next'
                                    />
                                </View>

                                <View style={styles.formGroup}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Video Promocional:</Text>
                                    </View>
                                    <TextInput 
                                        style={styles.textInput}  
                                        placeholder="Youtube ID o Enlace a Youtube"
                                        onChangeText={val => this.setState({youtube: val}) }
                                        value={youtube}
                                        returnKeyType='next'
                                    />
                                </View>

                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Señala la Ubicación del Establecimiento:</Text>
                                    </View>
    
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
                                               coordinate={{latitude:lat, longitude:lon}}
                                               onDragEnd={(e) => this.handleDraggableMarker(e.nativeEvent.coordinate)}
                                            >
                                              <Image
                                                source={icons.marker}
                                                style={{width: 40, height: 40, tintColor: colores.primary}}
                                                resizeMode="contain"
                                              />              
                                            </Marker>
                                        </MapView>
                                    </View>
                                </View>
    
                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Whatsapp:</Text>
                                    </View>
                                    <PhoneInput 
                                        defaultCode={whatsapp_code}
                                        defaultValue={whatsapp_number}
                                        layout="first"
                                        placeholder="412 1234567"
                                        codeTextStyle={{fontSize:12}}
                                        flagButtonStyle ={{fontSize:15}}
                                        textContainerStyle={{backgroundColor:'#fff', paddingVertical:0}}
                                        textInputStyle={{fontFamily:'inter', fontSize:12, marginTop:5, paddingVertical:5}}
                                        containerStyle={{borderWidth:0.2, borderRadius:2, width:'100%', paddingVertical:2}}
                                        onChangeCountry={val => this.setState({whatsapp_code: val.cca2, whatsapp_number_code: val.callingCode})}
                                        onChangeText={val => this.setState({whatsapp_number: val}) }
                                        onChangeFormattedText={val => this.setState({whatsapp: val}) }
                                    />                            
                                </View>
    
                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Enlace de Facebook:</Text>
                                    </View>
                                    <TextInput 
                                        style={styles.textInput}  
                                        onChangeText={val => this.setState({facebook: val})}
                                        value={facebook}
                                        returnKeyType='next'
                                    />
                                </View>
    
                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Enlace de Instagram:</Text>
                                    </View>                                    
                                    <TextInput 
                                        style={styles.textInput}  
                                        onChangeText={val => this.setState({instagram: val})}
                                        value={instagram}
                                        returnKeyType='next'
                                    />
                                </View>

                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Enlace de Twitter:</Text>
                                    </View> 
                                    <TextInput 
                                        style={styles.textInput}  
                                        onChangeText={val => this.setState({twitter: val})}
                                        value={twitter}
                                        returnKeyType='next'
                                    />
                                </View>

                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Enlace de Tiktok:</Text>
                                    </View> 
                                    <TextInput 
                                        style={styles.textInput}  
                                        onChangeText={val => this.setState({tiktok: val})}
                                        value={tiktok}
                                        returnKeyType='next'
                                    />
                                </View>

                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Enlace de Threads:</Text>
                                    </View> 
                                    <TextInput 
                                        style={styles.textInput}  
                                        onChangeText={val => this.setState({threads: val})}
                                        value={threads}
                                        returnKeyType='next'
                                    />
                                </View>
    
                                <View style={{marginBottom:20, width:'100%'}}>
                                    <View>
                                        <Text style={{marginBottom: 10, fontFamily:'inter-medium', fontSize: 12}}>Enlace de Página Web:</Text>
                                    </View>
                                    <TextInput 
                                        style={styles.textInput}  
                                        onChangeText={val => this.setState({web: val})}
                                        value={web}
                                        returnKeyType='next'
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
                                        returnKeyType='next'
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
                                        returnKeyType='next'
                                    />
                                </View>
    
                            </View>
                        </View>
    
                    </ScrollView>

                    <Shadow style={{width: '100%'}} containerStyle={{width: '100%'}}>
                       <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                           <Button 
                               icon={'store-plus-outline'} 
                               mode='contained' 
                               labelStyle={{marginVertical: 15, fontFamily: 'inter-bold', letterSpacing: 0.5}} 
                               style={{backgroundColor: colores.darkButton, borderRadius: 5}} 
                               onPress={this.handleSubmit} >
                               Registra Tu Negocio
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
    formGroup: {marginBottom: 20, width:'100%'},
    textInput: {borderWidth: .5, borderRadius:2, paddingVertical: 7, paddingLeft:12, fontFamily:'roboto', borderColor: '#bdbdbd'},
})
