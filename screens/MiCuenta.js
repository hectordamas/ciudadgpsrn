import React from 'react';
import {View, Text, Image, ScrollView, Alert, Modal, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { colores, images } from '../constants';
import {Spinner} from '../components';

const {EXPO_PUBLIC_API_URL} = process.env;    
import * as ImagePicker from 'expo-image-picker';
import { Appbar, Button, Divider, TextInput } from 'react-native-paper';
import { Contexto } from '../functions/Context';
import { Platform } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const initialState = {
    user: null,
    loaded: false,
    avatar: null,
    name: '',
    email: '',
    password: '',
    facebook_id: null,
    google_id: null,
    apple_id: null,
    error: false,
    processing: false,
    visible: true
}

class MiCuenta extends React.Component{
    state = initialState

    static contextType = Contexto

    uploadProfileImage = async () => {
        this.setState({processing: true})
        let formData = new FormData();
        formData.append('avatar', this.state.avatar);
        let {user} = this.props.route.params
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/avatarUpdate/${user.id}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': this.context?.token
            }, 
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            let {user} = res
            this.setState({user: user, ...user, processing: false}, () => {
                Alert.alert('', 'Foto de perfil actualizada con éxito')
                this.context.setUserChanges(user)
            })
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
            let localUri = result.assets[0].uri;
            let filename = localUri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
          
            this.setState({avatar: { uri: localUri, name: filename, type: type} }, this.uploadProfileImage)  
        }
    }

    onSubmit = async () => {
        this.setState({processing: true})
        const {user} = this.props.route.params
        let formData = new FormData();
        formData.append('name', this.state.name || '');
        formData.append('email', this.state.email || '');
        formData.append('password', this.state.password || '');
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/users/${user.id}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': this.context?.token
            },
            body: formData
        })
        .then(res => res.json())
        .then((res) => {
            if(res?.user){
                Alert.alert('','Tus datos han sido modificado con éxito');
                const {user} = res
                this.setState({user: user, ...user}, () => this.context.setUserChanges(user))
            }

            if(res.error){
              Alert.alert('Error', res.error);
            }
    
            if(res.errors){
              Alert.alert('Error', Object.values(res.errors)[0][0]);
            }
        })
        .catch(err => console.log(err))
        .finally(() => this.setState({processing: false}))
    }

    getData = async () => {
        const {user} = this.props.route.params
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/users/${user.id}/edit`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With' : 'XMLHttpRequest',
              'Authorization': this.context?.token
            },
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            this.setState({user: res.user, loaded:true, ...res.user})
        })
        .catch(err => console.log(err))
    }

    deleteAccount = async () => {
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/users/${this.state.user.id}/destroy`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With' : 'XMLHttpRequest',
              'Authorization': this.context?.token
            },
        })
        .then(res => res.json())
        .then((res) => {
            const {handleLogout} = this.context
            handleLogout();
        })
        .catch(err => console.log(err))
    }

    deleteAccountAlert = () => {
        Alert.alert('Eliminar Cuenta', 'Estás seguro de eliminar tu cuenta?', [
            {
              text: 'Cancelar',
              onPress: () => {},
              style: 'cancel',
            },
            { text: 'Eliminar Cuenta', onPress: () => this.deleteAccount() },
        ],       
        { 
            cancelable: true 
        });
    }

    componentDidMount = async () => {
        this.props.navigation.addListener("focus", () => {
          this.setState(initialState, this.getData);
        });
    }

    render(){
        const props = this.props;
        const {navigation} = props;
        const {user, loaded, name, email, password, google_id, facebook_id, apple_id, processing} = this.state;

        return (
        <KeyboardAvoidingView style={{backgroundColor:'#fff', flex:1}} behavior={Platform.OS == 'ios' ? 'padding': null}
            keyboardVerticalOffset={60} 
            >
                <Modal visible={processing} transparent={true}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0, 0.6)'}}>
                        <ActivityIndicator size={50} color={'#fff'}/>
                    </View>
                </Modal>

                <Appbar.Header  statusBarHeight={0}  style={{ height: 50, elevation: 4,             // Elevación de la sombra (Android)
                  shadowColor: '#000',      // Color de la sombra (iOS)
                  shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                  shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                  shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title={
                        <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                            Mi Cuenta
                        </Text>} 
                    />
                </Appbar.Header>
            {loaded ? (
                <>
                    <ScrollView style={{paddingHorizontal:25}}>
                        <View style={{marginTop:30, alignItems:'center'}}>
                            <Image source={user?.avatar ? {uri: user?.avatar?.startsWith('http') ? user?.avatar : EXPO_PUBLIC_API_URL + user?.avatar} : images.user_avatar_default} 
                                style={{width:100, height:100, borderRadius:50, backgroundColor:'#e9e9e9'}}/>
                        </View>

                        <View style={{marginVertical: 20, paddingHorizontal: 20}}>
                            <Button 
                                mode='contained' 
                                labelStyle={{marginVertical: 15, fontFamily: 'inter-medium'}}
                                style={{backgroundColor: colores.darkButton, borderRadius: 5}} 
                                icon={'camera-enhance-outline'} 
                                onPress={this.pickImage}
                            >Subir Foto de Perfil</Button>
                        </View>

                        <Divider />

                        <View style={{marginVertical:20}}>
                            <Text style={{fontFamily:'inter-bold', fontSize:13}}>Nombre: </Text>
                            <TextInput 
                                outlineColor='#bdbdbd'
                                activeOutlineColor="#bdbdbd"
                                contentStyle={{fontFamily: 'inter', fontSize: 13, color: colores.darkButton}}
                                style={{height: 45, justifyContent: 'center'}}
                                mode='outlined' 
                                onChangeText={(text) => this.setState({name: text})} 
                                value={name}
                                />
                        </View>

                        <View style={{marginBottom:20}}>
                            <Text style={{fontFamily:'inter-bold', fontSize:13}}>Correo Electrónico: </Text>
                            <TextInput 
                                outlineColor='#bdbdbd'
                                activeOutlineColor="#bdbdbd"
                                contentStyle={{fontFamily: 'inter', fontSize: 13, color: colores.darkButton}}
                                style={{height: 45, justifyContent: 'center'}}
                                mode='outlined' 
                                onChangeText={(text) => this.setState({email: text})} 
                                value={email}
                                editable={(facebook_id || google_id || apple_id) ? false : true} 
                                selectTextOnFocus={false}
                            />
                            {(facebook_id || google_id || apple_id) && 
                                <Text style={{fontFamily: 'inter-bold', fontSize: 11, marginTop: 5}}>Inicias sesión con {facebook_id && 'Facebook'} {google_id && 'Google'} {apple_id && 'Apple ID'}</Text>}
                        </View>

                        <View style={{marginBottom:20}}>
                            <Text style={{fontFamily:'inter-bold', fontSize:13}}>Cambiar Contraseña: </Text>
                            <TextInput 
                                secureTextEntry={this.state.visible}
                                right={this.state.visible ? 
                                    <TextInput.Icon 
                                        style={{marginTop: 10}}
                                        icon="eye" 
                                        onPress={() => this.setState({visible: !this.state.visible})} 
                                    /> : 
                                    <TextInput.Icon 
                                        style={{marginTop: 10}}
                                        icon="eye-off-outline" 
                                        onPress={() => this.setState({visible: !this.state.visible})} 
                                    />
                                }
                                outlineColor='#bdbdbd'
                                activeOutlineColor="#bdbdbd"
                                contentStyle={{fontFamily: 'inter', fontSize: 13, color: colores.darkButton}}
                                style={{height: 45, justifyContent: 'center'}}
                                mode='outlined' 
                                editable={(facebook_id || google_id  || apple_id ) ? false : true} 
                                onChangeText={(text) => this.setState({password: text})} 
                                value={password} 
                                placeholder={'Contraseña'}
                            />
                            {(facebook_id || google_id || apple_id) && 
                                <Text style={{fontFamily: 'inter-bold', fontSize: 11, marginTop: 5}}>Inicias sesión con {facebook_id && 'Facebook'} {google_id && 'Google'} {apple_id && 'Apple ID'}</Text>}
                        </View>

                    </ScrollView>
                    <Shadow style={{width: '100%'}} containerStyle={{width: '100%'}}>
                        <View style={{flexDirection:'row', paddingHorizontal: 15, paddingVertical: 15}}>
                            <View style={{flex: 1}}>
                                <Button 
                                    mode='contained'
                                    labelStyle={{marginVertical: 15}} 
                                    style={{marginRight: 5, backgroundColor: colores.darkButton, borderRadius: 5}} 
                                    icon={'content-save-all-outline'} 
                                    onPress={this.onSubmit}
                                    >Guardar</Button>
                            </View>
                            <View style={{flex: 1}}>
                                <Button 
                                    mode='contained' 
                                    labelStyle={{marginVertical: 15}}
                                    style={{backgroundColor: colores.dangerButton, borderRadius: 5}} 
                                    icon={'account-multiple-remove-outline'} 
                                    onPress={this.deleteAccountAlert}
                                    >Eliminar Cuenta</Button>
                            </View>
                        </View>
                    </Shadow>
                </>
                ) : <Spinner />}
        </KeyboardAvoidingView >
        )
    }

}


export default MiCuenta