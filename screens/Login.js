import React from 'react';
import {View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform} from 'react-native';
import {colores, images} from '../constants';
import {Spinner, ErrorHandling, FacebookLogin, GoogleLogin, AppleLogin, Reestablecer} from '../components';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { Button, Appbar } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Contexto } from '../functions/Context';
import { KeyboardAvoidingView } from 'react-native';

const {EXPO_PUBLIC_API_URL} = process.env;    

class Login extends React.Component{
    constructor (props){
        super(props);
        this.ref_input2 = React.createRef();
    }

    static contextType = Contexto

    state = {
        email: '',
        error: false,
        password: '',
        starting: false,
        secureTextEntry: true,
        access_token: '',
        reestablecer: false
    }

    endsWith = (token) => token.endsWith('#_=_') ? token.replace('#_=_', '') : token
    
    parseUrlParams = (url) => {
        const { queryParams } = Linking.parse(url);
        return queryParams;
    }

    verifyTokenAndAuth = (token) => {
        const {endsWith} = this
        if(token){
            const access_token = endsWith(token)
            access_token !== this.state.access_token && this.setState({access_token: access_token}, () => this.getUserInfo(access_token))
        }
    }

    openAuthSession = async (type) => {
        try{
            let redirectUri = Linking.createURL('/login')
            let authUrl = `${EXPO_PUBLIC_API_URL}/auth/${type}?mode=app&redirectUri=${redirectUri}`;
            let result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

            if (result.type === 'success') {
                console.log(result)
                const { url } = result;
                const params = this.parseUrlParams(url);
                const token = params.token;
                this.verifyTokenAndAuth(token)
            }

        }catch(error){
            console.log("Error: ", error);
            this.setState({starting: false})
        }
    }

