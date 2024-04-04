import React  from "react";
import {Image, View, Text} from "react-native";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import { images, colores } from "../constants";
import { Button } from "react-native-paper";

const {EXPO_PUBLIC_API_URL} = process.env;    
const CustomDrawer = (props) => 
    <View style={{ flex: 1 }}> 
      <DrawerContentScrollView {...props}>
        <View style={{ alignItems: "center"}}>
          {
            props.user ? (
              <>
                {props.user?.avatar ? 
                  <Image
                    source={{uri: props.user?.avatar?.startsWith('http') ? props.user?.avatar : EXPO_PUBLIC_API_URL + props?.user?.avatar}}
                    style={{ width: 80, height: 80, borderRadius: 40, backgroundColor:'#e9e9e9' }}
                  />
                  :
                  <Image
                    source={images.user_avatar_default}
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                  />
                }

                <Text style={{ marginTop: 10, fontFamily: "inter-medium", fontSize: 18, textAlign:'center'}}>
                  {props.user?.name}
                </Text>

                <View style={{marginVertical: 10}}>
                  <Button mode="contained" 
                    labelStyle={{fontSize: 11, fontFamily: 'inter-bold', marginVertical: 6}}
                    style={{backgroundColor: colores.darkButton, paddingHorizontal: 3}} 
                    icon={'account'} 
                    onPress={() => props.navigation.navigate("MiCuenta")}>
                    Ver Cuenta
                  </Button>
                </View>
              </>
            ) : (
              <>
                <Image
                  source={require('../assets/icon.png')}
                  style={{width: 80, height: 80, borderRadius:40}}
                />
                <Text style={{fontFamily: "inter-medium", fontSize: 22, paddingHorizontal:10, textAlign:'center', paddingVertical: 15
              }}>
                  ¡Bienvenido a CiudadGPS!
                </Text>
              </>
            )
          }
        </View>

        <DrawerItemList {...props} />

          {
            props.user && (
              <View style={{ alignItems: "center", paddingVertical: 5 }}>
                <Button 
                    style={{backgroundColor: colores.darkButton, paddingHorizontal: 3}}
                    labelStyle={{fontSize: 11, fontFamily: 'inter-bold', marginVertical: 6}}
                    mode="contained" 
                    icon={'logout'} 
                    onPress={props.handleLogout}>
                  Cerrar Sesión
                </Button>
              </View>
            )
          }

      </DrawerContentScrollView>
    </View>


export default CustomDrawer;

