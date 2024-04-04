import React, {useEffect, useState, useContext} from 'react';
import {RefreshControl, View, Text, TouchableOpacity, Image, SafeAreaView, FlatList, ScrollView, Linking, Dimensions} from 'react-native';
import { colores, icons, tamaños} from '../constants';
import RenderCategory from '../components/home/RenderCategory'
import {InstaStory} from '../components'
const {EXPO_PUBLIC_API_URL} = process.env;    
import { Contexto } from '../functions/Context';
import { AntDesign, FontAwesome, Entypo, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'; 

const {width} = Dimensions.get('window');

const excerpt = (str, max, suffix) => str.length < max ? str : `${str.substr(0, max)}${suffix}`;

const Header = React.memo(({navigation, addressResponse}) => {
    let address = `${addressResponse[0]?.isoCountryCode}, ${addressResponse[0]?.district ? addressResponse[0]?.district : addressResponse[0]?.city}: ${addressResponse[0]?.street ? addressResponse[0]?.street : addressResponse[0]?.name}`
    let excerptAddress = addressResponse ? excerpt(address, 30, '...') : ''

    return (
        <View style={{
            backgroundColor: '#fff',
            shadowColor: "#000",
            shadowOffset: {
            	width: 0,
            	height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            zIndex: 10
        }}>
            <View style={{flexDirection:'row', justifyContent:'space-between',
                alignItems:'center', paddingBottom:13, paddingTop:15, paddingHorizontal:23}}>
                <View>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <FontAwesome name="bars" size={30} color={colores.darkButton} />
                    </TouchableOpacity>
                </View>
                <View style={{width: '80%'}}>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', paddingTop: 2}}>
                        <Entypo name="location-pin" size={20} color={colores.darkButton} />
                        <Text style={{fontFamily: 'inter-medium', color: colores.darkButton}} numberOfLines={1}>{excerptAddress}</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Anuncios')}>
                        <FontAwesome name="bullhorn" size={24} color={colores.darkButton} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity 
            onPress={() => navigation.navigate('Search')}  
            style={{paddingHorizontal:20, paddingBottom:15, paddingTop: 5}}>
                <SafeAreaView style={{flexDirection:'row'}}>
                    <View style={{width:'85%', paddingLeft:15, paddingVertical: 15, borderColor:'#757575', borderWidth:.2, borderBottomLeftRadius:3, borderTopLeftRadius:3}}>
                        <Text style={{fontFamily:'inter', fontSize:13, color:'#757575'}} numberOfLines={1}>Cuéntanos. ¿Qué Estás Buscando?</Text>
                    </View>
                    <View style={{
                        flexDirection:'row', width:'15%', borderWidth:1, borderColor:colores.primary, backgroundColor:colores.primary, 
                        justifyContent:'center', alignItems: 'center', borderBottomEndRadius:3, borderTopEndRadius:3
                    }}>
                        <MaterialIcons name="search" size={24} color="#fff" />
                    </View>
                </SafeAreaView>
            </TouchableOpacity>
        </View>
    )
})

const Histories = React.memo(({stories, loading, onEndReached, navigation}) => {
    return (
        <View style={{marginTop: stories.length > 0 ? 20 : 10}}>
                <InstaStory data={stories}
                    navigation={navigation}
                    duration={10}
                    customSwipeUpComponent={(text) => (
                        <>
                            {text &&
                                <View style={{backgroundColor: 'rgba(0,0,0,0.8)', position:'absolute', bottom:0, right:0, width:'100%', padding:20, zIndex: 1000}}>
                                    <View style={{marginBottom: 15}}>
                                        <Text style={{color: colores.white}}>{text}</Text>
                                    </View>
                                </View>
                            }
                        </>

                        )
                    }
                />
        </View>
    );
})

const CategoriesSection = React.memo(({navigation, categories}) => {
    return(
        <View style={{marginBottom: 5}}>
            <View style={{paddingHorizontal:20, paddingTop:15, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text style={{fontSize: tamaños.h4, fontFamily:'inter-medium', color:  colores.darkButton, marginBottom: 5}}>Principales Categorías</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Categories')} style={{flexDirection:'row', alignItems: 'center'}}>  
                    <Text style={{fontFamily: 'inter-bold', color: colores.primary, fontSize: 11, marginRight: 5}}>Ver Más</Text> 
                    <AntDesign name="arrowright" size={12} color={colores.primary} />
                </TouchableOpacity>         
            </View>

            <View>
                <FlatList
                  contentContainerStyle={{paddingHorizontal: 20, paddingTop:15, paddingBottom: 5}}
                  data={categories}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  renderItem={({item, index}) => <RenderCategory item={item} navigation={navigation}/>}
                  keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
})


const RenderBanners = React.memo(({banners, navigation}) => {
    return (
        <View>
            <FlatList
                contentContainerStyle={{paddingHorizontal:20, paddingTop:10, paddingBottom: 10}}
                data={banners}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity 
                            style={{
                                elevation: 5,
                                backgroundColor: '#fafafa',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                borderRadius:10, 
                                marginRight:10
                            }}
                            onPress={item.url ? () => Linking.openURL(item.url) : () => navigation.navigate('Commerce', {commerce_id: item.commerce_id})}>
                            <Image source={{uri: EXPO_PUBLIC_API_URL + item.banner}} style={{resizeMode:'cover', width:280, height:110, backgroundColor:'#e9e9e9', borderRadius:10}}/>
                        </TouchableOpacity>

                    );
                }}
                keyExtractor={item => item.id}
            />
        </View>
    )
})

const Comercio = React.memo((props) => {
    const {item, navigation} = props;

    return (
        <TouchableOpacity key={item.id} style={{marginBottom:25, backgroundColor: '#fafafa', borderRadius: 10, elevation: 1,        
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.18,
            shadowRadius: 1}}
            onPress={() => navigation.navigate('Commerce', {commerce_id: item.id, home:true})}>
            <View>
                <Image source={{uri: EXPO_PUBLIC_API_URL + item.imgs[0]?.uri}} resizeMode="cover" style={{width: "100%", height: width / 2, backgroundColor:"#e9e9e9", borderTopLeftRadius: 10, borderTopRightRadius: 10}}/>
                <View
                    style={{
                        flexDirection:'row',
                        position: 'absolute',
                        bottom: 0,
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:'#fafafa',
                        paddingHorizontal:10,
                        borderTopRightRadius:20
                    }}
                    >
                        <MaterialCommunityIcons name="map-marker-distance" size={15} color={colores.darkButton} />                    
                        <Text style={{fontFamily:'inter', fontSize: 11, color: '#212121', marginLeft: 4}}>{item.distance > 1 ? `${(item.distance).toFixed(2)} km` : `${(item.distance * 1000).toFixed(2)} m`} aprox.</Text>
                </View>
            </View>
    
            <View style={{flexDirection:'row', paddingVertical:15}}>
                <View>
                    <Image source={{uri: EXPO_PUBLIC_API_URL + item.logo}} style={{width:50, height:50, borderRadius:25, backgroundColor:'#e9e9e9', marginLeft: 10}}/>
                </View>
                <View style={{paddingLeft:10}}>
                    <View>
                        <Text style={{fontFamily:'poppins-medium', maxWidth: 290, color: '#212121'}} numberOfLines={1}>{item.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={icons.star} style={{height: 20, width: 20, marginRight: 8}}/>
                        <Text style={{fontFamily:'inter-medium', marginTop: 4, fontSize: 13}}>{item.rating ? item.rating.toFixed(1) : 'Nuevo'}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
})


const RenderCommerces = React.memo(({title, data, navigation, user, location}) => {
    const {latitude, longitude} = location.coords

    return (
        <View>
            <View style={{marginTop:5, paddingHorizontal:20, paddingVertical:15, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text style={{fontSize: tamaños.h4, fontFamily:'inter-medium', marginBottom: 5, color: colores.darkButton}}>{title}</Text>

                <TouchableOpacity onPress={() => {
                    if(title == 'Comercios Destacados'){
                        navigation.navigate('ShowCommerces', {lat: latitude, lon:longitude, text: '', destacados: true})
                    }else{
                        navigation.navigate('ShowCommerces', {lat: latitude, lon:longitude, text: ''})
                    }
                }} style={{flexDirection: 'row', alignItems: 'center'}}>   
                    <Text style={{fontFamily: 'inter-bold', color: colores.primary, fontSize: 11, marginRight: 5}}>Ver Más</Text> 
                    <AntDesign name="arrowright" size={12} color={colores.primary} />
                </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal:20}}>
                {data.map((item, key) => <Comercio item={item} navigation={navigation} user={user} key={key}/>)}
            </View>
        </View>
    )
})

const Home = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const context = useContext(Contexto)
    const {onRefresh, banners, addressResponse, stories, categories, nearest, commerces, user, location, loading, setStories} = context
    const bannersS1 = banners.filter(({section}) => section == 'Sección 1')
    const bannersS2 = banners.filter(({section}) => section == 'Sección 2')

    useEffect(() => {
        !loaded && setLoaded(true)
    }, [])

    const refresh = () => {
        setRefreshing(true);
        setRefreshing(onRefresh())
    } 

    if(loaded){
        return (
            <View style={{backgroundColor:'#fff', flex: 1}}>
                <Header navigation={navigation} addressResponse={addressResponse} />
                <ScrollView 
                    contentContainerStyle={{paddingBottom: 30}} 
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={refresh} 
                            colors={[colores.primary]}
                        />
                    }>
                    <Histories stories={stories} navigation={navigation} loading={loading} onEndReached={setStories}/>
                    <CategoriesSection navigation={navigation} categories={categories} route={route} />
                    <RenderBanners banners={bannersS1} navigation={navigation} />
                    <RenderCommerces title='Cercanos a ti' data={nearest} navigation={navigation} user={user} location={location}/>
                    <RenderBanners banners={bannersS2} navigation={navigation} />
                    <RenderCommerces title='Locales Destacados' data={commerces} navigation={navigation} user={user} location={location}/>
                </ScrollView>
            </View>
        )
    }

}

export default React.memo(Home)