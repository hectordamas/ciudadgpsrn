import React, {useState, useContext, useCallback, useEffect } from "react";
import {View, TouchableOpacity, Text, Image, FlatList, Share, Alert, ScrollView} from 'react-native'
import {icons, colores} from '../constants'
import fetch from "cross-fetch";
const {EXPO_PUBLIC_API_URL} = process.env;    
import { Contexto } from "../functions/Context";
import { CartExcerpt, Spinner } from "../components";
import { useFocusEffect } from "@react-navigation/native";
import { NumericFormat } from "react-number-format";
import { Appbar, Button, Chip, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Catalogo = ({navigation, route}) => {

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [commerce, setCommerce] = useState([])
    const contexto = useContext(Contexto)

    const fetchData = async () => {
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/getProducts?commerce_id=${route.params?.commerce_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.products) {
                setFilteredProducts(res.products)
                setProducts(res.products)
                setCommerce(res.commerce)
                setLoaded(true)
            } 
        })
        .catch(err => console.log(err))
    }

    const onShare = async () => {
        const {commerce_id} = route.params;
        try {
          await Share.share({
            uri: `${EXPO_PUBLIC_API_URL}/catalogo/${commerce_id}/share`,
            message: `${EXPO_PUBLIC_API_URL}/catalogo/${commerce_id}/share`,
          });
        } catch (error) {
          Alert.alert(error.message);
        }
    }

    const showCart = () => {
        contexto.cart.length > 0 ? navigation.navigate('Cart', {whatsapp: commerce?.whatsapp}) : Alert.alert('', 'Aún no has agregado ningún producto al carrito')
    }

    useFocusEffect(
        useCallback(() => {
            setLoaded(false)
            fetchData()
        }, [route.params?.commerce_id])
    )

    useEffect(() => {
        if(selectedCategory){
            setFilteredProducts(products.filter((item) => item?.pcategory_id == selectedCategory?.id))
        }else{
            setFilteredProducts(products)
        }

    }, [selectedCategory])

    return (
        <View style={{flex:1, backgroundColor: '#fff'}}>
            <Appbar.Header statusBarHeight={0} style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
              shadowColor: '#000',      // Color de la sombra (iOS)
              shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
              shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
              shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                <Appbar.BackAction onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Commerce', {commerce_id: route.params?.commerce_id}) }/>
                <Appbar.Content title={<Text style={{fontFamily: 'inter-medium', fontSize: 14}} numberOfLines={1}>Catálogo de Productos</Text>} />
                <Appbar.Action icon="magnify" onPress={() => navigation.navigate('Search')} />
            </Appbar.Header>
            {loaded ? 
            <ScrollView contentContainerStyle={{paddingVertical: 10}}>
                <View style={{paddingHorizontal: 20, alignItems: 'center', marginBottom: 15}}>
                    <Image source={{uri: EXPO_PUBLIC_API_URL + commerce?.logo}} style={{width: 80, height: 80, borderRadius: 100, borderWidth:  .2, borderColor: '#757575', marginVertical: 10, backgroundColor: '#e9e9e9'}}/>
                    <Text style={{fontFamily: 'roboto-bold', textTransform: 'capitalize', fontSize: 15, maxWidth: 250, textAlign: 'center', marginBottom: 5}} numberOfLines={2}>{commerce?.name}</Text>
                    <Text style={{fontSize: 12, marginBottom: 5}}>Productos Publicados: {products.length > 0 && `(${products.length})`}</Text>

                    <View style={{flexDirection: 'row', marginTop: 5}}>
                        <Button 
                            mode="contained" 
                            icon={'cart-outline'} 
                            labelStyle={{fontFamily: 'inter-medium'}}
                            style={{marginRight: 5, backgroundColor: colores.darkButton, borderRadius: 5, flex: 1}} 
                            onPress={showCart}>
                                <Text style={{fontFamily: 'inter-bold', color: '#fff', fontSize: 12}}>Ver Carrito</Text>
                        </Button>
                        <Button 
                            mode="elevated" 
                            icon={'share-variant-outline'} 
                            labelStyle={{color: colores.darkButton}}
                            style={{borderRadius: 5, flex: 1}} 
                            onPress={onShare}>
                                <Text style={{fontFamily: 'inter-bold', color: colores.darkButton, fontSize: 12}}>Compartir</Text>
                            </Button>
                    </View>
                </View>

                {commerce?.pcategories?.length > 0 &&
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                        contentContainerStyle={{paddingHorizontal: 20}} 
                    >
                        
                        <Chip 
                            mode="outlined" 
                            textStyle={{fontFamily: 'inter-medium', fontSize: 12}} 
                            style={{marginRight: 5}} 
                            selected={selectedCategory ? false : true}
                            onPress={() => setSelectedCategory(null)}
                        >Todos</Chip>
    
                        {
                            commerce?.pcategories?.map((item) => {
                                return (
                                    <Chip
                                        key={item?.id} 
                                        mode="outlined" 
                                        onPress={() => setSelectedCategory(item)}
                                        textStyle={{fontFamily: 'inter-medium', fontSize: 12}} 
                                        style={{marginRight: 5}}
                                        selected={selectedCategory?.id == item?.id ? true : false}    
                                    >{item.name}</Chip> 
                                )
                            })
                        }
                    </ScrollView>
                
                }
                

                {
                    filteredProducts?.length > 0 ? 
                    <View style={{paddingTop: 10}}>
                    {filteredProducts?.map((item) => {
                        let {image} = item
                        return (
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('ProductShow', {product_id: item.id})} 
                            key={item.id}>
                            <Divider />
                            <View style={{paddingHorizontal: 20,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{marginRight: 10}}>
                                      <Image source={{uri: image.startsWith('http') ? image : EXPO_PUBLIC_API_URL + image}} style={{borderWidth: .2, borderColor: '#757575', borderRadius: 5, height: 80, width: 80, backgroundColor: '#e9e9e9'}} resizeMode="contain"/>
                                      <TouchableOpacity 
                                        style={{position: "absolute", right: 5, top: 5, padding: 5, backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: 5}} 
                                        onPress={() => contexto.addToCart(item, commerce) }>
                                            <MaterialCommunityIcons name="cart-outline" size={24} color="#fff" />
                                      </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text numberOfLines={2} style={{fontFamily: 'inter-medium', fontSize: 13, maxWidth: 200}}>{item.name}</Text>
                                        <NumericFormat value={item?.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={formattedValue => 
                                                <Text style={{marginTop: 5}}>
                                                    <View style={{borderWidth: 1, borderColor:  colores.dangerButton, padding: 5, borderRadius: 5}}>
                                                        <Text style={{color: colores.dangerButton, fontSize: 13, fontFamily: 'inter-bold'}}>{formattedValue}</Text>
                                                    </View>
                                                </Text>
                                            } 
                                        />
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity 
                                        style={{backgroundColor: colores.darkButton, padding: 5, borderRadius: 5}} 
                                        onPress={() => contexto.addToCart(item, commerce)}>
                                        <MaterialCommunityIcons name="plus" size={24} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )
                    })}
                </View> : 
                <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 30}}>
                    <Text style={{fontFamily: 'inter-medium'}}>No hay productos disponibles</Text>
                </View>
                }
                    
            </ScrollView>: <Spinner />
            }

            {contexto.cart.length > 0 && commerce?.id == contexto?.cart_commerce_id && <CartExcerpt navigation={navigation} whatsapp={commerce?.whatsapp} />}
        </View>
    )

}

export default React.memo(Catalogo)