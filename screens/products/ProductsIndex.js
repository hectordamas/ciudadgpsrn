import React, {useState, useEffect, useCallback, useContext} from 'react'
import {View, TouchableOpacity, Image, Switch, Dimensions, Modal, ActivityIndicator, Alert, ScrollView} from 'react-native'

import { NumericFormat } from 'react-number-format';
import { useFocusEffect } from '@react-navigation/native'
import { Appbar, Button, Divider, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Shadow } from 'react-native-shadow-2';

import { Contexto } from '../../functions/Context'
import { colores, images } from '../../constants'
import { Spinner} from '../../components'

const {EXPO_PUBLIC_API_URL} = process.env;    

const ProductsIndex = ({navigation, route}) => {
    const contexto = useContext(Contexto)
    const {commerce_id} = route.params
    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [isEnabled, setIsEnabled] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false)    
    
    const [productVisible, setProductVisible] = useState(false)
    const [activeProduct, setActiveProduct] = useState('')

    const token = contexto?.token
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)
    const destroyProduct = async (productId) => {
        setProcessing(true)
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/products/destroy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': token
            },
            body: JSON.stringify({productId, commerce_id}) 
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            setProcessing(false)
            setProducts(prevProducts => prevProducts.filter((item) => item.id !== productId))
            Alert.alert('', 'Producto eliminado con éxito')
        })
        .catch(e => console.log(e))
    }

    const fetchData = async () => {
        try {
          const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/products`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With' : 'XMLHttpRequest',
              'Authorization': token
            },
            body: JSON.stringify({commerce_id})
          });
      
          const result = await response.json();

          console.log(result)
      
          if (result && result.products) {
            setProducts(result.products);
            setLoaded(true);
          }

          if(result && result.commerce){
            setIsEnabled(result?.commerce?.enable ? true : false)
          }
        } catch (error) {
          console.log(error);
        }
    };

    const postSetIsEnabled = async () => {
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/setIsEnabled`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': token
            },
            body: JSON.stringify({enable: isEnabled ? 'active' : null, commerce_id}) 
        })
        .then(res => res.json())
        .then((res) => console.log(res))
        .catch(e => console.log(e))
    }

    const hideProduct = async (product_id, product_hidden) => { 
          await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/hideProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': token
            },
            body: JSON.stringify({hidden: !product_hidden ? 'hidden' : null, commerce_id, product_id}) 
        })
        .then(res => res.json())
        .then((res) => {    
            console.log(res)
            res.products && setProducts(res.products)
        })
        .catch(e => console.log(e))
    }

    useFocusEffect(
        useCallback(() => {
            let mounted = true;
            if(mounted){
                setLoaded(false)
                fetchData();
            }
             
            return () => {
              mounted = false;
            };
        }, [commerce_id])
    )


    useEffect(() => {
        let mounted = true;
        mounted && postSetIsEnabled()
        return () => {
            mounted = false;
        };
    }, [isEnabled])

    useEffect(() => {console.log(activeProduct)}, [activeProduct])

    return (
        <View style={{flex:1, backgroundColor: '#fff'}}>
            <Modal visible={processing} transparent={true}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <ActivityIndicator size={60} color={'#fff'}/>
                </View>
            </Modal>

            <Modal visible={productVisible} transparent>
                <TouchableOpacity 
                    onPressOut={() => {
                        setActiveProduct('')
                        setProductVisible(false)
                    }}
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <Image source={{uri: activeProduct}} style={{width: '100%', height: 250}} resizeMode='contain' />
                </TouchableOpacity>
            </Modal>

            <Appbar.Header  statusBarHeight={0} style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
                  shadowColor: '#000',      // Color de la sombra (iOS)
                  shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                  shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                  shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                  <Appbar.Content title={<Text style={{fontFamily:'inter-medium', fontSize:15}}>Catálogo de Productos</Text>} />
            </Appbar.Header>
            
            {loaded ? (
                products.length > 0 ? 
                    <>
                        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                            <View style={{paddingHorizontal: 20}}>
                                 <View style={{alignItems: 'center'}}>
                                     <Image source={images.empty_cart} style={{height: 150, aspectRatio: 1}} resizeMode='contain'/>
                                 </View>
                                 <Text style={{textTransform: 'capitalize', fontFamily: 'inter-medium', marginBottom: 10, textAlign: 'center'}}>Gestiona tus productos { products?.length > 0 && `(${products?.length})`}</Text>

                                <View style={{flexDirection: 'row'}}>
                                    <Button 
                                       icon={'store-outline'} 
                                       mode='contained' 
                                       style={{backgroundColor: colores.darkButton, borderRadius: 5, marginRight: 5}} 
                                       onPress={() => navigation.navigate('Commerce', {commerce_id})}
                                       >
                                        <Text style={{fontFamily: 'inter-bold', letterSpacing: 0.5, fontSize: 12, color: '#fff'}}>Perfil Comercial</Text>
                                    </Button>

                                    <Button 
                                       icon={'format-list-bulleted-square'} 
                                       mode='outlined' 
                                       style={{borderRadius: 5, flex: 1}} 
                                       labelStyle={{color: colores.darkButton}}
                                       onPress={() => setDropdownVisible(true)}
                                       >
                                        <Text style={{fontFamily: 'inter-bold', letterSpacing: 0.5, fontSize: 12, color: colores.darkButton}}>Categorias</Text>
                                    </Button>
                                </View>
                            </View>

                           <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10}}>
                               <View>
                                   <Text style={{fontFamily: 'inter-bold', fontSize: 13}}>Activar Catálogo: </Text>
                               </View>
                               <View> 
                                   <Switch 
                                       trackColor={{false: '#767577', true: '#6C63FF'}}
                                       thumbColor='#f4f3f4'
                                       ios_backgroundColor="#3e3e3e"
                                       onValueChange={toggleSwitch}
                                       value={isEnabled}
                                   /> 
                               </View>
                           </View>

                           <View style={{paddingHorizontal: 20}}>
                               {products.map((item) => 
                                   <View key={item.id} >
                                       <Divider />
                                       <View style={{
                                               flexDirection: 'row', 
                                               justifyContent: 'space-between', 
                                               width: '100%', 
                                               marginVertical: 5
                                           }}>
                                            
                                           <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                               <TouchableOpacity 
                                                    style={{marginRight: 10}} 
                                                    onPress={() => {
                                                        setActiveProduct(item.image?.startsWith('http') ? item.image : EXPO_PUBLIC_API_URL + item.image)
                                                        setProductVisible(true)
                                                        
                                                    }}>
                                                   <Image 
                                                       source={{uri: item.image?.startsWith('http') ? item.image : EXPO_PUBLIC_API_URL + item.image}} 
                                                       style={{width: 40, height: 40}}
                                                   />
                                               </TouchableOpacity>
                                        
                                               <View style={{justifyContent: 'center', maxWidth: Dimensions.get('screen').width * 0.5}}>
                                                   <Text 
                                                       style={{fontFamily: 'inter-bold', textTransform: 'capitalize', width: '100%', fontSize: 12, marginBottom: 5}} 
                                                       numberOfLines={2} 
                                                       ellipsizeMode='tail'>{item.name}</Text>
                                                   <NumericFormat 
                                                       value={item.price} 
                                                       displayType={'text'} 
                                                       thousandSeparator={true} 
                                                       prefix={'$'} 
                                                       renderText={fv => <Text style={{color: colores.dangerButton, fontFamily: 'roboto-bold'}}>{fv}</Text>} />
                                               </View>
                                           </View>
                                        
                                        
                                           <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                               <TouchableOpacity style={{width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: colores.darkButton, borderRadius: 3, marginRight: 3}}
                                                   onPress={() => Alert.alert('Estás seguro(a) de ejecutar esta acción?', 'Si aceptas, el item seleccionado se olcutará', [{text: 'Cancelar', style: 'cancel'}, {text: 'Aceptar', onPress: () => hideProduct(item.id, item.hidden)} ]) }
                                               >
                                                   <MaterialCommunityIcons name={ item.hidden ? "eye-off-outline" : "eye-outline"} size={16} color="#fff" />
                                               </TouchableOpacity>
                                               <TouchableOpacity style={{width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: colores.successButton, borderRadius: 3, marginRight: 3}}
                                                   onPress={() => navigation.navigate('ProductsEdit', {product_id: item.id, commerce_id, reload: true}) }
                                               >
                                                   <MaterialCommunityIcons name="square-edit-outline" size={16} color="#fff" />                                        
                                               </TouchableOpacity>
                                               <TouchableOpacity style={{width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: colores.dangerButton, borderRadius: 3}}
                                                   onPress={() => Alert.alert('Estás seguro(a) de ejecutar esta acción?', 'Si aceptas, el item seleccionado se eliminará permanentemente', [{text: 'Cancelar', style: 'cancel'}, {text: 'Aceptar', onPress: () => destroyProduct(item.id)} ]) }
                                               >
                                                   <MaterialCommunityIcons name="trash-can-outline" size={16} color="#fff" />
                                               </TouchableOpacity>
                                           </View>
                                        
                                       </View>
                                   </View>
                                   )
                               }
                           </View>
                        </ScrollView> 
                        <Shadow style={{width: '100%'}} containerStyle={{width: '100%'}}>
                           <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                               <Button 
                                   icon='plus-box-multiple-outline'
                                   mode='contained' 
                                   labelStyle={{marginVertical: 15, fontFamily: 'inter-bold', letterSpacing: 0.5}} 
                                   style={{backgroundColor: colores.darkButton, borderRadius: 5}} 
                                   onPress={() => navigation.navigate('ProductsCreate', {commerce_id})}>
                                 Registra un Producto
                               </Button>
                           </View>
                        </Shadow>


                        <Modal visible={dropdownVisible} transparent>
                            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0, 0.5)', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{backgroundColor: '#fff', width: '90%', borderRadius: 5}}>
                                    <View style={{alignItems: 'center', flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-between'}}>
                                        <View style={{marginTop: 10, marginBottom: 10}}>
                                            <Text style={{fontFamily: 'inter-bold'}}>Categorias</Text>
                                        </View>

                                        <TouchableOpacity
                                            onPress={() => setDropdownVisible(false) }>
                                            <MaterialCommunityIcons name='close' size={25}/>
                                        </TouchableOpacity>

                                    </View>
                                    <Divider />
                                    <TouchableOpacity 
                                        onPress={() => {
                                            navigation.navigate('PcategoryCreate', {commerce_id}) 
                                            setDropdownVisible(false)
                                        }}
                                        style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20}}>
                                        <MaterialCommunityIcons name='plus-box-multiple-outline' size={20}/>
                                        <Text style={{marginLeft: 10, fontFamily: 'inter-medium'}}>Crear Categoria</Text>
                                    </TouchableOpacity>
                                    <Divider />
                                    <TouchableOpacity 
                                        onPress={() => {
                                            navigation.navigate('PcategoryList', {commerce_id}) 
                                            setDropdownVisible(false)
                                        }}
                                        style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20}}>
                                        <MaterialCommunityIcons name='format-list-bulleted-square' size={20}/>
                                        <Text style={{marginLeft: 10, fontFamily: 'inter-medium'}}>Lista de Categorias</Text>
                                    </TouchableOpacity>
                                    <Divider />
                                </View>
                            </View>
                        </Modal>
                    </>
                    : 
                     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            <Image source={images.empty_cart} style={{height: 200, marginBottom: 10}} resizeMode='contain'/>
                        </View>
                        <Text style={{textTransform: 'capitalize', fontFamily: 'inter-medium', marginBottom: 15, textAlign: 'center'}}>Aún no has agregado productos {'\n'} al Catálogo</Text>
                        <Button 
                            icon={'cart-outline'} 
                            mode='contained' 
                            labelStyle={{fontFamily: 'inter-bold', marginVertical: 15}}
                            style={{marginBottom: 10, backgroundColor: colores.darkButton, width: '85%', borderRadius: 5}} 
                            onPress={() => navigation.navigate('ProductsCreate', {commerce_id})}>
                            Carga Tu Primer Producto
                        </Button>
                     </View>   
            ) : <Spinner /> }
        </View>
    )
}

export default React.memo(ProductsIndex)