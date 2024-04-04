import React from 'react';
import {View, Text, TouchableOpacity, Image, Alert, ScrollView} from 'react-native'
import { images, icons, colores } from '../constants';
;
const {EXPO_PUBLIC_API_URL} = process.env;    
import { Processing, Success, Error, CreditCardInput } from '../components';

const initialState = {
    processing: false,
    loading: false,
    success: false,
    error: false,
    cvc: "",
    expiry: "",
    name: "",
    number: "",
    valid: false  
}

class PaymentScreen extends React.Component{

    state = initialState

    pay = () => {
        const {email, STRIPE_KEY} = this.props.route.params
        const {name, cvc, expiry, number, valid} = this.state

        if(!valid){
            return Alert.alert('Datos Inválidos', 'Por favor revisa tus datos y completa la información requerida para continuar')
        }

        if(!name || !cvc || !expiry || !number){
            return Alert.alert('Información incompleta', 'Por favor completa tus datos para continuar')
        }

        this.setState({processing: true}, () => {
            fetch(`${EXPO_PUBLIC_API_URL}/api/stripe/paymentIntent`, {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                    'apikey': STRIPE_KEY,
                    'email': email
                },
                credentials: 'same-origin',
                body:JSON.stringify({name, cvc, expiry, number, email})
            })
            .then(res => res.json())
            .then((res) => {
                this.setState({success: true})
                console.log(res)
            })
            .catch(error => console.log(error))
        })
    }

    componentDidMount = () => {
        const {navigation} = this.props
        navigation.addListener("focus", () => {
            this.setState({...initialState})
        });
    }

    componentDidUpdate = () => console.log(this.state)

    render(){
        const {navigation} = this.props
        const {processing, success, error} = this.state

        if(success){
            return <Success navigation={navigation}/>
        }

        if(error){
            return <Error navigation={navigation} />
        }

        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>
                {processing && <Processing />}
                <View style={{flexDirection:'row', alignItems:'center', paddingTop:10, paddingBottom:8, paddingLeft: 20}}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{marginRight:15}}>
                              <Image
                                  style={{width:20, height:20}}
                                  source={icons.back}
                                  resizeMode="contain"
                              />
                            </View>
                            <View style={{alignItems:'center', justifyContent:'center'}}>
                              <Text style={{fontFamily:'inter-medium', textAlign:'center', fontSize:15, marginTop:3, textTransform: 'capitalize'}}>Pago Online</Text>
                            </View>
                        </TouchableOpacity>
                </View>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <ScrollView style={{paddingHorizontal:20}}>
                    <View style={{marginVertical: 15, marginLeft:10}}>
                        <Text style={{fontFamily: 'roboto', textAlign:'justify'}}>Ingresa los datos de tu tarjeta de crédito para completar el proceso de registro de tu local. {'\n\n'}Se debitarán 45.00$ de la tarjeta ingresada:</Text>
                    </View>
                    <View style={{marginTop: 5}}>
                        <CreditCardInput 
                            requiresName={true} 
                            cardImageFront={images.card_front}
                            cardImageBack={images.card_back}
                            autoFocus
                            labels={{number: 'Número de Tarjeta:', expiry: 'Vence:', cvc: "CVC:", name: 'Nombre:' }}
                            placeholders={{number: "4242 4242 4242 4242", expiry: "MM/YY", cvc: "123", name: ''}}
                            inputStyle={{fontFamily:'inter',  fontSize:11}}
                            labelStyle={{fontFamily:'inter-medium',  fontSize:11}}
                            onChange={(form) => {
                                const {valid} = form
                                const {name, cvc, expiry, number} = form.values
                                this.setState({name, cvc, expiry, number, valid})
                            }}
                        />
                    </View>
                    <View style={{marginTop:20, paddingLeft: 20}}>
                        <TouchableOpacity style={{backgroundColor: colores.black, borderRadius: 5, paddingVertical:15}} onPress={this.pay}>
                            <Text style={{color: colores.white, textAlign:'center', textTransform: 'capitalize', fontFamily: 'inter-medium', letterSpacing:1, fontSize: 11}}>
                                Aceptar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                </View>
            </View>
        );
    }
}

export default React.memo(PaymentScreen)