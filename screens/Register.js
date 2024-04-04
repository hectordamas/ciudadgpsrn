import React from "react";
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform} from "react-native";
import { colores, images } from "../constants";
import {Spinner, ErrorHandling, FacebookLogin, GoogleLogin, AppleLogin} from '../components';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { Button, Appbar } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Contexto } from '../functions/Context';

const {EXPO_PUBLIC_API_URL} = process.env;    

class Register extends React.Component{
    constructor (props){
      super(props);
      this.ref_input2 = React.createRef();
      this.ref_input3 = React.createRef();
    }
    static contextType = Contexto

    state = {
      error: false,
      name: '',
      email: '',
      password: '',
      secureTextEntry: true,
      starting: false,
      token: ''
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
        let redirectUri = Linking.createURL('/register')
        let authUrl = `${EXPO_PUBLIC_API_URL}/auth/${type}?mode=app&redirectUri=${redirectUri}`
        let result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);      

        if (result.type === 'success') {
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
        user ? this.setState({starting: false}, () => this.context.socialLogin(user, token)) : Alert.alert('', 'ha ocurrido un error al iniciar sesión')
      })
      .catch((error) => this.setState({starting: false}, () => console.log("Error: get", error)) );
    }

    register = async () => {
      const {name, email, password} = this.state
      const {handleRegister} = this.context;

      if(email == '' || password == ''){
        Alert.alert('Error', 'Contraseña y Correo Electrónico son campos obligatorios')
        return;
      }
      this.setState({starting: true})

      await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With' : 'XMLHttpRequest',
          },
          body: JSON.stringify({name: name, email: email, password: password}),
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
          handleRegister(result);
        }
      }).catch((error) => {
          console.log(error)
          this.setState({error: true})
        });
    }

    render() {
      const {navigation} = this.props
      const {name, error, email, password, secureTextEntry, starting} = this.state

      if(error){
        return <ErrorHandling />
      }

      return (
        <>
          {starting ? <Spinner text={'Registrando Usuario'}/> : 
          <KeyboardAvoidingView style={{flex: 1}}
            behavior={Platform.OS == 'ios' ? "padding" : null}
            keyboardVerticalOffset={60} 
            >            
            <Appbar.Header  statusBarHeight={0}  style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
              shadowColor: '#000',      // Color de la sombra (iOS)
              shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
              shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
              shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={
                    <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                        Regístrate
                    </Text>} 
                />
            </Appbar.Header>
            <ScrollView>
              <View style={{paddingVertical: 30}}>
                <View style={{paddingHorizontal:30}}>
                  <View style={{justifyContent:'center', alignItems:'center'}}>
                     <Image style={{width:150, height:120, resizeMode: 'contain'}} source={images.login} />
                  </View>
                  <View style={{ justifyContent: "center", alignItems:'center', marginBottom:20}}>
                        <Text style={{textAlign:'center', fontSize:18, fontFamily:'inter-bold', letterSpacing:1}}>Regístrate</Text>
                  </View>
                  <View style={{ justifyContent: "center"}}>

                    <View style={styles.form_group}>
                      <TextInput
                        placeholder="Nombre:"
                        autoComplete="name"
                        placeholderTextColor={styles.input_placeholder}
                        style={styles.input}
                        defaultValue={name}
                        onChangeText={text => this.setState({name: text})}
                        returnKeyType="next"
                        onSubmitEditing={() => this.ref_input2.current.focus()}
                        blurOnSubmit={false}
                      />
                    </View>

                    <View style={styles.form_group}>
                      <TextInput
                        placeholder="Correo Electrónico:"
                        placeholderTextColor={styles.input_placeholder}
                        autoComplete="email"
                        ref={this.ref_input2}
                        style={styles.input}
                        defaultValue={email}
                        onChangeText={text => this.setState({email: text})}
                        returnKeyType="next"
                        onSubmitEditing={() => this.ref_input3.current.focus()}
                        blurOnSubmit={false}
                      />
                    </View>

                    <View style={{
                          flexDirection:'row', 
                          alignItems:'center',
                          justifyContent:'space-between',
                          marginBottom:20, 
                          backgroundColor:'#ededed', 
                          borderRadius: 100
                      }}>
                          <TextInput 
                              placeholder='Contraseña:' 
                              placeholderTextColor={styles.input_placeholder}
                              style={{
                                width:'88%',fontFamily:'inter', 
                                paddingVertical:8,
                                paddingHorizontal:20,
                                borderRadius:20, 
                                backgroundColor:'#ededed',
                                fontSize: 14
                              }}
                              ref={this.ref_input3}
                              secureTextEntry={secureTextEntry}
                              onChangeText={text => this.setState({password: text})}
                              defaultValue={password}
                              returnKeyType="done"
                              onSubmitEditing={this.register}
                          />
                          <TouchableOpacity style={{width:'12%'}} onPress={() => this.setState({secureTextEntry: !secureTextEntry})}>
                            {secureTextEntry ? <MaterialCommunityIcons name="eye-outline" size={22} color="#a1a1a1" /> : <MaterialCommunityIcons name="eye-off-outline" size={22} color="#a1a1a1" />}
                          </TouchableOpacity>
                      </View>

                      <View>
                          <Button mode='contained' onPress={this.register} style={{backgroundColor: '#000'}}>Regístrate</Button>
                      </View>
                    </View> 

                  <View>
                            
                      <View style={{ marginTop: 10 }}>
                          <Button mode='elevated' onPress={() => navigation.navigate('Login')}>
                              <Text style={{ fontFamily: 'inter-bold', color: '#212121' }}>Inicia Sesión</Text>
                          </Button>
                      </View>
                            
                      <View style={{marginTop:5}}>
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

                            
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>}
        </>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  input: {
      fontFamily:'inter', 
      paddingVertical:8,
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
      justifyContent:'center'
  },
  text_white:{
      color:'#fff', fontFamily:'inter-medium', letterSpacing:1.5, fontSize:11
  },
  text_black:{
      color:'#000', fontFamily:'inter-medium', letterSpacing:1.5, fontSize:11
  }
});

export default React.memo(Register);
