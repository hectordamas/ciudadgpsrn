import React from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, SafeAreaView, ScrollView, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import { colores, images} from '../constants';
import { Appbar } from 'react-native-paper';
import { Contexto } from '../functions/Context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Platform } from 'react-native';

const {EXPO_PUBLIC_API_URL} = process.env;    

const initialState =  {
    text:'',
    commerces: [],
    categories: [],
    tags: [],
    searching: false,
    queryResult: [],
    error: false
}

let timeout = null

export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.textInput = React.createRef();
    }

    state = initialState

    static contextType = Contexto

    onChangeText = (text) => {
        clearTimeout(timeout)
        this.setState({text:text, searching: true}) 
        timeout = setTimeout(async () => {
            await fetch(`${EXPO_PUBLIC_API_URL}/api/searchCommerces?textInput=${text}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Requested-With' : 'XMLHttpRequest',
                }
            })
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                text ? this.setState({...result, searching: false}) : this.setState({commerces: [], categories: [], searching: false})
            })
            .catch((error) => console.log(error));
        }, 200)
    }

    onSubmit = async () => {
        const {navigation} = this.props
        let lat, lon
        let {latitude, longitude} = this.context.location.coords
        lat = latitude
        lon = longitude
        let {text} = this.state
        
        text !== '' && navigation.navigate('ShowCommerces', {lat, lon, text});
    } 

    componentDidMount = () => {
        const {navigation} = this.props

        navigation.addListener('focus', () => {
            this.setState({...initialState}, () => {
                setTimeout(() => this.textInput.current?.focus(), 10)
            })
            
        })
    }

    render(){
        const {navigation} = this.props
        let {text, categories, commerces, tags, searching} = this.state

        return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS == 'ios' ? 'padding' : null}
            keyboardVerticalOffset={60} 
        >
            <Appbar.Header  statusBarHeight={0}  style={{height: 50}}>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title={
                        <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                            Buscar
                        </Text>} 
                    />
            </Appbar.Header> 
            <View style={{backgroundColor:'#fff', paddingHorizontal:20, flex:1}}> 
              <View style={{paddingBottom:10}}>
                  <SafeAreaView style={{flexDirection:'row', borderRadius: 5, borderColor:'#757575', borderWidth:.2}}>
                      <TextInput
                          style={{width:'85%', paddingLeft:15, paddingVertical: 10, fontFamily:'roboto', fontSize:13.2, color:'#757575'}}
                          placeholder="Cuéntanos. ¿Qué estás buscando?"
                          placeholderTextColor="#757575"
                          ref={this.textInput}
                          value={text}
                          onChangeText={this.onChangeText}
                          onSubmitEditing={this.onSubmit}
                          returnKeyType={'search'}
                          onEndEditing={this.onEndEditing}
                        />
                      <TouchableOpacity style={{flexDirection:'row', width:'15%', borderWidth:1, borderColor: colores.primary, justifyContent:'center', alignItems: 'center', backgroundColor: colores.primary, borderBottomEndRadius:5, borderTopEndRadius:5}} 
                        onPress={this.onSubmit}>
                            <MaterialIcons name="search" size={24} color="#fff" />
                      </TouchableOpacity>
                  </SafeAreaView>
              </View>
                          
              {
                  text ? (
                      <ScrollView>
                          <>
                                {categories?.length > 0 && (
                                        <View>
                                            {
                                                categories.map((item) => (
                                                    <TouchableOpacity style={{paddingVertical:10, flexDirection:'row', alignItems: 'center', textTransform: 'capitalize '}} key={item.id} onPress={() => navigation.navigate('Category', {category_id: item.id})}>
                                                        <View style={{marginRight: 5}}>
                                                            <MaterialCommunityIcons name="magnify" size={15} color="black" />
                                                        </View> 
                                                        <View>
                                                            <Text style={{fontFamily:'inter', textTransform: 'capitalize'}}>{item.name}</Text>
                                                        </View>                                                
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View>
                                    )                                
                                }


                                {commerces?.length > 0 && (
                                      <View>                                
                                          {
                                            commerces.map((item) => (
                                                <TouchableOpacity style={{paddingVertical:10, flexDirection:'row', alignItems: 'center'}} key={item.id} onPress={() => navigation.navigate('Commerce', {commerce_id: item.id})}>
                                                    <View style={{marginRight: 5}}>
                                                        <MaterialCommunityIcons name="store-outline" size={15} color="black" />
                                                    </View> 
                                                    <View>
                                                        <Text style={{fontFamily:'inter', textTransform: 'capitalize'}}>{item.name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ))
                                          }   
                                      </View>
                                  )
                                }

                          
                              {(commerces?.length > 0 || categories?.length > 0 || tags?.length > 0) && (
                                  <TouchableOpacity style={{paddingVertical:10, flexDirection:'row', alignItems: 'center'}} onPress={this.onSubmit}>
                                      <View style={{marginRight: 5}}>
                                            <MaterialCommunityIcons name="magnify" size={15} color="black" />
                                      </View> 
                                      <View>
                                          <Text style={{fontFamily:'inter', textTransform: 'capitalize'}}>Ver todos los resultados</Text>
                                      </View>
                                  </TouchableOpacity>
                              ) }

                              {(searching) && (
                                  <View style={{paddingVertical:10, flexDirection:'row', alignItems:'center'}}>
                                      <View style={{marginRight:5}}>
                                          <ActivityIndicator color={'black'} size={13}/>
                                      </View>
                                      <View>
                                          <Text style={{fontFamily:'inter', marginLeft:5}}>Procesando Búsqueda...</Text>
                                      </View>
                                  </View>
                              ) }

                            
                              {(commerces?.length == 0 && categories?.length == 0 && tags?.length == 0 && searching == false) && (
                                  <View style={{flex: .9, justifyContent:'center', alignItems:'center'}}>
                                      <Image source={images.not_found} style={{height:230}} resizeMode="contain"/>
                                      <Text style={{fontFamily:'inter', textAlign: 'center', fontSize:18}}>No se han encontrado {'\n'} resultados</Text>
                                  </View>  
                              )}
                          </>
                      </ScrollView>
                  ) : (
                      <View style={{flex: .9, justifyContent:'center', alignItems:'center'}}>
                          <Image source={images.search_image} style={{height:250}} resizeMode="contain"/>
                          <Text style={{fontFamily:'inter', textAlign: 'center', fontSize: 15}}>¿Coméntanos qué estás {'\n'} buscando?</Text>
                      </View>                
                  )
                }
            </View>
        </KeyboardAvoidingView>
        );    
    }
}