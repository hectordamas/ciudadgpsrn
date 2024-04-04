import React, {useState} from 'react'
import {View, Text, Image, Dimensions, Modal, TouchableOpacity, Alert} from 'react-native'
import Moment from 'moment'
import { colores, images } from '../../constants'
import 'moment/locale/es';
import { MaterialCommunityIcons } from '@expo/vector-icons'

let ScreenWidth = Dimensions.get("window").width;
const {EXPO_PUBLIC_API_URL} = process.env

const AnswerItem = ({item, commerce, users, user, setAnswers, setProcessing, token}) => {
    const auth = user
    const isCommerceAdmin = () => users?.some((u) => u == item?.user?.id)
    const isAuthUserCommerceAdmin = () => users?.some((u) => u == auth?.id)
    const isAuthUserAnswerOwner = () => item?.user?.id == auth?.id
    const [crudVisible, setCrudVisible] = useState(false)

    const avatar = () => {
      let image = ''
      if(isCommerceAdmin()){
          image = {uri: EXPO_PUBLIC_API_URL + commerce?.logo}
      }else{
          image = item.user.avatar ? {uri: item.user.avatar.startsWith('http') ? item.user.avatar : EXPO_PUBLIC_API_URL + item.user.avatar} : images.user_avatar_default
      }
      return image
    }

    const handleDestroy = async () => {
      setProcessing(true)
      setCrudVisible(false)
      await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/answers/${item?.id}/destroy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'applicaction/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': token
        },
        body: JSON.stringify({answerId: item?.id})
      })
      .then((res) => res.json())
      .then((res) => {
          console.log(res)
          setAnswers && res?.answers && setAnswers(res.answers)
          setProcessing(false)
          Alert.alert('', 'Respuesta Eliminada con éxito')
      })
      .catch(err => console.log(err))
    }

    return (
        <TouchableOpacity 
          onLongPress={() => isAuthUserAnswerOwner() && setCrudVisible(true) }
          style={{ flexDirection: "row", paddingBottom: 10, paddingLeft: 40}}>

            {/**  Editar y elminar respuesta */}
            <Modal transparent visible={crudVisible}>
              <TouchableOpacity 
                onPressOut={() => setCrudVisible(false) } 
                style={{flex: 1, backgroundColor: 'rgba(0,0,0, 0.5)', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor: '#fff', paddingVertical: 10, width: '90%'}}>
                        <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
                            <TouchableOpacity 
                              onPress={() => {
                                Alert.alert('', 'Estás seguro de ejecutar esta acción?', [
                                  {text: 'Aceptar', onPress: handleDestroy},
                                  {text: 'Cancelar', style: 'cancel'} 
                                ])
                              }}
                              style={{flexDirection: 'row', alignItems: 'center'}}>
                                <MaterialCommunityIcons name='delete-outline' size={20} color={colores.darkButton} />
                                <Text style={{fontFamily: 'inter', marginLeft: 10}}>Eliminar Pregunta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
              </TouchableOpacity>
            </Modal>


            <View style={{ marginRight: 10, flexDirection: 'row' }}>
              <Image 
                source={avatar()} 
                style={{ 
                  width: 40, height: 40, 
                  borderRadius: 20, 
                  backgroundColor: '#e9e9e9'
                }} 
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: "inter-medium", flexWrap: 'wrap', fontSize: 14 }}>
                {isCommerceAdmin() ? commerce?.name : item?.user?.name} respondió
              </Text>
              <Text style={{ fontFamily: "inter", fontSize: 9.5, color: colores.darkButton}}>
                {Moment(item?.created_at).fromNow()}
              </Text>
              {item?.message && 
                <Text style={{fontFamily: "roboto", fontSize: 13, maxWidth: ScreenWidth}} >
                  {item?.message }
                </Text>}
            </View>
        </TouchableOpacity>
    )
} 

export default React.memo(AnswerItem)