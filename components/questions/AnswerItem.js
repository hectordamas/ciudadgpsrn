import React, {useState} from 'react'
import {View, Text, Image, Dimensions, TouchableOpacity, Modal, Alert} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Moment from 'moment'
import 'moment/locale/es';

import { colores, images } from '../../constants'

let ScreenWidth = Dimensions.get("window").width;
const {EXPO_PUBLIC_API_URL} = process.env

const AnswerItem = ({item, users, user, commerce, question, setVisibleAnswerModal, setQuestionId, token, setProcessing, setQuestions}) => {
    const [crudVisible, setCrudVisible] = useState(false)  

    //Son dos isCommerceAdmin, uno cuando el auth user inicia sesion y otro de el usuario que hizo la respuesta
    const isAuthUserIsCommerceAdmin = () => users.some((u) => u == user?.id)
    const isAnswerUserCommerceAdmin = () => users.some((u) => u == item?.user?.id)
    const isQuestionOwner = () => question?.user?.id == user?.id
    const canAnswer = () => isAuthUserIsCommerceAdmin() || isQuestionOwner()
    const avatar = () => {
        let image = ''
        if(isAnswerUserCommerceAdmin()){
            image = {uri: EXPO_PUBLIC_API_URL + commerce?.logo}
        }else{
            image = item.user.avatar ? {uri: item.user.avatar.startsWith('http') ? item.user.avatar : EXPO_PUBLIC_API_URL + item.user.avatar} : images.user_avatar_default
        }

        return image
    }

    const openAnswerModal = (questionId) => {
        if(isAuthUserIsCommerceAdmin() || isQuestionOwner()){
          setVisibleAnswerModal(true)
          setQuestionId(questionId)
        }
    }

    const answerDestroy = async () => {
      setProcessing(true)
      setCrudVisible(false)
      await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/answers/${item.id}/destroy`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': token
        },
        body: JSON.stringify({
          answerId: item?.id, 
          type: 'questionOnCommerce'
        })
      })
      .then(res => res.json())
      .then((res) => {
        console.log(res)
        res.questions && setQuestions && setQuestions(res.questions)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setProcessing(false)
      })
    }


    return (
      <>
        {/**  Editar y elminar respuesta */}
        <Modal transparent visible={crudVisible}>
          <TouchableOpacity 
            
            onPressOut={() => setCrudVisible(false) } 
            style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: '#fff', paddingVertical: 10, width: '90%'}}>
                    <View 
                      style={{paddingVertical: 10, paddingHorizontal: 20}}>
                        <TouchableOpacity 
                        onPress={() => { Alert.alert('', 'Estás seguro de ejecutar esta acción?', [
                            {text: 'Aceptar', onPress: answerDestroy},
                            {text: 'Cancelar', style: 'cancel'} 
                          ])
                        }}
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                            <MaterialCommunityIcons name='delete-outline' size={20} color={colores.darkButton} />
                            <Text style={{fontFamily: 'inter', marginLeft: 10}}>Eliminar Respuesta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
          </TouchableOpacity>
        </Modal>

        <TouchableOpacity 
          onLongPress={() => {
            if(item?.user?.id == user?.id){
              setCrudVisible(true)
            }
          }}
          style={{ flexDirection: "row", paddingBottom: 10, paddingLeft: 40}}>

            <View style={{ marginRight: 10, flexDirection: 'row' }}>
              <Image 
                source={avatar()}
                style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#e9e9e9'}} 
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: "inter-medium", flexWrap: 'wrap', fontSize: 14 }}>
                {isAnswerUserCommerceAdmin() ? commerce?.name : item?.user?.name} respondió
              </Text>
              <Text style={{ fontFamily: "inter", fontSize: 9.5, color: colores.darkButton}}>
                {Moment(item?.created_at).fromNow()}
              </Text>
              {item?.message && 
                <Text style={{fontFamily: "roboto", fontSize: 13, maxWidth: ScreenWidth}} >
                  {item?.message }
                </Text>}

                {/*Solo si el usuario administra el comercio o el usuario hizo la pregunta*/}
                <View style={{marginTop: 5}}>
                {canAnswer() && 
                    <TouchableOpacity 
                      onPress={() => openAnswerModal(question?.id)} 
                      style={{flexDirection: 'row', alignItems: 'center'}}
                      >
                        <MaterialCommunityIcons name='chat-outline' size={15} color={colores.primaryButton}/>
                        <Text style={{fontFamily: 'inter-bold', fontSize: 11, color: colores.primaryButton, marginLeft: 3}}>Responder</Text>
                    </TouchableOpacity>
                }
                </View>
            </View>
        </TouchableOpacity>
      </>
    )
}

export default React.memo(AnswerItem)