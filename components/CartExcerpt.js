import React, {useContext, useState, useEffect} from "react";
import {View, Text, Image, TouchableOpacity} from 'react-native'
import { Contexto } from "../functions/Context";
import { NumericFormat } from "react-number-format";
import { Shadow } from 'react-native-shadow-2';
import { Button } from "react-native-paper";
import { colores } from "../constants";

const CartExcerpt = ({navigation, whatsapp}) => {
    const contexto = useContext(Contexto)
    const [total, setTotal] = useState(0)
    const {cart} = contexto

    useEffect(() => {
        setTotal(0)
        cart.map(item => setTotal(prevTotal => prevTotal + (item.price * item.qty)))
    }, [cart])

    return (
        <Shadow containerStyle={{backgroundColor: '#fff', width: '100%'}} style={{width: '100%'}}>
            <View style={{paddingHorizontal: 20, paddingVertical: 15,  backgroundColor: '#fff', width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex:1}}>
                    <Text style={{fontSize: 11, fontFamily: 'inter'}}>{cart.length} Producto{cart.length > 1 && 's'}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                        <NumericFormat 
                            value={total?.toFixed(2)} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'} 
                            renderText={formattedValue => 
                                <Text style={{fontSize: 18, fontFamily: 'inter-medium'}}>{formattedValue}</Text>
                            } 
                        />
                    </View>
                </View>
                <View style={{flex: 2}}>
                    <Button 
                        labelStyle={{marginVertical: 15}}
                        style={{borderRadius: 5, backgroundColor: colores.darkButton}} 
                        icon={'cart-outline'} 
                        mode="contained" 
                        onPress={() => navigation.navigate('Cart', {whatsapp})}
                    >
                        <Text style={{fontFamily: 'inter-bold', fontSize: 14, letterSpacing: 0.6}}>Ver Pedido</Text>
                    </Button>
                </View>
            </View>
        </Shadow>
    )
}

export default React.memo(CartExcerpt)