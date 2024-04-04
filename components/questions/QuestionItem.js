import React from 'react'
import {View, Text, Image, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native'

import Moment from 'moment'
import { colores, images } from '../../constants'
import 'moment/locale/es';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AnswerItem from './AnswerItem'

let ScreenWidth = Dimensions.get("window").width;
const {EXPO_PUBLIC_API_URL} = process.env

const QuestionItem = ({item, users, user, setProcessing, token, navigation, commerce, setQuestionId, setAnswerId, setVisibleAnswerModal, setCrudQuestionVisible, setQuestions}) => {
    
    const isCommerceAdmin = () => users?.some((u) => u == user?.id)
    const isQuestionOwner = () => item?.user?.id == user?.id
    const canAnswer = () => isCommerceAdmin() || isQuestionOwner()

    const openAnswerModal = (questionId) => {
        if(isCommerceAdmin() || isQuestionOwner()){
            setVisibleAnswerModal(true)
            setQuestionId(questionId)
        }
    }

    return (
        <View key={item.id} style={{borderTopWidth: .5, borderColor: '#e9e9e9'}}>
            <TouchableHighlight 
              activeOpacity={1}
              underlayColor="#e9e9e9"
              onLongPress={() => {
                if(item?.user?.id == user.id){
                  setQuestionId(item?.id)
                  setCrudQuestionVisible(true)
                }
              }}>
                <View style={{ flexDirection: "row", paddingVertical: 10}} >
                  <View style={{ marginRight: 10 }}>
                    <Image 
                      source={item.user.avatar ? {uri: item.user.avatar.startsWith('http') ? item.user.avatar : EXPO_PUBLIC_API_URL + item.user.avatar} : images.user_avatar_default} 
                      style={{ width: 40, height: 40, borderRadius: 20 }} 
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                      <View style={{flex: 1}}>
                        <Text style={{ fontFamily: "inter-medium", flexWrap: 'wrap', fontSize: 14}}>
                          {item.user.name} comentó
                        </Text>
                        <Text style={{ fontFamily: "inter", fontSize: 9.5, color: colores.darkButton}}>
                          {Moment(item.created_at).fromNow()}
                        </Text>
                      </View>
                    </View>
                    <View>
                      {item.message && 
                        <Text style={{fontFamily: "roboto", fontSize: 13, flexWrap: 'wrap', maxWidth: ScreenWidth, width: '100%'}}>
                          {item.message}
                        </Text>}
                    </View>
                    {/*Solo si el usuario administra el comercio*/}
                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                        {canAnswer() && 
                            <TouchableOpacity onPress={() => openAnswerModal(item.id)} style={{flexDirection: 'row', alignItems: 'center'}}>
                                <MaterialCommunityIcons name='chat-outline' size={15} color={colores.primaryButton}/>
                                <Text style={{fontFamily: 'inter-bold', fontSize: 11, marginRight: 12, color: colores.primaryButton, marginLeft: 3}}>Responder</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate('Thread', {questionId: item.id, type: 'questionOnCommerce'}) }>
                            <MaterialCommunityIcons name='forum-outline' size={15} color={colores.primaryButton}/>
                            <Text style={{fontFamily: 'inter-bold', fontSize: 11, color: colores.primaryButton, marginLeft: 3}}>Ver Hilo</Text>
                        </TouchableOpacity>
                    </View>
                  </View>
                </View>
            </TouchableHighlight>
            {//Respuesta
              item?.answers?.length > 0 && 
                <AnswerItem 
                  question={item}
                  item={item?.answers[0]} 
                  users={users}
                  user={user}
                  setProcessing={setProcessing}
                  token={token} 
                  navigation={navigation}
                  commerce={commerce}
                  setVisibleAnswerModal={setVisibleAnswerModal}
                  setQuestionId={setQuestionId}
                  setAnswerId={setAnswerId}
                  setQuestions={setQuestions}
                />
            }
        </View>
    )
}

export default React.memo(QuestionItem)