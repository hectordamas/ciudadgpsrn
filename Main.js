import React, {createRef} from "react";
import {Alert, Platform, View} from "react-native";
import * as ExpoLinking from 'expo-linking';
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Home, Favoritos, MiCuenta, TuNegocio, Register, Login, Search, Commerce, Category, ShowCommerces, Anuncios, Comentarios, PaymentScreen, OnboardingScreen, Categories, Edit, ComerciosAsociados, Soporte, Stories, Jobs, Job, Cart, Checkout, ProductsIndex, ProductsCreate, ProductsEdit, JobsIndex, JobsEdit, JobsCreate, SearchJobs, ViewReport, Catalogo, ProductShow, HoursIndex, BirthAndGender, Thread, Questions, JobsCommerce} from "./screens"
import { PcategoryEdit, PcategoryList, PcategoryCreate} from "./screens";
import * as Location from 'expo-location';
import { colores } from "./constants";
import {LoadingLottie, CustomDrawer, ErrorHandling, SuccessHandling, Spinner, Notification} from './components';
import * as Updates from "expo-updates";
import { Contexto } from "./functions/Context";
import {checkForUpdates} from './functions';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

const Drawer = createDrawerNavigator();
const {EXPO_PUBLIC_API_URL} = process.env;    

const initialState = {
  loggedIn: false,
  done: false,
  token: null,
  userName: null,
  avatar: null,
  login:false,
  logout: false,
  user: null, 
  loaded: false,
  location:null,
  addressResponse:null,
  categories: [],
  commerces: [],
  nearest: [],
  banners : [],
  error: false,
  noLocation: false,
  check: false,
  STRIPE_KEY: '',
  cart: [],
  cart_commerce_id: null,
  cart_commerce_ws: null,
  navigation: null,
  stories: [],
  storiesPage: 2,
  loading: true, 
}

const MyTheme = {...DefaultTheme, colors: {...DefaultTheme.colors, background: 'white'}}

class Main extends React.Component {

  constructor (props) {
    super(props);
    this.navigationRef = createRef();
  }

  state = initialState

  storeData = async (type, token, user) => {
    try {
      await AsyncStorage.setItem('token', `${type} ${token}`)
      await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
      this.setState({error:true})
      console.log(e);
    }
  }

  initialize = async () => {
    try {
      await AsyncStorage.setItem('done', 'true')
      const done = await AsyncStorage.getItem('done')
      if(done){
        this.setState({done})
      }
    } catch(e){
      this.setState({error:true})
      console.log(e);
    }
  }
  
  getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const user = await AsyncStorage.getItem('user')
      const done = await AsyncStorage.getItem('done')
      token && this.setState({token: token})
      user && this.setState({user:JSON.parse(user), loggedIn:true})
      done && this.setState({done})
    } catch(e) {
      console.log(e);
    }
  }

  socialLogin = async (result, token) => {
    if(result){
      this.setState({token: `Bearer ${token}`, loggedIn: true, login:false, user: result}, () => {
        this.getHomeData();
        this.storeData('Bearer', token, result)
      });
    }
  }

  handleLogin = (result) => {
    this.setState({token: `${result.token_type} ${result.access_token}`, loggedIn: true, loaded:true, user: result.user}, () => {
      this.getHomeData();
      this.storeData(result.token_type, result.access_token, result.user)
    });
  }

  handleLogout = async () => {
    this.setState({logout:true})
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');

    await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With' : 'XMLHttpRequest',
        'Authorization' : this.state.token
      }
    })
    .then(response => response.json())
    .then((result) => this.setState({loggedIn: false, logout:false, user:null, token:null}, () => console.log(result)) )
    .catch((error) => this.setState({error:true}) );
  }

  getHomeData = async () => {
      console.log('getHomeData')
      let {latitude, longitude} = this.state.location.coords;
      let {user} = this.state
      console.log(user)
      let addressResponse = await Location.reverseGeocodeAsync({latitude, longitude});
      await fetch(`${EXPO_PUBLIC_API_URL}/api/home?lat=${latitude}&lon=${longitude}&userId=${user?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With' : 'XMLHttpRequest',
        },
      })
      .then(response => response.json())
      .then((result) => {
        console.log(result)
        if(result.categories){
          if(this.state.banners.length > 0){
            let withoutBanners = delete result?.banners
            this.setState({...withoutBanners, addressResponse, loaded:true}) 
          }else{
            this.setState({...result, addressResponse, loaded:true}) 
          }
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  onRefresh = () => {
    this.setState({...initialState}, this.componentDidMount);
    return false;
  }

  setUserChanges = async (user) => {
    await AsyncStorage.setItem('user', JSON.stringify(user))
    this.getData()
  }
  
  checkUpdate = async () => {
    await fetch(`${EXPO_PUBLIC_API_URL}/api/getAppStoresVersion`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With' : 'XMLHttpRequest',
        },
    })
    .then(res => res.json())
    .then((result) => this.setState({check: true}, () => checkForUpdates(result)))
    .catch((error) => {
      console.log(error)
    });
  }

  startIntervalLocation = async () => {
    console.log('startIntervalLocation')

    setInterval(async () => {
      let location = await Location.getCurrentPositionAsync({})    
      let {latitude, longitude} = location.coords
      let addressResponse = await Location.reverseGeocodeAsync({latitude, longitude});
      this.setState({location, addressResponse}, this.getHomeData)
    }, 20000)
  }

  getLocation = async () => {
    console.log('getLocation');

    const getCoordinates = async () => {
      console.log('getCoordinates');
      try {
        let {location} = this.props

        this.setState({ location }, async () => {
          await this.getHomeData();
          setTimeout(this.startIntervalLocation, 30);
        });

      } catch (error) {
        console.error('Error obtaining location', error);
      }
    };
  
    await getCoordinates()
  }


  addToCart = (item, {id, whatsapp}) => {
    const { cart, cart_commerce_id } = this.state;
  
    if (cart_commerce_id !== id && cart_commerce_id) {
      Alert.alert('Tienes una orden en proceso', 'Al aceptar, estás eliminando el carrito de compras creado en el comercio anterior', [{text: 'Aceptar', onPress: () => this.setState({ cart: [{ ...item, qty: 1 }], cart_commerce_id: id, cart_commerce_ws: whatsapp }, this.showSuccessMessage)}, { text: 'Cancelar', onPress: () => {} }]);
      this.setState({processing: false})
    } else {
      const itemInCart = cart.find((cartItem) => cartItem.id === item.id);
  
      if (itemInCart) {
        Alert.alert('Ya has agregado este producto al carrito', 'Entra al detalle de la orden para modificar su cantidad');
      } else {
        const updatedCart = [...cart, { ...item, qty: 1 }];
        this.setState({ cart: updatedCart, cart_commerce_id: id, cart_commerce_ws: whatsapp }, this.showSuccessMessage);
      }
    }

    return false
  };
  
  showSuccessMessage = () => Alert.alert('', 'Tu producto ha sido agregado al carrito de compras de forma exitosa', [
    {text: 'Continuar Navegando', style: 'cancel', onPress: () => {} },
    {text: 'Ir al Carrito', style: 'cancel', onPress: () => this.state?.navigation?.navigate('Cart', {commerce_id: this.state?.cart_commerce_id, whatsapp: this.state?.cart_commerce_ws}) }
  ]);
  
  updateCartItem = (itemId, qty) => {
    this.setState({cart: this.state.cart.map((item) => {
      if(item.id == itemId) {
        return {...item, qty}
      }
      return item
    })})
  }

  destroyCartItem = (itemId) => this.setState({cart: this.state.cart.filter((item) => item.id !== itemId)}, () => Alert.alert('', 'Producto eliminado con éxito!'))

  destroyCart = () => this.setState({cart: [], cart_commerce_id:  null})

  componentDidMount = async () => {
    await this.getData()
    await this.getLocation()
  }

  render() {
    const {error, login, logout, loaded, loggedIn, noLocation, done, check, user} = this.state
    const prefix = ExpoLinking.createURL("/")

    if(noLocation){
      Alert.alert('Permitir localización', 'Para brindarte una óptima experiencia de usuario, debes permitirle a CiudadGPS acceder a tu ubicación. \n\nRecarga la aplicación cuando habilites el acceso en el panel de configuración', [
        { text: 'Recargar App', onPress: () => Updates.reloadAsync() }
      ])
    }
    
    if(!loaded){
      return <LoadingLottie />
    }else if(error){
      return <ErrorHandling />
    }else if(logout || login){
      return <Spinner text={logout ? 'Cerrando Sesión' : 'Iniciando Sesión'}/>
    }
    else{
      return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Contexto.Provider value={{
                ...this.state, 
                onRefresh: this.onRefresh, 
                getHomeData: this.getHomeData, 
                addToCart: this.addToCart, 
                updateCartItem: this.updateCartItem, 
                destroyCartItem: this.destroyCartItem, 
                setStories: this.setStories,
                setUserChanges: this.setUserChanges,
                handleLogin: this.handleLogin, 
                socialLogin: this.socialLogin,
                handleRegister: this.handleLogin,
                handleLogout: this.handleLogout,
              }}>  
              {this.state.navigation && <Notification navigation={this.state.navigation}/>}          
              { !done ? <OnboardingScreen initialize={this.initialize} /> :
                <NavigationContainer 
                  ref={this.navigationRef}
                  onReady={() => {
                    this.setState({navigation: this.navigationRef.current}, () => {
                      !check && this.checkUpdate()
                      //this.state.navigation.navigate('JobsCommerce', {commerce_id: 457})
                    }) 
                  }} 
                  linking={{prefixes: [prefix],
                      config: {
                        screens: { 
                          Login: {path: 'login'},
                          Register: {path: 'register'}, 
                          Commerce: {path: 'comercios/:commerce_id/show'},
                          Catalogo: {path: 'catalogo/:commerce_id'},
                          ProductShow: {path: 'products/:product_id'},
                          Job: {path: 'jobs/:job_id'}
                        }
                      }
                    }}
                    fallback={<Spinner />} 
                    theme={MyTheme}
                  >
                  <Drawer.Navigator 
                      initialRouteName="Inicio" 
                      backBehavior="history"
                      drawerContent={(props) => <CustomDrawer {...props} user={this.state.user} handleLogout={this.handleLogout}/>}
                      screenOptions={{
                        headerShown: false,
                        drawerActiveBackgroundColor: "#e9e9e9",
                        drawerActiveTintColor: colores.darkButton,
                        drawerLabelStyle: {fontFamily: "inter", marginLeft: -20, fontSize: 13.2},
                      }}
                    >
                      <Drawer.Screen name="Inicio" component={Home} options={{
                          title: "Inicio",
                          drawerIcon: ({color}) => <MaterialCommunityIcons name="home-outline" size={24} color={color} />,
                        }}
                      />
                      <Drawer.Screen name="Search" component={Search} options={{
                          title: "Buscar Locales",
                          drawerIcon: ({color}) => <Ionicons name="search-sharp" size={22} color={color} />,
                        }}
                      />
                      <Drawer.Screen name="Jobs" component={Jobs}
                        options={{
                          title: "Bolsa de Empleos", 
                          drawerIcon: ({color}) => <MaterialCommunityIcons name="briefcase-search-outline" size={24} color={color} />,
                        }}
                      />
                      <Drawer.Screen name="Soporte" component={Soporte}
                        options={{
                          title: "Crear Un Ticket", 
                          drawerIcon: ({color}) => <MaterialCommunityIcons name="lifebuoy" size={24} color={color} />,
                        }}
                      />

                      {loggedIn ? ( 
                          <>
                            <Drawer.Screen name="TuNegocio" component={TuNegocio} initialParams={{...this.state, navigation: null}}
                              options={{
                                title: "Registra Tu Negocio", 
                                drawerIcon: ({color}) => <MaterialCommunityIcons name="store-marker-outline" size={24} color={color} />,
                              }}
                            />  
                            <Drawer.Screen name="ComerciosAsociados" component={ComerciosAsociados} initialParams={{...this.state, navigation: null}} 
                              options={{
                                title: "Locales Asociados", 
                                drawerIcon: ({color}) => <MaterialCommunityIcons name="square-edit-outline" size={24} color={color} />,
                              }}
                            />
                            <Drawer.Screen name="Favoritos" component={Favoritos} initialParams={{...this.state, navigation: null}}
                              options={{
                                title: "Favoritos",
                                drawerIcon: ({color}) => <MaterialIcons name="favorite-outline" size={24} color={color} />,
                              }}
                            />
                            <Drawer.Screen name="MiCuenta" component={MiCuenta} initialParams={{...this.state, navigation: null}}
                              options={{
                                title: "Mi Cuenta", 
                                drawerIcon: ({color}) => <MaterialCommunityIcons name="account-outline" size={24} color={color} />,
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <Drawer.Screen name="Login" component={Login} options={{
                                title: "Inicia Sesión",
                                drawerIcon: ({color}) => <MaterialIcons name="login" size={24} color={color} />,
                              }}
                            />
                            <Drawer.Screen name="Register" component={Register} options={{
                                title: "Regístrate",
                                drawerIcon: ({color}) => <MaterialCommunityIcons name="account-outline" size={24} color={color} />,
                              }}
                            />
                          </>
                        )
                      }

                      <Drawer.Screen name="Commerce" component={Commerce} initialParams={{...this.state, navigation: null}} options={{
                          title: '',
                          drawerItemStyle: { height: 0, display:'none' }
                        }}
                      />
                      <Drawer.Screen name="Category" component={Category} initialParams={{...this.state, navigation: null}}
                        options={{
                          title: '',
                          drawerItemStyle: { height: 0, display:'none' }
                        }}
                      />
                      <Drawer.Screen name="Anuncios" component={Anuncios} initialParams={{...this.state, navigation: null}}
                        options={{
                          title: '',
                          drawerItemStyle: { height: 0, display:'none' }
                        }}
                      />
                      <Drawer.Screen name="ShowCommerces" component={ShowCommerces} initialParams={{user: this.state.user}}
                        options={{
                          title: '',
                          drawerItemStyle: { height: 0, display:'none' }
                        }}
                      />
                      <Drawer.Screen name="SuccessHandling" component={SuccessHandling} initialParams={{user: this.state.user}}
                        options={{
                          title: '',
                          drawerItemStyle: { height: 0, display:'none' }
                        }}
                      />
                      <Drawer.Screen name="Comentarios" component={Comentarios} initialParams={{...this.state, navigation: null}}
                        options={{title: '', drawerItemStyle: { height: 0, display:'none' }}}
                      />
                      <Drawer.Screen name="PaymentScreen" component={PaymentScreen}
                        initialParams={this.state}
                        options={{title: 'Payment', drawerItemStyle: { height: 0, display:'none' }}}
                      />
                      <Drawer.Screen name="Categories" component={Categories} initialParams={{...this.state, navigation: null}}
                        options={{
                          title: 'Categorías',
                          drawerItemStyle: { height: 0, display:'none' }
                        }}
                      />
                      <Drawer.Screen name="Edit" component={Edit} initialParams={{...this.state, navigation: null}}
                        options={{drawerItemStyle: { height: 0, display:'none' }}}
                      />
                      <Drawer.Screen name="Stories" component={Stories}
                        options={{drawerItemStyle: { height: 0, display:'none' }}}
                      />
                      <Drawer.Screen name="Job" component={Job}
                        options={{drawerItemStyle: { height: 0, display:'none' }}}
                      />
                      <Drawer.Screen name="Cart" component={Cart}
                        options={{drawerItemStyle: { height: 0, display:'none' }}}
                      />
                      <Drawer.Screen name="Checkout" component={Checkout}
                        options={{drawerItemStyle: { height: 0, display:'none' }}}
                      />

                      <Drawer.Screen name="ProductsIndex" component={ProductsIndex} 
                       options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />
                      <Drawer.Screen name="ProductsCreate" component={ProductsCreate} 
                       options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />
                      <Drawer.Screen name="ProductsEdit" component={ProductsEdit} 
                       options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />
                      <Drawer.Screen name="ProductShow" component={ProductShow} 
                        options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />

                      <Drawer.Screen name="JobsIndex" component={JobsIndex} 
                       options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />
                      <Drawer.Screen name="JobsCreate" component={JobsCreate} 
                       options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />
                      <Drawer.Screen name="JobsEdit" component={JobsEdit} 
                       options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />
                      <Drawer.Screen name="SearchJobs" component={SearchJobs} 
                        options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />
                      <Drawer.Screen name="ViewReport" component={ViewReport}
                        options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />
                      <Drawer.Screen name="Catalogo" component={Catalogo}
                        options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />
                      <Drawer.Screen name="HoursIndex" component={HoursIndex}
                        options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />
                      <Drawer.Screen name="Thread" component={Thread}
                        options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />
                      <Drawer.Screen name="Questions" component={Questions}
                        options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />

                      <Drawer.Screen name="PcategoryList" component={PcategoryList}
                        options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />
                      <Drawer.Screen name="PcategoryCreate" component={PcategoryCreate}
                        options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />
                      <Drawer.Screen name="PcategoryEdit" component={PcategoryEdit}
                        options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />
                      <Drawer.Screen name="JobsCommerce" component={JobsCommerce}
                        options={{drawerItemStyle: {height: 0, display: 'none'}}}
                      />
                  </Drawer.Navigator> 
                </NavigationContainer>      
              }
          </Contexto.Provider>
        </View>
      )
    }
  }
}

export default React.memo(Main)