    getUserInfo = async (token) => {
        let {socialLogin} = this.context
        this.setState({starting: true})
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With' : 'XMLHttpRequest',
              'Authorization': `Bearer ${token}`
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            let user = data
            user ? this.setState({starting: false}, () => socialLogin(user, token)) : Alert.alert('', 'ha ocurrido un error al iniciar sesión')
        })
        .catch((error) => this.setState({starting: false}, () => console.log(error)) );
    }

    handleLogin = async () => {
        const {email, password} = this.state
        if(email == '' || password == ''){
            return Alert.alert('Error', 'Contraseña y Correo Electrónico son campos obligatorios')
        }

        this.setState({starting: true}, async () => {
            await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Requested-With' : 'XMLHttpRequest',
                },
                body: JSON.stringify({email: email, password:password}),
            })
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                this.setState({starting: false})
                if(result.error){
                    Alert.alert('Error', result.error);
                }
    
                if(result.errors){
                    Alert.alert('Error', Object.values(result.errors)[0][0]);
                }
                
                if(result.user){
                    this.context.handleLogin(result);
                }
            }).catch((error) => {
                console.log(error)
                this.setState({starting: false})
            });
        })
    }


    render () {
        const {email, error, password, starting, secureTextEntry, reestablecer} = this.state
        const {navigation} = this.props
        if(error){
            return <ErrorHandling />
        }
    
        return (
            <>
                {starting ? <Spinner text={'Iniciando Sesión'}/> :
                <KeyboardAvoidingView style={{flex: 1}}
                    behavior={Platform.OS == 'ios' ? "padding" : null}
                    keyboardVerticalOffset={60} 
 
                    >
                    <Appbar.Header  statusBarHeight={0} style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
                      shadowColor: '#000',      // Color de la sombra (iOS)
                      shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                      shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                      shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                        <Appbar.BackAction onPress={() => navigation.goBack()} />
                        <Appbar.Content title={
                            <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                                Inicia Sesión
                            </Text>} 
                        />
                    </Appbar.Header>

                    <Reestablecer reestablecer={reestablecer} navigation={navigation} setReestablecer={() => this.setState({reestablecer: !reestablecer})} handleLogin={this.context.handleLogin}/>
                    <ScrollView contentContainerStyle={{paddingVertical: 30}}>
                            <View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={{ width: 200, height: 150, resizeMode: 'contain' }} source={images.login} />
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: 'inter-bold', letterSpacing: 1, marginBottom: 20 }}>Inicia Sesión</Text>
                                </View>
                                <View style={{ justifyContent: 'center', paddingHorizontal: 30 }}>
                                    <View style={styles.form_group}>
                                        <TextInput placeholder='Correo Electrónico:'
                                            placeholderTextColor={styles.input_placeholder}
                                            style={styles.input}
                                            onChangeText={val => this.setState({ email: val })}
                                            defaultValue={email}
                                            autoComplete="email"
                                            returnKeyType="next"
                                            onSubmitEditing={() => this.ref_input2.current.focus()}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: 20,
                                        backgroundColor: '#ededed',
                                        borderRadius: 100
                                    }}>
                                        <TextInput placeholder='Contraseña:'
                                            placeholderTextColor={styles.input_placeholder}
                                            style={{ width: '88%', fontFamily: 'inter', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#ededed', fontSize: 14}}
                                            secureTextEntry={secureTextEntry}
                                            onChangeText={val => this.setState({ password: val })}
                                            defaultValue={password}
                                            ref={this.ref_input2}
                                            returnKeyType="done"
                                            onSubmitEditing={this.handleLogin}
                                        />
                                        <TouchableOpacity style={{ width: '12%'}} onPress={() => this.setState({ secureTextEntry: !secureTextEntry })}>
                                            {secureTextEntry ? <MaterialCommunityIcons name="eye-outline" size={22} color="#a1a1a1" /> : <MaterialCommunityIcons name="eye-off-outline" size={22} color="#a1a1a1" />}
                                        </TouchableOpacity>
                                    </View>
                                
                                    <View>
                                        <Button mode='contained' onPress={this.handleLogin} style={{backgroundColor: '#000'}}>
                                            <Text style={{ fontFamily: 'inter-bold'}}>Inicia Sesión</Text>
                                        </Button>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Button mode='elevated' onPress={() => navigation.navigate('Register')}>
                                            <Text style={{ fontFamily: 'inter-bold', color: '#212121' }}>Regístrate</Text>
                                        </Button>
                                    </View>
                                
                                
                                    <View style={{ marginTop: 5 }}>
                                        <FacebookLogin openAuthSession={this.openAuthSession} />
                                    </View>
                                
                                    <View>
                                        <GoogleLogin openAuthSession={this.openAuthSession} />
                                    </View>
                                
                                    {/*
                                    <View>
                                        <AppleLogin openAuthSession={this.openAuthSession} />
                                    </View>
                                    */}
                                
                                    <View>
                                        <TouchableOpacity onPress={() => this.setState({ reestablecer: true })}>
                                            <Text style={{ textAlign: 'center', fontFamily: 'inter-bold', textTransform: 'uppercase', fontSize: 11, marginTop: 10 }}> Olvidó su Contraseña? Recupérala</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                }
            </>
        )
    }
} 

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center',
      backgroundColor: "#fff",
      justifyContent: 'center'
    },
    input: {
        fontFamily:'inter', 
        paddingVertical: 10,
        paddingHorizontal:20,
        borderRadius: 100, 
        backgroundColor:'#ededed',
        fontSize: 14
    },
    input_placeholder:{
        color: '#a1a1a1'
    },
    form_group:{
        marginBottom:15
    },
    button_black:{
        backgroundColor:colores.black, 
        paddingVertical:10, 
        borderRadius:20, 
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center'
    },
    button_white:{
        borderColor:colores.black, 
        borderWidth:1, 
        marginTop:15, 
        paddingVertical:10, 
        borderRadius:20, 
        flexDirection:'row', 
        justifyContent:'center',
        alignItems:'center'
    },
    text_white:{
        color:'#fff', 
        fontFamily:'inter-medium', 
        letterSpacing:1.5, 
        fontSize:11,
        textTransform:'uppercase',
    },
    text_black:{
        color:'#000', 
        fontFamily:'inter-medium', 
        letterSpacing:1.5, 
        fontSize:11,
        textTransform:'uppercase',
    }
});

export default React.memo(Login)