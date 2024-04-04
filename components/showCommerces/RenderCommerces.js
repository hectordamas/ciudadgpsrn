import React, {useEffect, useCallback, useState, useContext} from 'react';
import {View, Text, TouchableOpacity, Image, Alert, Modal} from 'react-native';
import { MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';

import {icons, colores} from '../../constants'
const {EXPO_PUBLIC_API_URL} = process.env;    
import {isLiked} from '../../functions';
import { Contexto } from '../../functions/Context';

const RenderCommerces = (props) => {
    const {navigation, user, key} = props
    const [likes, setLikes] = useState([])
    const [imageVisible, setImageVisible] = useState(false)
    const {item} = props.item
    const logo = EXPO_PUBLIC_API_URL + item.logo
    const contexto = useContext(Contexto)

    useEffect(() => {
        setLikes(item?.likes)
    }, [])

    const auth = useCallback(() => {
        Alert.alert('Inicia Sesión','Para agregar a favoritos debes iniciar sesión',[
            {text: 'Cancelar', onPress: () => {}, style: 'cancel'},
            { text: 'OK', onPress: () => navigation.navigate('Login') },
        ])
    }, [])

    const like = useCallback(async () => {
        if(user){
            setLikes([...likes, {user_id: user.id, commerce_id: item.id}])
            await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With' : 'XMLHttpRequest',
                    'Authorization':  contexto?.token
                },
                body: JSON.stringify({commerce_id: item.id, user_id: user.id})
            })
            .then((res) => res.json())
            .then((res) => console.log(res))
            .catch(err => console.log(err))
        }
    }, [user, item.id])

    const dislike = useCallback(async () => {
        if(user){
            setLikes(likes.filter((item) => item.user_id !== user.id))
            await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/dislike`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With' : 'XMLHttpRequest',
                    'Authorization':  contexto?.token
                },
                body: JSON.stringify({commerce_id: item.id, user_id: user.id})
            })
            .then((res) => res.json())
            .then((res) => console.log(res))
            .catch(err => console.log(err))
        }
    }, [item.id, user])



    return (
        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent: 'space-between', marginBottom:10, paddingBottom:10, borderBottomWidth:0.2, borderBottomColor:'#e9e9e9', width: '100%'}} key={key}
            onPress={() => navigation.navigate('Commerce', {commerce_id: item.id})}>
                
            <Modal transparent visible={imageVisible}>
                <TouchableOpacity onPressOut={() => setImageVisible(false)} style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center'}}>
                  <View style={{width: '80%'}}>
                    <TouchableOpacity onPress={() => setImageVisible(false)}>
                      <MaterialCommunityIcons size={35} color={'#fff'} name="close"/>
                    </TouchableOpacity>
                    <Image 
                      source={{ uri: logo }} 
                      resizeMode="contain" 
                      style={{width: '100%', height: 250}}
                    />
                  </View>
                </TouchableOpacity>
            </Modal>

            <View style={{flexDirection:'row', flex: 5.6}}>
                <View style={{width:60, height:60, marginHorizontal:10}}>
                    <Image source={{uri: logo}} style={{width:60, height:60, borderRadius:50, backgroundColor:'#bdbdbd'}}/> 
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontFamily:'inter-medium', flexWrap: 'wrap', maxWidth: '90%'}} numberOfLines={1}>{item.name}</Text>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
                            <View style={{flexDirection:'row', marginTop: 5}}>
                                <View style={{flexDirection:'row', marginRight:15}}>
                                    <AntDesign name="star" size={20} color="#ffc107" style={{marginRight: 5}}/>
                                    <Text style={{fontFamily:'inter-medium'}}>{item.rating ? item.rating.toFixed(1) : 'Nuevo'}</Text>
                                </View>

                                <View style={{flexDirection:'row', marginRight:15}}>
                                    <MaterialCommunityIcons name="map-marker-distance" size={20} color="black" style={{marginRight: 5}} />
                                    <Text style={{fontFamily:'inter-medium'}}>{item.distance > 1 ? `${(item.distance).toFixed(2)} km` : `${(item.distance * 1000).toFixed(2)} m`} aprox.</Text>
                                </View>
                            </View>
                    </View> 
                </View>
            </View>
            <View style={{flex: .4, justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={() => (user) ? (isLiked(likes, user.id) ? dislike() : like()) : auth() }>
                    <Image
                        source={(user) ? (isLiked(likes, user.id) ? icons.like : icons.favorite) : icons.favorite}                                 
                        style={{tintColor: (user) ? (isLiked(likes, user.id) ? colores.like : '#000') : '#000', width:20, height:20}}
                    />  
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
        )

}

export default React.memo(RenderCommerces)