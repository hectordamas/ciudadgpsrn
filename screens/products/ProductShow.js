import React, {useState, useCallback, useEffect, useContext} from 'react'
import { View, Text, Image, Share, Modal, ScrollView, TouchableOpacity} from 'react-native'
import {colores } from '../../constants';
import { Spinner, CartExcerpt } from '../../components';
const {EXPO_PUBLIC_API_URL} = process.env;
import { useFocusEffect } from '@react-navigation/native';
import { NumericFormat } from "react-number-format";
import { Contexto } from '../../functions/Context';
import Moment from 'moment';
import 'moment/locale/es';
import { Appbar, Button} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProductShow = ({navigation, route}) => {
    const [loaded, setLoaded] = useState(false)
    const [commerce_id, setCommerce_id] = useState(null)
    const [commerce, setCommerce] = useState(null)
    const [product, setProduct] = useState(null)
    const [imageVisible, setImageVisible] = useState(false)
    const {product_id} = route.params
    const contexto = useContext(Contexto)

    useEffect(() => {
        product && setLoaded(true)
    }, [product])

    const fetchData = async () => {
        await fetch(`${EXPO_PUBLIC_API_URL}/api/products/${product_id}/show`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
            }
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            setCommerce(res.commerce)
            setProduct(res.product)
            setCommerce_id(res.commerce_id)
        })
        .catch(e => console.log(e))
    }

    useFocusEffect(useCallback(() => {
        setLoaded(false)
        fetchData()
    }, [product_id]))

    return (
        <View style={{flex:1, backgroundColor: '#fff'}}>
            {loaded ? 
                <View style={{flex:1, backgroundColor: '#fff'}}>
                    <Modal transparent visible={imageVisible}>
                        <TouchableOpacity onPressOut={() => setImageVisible(false)} style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center'}}>
                          <View style={{width: '80%'}}>
                            <TouchableOpacity onPress={() => setImageVisible(false)}>
                              <MaterialCommunityIcons size={35} color={'#fff'} name="close"/>
                            </TouchableOpacity>
                            <Image 
                              source={{ uri: EXPO_PUBLIC_API_URL + product.image }} 
                              resizeMode="contain" 
                              style={{width: '100%', height: 250}}
                            />
                          </View>
                        </TouchableOpacity>
                    </Modal>
                    <Appbar.Header  statusBarHeight={0}  style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
                      shadowColor: '#000',      // Color de la sombra (iOS)
                      shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                      shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                      shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                      <Appbar.BackAction onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Catalogo', {commerce_id: commerce.id, commerce_name: commerce.name}) } />
                      <Appbar.Content title={<Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:15}}>Catálogo de Productos</Text>} />
                    </Appbar.Header>


                    <ScrollView contentContainerStyle={{paddingVertical: 20, paddingHorizontal: 20}}>

                            <View style={{width: '100%', flexDirection: 'row', marginBottom: 10}}>
                                <TouchableOpacity style={{paddingRight: 20, width: 145}} onPress={() => setImageVisible(true)}>
                                    <Image source={{ uri: EXPO_PUBLIC_API_URL + product.image }} style={{ width: 125, height: 125, paddingRight: 20}} resizeMode='contain'/>
                                </TouchableOpacity>
                                <View style={{width: '60%', paddingRight: 5, justifyContent: 'center'}}>
                                    <Text style={{fontFamily: 'inter-bold', fontSize: 18, marginBottom: 5}} numberOfLines={3}>{product.name}</Text>
                                    <NumericFormat value={product?.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={formattedValue => 
                                            <Text style={{marginTop: 5, marginBottom: 5}}>
                                                <View style={{borderWidth: 1, borderColor:  colores.primary, padding: 5, borderRadius: 5}}>
                                                    <Text style={{color: colores.dangerButton, fontSize: 13, fontFamily: 'inter-bold'}}>{formattedValue}</Text>
                                                </View>
                                            </Text>
                                        } 
                                    />
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', marginBottom: 10}}>
                                <View style={{marginRight: 5}}>
                                    <Button 
                                        labelStyle={{color: colores.darkButton}}
                                        style={{borderRadius: 5}}
                                        icon={'share-variant-outline'} 
                                        mode='outlined'
                                        onPress={() => Share.share({uri: `${EXPO_PUBLIC_API_URL}/productos/${product.id}/share`, message: `${EXPO_PUBLIC_API_URL}/productos/${product.id}/share`, title: product.name}) }
                                        >Compartir</Button>
                                </View>

                                <View>
                                    <Button 
                                        style={{backgroundColor: colores.darkButton, borderRadius: 5}}
                                        icon={'cart-outline'} 
                                        mode='contained' 
                                        onPress={() => contexto.addToCart(product, commerce) }
                                        >Agregar al Carrito</Button>
                                </View>
                            </View>

                            <View style={{marginBottom: 20}}>
                                <Text style={{fontFamily: 'inter-medium', marginBottom: 10, fontSize: 15}}>Detalles del Producto:</Text>
                                <Text style={{fontSize: 13, fontFamily: 'inter'}}>{product.description ? product.description : 'No hay detalles disponibles'}</Text>
                            </View>

                            <View>
                                <Text style={{fontFamily: 'inter-medium', marginBottom: 10, fontSize: 15}}>Publicado por:</Text>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <View style={{paddingRight: 10, width: 70}}>
                                    <Image source={{ uri: EXPO_PUBLIC_API_URL + commerce.logo }} style={{ width: 60, height: 60, backgroundColor: '#e9e9e9', borderColor: '#e9e9e9', borderWidth: .8, borderRadius: 100}} resizeMode='contain'/>
                                </View>

                                <View style={{justifyContent: 'center', width: '80%'}}>
                                    <Text numberOfLines={2} style={{width: '80%', fontFamily: 'roboto-medium', marginBottom: 5, fontSize: 15}}>{commerce.name}</Text>
                                    <Text numberOfLines={2} style={{width: '80%', fontSize: 12}}>{Moment(product?.created_at).fromNow()}</Text>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row'}}>
                                    <Button 
                                        icon={'store-outline'}
                                        style={{marginRight: 5, borderRadius: 5, backgroundColor: colores.darkButton}} 
                                        mode='contained' 
                                        onPress={() => navigation.navigate('Commerce', {commerce_id: commerce.id})} >
                                        Perfil Comercial
                                    </Button>
                                    <Button
                                        icon={'book-open-page-variant-outline'} 
                                        labelStyle={{color: colores.darkButton}}
                                        style={{borderRadius: 5}} 
                                        mode='outlined' 
                                        onPress={() => navigation.navigate('Catalogo', {commerce_id: commerce.id, commerce_name: commerce.name})} >
                                        Ver Catálogo
                                    </Button>
                            </View>
                    </ScrollView>

                    {contexto.cart.length > 0 && commerce?.id == contexto?.cart_commerce_id && <CartExcerpt navigation={navigation} whatsapp={commerce?.whatsapp} />}
                </View> : <Spinner />
            }

        </View>
    );
}

export default ProductShow

