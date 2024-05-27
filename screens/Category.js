import React from 'react';
import {View, Text, TouchableOpacity, Image, SafeAreaView, FlatList, ActivityIndicator, ScrollView, StatusBar, Pressable} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colores, icons, images} from '../constants';
import RenderCommerces from '../components/showCommerces/RenderCommerces'
import { Spinner, VistaMapa, SwipeDownModal } from '../components';
const {EXPO_PUBLIC_API_URL} = process.env;    
import { Contexto } from '../functions/Context';
import { distanceBetweenTwoPoints, getRegion, maxDistance} from '../functions';
import {Appbar} from 'react-native-paper'
import { Flow } from 'react-native-animated-spinkit'

const ListFooterComponent = ({masResultados}) => {
    return (
        <View style={{paddingBottom:30, paddingTop:10, paddingHorizontal:20}}>
            {
                masResultados ? (
                    <View style={{marginTop:10, justifyContent:'center', alignItems:'center'}}>
                        <Flow size={30} color={colores.primary}/>
                    </View>
                ) : (
                    <View>
                        <Text style={{fontFamily:'inter-medium', fontSize:11}}>Has llegado al final de la búsqueda</Text>
                    </View>
                )
            }
        </View>
    )
}

class Category extends React.PureComponent  {
    _isMounted = false;

    state = {
        commerces: [],
        searching: true,
        count: 0,
        page: 1,
        masResultados: true,
        category: null,
        orderBy: 'distance',
        error: false,
        category_id: '',
        newResults: false,
        location: null,
        view: 'list',
        orderModal: false,
        viewModal: false,
        latPromedio: 0,
        lonPromedio: 0,
        latDeltaPromedio: 0,
        lonDeltaPromedio: 0
    }

    static contextType = Contexto

