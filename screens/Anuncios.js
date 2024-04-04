import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, Linking} from 'react-native';
import { Appbar } from 'react-native-paper';

import {colores, icons, images} from '../constants';
const {EXPO_PUBLIC_API_URL} = process.env;    
import { Contexto } from '../functions/Context';

const Anuncios = (props) => {
    const {navigation} = props
    const context = useContext(Contexto)
    let {banners} = context
    banners = banners.filter((item) => item.section == 'Sección 4')
    return (
    <View style={{backgroundColor: colores.white, flex:1}}>
        <Appbar.Header  statusBarHeight={0}  style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
          shadowColor: '#000',      // Color de la sombra (iOS)
          shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
          shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
          shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title={
                <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                    Novedades
                </Text>} 
            />
        </Appbar.Header>
        <View style={{backgroundColor:'#fff', flex:1}}>

            {
                banners.length > 0  ?
                    <FlatList 
                        data={banners}
                        style={{paddingHorizontal:25}}
                        renderItem={({item}) => 
                            <TouchableOpacity key={item.id} style={{width:'100%', paddingVertical:12}} onPress={item.url ? () => Linking.openURL(item.url) : () => navigation.navigate('Commerce', {commerce_id: item.commerce_id})}>
                                <Image source={{uri: EXPO_PUBLIC_API_URL + item.banner}} resizeMode={'cover'} style={{width:'100%', height:120, borderRadius:10, backgroundColor:'#e9e9e9'}}/>
                            </TouchableOpacity>
                        }
                    />
                : <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={images.novedades} style={{width: '100%', height: 170}} resizeMode='contain'/>
                    <Text style={{fontFamily: 'inter', textTransform: 'capitalize', textAlign: 'center', fontSize: 15}}>Aún no hay novedades disponibles</Text>
                </View>
            }
        </View>
    </View>
    )
}

export default React.memo(Anuncios)