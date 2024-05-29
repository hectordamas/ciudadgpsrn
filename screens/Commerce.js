import React, {useState, useRef, useEffect} from "react";
import {Image, View, Text, TouchableOpacity, ScrollView, Dimensions, Linking, Alert, KeyboardAvoidingView, ImageBackground, Pressable, Platform, Modal} from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {MapViewDirections, Spinner, CartExcerpt, SliderComponent, SwipeDownModal, Horario, QuestionOnCommerce} from "../components";
import { icons, colores, images } from "../constants";
import Moment from 'moment';
import 'moment/locale/es';
import YoutubePlayer from "react-native-youtube-iframe";
import { Contexto } from "../functions/Context";
import { Appbar, Button, Chip, TextInput as CommentInput } from 'react-native-paper';
import { AntDesign, MaterialCommunityIcons, FontAwesome, FontAwesome5  } from '@expo/vector-icons';

const {EXPO_PUBLIC_API_URL} = process.env
const EXPO_PUBLIC_API_KEY = "AIzaSyAvM85E_L3EOZ-P6x5kMm0xDCd_qRmcubU"
let ScreenWidth = Dimensions.get("window").width;
const youtubeHeight = (Dimensions.get("window").width / 16) * 9;

const CommentaryCreateForm = (props) => {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(1)
  const [values, setValues] = useState([1,2,3,4,5])
  const {visible, setVisible, commerce, user, setLoading, token, setComments} = props
  const scrollViewRef = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    if(visible){
      setTimeout(() => {
        input?.current?.focus()
      }, 250)
    }
  }, [visible])

  const createComment = async () => {
    setLoading(false)
    setVisible(false)
    await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/comments/store`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        'Authorization': token
      },
      body: JSON.stringify({comment, rating, commerce_id: commerce.id, user_id: user.id})
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res)
      setLoading(true)
      setComments(res.comments)
      Alert.alert('', 'Reseña creada con éxito')
    })
    .catch(err => console.log(err))
  } 

  return (
    <SwipeDownModal isVisible={visible} onClose={setVisible} flex={0.6}>
          <KeyboardAvoidingView                                     
            behavior={Platform.OS == 'ios' ? "padding" : null} 
            style={{ flex: 1 }}
            keyboardVerticalOffset={60}
            >   
            <Pressable style={{flex: 1}}>
              <View style={{alignItems: 'center'}}>
                  <View style={{width: 40, height: 4, backgroundColor: 'gray', borderRadius: 2}}></View>
              </View>
              <View style={{flexDirection:'row', justifyContent:'center', paddingVertical: 20, marginTop: 10}}>
                {values.map((item, key) =>  
                    <TouchableOpacity key={key} onPress={() => setRating(item)}>
                      <Image 
                        source={item <= rating ?  icons.estrella_filled : icons.estrella} 
                        style={{width:24, height:24, marginRight:10, tintColor:'#ffc107'}}
                      />
                    </TouchableOpacity>
                  )
                }
              </View>       
              <ScrollView ref={scrollViewRef} contentContainerStyle={{paddingHorizontal: 15}}>
                  <CommentInput 
                    mode={'outlined'}
                    placeholderTextColor={'#bdbdbd'}
                    outlineColor={'#e9e9e9'}
                    activeOutlineColor={'#e9e9e9'}
                    cursorColor={colores.primaryButton}
                    placeholder="Cuéntanos tu Experiencia en el Local..."
                    onChangeText={(text) => setComment(text)}
                    outlineStyle={{borderWidth: 1}}
                    style={{marginBottom: 15, fontFamily: 'inter-medium', fontSize: 14}}
                    returnKeyType='send'
                    ref={input}
                  />

                  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                    <Button 
                      icon={'send'} 
                      mode="contained" 
                      onPress={createComment} 
                      style={{marginRight: 5, flex: 1, backgroundColor: colores.darkButton, borderRadius: 5}}>Enviar</Button>
                    <Button icon={'cancel'} mode="contained" onPress={setVisible} style={{flex: 1, borderRadius: 5}}>Cancelar</Button>
                  </View>
              </ScrollView>
            </Pressable>
          </KeyboardAvoidingView>
    </SwipeDownModal>
  )
}

const initialState = {
  commerce: null,
  images: [],
  activeSlide: 0,
  fontLoaded: false,
  userLatitude: null,
  userLongitude: null,
  loaded: false,
  region: null,
  visible: false,
  likes: [],
  success: false,
  comments: [],
  error: false,
  products: [],
  jobsCount: null,
  productId: null,
  processing: false,
  hourVisible: false,
  days: [],
  imageVisible: false,
  questions: [],
  users: []
};

class Commerce extends React.Component {
  _isMounted = false;
  state = {...initialState, commerce_id: this.props.route.params.commerce_id}
  
  static contextType = Contexto

  setRegion = () => {
    let {lat, lon} = this.state.commerce;
    let userLat = this.state.userLatitude;
    let userLon = this.state.userLongitude;
    let latDelta = 0;
    let lonDelta = 0;

    lat > userLat ? (latDelta = lat - userLat) : (latDelta = userLat - lat);
    lon > userLon ? (lonDelta = lon - userLon) : (lonDelta = userLon - lon);

    this.setState({
      region: {
        latitudeDelta: latDelta * 2.8,
        longitudeDelta: lonDelta * 2.8,
        latitude: (lat + userLat) / 2,
        longitude: (lon + userLon) / 2,
      },
      loaded: true,
    });
  }

  getData = async () => {
    const {latitude, longitude} = this.context.location.coords
    let userLatitude = latitude;
    let userLongitude = longitude;
    let {commerce_id} = this.props.route.params;
    let url = `${EXPO_PUBLIC_API_URL}/api/showCommerce/${commerce_id}`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ lat: userLatitude, lon: userLongitude }),
    })
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
      this.setState({
        likes: res?.commerce?.likes, 
        commerce: res?.commerce, 
        comments: res?.comments, 
        images: res?.commerce?.imgs, 
        userLatitude, userLongitude, 
        products: res?.products, 
        days: res?.days, 
        questions: res?.questions,
        users: res?.commerce?.users?.map((item) => item?.pivot?.user_id),
        jobsCount: res?.jobsCount
      }, this.setRegion)
    })
    .catch((error) => console.log(error));
    
  }

  componentDidMount = async () => {
    this._isMounted = true;
    if(this._isMounted){
      this.setState(initialState, this.getData);

      this?.props?.navigation?.addListener('focus', () => {
        console.log(this.props.route?.params?.questions)
        let qs = this.props.route?.params?.questions
        if(qs){
          this.setState({questions: qs})
        }
      })
    }
  }

  componentWillUnmount = () => this._isMounted = false

  componentDidUpdate = () => {
    const {commerce_id} = this.state;
    const paramCommerceId = this.props.route.params.commerce_id;
    
    if(this._isMounted){
      if(commerce_id !== paramCommerceId){
        this.setState({commerce_id: paramCommerceId, ...initialState}, this.getData)
      }
    }
  }

  setVisible = () => this.setState({visible: !this.state.visible})
  setLoading = (loaded) => this.setState({loaded})
  setSuccess = (success) =>  this.setState({success})

  authComment = () => {
    const {navigation} = this.props
    Alert.alert('Inicia Sesión','Para valorar este comercio debes iniciar sesión', [
      { text: 'Cancelar', style: 'cancel'},
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ])
  }

  auth = () => {
    const {navigation} = this.props;
    Alert.alert('Inicia Sesión','Para agregar a favoritos debes iniciar sesión', [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel'},
        { text: 'OK', onPress: () => navigation.navigate('Login') },
    ])
  }

  like = async () => {
    const {user} = this.props.route.params
    const item = this.state.commerce
    if(user){
        this.setState({
            likes: this.state.likes?.concat({user_id: user.id, commerce_id: item.id})
        })

        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
                'Authorization': this.context?.token
            },
            body: JSON.stringify({commerce_id: item.id, user_id: user.id})
          })
          .then((res) => res.json())
          .then((res) => {})
          .catch(err => console.log(err))
    }
  }

  dislike = async () => {
    const {user} = this.props.route.params
    const item = this.state.commerce
    if(user){
        this.setState({
            likes: this.state.likes?.filter((item) => item.user_id !== user.id)
        })

        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/dislike`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
                'Authorization': this.context?.token
            },
            body: JSON.stringify({commerce_id: item.id, user_id: user.id})
        })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch(err => console.log(err))
    }
  }

  setQuestions = (questions) => this.setState({questions}) 

  render() {
    const {navigation} = this.props;
    const {loaded, likes, commerce, comments, products, questions} = this.state;
    const {latitude, longitude} = this.props.route.params.location.coords
    const {user} = this.props.route.params;
    const rate = [1,2,3,4,5];
    const dimensionesLink = {marginRight: 5, width: 40, height: 40, borderRadius: 5, justifyContent: "center", alignItems: "center"}
    return (
      <KeyboardAvoidingView 
          style={{flex: 1}} 
          behavior={Platform.OS == 'ios' ? 'padding' : null}  
          keyboardVerticalOffset={60}
        >

        <Modal visible={this.state.imageVisible} transparent>
          <TouchableOpacity onPressOut={() => this.setState({imageVisible: false})} style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: '80%'}}>
              <TouchableOpacity onPress={() => this.setState({imageVisible: false})}>
                <MaterialCommunityIcons size={35} color={'#fff'} name="close"/>
              </TouchableOpacity>
              <Image 
                source={{ uri: EXPO_PUBLIC_API_URL + this.state.commerce?.logo }} 
                resizeMode="contain" 
                style={{width: '100%', height: 250}}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        <Horario 
          visible={this.state.hourVisible} 
          setVisible={() => this.setState({hourVisible: !this.state.hourVisible})}
          days={this.state.days}
        />
        <CommentaryCreateForm commerce={commerce} 
          user={user} 
          visible={this.state.visible} 
          setSuccess={this.setSuccess} 
          navigation={navigation} 
          setLoading={this.setLoading} 
          setVisible={this.setVisible}
          token={this.context?.token}
          setComments={(comments) =>this.setState({comments: comments})}
        />
        <Appbar.Header mode="center-aligned" 
          statusBarHeight={0}
          style={{
            height: 50, elevation: 4,             // Elevación de la sombra (Android)
            shadowColor: '#000',      // Color de la sombra (iOS)
            shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
            shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
            shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'
          }}>
          <Appbar.BackAction onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Inicio') } />
          <Appbar.Content title={<Text style={{
                      fontFamily: "poppins-medium",
                      fontSize: 15,
                      textTransform: "capitalize",
                      marginHorizontal: 5,
                      flexWrap: 'wrap',
                      maxWidth: 230
                    }}
                    numberOfLines={1}
                  >
                    {this.state.commerce?.name}
                  </Text>} />
          <Appbar.Action icon="magnify" onPress={() => navigation.navigate('Search')} />
        </Appbar.Header>
        {loaded ? (
          <>
            <ScrollView 
              style={{ backgroundColor: "#fff"}} 
              contentContainerStyle={{paddingBottom: 20}}>

              <SliderComponent 
                images={this.state?.images} 
                commerce_id={this.state?.commerce?.id}
                commerce={commerce}
                user={user}
                likes={likes}
                like={this.like}
                dislike={this.dislike}
                auth={this.auth}
              />

              <View style={{flexDirection: "row", paddingHorizontal: 20, paddingTop: 10, alignItems: 'center'}}>
                <TouchableOpacity style={{ marginRight: 15 }} onPress={() => this.setState({imageVisible: true})}>
                  <Image
                    source={{ uri: EXPO_PUBLIC_API_URL + this.state.commerce?.logo }}
                    style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#e9e9e9' }}
                  />
                </TouchableOpacity>

                <View>
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5}}>
                    <Text
                      style={{
                        fontFamily: "inter-medium",
                        fontSize: 15,
                        marginTop: 5,
                        flexWrap: 'wrap',
                        width: '90%'
                      }}
                    >
                      {this.state.commerce?.name}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 15,
                      }}
                    >
                      <AntDesign name="star" size={20} color="#ffc107" style={{marginRight: 5}}/>
                      <Text style={{ fontFamily: "inter-medium", marginTop: 3 }}>
                        {this.state.commerce.rating ? this.state.commerce.rating.toFixed(1) : "Nuevo"}
                      </Text>
                    </View>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <MaterialCommunityIcons name="map-marker-distance" size={20} color="black" style={{marginRight: 5}} />
                      <Text style={{ fontFamily: "inter-medium" }}>
                        {this.state.commerce?.distance > 1
                          ? `${this.state.commerce?.distance.toFixed(2)} km`
                          : `${(this.state.commerce?.distance * 1000).toFixed(2)} m`} aprox.
                      </Text>
                    </View>
                  </View>
                </View>

              </View>

              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{paddingHorizontal: 20, paddingTop: 15}}>
                {this.state.commerce?.whatsapp && (
                  <TouchableOpacity style={{...dimensionesLink, backgroundColor: "#25d366"}}
                    onPress={() => Linking.openURL(`https://api.whatsapp.com/send/?phone=${this.state.commerce?.whatsapp.replace('+', '')}&text=¡Hola! Acabo de ver tu local en CiudadGPS: Me gustaría obtener más información sobre tus productos y servicios.`)}
                  >
                    <FontAwesome name="whatsapp" size={26} color="#fff" />
                  </TouchableOpacity>
                )}

                {this.state.commerce.facebook && (
                  <TouchableOpacity style={{...dimensionesLink, backgroundColor: "#0078d2"}} onPress={() => Linking.openURL(this.state.commerce?.facebook)}>
                    <FontAwesome name="facebook" size={26} color="#fff" />
                  </TouchableOpacity>
                )}

                {this.state.commerce?.twitter && (
                  <TouchableOpacity style={{...dimensionesLink, backgroundColor: "#000"}} onPress={() => Linking.openURL(this.state.commerce?.twitter)}>
                    <Image
                      source={icons.x}
                      style={{ width: 20, height: 20, tintColor: '#fff'}}
                    />                  
                  </TouchableOpacity>
                )}

                {this.state.commerce?.instagram && (
                  <TouchableOpacity onPress={() => Linking.openURL(this.state.commerce?.instagram)}>
                    <ImageBackground source={images.instagram_bg} style={dimensionesLink} imageStyle={{borderRadius: 5}}>
                      <FontAwesome name="instagram" size={26} color="#fff" />
                    </ImageBackground>
                  </TouchableOpacity>
                )}

                {this.state.commerce?.tiktok && (
                  <TouchableOpacity style={{...dimensionesLink, backgroundColor: "#000"}} onPress={() => Linking.openURL(this.state.commerce?.tiktok)}>
                    <FontAwesome5 name="tiktok" size={24} color="#fff" />
                  </TouchableOpacity>
                )}

                {this.state.commerce?.threads && (
                  <TouchableOpacity style={{...dimensionesLink, backgroundColor: "#000"}} onPress={() => Linking.openURL(this.state.commerce?.threads)}>
                    <Image
                      source={icons.threads}
                      style={{ width: 26, height: 26, tintColor: '#fff'}}
                    />
                  </TouchableOpacity>
                )}

                {this.state.commerce?.web && (
                  <TouchableOpacity style={{...dimensionesLink, backgroundColor: colores.black}} onPress={() => Linking.openURL(this.state.commerce?.web)}>
                    <MaterialCommunityIcons name="web" size={26} color="#fff" />
                  </TouchableOpacity>
                )}

                {this.state.commerce?.telephone && (
                  <TouchableOpacity style={{...dimensionesLink, backgroundColor: "#25d366"}} onPress={() => Linking.openURL(`tel:${this.state.commerce?.telephone.startsWith('+') ? this.state.commerce?.telephone : '+' + this.state.commerce?.telephone}`)}>
                    <MaterialCommunityIcons name="phone" size={26} color="#fff" />
                  </TouchableOpacity>
                )}

                {this.state.commerce?.user_email && (
                  <TouchableOpacity style={{...dimensionesLink, backgroundColor: colores.black}} onPress={() => Linking.openURL(`mailto:${this.state.commerce?.user_email}`)}>
                    <MaterialCommunityIcons name="email" size={26} color="#fff" />
                  </TouchableOpacity>
                )}


              </ScrollView>

                  <View style={{paddingHorizontal: 20, paddingTop: 10, flexDirection: 'row'}}>
                  {this.state?.jobsCount > 0 &&
                    <Button 
                      icon="briefcase-check-outline"
                      mode="contained"
                      labelStyle={{marginVertical: 5}}
                      style={{
                        borderRadius: 5, 
                        backgroundColor: colores.darkButton, 
                        width: 180,
                        marginRight: 5
                      }}
                      onPress={() => {
                        navigation.navigate('JobsCommerce', {commerce_id: this.state?.commerce?.id}) 
                      }}
                    >
                      <Text style={{fontFamily: 'inter-medium', fontSize: 11}}>Vacantes Disponibles</Text>
                    </Button>}

                    {this.state?.commerce?.url &&
                      <Button 
                        icon={'link'}
                        mode="contained"
                        labelStyle={{marginVertical: 5}}
                        style={{
                          borderRadius: 5, 
                          backgroundColor: colores.darkButton, 
                          width: 150,
                        }}
                        onPress={() => Linking.openURL(this.state?.commerce?.url)}
                        >
                        <Text style={{fontFamily: 'inter-medium', fontSize: 11}}>{this.state?.commerce?.urlName}</Text>
                      </Button>
                    }
                  </View>


              {this.state.commerce?.info ?
                <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                  <Text>{this.state.commerce?.info}</Text>
                </View> 
                :
                <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                  <Text>Sin descripción disponible.</Text>
                </View>
              }

              {!this.state?.users?.length > 0 &&
                <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(`https://api.whatsapp.com/send/?phone=584129749348&text=Hola, soy el propietario del establecimiento "${this.state?.commerce?.name}" que aparece en CiudadGPS. Me gustaría poder modificar la información y formalizar mi registro a la plataforma.`)
                    }}
                  >
                    <Text style={{
                      fontFamily: 'inter-bold', 
                      color: colores.dangerButton,
                      fontSize: 12
                    }}>¿Eres el Propietario de este Establecimiento?</Text>
                  </TouchableOpacity>
                </View>
              }

              <View style={{paddingHorizontal: 20, paddingVertical: 2, flexDirection: "row", flex: 1, alignItems: "center", flexWrap: 'wrap'}}>
                <Text style={{fontFamily: "inter-medium", marginRight: 5, fontSize: 13}}>
                  Categorías:
                </Text>

                {this.state.commerce?.categories?.map(category => 
                    <TouchableOpacity key={category.id}
                      style={{paddingHorizontal: 10, backgroundColor: colores.darkButton, borderRadius: 3, maxWidth: '65%', marginRight: 5, marginBottom: 5}}
                      onPress={() => navigation.navigate('Category', {category_id: category?.id})}>
                        <Text style={{fontFamily: "inter-medium", fontSize: 10, color: colores.white, paddingVertical:0}}>
                          {category?.name}
                        </Text>
                    </TouchableOpacity>
                )}
              </View>

              {this.state.commerce?.tags?.length > 0 && (
                <View style={{paddingHorizontal: 20, paddingVertical: 2, flexDirection: "row", alignItems: "center", flexWrap: 'wrap'}}>
                  <Text style={{fontFamily: "inter-medium", marginRight: 2, paddingVertical: 2, fontSize: 13}}>
                    Etiquetas:
                  </Text>
                  {this.state.commerce?.tags?.map((item, key) => 
                      <TouchableOpacity onPress={() => navigation.navigate('ShowCommerces', {lat: latitude, lon: longitude, text: item.name})} key={key}>
                        <View style={{paddingVertical: 2, paddingHorizontal: 2}}>
                          <Text style={{fontFamily: "inter-medium", fontSize: 12, color: "#0078d2", textTransform: 'capitalize'}}>
                            #{item?.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  }
                </View>
                )
              }

              {
                this.state.commerce?.address && (
                  <View style={{paddingHorizontal:20, paddingTop: 5, paddingBottom:5, flexDirection: "row", flexWrap: 'wrap'}}>                   
                    <Text style={{fontSize: 13}}>
                      <Text style={{fontFamily:'inter-medium'}}>Dirección: </Text>
                      <Text style={{textTransform: 'capitalize'}}>{this.state.commerce.address}</Text>
                    </Text>
                  </View>
                )
              }

              <View style={{paddingHorizontal: 20, paddingTop: 15, paddingBottom: 10}}>
                {this.state.commerce?.distance < 200 ?  
                    <MapView 
                      initialRegion={this.state.region} 
                      style={{ width: "100%", height: 300 }} 
                     // provider={PROVIDER_GOOGLE}
                    >
                      <MapViewDirections
                        origin={{latitude: this.state.userLatitude, longitude: this.state.userLongitude}}
                        destination={{latitude: this.state.commerce.lat, longitude: this.state.commerce.lon}}
                        apikey={EXPO_PUBLIC_API_KEY}
                        strokeColor={colores.primary}
                        strokeWidth={3.5}
                        lineDashPattern={[10]}
                      />
                      <Marker coordinate={{latitude: this.state.commerce.lat, longitude: this.state.commerce.lon}} title={this.state.commerce?.name}> 
                        <Image
                          source={icons.marker}
                          style={{width: 40, height: 40, tintColor: colores.primary}}
                          resizeMode="contain"
                        />              
                      </Marker>
                      <Marker coordinate={{latitude: this.state.userLatitude, longitude: this.state.userLongitude}} title="Usted se encuentra aquí!">
                        <Image
                          source={icons.map_pin}
                          style={{width: 40, height: 40}}
                          resizeMode="contain"
                        />              
                      </Marker>
                    </MapView> : 
                    <MapView 
                      initialRegion={{latitude: this.state.commerce?.lat, longitude: this.state.commerce?.lon, longitudeDelta: 0.2, latitudeDelta: 0.2}} 
                      style={{ width: "100%", height: 300 }} 
                      provider={PROVIDER_GOOGLE}
                    >
                      <Marker 
                        coordinate={{latitude: this.state.commerce?.lat, longitude: this.state.commerce?.lon}} 
                        title={this.state.commerce?.name
                        }> 
                        <Image
                          source={icons.marker}
                          style={{width: 40, height: 40, tintColor: colores.primary}}
                          resizeMode="contain"
                        />              
                      </Marker>
                    </MapView>
                }
              </View>

              <View style={{ paddingHorizontal: 20, paddingBottom: 5 }}>
                <Button 
                  icon="map-marker-outline" 
                  mode="contained" 
                  labelStyle={{fontFamily: 'inter-medium'}}
                  style={{backgroundColor: colores.darkButton, borderRadius: 5}}
                  onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${this.state.commerce.lat},${this.state.commerce.lon}`)}>
                  Inicia Ruta en Google Maps
                </Button>
              </View>

              {this.state?.commerce?.hourEnable &&
                <View style={{paddingHorizontal: 20}}>
                  <Button 
                    icon={'clock-outline'} 
                    mode="elevated" 
                    labelStyle={{color: colores.darkButton, fontFamily: 'inter-medium'}}
                    style={{borderRadius: 5}}
                    onPress={() => this.setState({hourVisible: !this.state.hourVisible})}  
                    >Horarios de Atención
                  </Button>
                </View> 
              }

              {this.state.commerce?.youtube && 
                  <View style={{paddingHorizontal:20, marginTop:20}}>
                    <YoutubePlayer height={youtubeHeight} play={false} videoId={this.state.commerce?.youtube} style={{backgroundColor: '#e9e9e9'}} />
                  </View>
              }

              {products?.length > 0 && commerce?.enable &&
                <View>
                    <View style={{flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20, justifyContent: 'space-between', alignItems: 'center'}}>
                      <Text style={{ fontFamily: "inter-medium", fontSize: 16, marginBottom: 10}}>Productos</Text>
                      <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate('Catalogo', {commerce_id: commerce.id, commerce_name: commerce.name})}>
                          <Text style={{fontFamily: 'inter-medium', fontSize: 12, color: colores.dangerButton, marginRight: 3}}>Ver todos</Text>
                          <MaterialCommunityIcons name="arrow-right" size={15} color={colores.dangerButton} />
                      </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20}}>
                      {products?.map((item) => {
                        let {image} = item
                        return (
                          <TouchableOpacity onPress={() => navigation.navigate('ProductShow', {product_id: item.id})} style={{width: '33%'}} key={item.id}>
                            <View style={{borderRadius: 5, marginRight: 5, marginBottom: 5, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                              <Image source={{uri: image.startsWith('http') ? image : EXPO_PUBLIC_API_URL + image}} style={{flex: 1, aspectRatio: 1}} resizeMode="contain"/>
                              <TouchableOpacity style={{position: "absolute", right: 5, top: 5, padding: 5, backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: 5}} 
                                onPress={() => this.context.addToCart(item, commerce) }>
                                  <MaterialCommunityIcons name="cart-outline" size={25} color={'#fff'} />
                              </TouchableOpacity>
                            </View>
                          </TouchableOpacity>
                        )
                      }

                      )}
                    </View>
                </View>
              }

              <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 5 }}>
                <Text style={{ fontFamily: "inter-medium", fontSize: 16, paddingBottom: 10}}>
                  Reseñas
                </Text>
              </View>

              <View style={{ paddingHorizontal: 20 }}>
                {comments.length > 0 ? comments.map((item) => 
                  <View key={item.id} style={{ marginBottom: 15, paddingBottom: 10, borderBottomWidth: 0.2, borderColor: "#e6e6e6", flexDirection: 'row' }}>
                    <View key={item.id} style={{ flexDirection: "row", flex: 1 }}>
                      <View style={{ marginRight: 10 }}>
                        <Image source={item.user.avatar ? {uri: item.user.avatar.startsWith('http') ? item.user.avatar : EXPO_PUBLIC_API_URL + item.user.avatar} : images.user_avatar_default} style={{ width: 40, height: 40, borderRadius: 20 }} />
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={{ fontFamily: "inter-medium", flexWrap: 'wrap', fontSize: 14 }}>
                          {item.user.name}
                        </Text>
                        <Text style={{ fontFamily: "inter", fontSize: 10, marginBottom: 2 }}>
                          {Moment(item.created_at).fromNow()}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                          {rate.map((rate, key) => <Image key={key} source={rate <= item.rating ? icons.estrella_filled : icons.estrella} style={{ width: 15, height: 15, tintColor: '#ffc107' }} />)}
                        </View>
                        {item.comment && 
                        <Text style={{fontFamily: "roboto", fontSize: 13, marginTop: 5, maxWidth: ScreenWidth }} >
                          {item.comment}
                        </Text>}
                      </View>
                    </View>
                  </View>) :  
                  <View>
                    <Text style={{fontFamily: "inter", fontSize: 13 }} >
                      No hay opiniones disponibles aún, sé el primero en reseñar
                    </Text>
                  </View>
                }

                <View style={{ marginTop: 5, paddingBottom: 10 }}>
                    <Button 
                      icon="message-draw" 
                      mode="contained" 
                      labelStyle={{fontFamily: 'inter-medium'}}
                      style={{marginBottom: 5, backgroundColor: colores.darkButton, borderRadius: 5}}                       
                      onPress={user ? this.setVisible : this.authComment} 
                      >
                      Escribe una Opinión
                    </Button>
                    <Button 
                      icon="star-box-multiple-outline" 
                      mode="elevated" 
                      style={{borderRadius: 5}}
                      labelStyle={{color: colores.darkButton, fontFamily: 'inter-medium'}}
                      onPress={() => navigation.navigate('Comentarios', { commerce_id: commerce.id })}>
                      Todas las Opiniones
                    </Button>
                  </View>
                </View>
                
                         
                <QuestionOnCommerce 
                  token={this.context?.token}
                  questions={questions} 
                  commerce={this.state.commerce} 
                  user={user}
                  navigation={navigation}
                  users={this.state.users}
                  setQuestions={this.setQuestions}
                />


            </ScrollView>
          </>
        ) : <Spinner /> }
        {this.context?.cart?.length > 0 && this.context?.cart_commerce_id == this.state?.commerce?.id && <CartExcerpt navigation={navigation} whatsapp={commerce?.whatsapp} />}
      </KeyboardAvoidingView>
    );
  }
}

export default React.memo(Commerce);