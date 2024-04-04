import React, {useContext, useState, useEffect} from 'react'
import {View, Text, Image, ScrollView, Linking, KeyboardAvoidingView, Platform} from 'react-native'
import {images} from '../constants'
import { Contexto } from '../functions/Context'
import { NumericFormat } from 'react-number-format';
import {Appbar, TextInput, Button}  from 'react-native-paper'
import { Shadow } from 'react-native-shadow-2';
import { colores } from '../constants';

const Checkout = ({navigation, route}) => {
    let contexto = useContext(Contexto)
    let {cart} = contexto
    let {whatsapp} = route.params

    let [total, setTotal] = useState(0)
    let [totalQty, setTotalQty] = useState(0)
    const [name, setName] = useState('')
    const [ci, setCi] = useState('')
    const [cel, setCel] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [info, setInfo] = useState('')
    const [items, setItems] = useState('')

    useEffect(() => {
        setTotal(0)
        setTotalQty(0)
        setItems('')
        cart.map(item => {
            setTotal(prevTotal => prevTotal + (item.qty * item.price))
            setTotalQty(prevTotalQty => prevTotalQty + item.qty)
            let subtotal = parseFloat(item.qty * item.price).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })
            let price = parseFloat(item.price).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })
        
            setItems(prevItems => {
                const formattedItem = `\n----------------------------------\n*${item.name}*\n${item.qty} x $${price} = $${subtotal}`
                return prevItems + formattedItem;
            });
        });
    }, [cart])

    const checkout = async () => {
        let ws = `https://api.whatsapp.com/send?phone=${whatsapp}`
        let totalString = parseFloat(total).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })
        let checkoutData = `----------------------------------\n*ORDEN POR CIUDADGPS:*\n----------------------------------\n*DATOS DEL CLIENTE*\n----------------------------------\n*Cédula / RIF:* ${ci}\n*Nombre:* ${name}\n*Teléfono:* ${cel}\n*Correo Electrónico:* ${email}\n*Dirección:* ${address}\n*Ciudad:* ${city}\n----------------------------------\n*CARRITO DE COMPRAS:*${items}\n==============================\n*Unidades:* ${totalQty}\n*Total:* $${totalString}\n==============================\n*NOTAS ADICIONALES:*\n----------------------------------\n${info}`
        let data = checkoutData
        let url = `${ws}&text=${data}`
        await Linking.openURL(url)
    }

    return (
        <KeyboardAvoidingView 
            keyboardVerticalOffset={60}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{flex:1, backgroundColor: '#fff'}}>
            <Appbar.Header  statusBarHeight={0}  style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
              shadowColor: '#000',      // Color de la sombra (iOS)
              shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
              shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
              shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                <Appbar.BackAction onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Inicio')} />
                <Appbar.Content title={
                    <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                        Último Paso
                    </Text>} 
                />
            </Appbar.Header>

            <ScrollView
                contentContainerStyle={{paddingBottom: 20}} 
                style={{paddingHorizontal: 20, paddingVertical: 10}}>
                <View style={{marginBottom: 20}}>
                    <Image source={images.checkout} style={{height: 150, width: '100%'}} resizeMode='contain'/>

                    <Text style={{fontFamily: 'inter-bold', textTransform: 'capitalize', fontSize: 15, marginBottom: 10}}>Proporciona los datos necesarios para completar el proceso de compra:</Text>
                    <Text style={{fontFamily: 'inter-medium', fontSize: 13}}>Tu orden será enviada al Whatsapp del local. Coordina tu pago y entrega con el vendedor</Text>
                </View>

                <View style={{marginBottom: 20}}>
                    <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Nombre y Apellido:</Text>
                    <TextInput mode={'outlined'} onChangeText={(val) => setName(val)} activeOutlineColor="#21005d" />
                </View>

                <View style={{marginBottom: 20}}>
                    <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Cédula / DNI:</Text>
                    <TextInput mode={'outlined'} onChangeText={(val) => setCi(val)} activeOutlineColor="#21005d" />
                </View>

                <View style={{marginBottom: 20}}>
                    <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Celular / Whatsapp:</Text>
                    <TextInput mode={'outlined'} onChangeText={(val) => setCel(val)} activeOutlineColor="#21005d" />
                </View>

                
                <View style={{marginBottom: 20}}>
                    <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Dirección:</Text>
                    <TextInput mode={'outlined'} onChangeText={(val) => setAddress(val)} activeOutlineColor="#21005d" />
                </View>

                <View style={{marginBottom: 20}}>
                    <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Ciudad:</Text>
                    <TextInput mode={'outlined'} onChangeText={(val) => setCity(val)} activeOutlineColor="#21005d" />
                </View>

                <View style={{marginBottom: 20}}>
                    <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Correo Electrónico:</Text>
                    <TextInput mode={'outlined'}  onChangeText={(val) => setEmail(val)} activeOutlineColor="#21005d" />
                </View>

                <View style={{marginBottom: 20}}>
                    <Text style={{marginBottom: 5, fontFamily:'inter-bold', fontSize: 12}}>Notas:</Text>
                    <TextInput mode={'outlined'} onChangeText={(val) => setInfo(val)} activeOutlineColor="#21005d" />
                </View>

            </ScrollView>

            <Shadow style={{width: '100%'}} containerStyle={{width: '100%'}}>
               <View style={{paddingHorizontal: 20, paddingBottom: 20, paddingTop: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontFamily: 'inter-medium'}}>Subtotal:</Text>
                        <NumericFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={formattedValue => <Text style={{fontFamily: 'inter-medium'}}>{formattedValue}</Text>} /> 
                    </View>
                    <View style={{paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontFamily: 'inter-bold', fontSize: 18}}>Total:</Text>
                        <NumericFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={formattedValue => <Text style={{fontFamily: 'inter-black'}}>{formattedValue}</Text>} /> 
                    </View>
                    <View style={{paddingTop: 10}}>
                        <Button 
                            icon={'cart-check'} 
                            labelStyle={{marginVertical: 15, fontFamily: 'inter-bold', letterSpacing: 0.5}}
                            style={{borderRadius: 5, backgroundColor: colores.darkButton}}  
                            mode='contained' 
                            onPress={checkout}>Finalizar Orden</Button>
                    </View>
               </View>
            </Shadow>
        </KeyboardAvoidingView>
    )
}

export default React.memo(Checkout)