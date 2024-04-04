import React, {memo, useCallback, useState, useContext} from "react";
import { KeyboardAvoidingView, Platform , ScrollView, Image, View, Dimensions, TextInput, Alert, Modal, ActivityIndicator, TouchableOpacity} from "react-native";
import { Appbar, Text, IconButton, Divider } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { Spinner } from "../components";
import { images, colores } from "../constants";
import Moment from "moment";
import 'moment/locale/es';
import AnswerItem from '../components/threads/AnswerItem'
import { Contexto } from "../functions/Context";

const Thread = ({route, navigation}) => {
    const {questionId} = route.params
    const {EXPO_PUBLIC_API_URL} = process.env
    let ScreenWidth = Dimensions.get("window").width;
    const [loaded, setLoaded] = useState(false)
    const [question, setQuestion] = useState(null)
    const [answers, setAnswers] = useState([])
    const [users, setUsers] = useState([])
    const [commerce, setCommerce] = useState(null)
    const [answerMessage, setAnswerMessage] = useState('')
    const [processing, setProcessing] = useState(false)

    const contexto = useContext(Contexto)
    const {user, token} = contexto

    const isCommerceAdmin = () => users?.some((item) => item == user?.id)
    const isQuestionOwner = () => question?.user?.id == user?.id
    const canAnswer = () => isCommerceAdmin() || isQuestionOwner()

    const handleDestroy = async () => {
      setProcessing(true)
      await fetch(`${EXPO_PUBLIC_API_URL}/api/questions/${question.id}/destroy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'XML-Requested-With': 'XMLHttpRequest',
          'Authorization': token
        },
        body: JSON.stringify({questionId: questionId})
      })
      .then(res => res.json())
      .then((res) => {
        setProcessing(false)
        console.log(res)
        Alert.alert('', 'Pregunta Eliminada con exito!')
        if(route?.params?.type == 'questionOnCommerce'){
          res.questions && navigation.navigate('Commerce', {questions: res.questions, commerce_id: commerce?.id})
        }else{
          navigation.goBack();
        }
      })
      .catch(err => console.log(err))
    }

    const handleSubmitAnswer = async () => {
      if(!answerMessage){
          return Alert.alert('', 'No puedes enviar una respuesta vacía')
      }

      setProcessing(true)

      await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/answers/store`, {
          method: 'POST', 
          headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
              'Authorization': token
          },
          body: JSON.stringify({
              message: answerMessage, 
              commerceId: commerce?.id,
              userId: user?.id,
              questionId: questionId
          })
      })
      .then(res => res.json())
      .then(res => {
          console.log(res)
          res?.answers && setAnswers(res.answers)
          setAnswerMessage('')
          Alert.alert('', 'Se ha enviado tu respuesta')
      })
      .catch(err => console.log(err))
      .finally(() => {
          setProcessing(false)
          setMessage('')
      })
    }

    const getQuestion = async () => {
        setAnswerMessage('')
        setLoaded(false)
        await fetch(`${EXPO_PUBLIC_API_URL}/api/questions/${questionId}/show`, {
            method:'POST',
            headers: {
                "Content-Type" : 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
            },
            body: JSON.stringify({questionId})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            res?.question && setQuestion(res.question)
            res?.answers && setAnswers(res.answers)
            res?.users && setUsers(res.users)
            res?.commerce && setCommerce(res.commerce)
        })
        .catch(err => console.log(err))
        .finally(() => setLoaded(true))
    }

    const handleMount = useCallback(() => {getQuestion()}, [questionId])
    useFocusEffect(handleMount)

    return (
        <KeyboardAvoidingView 
            style={{flex: 1}} 
            behavior={ Platform.OS == 'ios' ? 'padding' : null} 
            keyboardVerticalOffset={60}>
            
            {/* Procesando */}
            <Modal transparent visible={processing}>
                <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator color={'#fff'} size={60} />              
                </View>
            </Modal>

            <Appbar.Header  
                statusBarHeight={0}  
                style={{ height: 50, elevation: 4,             // Elevación de la sombra (Android)
                    shadowColor: '#000',      // Color de la sombra (iOS)
                    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                    shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                    shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={
                    <Text style={{fontFamily:'inter-medium', fontSize:14}}>
                      Hilo
                    </Text>} 
                />
            </Appbar.Header>

            {loaded ?
              <>
                <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
                    <TouchableOpacity 
                      onLongPress={() => {
                        Alert.alert('', 'Estas seguro de que deseas eliminar esta pregunta?', [
                          {text: 'Aceptar', onPress: handleDestroy},
                          {text: 'Cancelar', style: 'cancel'}
                        ])
                      }}
                      style={{flexDirection: 'row', paddingVertical: 15}}>
                        <View style={{ marginRight: 10 }}>
                          <Image 
                            source={question.user.avatar ? {uri: question.user.avatar.startsWith('http') ? question.user.avatar : EXPO_PUBLIC_API_URL + question.user.avatar} : images.user_avatar_default} 
                            style={{ width: 40, height: 40, borderRadius: 20 }} 
                          />
                        </View>
                        <View style={{flex: 1}}>
                          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                            <View style={{flex: 1}}>
                              <Text style={{ fontFamily: "inter-medium", flexWrap: 'wrap', fontSize: 14}}>
                                {question.user.name} comentó
                              </Text>
                              <Text style={{ fontFamily: "inter", fontSize: 9.5, color: colores.darkButton}}>
                                {Moment(question.created_at).fromNow()}
                              </Text>
                            </View>
                          </View>
                          <View>
                            {question.message && <Text style={{fontFamily: "roboto", fontSize: 13, flexWrap: 'wrap', maxWidth: ScreenWidth, width: '100%'}}>
                              {question.message}
                            </Text>}
                          </View>
                        </View>
                    </TouchableOpacity>

                    {answers.map((item) => {
                      return (
                        <AnswerItem 
                          item={item}
                          commerce={commerce}
                          users={users}
                          user={user}
                          key={item.id}
                          setAnswers={setAnswers}
                          setProcessing={setProcessing}
                          token={token}
                        />
                      )
                    })}
                </ScrollView>
                {
                  canAnswer() && 
                    <View>
                      <Divider />
                      <View style={{backgroundColor: '#fff', padding: 10, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{backgroundColor: '#e9e9e9', borderRadius: 3, paddingVertical: 10, paddingHorizontal: 15, flex: 1}}>
                            <TextInput 
                                placeholder='↩️ Responder'
                                returnKeyType='send'
                                style={{fontFamily: 'inter-medium'}}
                                defaultValue={answerMessage}
                                onChangeText={(val) => setAnswerMessage(val)}
                                onSubmitEditing={handleSubmitAnswer}
                            />
                        </View>
                        <IconButton 
                            icon="send"
                            onPress={handleSubmitAnswer}
                        />  
                      </View>
                    </View>
                }
              </> : <Spinner />
            }
        </KeyboardAvoidingView>
    )
}

export default memo(Thread)