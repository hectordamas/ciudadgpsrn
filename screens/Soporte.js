import React from 'react'
import {View, Text, TouchableOpacity, Image, ScrollView, Modal, ActivityIndicator, Linking, Alert, KeyboardAvoidingView} from 'react-native'
import {icons, colores, images} from '../constants'
import { Spinner } from '../components'
import { Contexto } from '../functions/Context'
import * as ImagePicker from 'expo-image-picker';
import { Appbar, TextInput, Button } from 'react-native-paper'
import { Platform } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
const {EXPO_PUBLIC_API_URL} = process.env;    

class Soporte extends React.Component{

    state = {
        loaded: false,
        processing: false,
        email: '',
        name: '',
        subject: '',
        description: '',
        image: null
    }

    constructor (props) {
        super(props);
        this.ref_input2 = React.createRef();
        this.ref_input3 = React.createRef();
        this.ref_input4 = React.createRef();
    }

    static contextType = Contexto

    componentDidMount = () => {
        this.setState({email: this.context.user?.email, name: this.context.user?.name, loaded:true})
    }

    
    pickImage = async () => {
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
          
            this.setState({image: { uri: localUri, name: filename, type: type} })  
        }
    }

    handleSubmit = async () => {
        let formData = new FormData();
        formData.append('name', this.state.name || '')
        formData.append('email', this.state.email || '')
        formData.append('subject', this.state.subject || '')
        formData.append('description', this.state.description || '')
        formData.append('image', this.state.image)
        this.setState({processing: true}, async () => {
            await fetch(`${EXPO_PUBLIC_API_URL}/api/ticket/store`, {
                method: 'POST', 
                headers: {'Content-Type': 'multipart/form-data'}, 
                body: formData
            })
            .then(res => res.json())
            .then(res => this.setState({processing: false}, () => Alert.alert('Ticket creado con éxito!', 'Nos pondremos en contacto con usted por medio de su correo eletrónico')) )
            .catch(err => console.log(err))
        })

    }

    render(){
        let {loaded, email, name, image, processing} = this.state
        let {navigation} = this.props
        return (
            <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS == 'ios' ? 'padding' : null}             keyboardVerticalOffset={60} 
            >
                <Modal visible={processing} transparent={true}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0, 0.6)'}}>
                        <ActivityIndicator size={50} color={'#fff'}/>
                    </View>
                </Modal>
                <Appbar.Header  statusBarHeight={0}  style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
                  shadowColor: '#000',      // Color de la sombra (iOS)
                  shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                  shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                  shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title={
                        <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                            Crear un Ticket
                        </Text>} 
                    />
                </Appbar.Header>

                {
                    !loaded ? <Spinner /> :
                <>
                    <ScrollView style={{flex:1, backgroundColor: '#fff'}}>

                      <View style={{paddingHorizontal: 25, paddingTop: 30}}>
                        <View style={{marginBottom: 20, alignItems: 'center'}}>
                            <Image source={images.support} style={{height: 150, marginHorizontal: 'auto', marginBottom: 10}} resizeMode='contain'/>
                            <Text style={{fontFamily: 'inter-medium', fontSize: 15, marginBottom: 10, textAlign: 'center'}}>Contáctanos, te atenderemos encantados!</Text>
                            <Text style={{fontFamily: 'inter', textAlign: 'justify', fontSize: 13}}>
                            Si necesitas ayuda con nuestra aplicación, por favor envía un ticket a soporte y estaremos encantados de ayudarte.{"\n"}{"\n"}
                            Describe tu problema y adjunta cualquier captura de pantalla o información relevante que puedas proporcionarnos. 
                            Nuestro equipo de soporte revisará tu ticket lo antes posible y te proporcionará una solución. {"\n"}{"\n"}
                            ¡Gracias por tu paciencia y confianza en nosotros!
                            </Text>
                        </View>

                        <View style={{marginBottom: 20}}>
                            <Text style={{fontFamily: 'inter-medium', marginBottom: 5}}>Correo Electrónico:</Text>
                            <TextInput  
                                mode='outlined'
                                defaultValue={email}
                                onChangeText={(val) => this.setState({email: val})}
                                returnKeyType="next"
                                onSubmitEditing={() => this.ref_input2.current.focus()}
                                activeOutlineColor="#21005d"
                            />
                        </View>

                        <View style={{marginBottom: 20}}>
                            <Text style={{fontFamily: 'inter-medium', marginBottom: 5}}>Nombre:</Text>
                            <TextInput                                 
                                mode='outlined'
                                defaultValue={name}
                                onChangeText={(val) => this.setState({name: val})}
                                returnKeyType="next"
                                ref={this.ref_input2}
                                onSubmitEditing={() => this.ref_input3.current.focus()}
                                activeOutlineColor="#21005d"

                            />
                        </View>

                        <View style={{marginBottom: 20}}>
                            <Text style={{fontFamily: 'inter-medium', marginBottom: 5}}>Asunto:</Text>
                            <TextInput 
                                mode='outlined'
                                multiline
                                onChangeText={(val) => this.setState({subject: val})}
                                returnKeyType="next"
                                ref={this.ref_input3}
                                onSubmitEditing={() => this.ref_input4.current.focus()}
                                activeOutlineColor="#21005d"
                            />
                        </View>


                        <View style={{marginBottom: 20}}>
                            <Text style={{fontFamily: 'inter-medium', marginBottom: 5}}>Descripción:</Text>
                            <TextInput 
                                mode='outlined'
                                multiline
                                onChangeText={(val) => this.setState({description: val})}
                                ref={this.ref_input4}
                                activeOutlineColor="#21005d"
                            />
                        </View> 

                        <View style={{marginBottom: 20}}>
                            <Button icon={'image-outline'} mode='elevated' style={{borderRadius: 5}} labelStyle={{color: colores.darkButton}} onPress={this.pickImage}>Adjuntar</Button>
                            {image && <Text>1 archivo adjunto</Text>}
                        </View> 

                        <View style={{marginBottom: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
                            <Text style={{fontFamily: 'inter', fontSize: 13}}>o contáctanos a través de </Text> 
                            <TouchableOpacity onPress={() => Linking.openURL('mailto:soporte@ciudadgps.com')}>
                                <Text style={{color: colores.primary, fontFamily: 'inter', fontSize: 13}}>soporte@ciudadgps.com</Text>
                            </TouchableOpacity>
                        </View>

                      </View>
                    </ScrollView>
                    <Shadow style={{width: '100%'}} containerStyle={{width: '100%'}}>
                        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                            <Button 
                                icon={'send-check'} 
                                mode='contained' 
                                labelStyle={{marginVertical: 15, fontFamily: 'inter-bold', letterSpacing: 0.5}} 
                                style={{backgroundColor: colores.darkButton, borderRadius: 5}} 
                                onPress={this.handleSubmit} >
                                Enviar
                            </Button>
                        </View>
                    </Shadow>
                </>
                }
            </KeyboardAvoidingView>
        )
    }
}

export default Soporte