    getCommerces = async () => {
        let {latitude, longitude} = this.context.location.coords;
        const {category_id} = this.props.route.params 
        let {page, orderBy} = this.state;

        this.setState({category_id}, async () => {
            await fetch(`${EXPO_PUBLIC_API_URL}/api/category/commerces?page=${page}&lat=${latitude}&lon=${longitude}&category_id=${category_id}&orderBy=${orderBy}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Requested-With' : 'XMLHttpRequest',
                }
            })
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                this.setState({
                    commerces: this.state.commerces.concat(result.commerces.data), category:result.category,
                    searching:false, count:result.commerces.total, page: result.commerces.current_page + 1,
                    latPromedio: getRegion(result.commerces.data).latitude , lonPromedio: getRegion(result.commerces.data).longitude, 
                    latDeltaPromedio: maxDistance(result.commerces.data) * 0.05, lonDeltaPromedio: maxDistance(result.commerces.data) * 0.05,
                })
            }).catch((error) => console.log(error)); 
            
        })
    }

    onEndReached = () => {
        const {commerces, count} = this.state
        commerces.length !== count ? this.getCommerces() : this.setState({masResultados:false})
    }

    reload = () => {
        const {location} = this.context
        this.setState({location, newResults:false}, this.fetchData)
    }

    componentDidMount = () => {
        const {navigation} = this.props;
        this._isMounted = true
        if(this._isMounted){
            navigation.addListener('focus', () => {
                const {category_id} = this.props.route.params
                const {location} = this.context

                if(category_id !== this.state.category_id){
                    this.setState({location, commerces: [], searching: true, count: 0, page: 1, masResultados: true}, this.getCommerces)
                }
            })  

            navigation.addListener('blur', () => this.setState({view: 'list'}))
        }
    }

    componentDidUpdate = () => {
        let newLocation = this.context.location
        let {location} = this.state
        let lat1 = newLocation.coords.latitude
        let lon1 = newLocation.coords.longitude
        let lat2 = location.coords.latitude
        let lon2 = location.coords.longitude

        let distance = distanceBetweenTwoPoints(lat1, lon1, lat2, lon2);
        distance > 30 && this.setState({newResults: true, location: newLocation})
    }

    componentWillUnmount = () => this._isMounted = false

    handleFilter = (orderParam) => {
        this.handleVisibleOrderModal()
        this.setState({commerces: [], searching: true, count: 0, page: 1, masResultados: true, orderBy: orderParam}, this.getCommerces)
    }
    handleView = viewType => this.setState({view: viewType}, this.handleVisibleViewModal)
    handleVisibleOrderModal = () => this.setState({orderModal: !this.state.orderModal}) 
    handleVisibleViewModal= () => this.setState({viewModal: !this.state.viewModal}) 

    render(){

        const {navigation} = this.props;
        const {user} = this.props.route.params
        const {category, orderBy, newResults, searching, commerces, view, latPromedio, lonPromedio,latDeltaPromedio, lonDeltaPromedio} = this.state
        const {onEndReached, handleFilter, handleView} = this

        return (
            <View style={{backgroundColor:'#fff', flex:1}}>

                <SwipeDownModal onClose={this.handleVisibleOrderModal} flex={0.4} isVisible={this.state.orderModal} >
                    <Pressable>
                        <View style={{alignItems: 'center'}}>
                            <View style={{width: 40, height: 4, backgroundColor: 'gray', borderRadius: 2}}></View>
                            <View style={{marginVertical: 10}}>
                                <Text style={{fontFamily: 'inter-medium'}}>Ordenar Por</Text>
                            </View>
                        </View>
                        <TouchableOpacity 
                        onPress={() => handleFilter('distance')}
                        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomColor: '#e9e9e9', borderBottomWidth: 1}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{marginRight: 10}}>
                                    <MaterialCommunityIcons name="map-marker-distance" size={24} color="black" />
                                </View> 
                                <View>
                                    <Text style={{fontFamily: 'inter'}}>Distancia</Text>
                                </View>
                            </View>
                            <View>
                                { orderBy == 'distance' && <MaterialCommunityIcons name="check" size={20} color="black" /> }
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => handleFilter('rating')}
                        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomColor: '#e9e9e9', borderBottomWidth: 1}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={icons.star} style={{width: 20, height: 20, marginRight: 10}}/>
                                </View> 
                                <View>
                                    <Text style={{fontFamily: 'inter'}}>Evaluaciones</Text>
                                </View>
                            </View>
                            <View>
                                { orderBy == 'rating' && <MaterialCommunityIcons name="check" size={20} color="black" /> }
                            </View>
                        </TouchableOpacity>
                    </Pressable>
                </SwipeDownModal>

                <SwipeDownModal onClose={this.handleVisibleViewModal} flex={0.4} isVisible={this.state.viewModal}>
                    <Pressable>
                        <View style={{alignItems: 'center'}}>
                            <View style={{width: 40, height: 4, backgroundColor: 'gray', borderRadius: 2}}></View>
                            <View style={{marginVertical: 10}}>
                                <Text style={{fontFamily: 'inter-medium'}}>Tipo de Vista</Text>
                            </View>
                        </View>
                        <TouchableOpacity 
                            onPress={() => handleView('list')}
                            style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomColor: '#e9e9e9', borderBottomWidth: 1}}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <MaterialIcons name="format-list-bulleted" size={24} color="#000" style={{marginRight: 10}} />
                                </View> 
                                <View>
                                    <Text style={{fontFamily: 'inter'}}>Listado</Text>
                                </View>
                            </View>
                            <View>
                                { view == 'list' && <Image source={icons.check} style={{width: 15, height: 15, tintColor: colores.black}}/> }
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => handleView('map')}
                            style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomColor: '#e9e9e9', borderBottomWidth: 1}}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Image source={icons.google_maps} style={{width: 20, height: 20, marginRight: 10}}/>
                                </View> 
                                <View>
                                    <Text style={{fontFamily: 'inter'}}>Mapa</Text>
                                </View>
                            </View>
                            <View>
                                { view == 'map' && <Image source={icons.check} style={{width: 15, height: 15, tintColor: colores.black}}/> }
                            </View>
                        </TouchableOpacity>
                    </Pressable>
                </SwipeDownModal>

                <View style={{elevation: 4,             // Elevación de la sombra (Android)
                  shadowColor: '#000',      // Color de la sombra (iOS)
                  shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                  shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                  shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>

                    <Appbar.Header statusBarHeight={0} style={{height: 40}}>
                        <Appbar.BackAction onPress={() => navigation.goBack()} />
                        <Appbar.Content title={this.state.searching ? (
                                <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                                    Buscando locales
                                </Text> 
                            ) : (
                                <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                                    {category.name} ({this.state.count})
                                </Text>
                            )
                        } />
                    </Appbar.Header>

                    <View style={{paddingHorizontal:20}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{paddingBottom:5}}>
                        <SafeAreaView style={{flexDirection:'row', borderRadius:5, borderColor:'#757575', borderWidth:.2}}>
                            <View style={{width:'85%', paddingLeft:15, paddingBottom:10, paddingTop:10}}>
                                <Text style={{fontFamily:'roboto', fontSize:13, color:'#757575'}}>Cuéntanos. ¿Qué Estás Buscando?</Text>
                            </View>
                            <View style={{
                                flexDirection:'row', width:'15%', borderWidth:1, borderColor: colores.primary,
                                justifyContent:'center', alignItems: 'center',
                                backgroundColor: colores.primary,
                                borderBottomEndRadius:5, borderTopEndRadius:5
                            }}>
                                <MaterialIcons name="search" size={24} color="#fff" />
                            </View>
                        </SafeAreaView>
                        </TouchableOpacity>
                    </View>

                
                { (!searching && commerces.length > 0) && (
                    <View style={{paddingLeft: 20, flexDirection:'row', alignItems:'center', paddingTop: 5, paddingBottom: 10, borderBottomColor: '#e9e9e9', borderBottomWidth: .2}} >
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            <View style={{flexDirection:'row', alignItems:'center', paddingRight: 5}}>
                                <View style={{marginRight:5}}>
                                    <MaterialCommunityIcons name="filter-variant" size={15} color="#000" />
                                </View>
                                <View>
                                    <Text style={{fontFamily:'inter', fontSize: 11}}>Filtros:</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={this.handleVisibleOrderModal} style={{flexDirection:'row', alignItems:'center', paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 2, borderRadius: 3, backgroundColor: colores.darkButton}}>
                                <View style={{marginRight:3}}>
                                    <MaterialCommunityIcons name="filter-outline" size={15} color="#fff" />
                                </View>
                                <View>
                                    <Text style={{fontFamily:'roboto', fontSize: 11, color: colores.white}}>Ordenar Por</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.handleVisibleViewModal} style={{flexDirection:'row', alignItems:'center', paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 2, borderRadius: 3, backgroundColor: colores.darkButton}}>
                                <View style={{marginRight:3}}>
                                    <MaterialCommunityIcons name="map-marker-multiple-outline" size={15} color="#fff" />
                                </View>
                                <View>
                                    <Text style={{fontFamily:'roboto', fontSize: 11, color: colores.white}}>Tipo de Vista</Text>
                                </View>
                            </TouchableOpacity>

                        </ScrollView>
                    </View>
                        )
                    }
                </View>

                    {newResults && <TouchableOpacity style={{backgroundColor: '#007bff', paddingHorizontal:20, flexDirection: 'row', alignItems: 'center', paddingVertical:2}} onPress={this.reload}>
                        <View><Image source={icons.reload} style={{width: 10, height: 10, marginRight: 5, tintColor: '#fff'}}/></View>
                        <View><Text style={{fontFamily:'inter-medium', marginHorizontal:2, color: colores.white, fontSize:12}}>Hay nuevos resultados disponibles</Text></View>
                    </TouchableOpacity>}

                {
                    searching ? <Spinner /> : (
                        commerces.length > 0 ? (
                            view == 'list' ? 
                            <FlatList
                                data={commerces}
                                renderItem={(item, key) => <RenderCommerces item={item} key={key} navigation={navigation} user={user} />}
                                keyExtractor={(item, key) => String(key)}
                                style={{padding:10}}
                                onEndReached={onEndReached}
                                ListFooterComponent={<ListFooterComponent masResultados={this.state.masResultados}/>}
                            />
                            : <VistaMapa navigation={navigation} data={commerces} onEndReached={onEndReached} latDeltaPromedio={latDeltaPromedio} lonDeltaPromedio={lonDeltaPromedio} latPromedio={latPromedio} lonPromedio={lonPromedio}/>
                        ) : (
                            <View style={{justifyContent:'center', alignItems:'center', paddingHorizontal:20}}>
                                <Image source={images.not_found} style={{width:'100%', height:250}} resizeMode="contain"/>
                                <Text style={{fontFamily:'inter', fontSize:18, textAlign:'center'}}>No se han encontrado resultados en esta categoría...</Text>
                            </View> 
                        )
                    )
                }
            </View>
        )
    }
}

export default React.memo(Category)