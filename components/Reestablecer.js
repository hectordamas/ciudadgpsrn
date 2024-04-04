import React from 'react'
import {Modal, View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert} from 'react-native'
import {icons, colores} from '../constants'
const {EXPO_PUBLIC_API_URL} = process.env;    
class Reestablecer extends React.Component{

    state = {
        emailModal: false,
        codeModal: false,
        changePasswordModal: false,
        email: '',
        code: '',
        password: '',
        secureTextEntry: true, 
        processing: false
    }

    visibleCodeModal = () => this.setState({codeModal: !this.state.codeModal})
    visibleChangePassword = () => this.setState({changePasswordModal: !this.state.changePasswordModal})

    sendEmail = async () => {
        let {email} = this.state
        if(email == ''){
            Alert.alert('Error', 'Correo Electrónico es obligatorio')
            return;
        }
        this.setState({processing: true})
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/solicitarCodigo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
            },
            body: JSON.stringify({email: email})
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            res.error && this.setState({processing: false}, () => Alert.alert('Error', res.error))
            res.errors && this.setState({processing: false}, () => Alert.alert('Error', Object.values(res.errors)[0][0]))
            res.message && this.setState({processing: false, user_id: res.user_id}, () => {
                this.visibleCodeModal()
                this.props.setReestablecer()
            })
        })
        .catch((err) => {
            this.setState({processing: false})
            console.log(err)
        })
    }

    verifyCode = async () => {
        let {code, user_id} = this.state
        if(code == ''){
            Alert.alert('Error', 'Código de Verificación es obligatorio')
            return;
        }
        this.setState({processing: true})
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/comprobarCodigo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
            },
            body: JSON.stringify({code: code, user_id: user_id})
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            res.error && this.setState({processing: false}, () => Alert.alert('Error', res.error))
            res.errors && this.setState({processing: false}, () => Alert.alert('Error', Object.values(res.errors)[0][0]))
            res.message && this.setState({processing: false}, () => {
                this.visibleChangePassword()
                this.visibleCodeModal()
            })
        })
        .catch((err) => {
            this.setState({processing: false})
            console.log(err)
        })
    }

    changePassword = async () => {
        let {password, user_id} = this.state
        if(password == ''){
            Alert.alert('Error', 'Por favor, ingrese una contraseña válida')
            return;
        }
        this.setState({processing: true})
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/cambiarContraseña`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
            },
            body: JSON.stringify({user_id: user_id, password: password})
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            this.setState({processing: false})
            res.error && Alert.alert('Error', res.error);
            res.errors && Alert.alert('Error', Object.values(res.errors)[0][0]);
            if(res.user) {
                this.props.handleLogin(res);
                this.props.navigation.navigate('Inicio')
                Alert.alert('', res.message);
            }
        })
        .catch((err) => {
            this.setState({processing: false})
            console.log(err)
        })
    }

    render() {
        let {codeModal, changePasswordModal, secureTextEntry, password, processing} = this.state
        let {reestablecer, setReestablecer} = this.props

        return (
            <>

                <Modal visible={processing} transparent={true}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0, 0.6)'}}>
                        <ActivityIndicator size={50} color={'#fff'}/>
                    </View>
                </Modal>

                <Modal visible={reestablecer} transparent={true}>
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent: 'center', borderRadius: 5}}>
                        <View style={{width: '90%', paddingBottom: 20, backgroundColor: '#fff'}}>
                            <View style={{alignItems: 'flex-end', paddingTop: 10, paddingRight: 10, paddingBottom: 15}}>
                                <TouchableOpacity onPress={setReestablecer}>
                                    <Image source={icons.close} style={{width: 15, height: 15}} resizeMode={'cover'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <Image source={icons.email} style={{width: 50, height: 50, tintColor: colores.primary}}/>                            
                            </View>
                            <View style={{marginTop: 15, alignItems: 'center'}}>
                                <Text style={{fontSize: 16, fontFamily: 'inter-medium'}}>Reestablece tu Contraseña</Text>
                            </View>
                            <View style={{marginTop: 5, paddingHorizontal: 20}}>
                                <Text style={{fontSize: 12, fontFamily: 'inter', textAlign: 'justify'}}>Ingresa tu correo electrónico para reestablecer el acceso a tu cuenta.</Text>
                            </View>
                            <View style={{marginTop: 10, paddingHorizontal: 20}}>
                                <TextInput style={{borderWidth: .5, borderColor: '#bdbdbd', fontSize:13, paddingLeft: 10, fontFamily: 'inter', paddingVertical: 5}} placeholder={'Correo Electrónico'} placeholderTextColor={'#bdbdbd'}
                                    onChangeText={(email) => this.setState({email})}
                                />
                            </View>
                            <View style={{marginTop: 10, paddingHorizontal: 20}}>
                                <TouchableOpacity onPress={this.sendEmail} style={{backgroundColor: colores.black, width: '100%', paddingVertical: 10, alignItems: 'center'}}>
                                    <Text style={{color: colores.white, fontFamily: 'inter-medium', textTransform: 'uppercase', fontSize:11, letterSpacing: .8}}>Enviar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


                <Modal visible={codeModal} transparent={true}>
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent: 'center', borderRadius: 5}}>
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
                                <TouchableOpacity style={{backgroundColor: colores.black, width: '100%', paddingVertical: 10, alignItems: 'center'}} onPress={this.verifyCode}>
                                    <Text style={{color: colores.white, fontFamily: 'inter-medium', textTransform: 'uppercase', fontSize:11, letterSpacing: .8}}>Verificar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 10, paddingHorizontal: 20}}>
                                <TouchableOpacity style={{width: '100%', paddingVertical: 10, alignItems: 'center', borderColor: colores.black, borderWidth: .5}} onPress={this.sendEmail}>
                                    <Text style={{color: colores.black, fontFamily: 'inter-medium', textTransform: 'uppercase', fontSize:11, letterSpacing: .8}}>Reenviar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


                <Modal visible={changePasswordModal} transparent={true}>
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent: 'center', borderRadius: 5}}>
                        <View style={{width: '90%', paddingBottom: 20, backgroundColor: '#fff'}}>
                            <View style={{alignItems: 'flex-end', paddingTop: 10, paddingRight: 10, paddingBottom: 15}}>
                                <TouchableOpacity onPress={this.visibleChangePassword}>
                                    <Image source={icons.close} style={{width: 15, height: 15}} resizeMode={'cover'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <Image source={icons.reset} style={{width: 50, height: 50, tintColor: colores.primary}}/>                            
                            </View>
                            <View style={{marginTop: 15, alignItems: 'center'}}>
                                <Text style={{fontSize: 16, fontFamily: 'inter-medium'}}>Ingresa Una Nueva Contraseña</Text>
                            </View>
                            <View style={{paddingHorizontal: 20}}>
                                <View style={{
                                    flexDirection:'row', 
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                    marginBottom:10, 
                                    backgroundColor:'#ededed', 
                                    marginTop:10
                                    }}
                                >
                                    <TextInput placeholder='Contraseña:' 
                                        placeholderTextColor={{
                                            color: '#a1a1a1'
                                        }}
                                        style={{flex: .88,
                                        fontFamily:'inter', 
                                        paddingVertical: 3,
                                        paddingHorizontal:10,
                                        backgroundColor:'#ededed'}}
                                        secureTextEntry={secureTextEntry}
                                        onChangeText={password => this.setState({password})}
                                        defaultValue={password}
                                        returnKeyType="done"
                                        onSubmitEditing={this.changePassword}
                                    />
                                    <TouchableOpacity style={{flex: .12}} onPress={() => this.setState({secureTextEntry: !secureTextEntry})}>
                                        <Image source={secureTextEntry ? icons.visible : icons.invisible} style={{width:22, height:22, tintColor: '#a1a1a1'}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{paddingHorizontal: 20}}>
                                <TouchableOpacity style={{backgroundColor: colores.black, width: '100%', paddingVertical: 10, alignItems: 'center'}} onPress={this.changePassword}>
                                    <Text style={{color: colores.white, fontFamily: 'inter-medium', textTransform: 'uppercase', fontSize:11, letterSpacing: .8}}>Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </>
        )
    }

}

export default Reestablecer
