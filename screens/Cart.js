import React, {useContext, useState, useEffect} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, TextInput, StatusBar} from 'react-native'
import { colores, icons, images } from '../constants'
import { Contexto } from '../functions/Context'
import { NumericFormat } from 'react-number-format';
const {EXPO_PUBLIC_API_URL} = process.env;   
import { Appbar, Button } from 'react-native-paper';

const Cart = ({navigation, route}) => {
    let contexto = useContext(Contexto)
    let {whatsapp} = route.params
    let {cart} = contexto
    let [total, setTotal] = useState(0)
    useEffect(() => {
        setTotal(0)
        cart.map(item => setTotal(prevTotal => prevTotal + (item.qty * item.price)))
    }, [cart])


    return (
        <View style={{flex:1, backgroundColor: '#fff'}}>
            <Appbar.Header  statusBarHeight={0}  style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
              shadowColor: '#000',      // Color de la sombra (iOS)
              shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
              shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
              shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                <Appbar.BackAction onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Inicio')} />
                <Appbar.Content title={
                    <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                        Carrito de Compras
                    </Text>} 
                />
            </Appbar.Header>

            {
                cart.length > 0 ?
                    <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
                        <View style={{marginBottom: 20}}>
                            <Image source={images.empty_cart} style={{height: 150, width: '100%'}} resizeMode='contain'/>
                            <Text style={{fontFamily: 'inter-bold', textTransform: 'capitalize', fontSize: 15, marginBottom: 12}}>Gestiona tu Orden de compra:</Text>
                            <Text style={{fontFamily: 'inter-medium', fontSize: 13}}>Tu orden será enviada al Whatsapp del local. Coordina tu pago y entrega con el vendedor</Text>
                        </View>

                    {   
                        cart.map((item) => {
                            let {image} = item
                            return (
                            <View key={item.id} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomColor: '#e9e9e9', borderBottomWidth: 0.2}}>
                                <View>
                                    <Image source={{uri: image.startsWith('http') ? image : EXPO_PUBLIC_API_URL + item.image}} style={{width: 60, height: 60}} resizeMode='contain'/>
                                </View>
                                <View style={{justifyContent: 'center', width: 130}}>
                                    <Text style={{fontSize: 12, fontFamily: 'roboto-bold', marginBottom: 10}} numberOfLines={2}>{item.name}</Text>
                                    <NumericFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={formattedValue => 
                                        <Text>
                                            <View style={{borderWidth: 1, paddingHorizontal: 10, borderColor: '#FF0800', borderRadius: 10}}>
                                                <Text style={{fontFamily: 'roboto-bold', color: '#FF0800'}}>{formattedValue}</Text>
                                            </View>
                                        </Text>                                    
                                        } 
                                    />
                                </View>
                                <View style={{justifyContent: 'flex-end'}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', borderWidth: 1, borderColor: '#000', borderRadius: 20}}>
                                        <TouchableOpacity delayPressIn={0} onPress={() => item.qty > 1 && contexto.updateCartItem(item.id, item.qty - 1)} style={{height: 20, width: 20, justifyContent: 'center', alignItems: 'center'}}>
                                            <Image source={icons.menos} style={{width: 15, height: 15}} resizeMode='contain'/>
                                        </TouchableOpacity>
                                        <View style={{height: 20, width: 25, justifyContent: 'center', alignItems: 'center'}}>
                                            <TextInput defaultValue={String(item.qty)} style={{flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} keyboardType='numeric' onChangeText={(val) => contexto.updateCartItem(item.id, parseInt(val))}/>
                                        </View>
                                        <TouchableOpacity delayPressIn={0} onPress={() => contexto.updateCartItem(item.id, item.qty + 1)} style={{height: 20, width: 20, justifyContent: 'center', alignItems: 'center'}}>
                                            <Image source={icons.mas} style={{width: 15, height: 15}} resizeMode='contain'/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity delayPressIn={0} style={{backgroundColor: colores.dangerButton, padding: 5, borderRadius: 2}} onPress={() => contexto.destroyCartItem(item.id)}>
                                        <Image source={icons.trash} style={{width: 15, height: 15, tintColor: '#fff'}} resizeMode='contain'/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            )
                        })
                    }
                    <View style={{paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontFamily: 'inter-bold', fontSize: 15}}>Resumen</Text>
                    </View>
                    <View style={{paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontFamily: 'inter-medium'}}>Subtotal:</Text>
                        <NumericFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={formattedValue => <Text style={{fontFamily: 'inter-medium'}}>{formattedValue}</Text>} /> 
                    </View>
                    <View style={{paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontFamily: 'inter-bold', fontSize: 18}}>Total:</Text>
                        <NumericFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={formattedValue => <Text style={{fontFamily: 'inter-bold'}}>{formattedValue}</Text>} /> 
                    </View>
                    <View style={{paddingTop: 20}}>
                        <Button 
                            mode='contained' 
                            icon={'cart-outline'} 
                            labelStyle={{marginVertical: 15, fontFamily: 'inter-bold', letterSpacing: 0.5}}
                            style={{marginBottom: 10, borderRadius: 5, backgroundColor: colores.darkButton}} 
                            onPress={() => navigation.navigate('Checkout', {whatsapp})}>Procesar Orden</Button>
                    </View>
                </ScrollView> :
                <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                    <Image source={images.empty_cart} style={{height: 150, width: '100%'}} resizeMode='contain'/>
                    <Text style={{fontFamily: 'inter-medium', textTransform: 'capitalize', textAlign: 'center', marginBottom: 20}}>No has agregado productos a tu carrito de compras</Text>
                </View>
            }
        </View>

    )
}   

export default React.memo(Cart)