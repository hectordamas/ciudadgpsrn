import React from 'react';
import {View, Image, TextInput, Alert, ActivityIndicator, Modal, TouchableOpacity, Pressable, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import { icons, colores, images } from '../constants';
import { Appbar, Button, Divider, Text} from 'react-native-paper';
import { Contexto } from '../functions/Context';
import {ComerciosAsociadosList, Pricing, Spinner, SwipeDownModal, InstaStory} from '../components';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const {EXPO_PUBLIC_API_URL} = process.env;    

const initialState = {
    commerces: [],
    stories: [],
    loaded: false,
    emailModal: false,
    codeModal: false,
    success: false,
    image: null,
    processing: false,
    error: false,
    email: '',
    code: '',
    commerce_id: null,
    comment: '',
    managementOptions:  false,
    commerceId: null,
    commercePaid: false,
    commerceName: '',
    pricing: false
}

class ComerciosAsociados extends React.Component{
    state = initialState

    static contextType = Contexto

    getData = () => {
        console.log(this.context?.token)
        this.setState({loaded:false}, async () => {
            const {user} = this.context
            await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/comercios/asociados?user_id=${user.id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Requested-With' : 'XMLHttpRequest',
                  'Authorization': this.context?.token
                },
            }).then(res => res.json())
            .then((res) => {
                console.log(res.stories)
                this.setState({commerces: res?.commerces, stories: res?.stories, loaded:true})
            })
            .catch(err => console.log(err))
        })
    }

    sendEmail = async (resend) => {
        let {email} = this.state
        let {alert} = Alert
        if(email == ''){
            return alert('Error', 'Correo Electrónico es obligatorio')
        }
        this.setState({processing: true});
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/comercio/solicitarCodigo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
                'Authorization': this.context?.token
            },
            body: JSON.stringify({email: email})
        }).then(res => res.json()).then((res) => {
            console.log(res);
            this.setState({processing: false});
            let {error, errors, message} = res
            error && alert('Error', res.error);
            errors && alert('Error', Object.values(res.errors)[0][0]);
            message && this.setState({...res}, () => {
                let {visibleEmailModal, visibleCodeModal} = this
                if(!resend){
                    visibleEmailModal()
                    visibleCodeModal()
                } 
            })
        })
        .catch((err) => this.setState({processing: false, error: true}, () => {
            err && alert('Error', 'Ha ocurrido un error en la conexión, intenta nuevamente más tarde');
            console.log(err)
        }))
    }

    verify = async () => {
        const {alert} = Alert
        let {code, commerce_id} = this.state
        const {user} = this.context
        code == '' && alert('Error', 'Por favor, ingrese el código de verifcación')
        this.setState({processing: true});
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/comercio/comprobarCodigo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
                'Authorization': this.context?.token
            },
            body: JSON.stringify({code, commerce_id, user_id: user.id})
        })
        .then(res => res.json())
        .then((res) => {
            const {error, errors, message} = res
            this.setState({processing: false});
            error && alert('Error', res.error);
            errors && alert('Error', Object.values(res.errors)[0][0]);
            message && this.setState({success: true}, () => {
                this.visibleCodeModal()
                this.getData()
            });
        }).catch((err) => {
            this.setState({processing: false, error: true}, () => console.log(err));
        })
    } 

    visibleEmailModal = () => this.setState({emailModal: !this.state.emailModal})
    visibleCodeModal = () => this.setState({codeModal: !this.state.codeModal})
    visibleSuccess = () => this.setState({success: !this.state.success})
    visibleManagementOptions = (commerceId, commercePaid, commerceName) => this.setState({managementOptions: !this.state.managementOptions, commerceId, commercePaid, commerceName})
    setVisibleOption = () => this.setState({managementOptions: !this.state.managementOptions})
    newStory = async (id) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });    
        if (!result.canceled) {
            let localUri = result.assets[0].uri;
            let filename = localUri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
          
            this.setState({image: { uri: localUri, name: filename, type: type}, commerce_id: id})  
        }
    }

    afterDestroyStory = () => this.getData()

    componentDidMount = async () => {
        let {navigation} = this.props
        navigation.addListener("focus", () => this.setState({...initialState}, this.getData));
    }

    declineImage = () => this.setState({image: null})

    uploadStory = async () => {
        let {image, commerce_id, comment} = this.state
        let formData = new FormData();
        formData.append('image', image)
        formData.append('commerce_id', commerce_id)
        formData.append('comment', comment)
        this.setState({processing: true})

        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/newStory`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': this.context?.token
            }, 
            body: formData
        })
        .then(res => res.json())
        .then((res) => {
            this.setState({processing: false, image: null}, () => {
                Alert.alert('', 'Historia creada con éxito!')
                this.getData()
                this.context.getHomeData()
            })
        })
        .catch((e) => {
            this.setState({processing: false})
            console.log(e)
        })
    }

    setPricing = () => this.setState({pricing: !this.state.pricing})

    render(){
        const {props} = this;
        const {navigation} = props;
        let {commerces, loaded, emailModal, codeModal, success, image, processing, managementOptions, commerceId} = this.state;
        const imageModal = image ? true : false

        success && Alert.alert('Comercio asociado con éxito', 'Ahora puedes administrar la información de este comercio', [
            {text: 'Aceptar', onPress: () => this.setState({success: !success})}
        ])

        return (
            <>
                {this.state.pricing ? 
                <Pricing setPricing={this.setPricing} commerceName={this.state.commerceName} /> : 
                <View style={{flex:1}}>    
                    {//Previsualizacion de Historia
                        image &&
                        <Modal visible={imageModal} transparent={true}>
                            {!processing ? 
                            <View style={{flex: 1, backgroundColor: '#222328', alignItems: 'center', justifyContent: 'center'}}>
                                <View style={{flexDirection: 'row', marginBottom: 5, paddingHorizontal: 25, alignItems: 'center'}}>
                                       <View style={{flex: 1, alignItems: 'flex-end'}}>
                                           <TouchableOpacity style={{padding: 10, borderRadius: 50, backgroundColor: 'rgba(0,0,0,0.3)'}} onPress={this.declineImage}>
                                               <Image source={icons.close} style={{width: 20, height: 20, tintColor: '#fff'}}/>
                                           </TouchableOpacity>
                                       </View>
                                </View>
                                <Image source={{uri: image.uri}} style={{width: '100%', height: 300}} resizeMode="contain"/>

                                <KeyboardAvoidingView
                                    behavior={Platform.OS == 'ios' ? "padding" : null} 
                                    keyboardVerticalOffset={140}
                                    style={{width: '100%'}}
                                >
                                    <View style={{flexDirection: 'row', marginTop: 20, paddingHorizontal: 25, alignItems: 'center'}}>
                                        <TextInput style={{flex: 8.5, paddingVertical: 5, backgroundColor: '#075E54', paddingHorizontal: 10, borderRadius: 5, fontSize: 12, letterSpacing: .5, color: '#fff'}} 
                                            placeholder="Agrega un comentario" 
                                            placeholderTextColor={'#fff'}
                                            onChangeText={(comment) => this.setState({comment})}
                                        />
                                        <View style={{flex: 1.5, alignItems: 'flex-end'}}>
                                            <TouchableOpacity style={{padding: 10, borderRadius: 50, backgroundColor: '#128C7E'}} onPress={this.uploadStory}>
                                                <Image source={icons.send} style={{width: 20, height: 20, tintColor: '#fff'}}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </KeyboardAvoidingView>
                            </View>
                            : 
                            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center'}}>
                                <ActivityIndicator size={50} color={'#fff'}/>
                            </View>
                        }
                        </Modal> 
                    }
    
                    {/*Fomulario de envio de correo de confirmacion*/}
                    <Modal visible={emailModal} transparent={true}>
                        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent: 'center'}}>
                            {
                                !processing ?
                                <View style={{width: '90%', paddingBottom: 20, backgroundColor: '#fff'}}>
                                <View style={{alignItems: 'flex-end', paddingTop: 10, paddingRight: 10, paddingBottom: 15}}>
                                    <TouchableOpacity onPress={this.visibleEmailModal}>
                                        <Image source={icons.close} style={{width: 15, height: 15}} resizeMode={'cover'}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{alignItems: 'center'}}>
                                    <Image source={icons.email} style={{width: 50, height: 50, tintColor: colores.primary}}/>                            
                                </View>
                                <View style={{marginTop: 15, alignItems: 'center'}}>
                                    <Text style={{fontSize: 16, fontFamily: 'inter-medium'}}>Verifica tu correo electrónico:</Text>
                                </View>
                                <View style={{marginTop: 5, paddingHorizontal: 20}}>
                                    <Text style={{fontSize: 12, fontFamily: 'inter', textAlign: 'justify'}}>Ingresa el correo electrónico con el cual registraste el local que deseas asociar.</Text>
                                    <Text style={{fontSize: 12, fontFamily: 'inter', textAlign: 'justify', marginTop: 5}}>Te enviaremos un código para verificar que tu información sea correcta.</Text>
                                </View>
                                <View style={{marginTop: 10, paddingHorizontal: 20}}>
                                    <TextInput style={{borderWidth: .5, borderColor: '#bdbdbd', fontSize:13, paddingLeft: 10, fontFamily: 'inter', paddingVertical: 5}} placeholder={'Correo Electrónico'} placeholderTextColor={'#bdbdbd'}
                                        onChangeText={(email) => this.setState({email})}
                                    />
                                </View>
                                <View style={{marginTop: 10, paddingHorizontal: 20}}>
                                    <TouchableOpacity style={{backgroundColor: colores.black, width: '100%', paddingVertical: 10, alignItems: 'center'}}  onPress={() => this.sendEmail(false)}>
                                        <Text style={{color: colores.white, fontFamily: 'inter-medium', textTransform: 'uppercase', fontSize:11, letterSpacing: .8}}>Enviar</Text>
                                    </TouchableOpacity>
                                </View>
                                </View> : <ActivityIndicator size={70} color='#fff'/>
                            }
                        </View>
                    </Modal>
    
                    {/*Fomulario de codigo de verificacion*/}
                    <Modal visible={codeModal} transparent={true}>
                        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent: 'center'}}>
                            {!processing ?
                                <View style={{width: '90%', paddingBottom: 20, backgroundColor: '#fff'}}>
                                    <View style={{alignItems: 'flex-end', paddingTop: 10, paddingRight: 10, paddingBottom: 15}}>
                                        <TouchableOpacity onPress={this.visibleCodeModal}>
                                            <Image source={icons.close} style={{width: 15, height: 15}} resizeMode={'cover'}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{alignItems: 'center'}}>
                                        <Image source={icons.entrada} style={{width: 50, height: 50, tintColor: colores.primary}}/>                            
                                    </View>
                                    <View style={{marginTop: 15, alignItems: 'center'}}>
                                        <Text style={{fontSize: 16, fontFamily: 'inter-medium'}}>Revisa tu bandeja de entrada:</Text>
                                    </View>
                                    <View style={{marginTop: 5, paddingHorizontal: 20}}>
                                        <Text style={{fontSize: 12, fontFamily: 'inter'}}>Hemos enviado un código de 6 dígitos a tu correo electrónico.</Text>
                                        <Text style={{fontSize: 12, fontFamily: 'inter'}}>Ingresa tu código de verificación a continuación: </Text>
                                    </View>
                                    <View style={{marginTop: 10, paddingHorizontal: 20}}>
                                        <TextInput style={{borderWidth: .5, borderColor: '#bdbdbd', fontSize:13, paddingLeft: 10, fontFamily: 'inter', paddingVertical: 5}} placeholder={'- - - - - -'} placeholderTextColor={'#bdbdbd'}
                                            onChangeText={(code) => this.setState({code})}
                                        />
                                    </View>
                                    <View style={{marginTop: 10, paddingHorizontal: 20}}>
                                        <TouchableOpacity style={{backgroundColor: colores.black, width: '100%', paddingVertical: 10, alignItems: 'center'}} onPress={this.verify}>
                                            <Text style={{color: colores.white, fontFamily: 'inter-medium', textTransform: 'uppercase', fontSize:11, letterSpacing: .8}}>Verificar</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{marginTop: 5, paddingHorizontal: 20}}>
                                        <TouchableOpacity style={{backgroundColor: colores.white, width: '100%', paddingVertical: 10, alignItems: 'center', borderWidth: .5, borderColor: colores.black}} onPress={() => this.sendEmail(true)}>
                                            <Text style={{color: colores.black, fontFamily: 'inter-medium', textTransform: 'uppercase', fontSize:11, letterSpacing: .8}}>Reenviar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> : <ActivityIndicator size={70} color='#fff' />
                            }
                        </View>
                    </Modal>
    
                    {/* Vista */}
                    <Appbar.Header  statusBarHeight={0} style={{
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
                        <Appbar.Content title={
                            <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                                Locales Asociados
                            </Text>} 
                        />
                    </Appbar.Header>

            
                    {loaded ? (
                        <View style={{flex: 1}}>

                            {commerces?.length > 0 ? (
                                <ScrollView contentContainerStyle={{paddingTop: 10}}>
                                    <View style={{justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
                                        <Image source={images.locales_asociados} style={{height: 130}} resizeMode='contain'/>
                                    </View>
                                    <View style={{paddingHorizontal: 20}}>
                                        <Text style={{fontFamily:'inter-medium', fontSize:15, marginBottom: 5}} numberOfLines={1}>
                                            Gestiona la información de tus locales asociados
                                        </Text> 
                                    </View>
                                    <View style={{marginTop: 5, paddingHorizontal: 20, marginBottom: 10}}>
                                        <Button 
                                            mode='contained' 
                                            labelStyle={{fontFamily: 'inter-bold', marginVertical: 14, letterSpacing: 0.5}}
                                            style={{backgroundColor: colores.darkButton, borderRadius: 5}} 
                                            onPress={this.visibleEmailModal} 
                                            icon={'store-marker'}
                                            >
                                            Asociar un Local
                                        </Button>
                                    </View>

                                    {this.state.stories?.length > 0 &&
                                        <View style={{marginVertical: 5}}>
                                            <Text 
                                                variant="titleMedium" 
                                                style={{
                                                    marginHorizontal: 20, 
                                                    marginBottom: 5, 
                                                    fontFamily: 'inter-medium'
                                                }}>Tus Historias</Text>
                                            <InstaStory 
                                                data={this.state.stories}
                                                navigation={navigation}
                                                duration={10}
                                                customSwipeUpComponent={(text) => (
                                                    <>
                                                        {text &&
                                                            <View style={{backgroundColor: 'rgba(0,0,0,0.8)', position:'absolute', bottom:0, right:0, width:'100%', padding:20, zIndex: 1000}}>
                                                                <View style={{marginBottom: 15}}>
                                                                    <Text style={{color: colores.white}}>{text}</Text>
                                                                </View>
                                                            </View>
                                                        }
                                                    </>
                                                    )
                                                }
                                            />
                                        </View>
                                    }  

                                    <View>
                                        <Text 
                                            variant="titleMedium" 
                                            style={{
                                                marginHorizontal: 20, 
                                                fontFamily: 'inter-medium', 
                                                paddingTop: 10
                                            }}>Tus Locales Asociados</Text>
                                    </View>
                                    <ComerciosAsociadosList data={commerces} navigation={navigation} afterDestroyStory={this.afterDestroyStory} newStory={this.newStory} visibleManagementOptions={this.visibleManagementOptions} duration={10} />
    
                                </ScrollView>
                            ) : (
                                <View style={{flex:1 }}>
                                    <View style={{justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
                                        <Image source={images.locales_asociados} style={{height: 150}} resizeMode='contain'/>
                                        <Text style={{fontFamily: 'inter-medium'}}>Aún no tienes ningún Local asociado a tu usuario:</Text>
                                    </View>
                                    <View style={{marginTop: 5, paddingHorizontal: 20, marginBottom: 10}}>
                                        <Button 
                                            mode='contained' 
                                            style={{backgroundColor: colores.darkButton}} 
                                            onPress={this.visibleEmailModal} 
                                            icon={'store-marker'}>
                                            Asociar un Local
                                        </Button>
                                    </View>
                                </View>
                            )}
                        </View>) : <Spinner />
                    }

                    <SwipeDownModal isVisible={managementOptions} onClose={this.visibleManagementOptions} flex={0.65}>
                        <Pressable style={{alignItems: 'center', paddingBottom: 10}}>
                            <View style={{width: 40, height: 4, backgroundColor: 'gray', borderRadius: 2}}></View>
                            <View style={{marginVertical: 10}}>
                                <Text style={{fontFamily: 'inter-bold'}}>Administrar Local</Text>
                            </View>
                        </Pressable>
                        <Divider />
                        <TouchableOpacity style={{padding: 15, flexDirection: 'row'}}
                            onPress={() => {
                                this.setVisibleOption()
                                if(this.state.commercePaid){
                                    navigation.navigate('Commerce', {commerce_id: commerceId})
                                }else{
                                    this.setPricing()
                                }
                            }}
                        >
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{marginRight: 10}}>
                                    <MaterialCommunityIcons name="store-outline" size={24} color="black" />                                
                                </View> 
                                <View>
                                    <Text style={{fontFamily: 'inter-medium'}}>Ir al Perfil Comercial</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Divider />
                        <TouchableOpacity style={{padding: 15, flexDirection: 'row'}}
                            onPress={() => {
                                this.setVisibleOption()
                                if(this.state.commercePaid){
                                    navigation.navigate('Edit', {commerce_id: commerceId})
                                }else{
                                    this.setPricing()
                                }
                            }}
                        >
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{marginRight: 10}}>
                                    <MaterialCommunityIcons name="store-edit-outline" size={24} color="black" />
                                </View> 
                                <View>
                                    <Text style={{fontFamily: 'inter-medium'}}>Modificar Datos del Local</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Divider />
                        <TouchableOpacity style={{padding: 15, flexDirection: 'row'}}
                            onPress={() => {   
                                this.setVisibleOption() 
                                if(this.state.commercePaid){
                                    navigation.navigate('ProductsIndex', {commerce_id: commerceId})
                                }else{
                                    this.setPricing()
                                }
                            }}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <View style={{marginRight: 10}}>
                                    <MaterialCommunityIcons name="cart-outline" size={24} color="black" />
                                </View> 
                                <View>
                                    <Text style={{fontFamily: 'inter-medium'}}>Catálogo de Productos</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Divider />
                        <TouchableOpacity style={{padding: 15, flexDirection: 'row'}}
                            onPress={() => {
                                this.setVisibleOption()
                                if(this.state.commercePaid){
                                    navigation.navigate('JobsIndex', {commerce_id: commerceId})
                                }else{
                                    this.setPricing()
                                }
                            }}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <View style={{marginRight: 10}}>
                                    <MaterialCommunityIcons name="briefcase-edit-outline" size={24} color="black" />                                
                                </View> 
                                <View>
                                    <Text style={{fontFamily: 'inter-medium'}}>Bolsa de Empleos</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Divider />
                        <TouchableOpacity style={{padding: 15, flexDirection: 'row'}}
                            onPress={() => {
                                this.setVisibleOption()
                                if(this.state.commercePaid){
                                    navigation.navigate('HoursIndex', {commerce_id: commerceId})
                                }else{
                                    this.setPricing()
                                }
                            }}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <View style={{marginRight: 10}}>
                                    <MaterialCommunityIcons name="clock-outline" size={24} color="black" />                                
                                </View> 
                                <View>
                                    <Text style={{fontFamily: 'inter-medium'}}>Horarios de Atención</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Divider />
                        <TouchableOpacity style={{padding: 15, flexDirection: 'row'}}
                            onPress={() => {
                                this.setVisibleOption()
                                if(this.state.commercePaid){
                                    navigation.navigate('ViewReport', {commerce_id: commerceId})
                                }else{
                                    this.setPricing()
                                }
                            }}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <View style={{marginRight: 10}}>
                                    <MaterialCommunityIcons name="chart-line" size={24} color="black" />                                
                                </View> 
                                <View>
                                    <Text style={{fontFamily: 'inter-medium'}}>Visitas</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Divider />
                    </SwipeDownModal>
                </View>
                }
            </>
        )
    }

}


export default ComerciosAsociados