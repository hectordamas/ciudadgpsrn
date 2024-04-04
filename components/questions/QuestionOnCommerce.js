import React, {useEffect, useState, useRef} from 'react'
import {View, Text, Modal, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import { colores } from '../../constants'
import 'moment/locale/es';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import QuestionItem from './QuestionItem'
const {EXPO_PUBLIC_API_URL} = process.env

const QuestionOnCommerce = ({questions, commerce, user, navigation, token, users, setQuestions}) => {
    const [visible, setVisible] = useState(false)
    const [visibleAnswerModal, setVisibleAnswerModal] = useState(false)

    const [processing, setProcessing] = useState(false)

    const [questionId, setQuestionId] = useState(null)
    const [answerId, setAnswerId] = useState(null)

    const [crudQuestionVisible, setCrudQuestionVisible] = useState(false)
    const [crudAnswerVisible, setCrudAnswerVisible] = useState(false)

    const [message, setMessage] = useState('')
    const [answerMessage, setAnswerMessage] = useState('')

    const textinput = useRef(null)
    const textinputAnswer = useRef(null)

    const onClose = () => {
        setCrudQuestionVisible(false)
        setCrudAnswerVisible(false)
    }

    // Preguntas
    const handleSubmit = async () => {
        if(!message){
            return Alert.alert('', 'No puedes mandar una pregunta vacía')
        }

        setProcessing(true)
        setVisible(false)

        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/questions/store`, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                'Authorization': token
            },
            body: JSON.stringify({
                message: message, 
                commerceId: commerce?.id,
                userId: user?.id,
                type: 'questionOnCommerce'
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            res?.questions && setQuestions && setQuestions(res.questions)
            Alert.alert('', 'Se ha enviado tu pregunta al establecimiento')
        })
        .catch(err => console.log(err))
        .finally(() => {
            setProcessing(false)
            setMessage('')
        })
        
    }

    // Respuestas
    const handleSubmitAnswer = async () => {
        if(!answerMessage){
            return Alert.alert('', 'No puedes enviar una respuesta vacía')
        }

        setProcessing(true)
        setVisibleAnswerModal(false)

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
                questionId: questionId,
                type: 'questionOnCommerce'
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            Alert.alert('', 'Se ha enviado tu respuesta')
            res?.questions && setQuestions && setQuestions(res.questions)
        })
        .catch(err => console.log(err))
        .finally(() => {
            setProcessing(false)
            setMessage('')
        })
    }

    //Eliminar Pregunta
    const questionDestroy = async () => {
        setProcessing(true)
        setCrudQuestionVisible(false)
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/questions/${questionId}/destroy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': token
            },
            body: JSON.stringify({
                questionId: questionId, 
                type: 'questionOnCommerce'
            })
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            res.questions && setQuestions(res.questions)
            Alert.alert('', 'Pregunta eliminada con exito!')
        })
        .catch(err => console.log(err))
        .finally(() => { 
            setProcessing(false)            
            setCrudQuestionVisible(false)
            setCrudAnswerVisible(false)
        })
    }   

    //Lògica de abrir modales
    const openQuestionModal = () => {
        if(user){
            setVisible(true)
        }else{
            Alert.alert('Inicia Sesión','Para hacer una pregunta a este comercio debes iniciar sesión', [
                { text: 'Cancelar', onPress: () => {}, style: 'cancel'},
                { text: 'OK', onPress: () => navigation.navigate('Login') },
            ])
        }
    }

    //Enfocar campos de texto
    useEffect(() => {
        if(visible){
            setMessage('')
            setTimeout(() => {
                textinput?.current?.focus()
            }, 200)
        }

        if(visibleAnswerModal){
            setAnswerMessage('')
            setTimeout(() => {
                textinputAnswer?.current?.focus()
            }, 200)
        }
    }, [visible, visibleAnswerModal])


    return (
        <>
            {/* Procesando */}
            <Modal transparent visible={processing}>
                <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator color={'#fff'} size={60} />              
                </View>
            </Modal>

            {/* Campo de Pregunta */}
            <Modal transparent visible={visible}>
                <KeyboardAvoidingView
                    style={{flex: 1}}
                    keyboardVerticalOffset={60}
                    behavior={Platform.OS == 'android' ? null : 'padding'}
                >
                    <TouchableOpacity 
                        style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end'}} 
                        onPressOut={() => setVisible(false)}>

                            <View style={{alignItems: 'flex-end'}}>
                                <TouchableOpacity 
                                    onPress={() => setVisible(false)}
                                    style={{backgroundColor: 'rgba(0,0,0,.9)', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 15, marginBottom: 5}}>
                                    <MaterialCommunityIcons 
                                        name='close' 
                                        color='#bdbdbd' 
                                        size={25}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{backgroundColor: '#fff', padding: 10, flexDirection: 'row', alignItems: 'center'}}>

                                <View style={{backgroundColor: '#e9e9e9', borderRadius: 3, paddingVertical: 10, paddingHorizontal: 15, flex: 1}}>
                                    <TextInput 
                                        placeholder='🤔 Haz una Pregunta'
                                        returnKeyType='send'
                                        style={{fontFamily: 'inter-medium'}}
                                        ref={textinput}
                                        defaultValue={message}
                                        onChangeText={(val) => setMessage(val)}
                                        onSubmitEditing={handleSubmit}
                                    />
                                </View>
                                <IconButton 
                                    icon="send"
                                    onPress={handleSubmit}
                                />
                            </View>

                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </Modal>

            {/* Campo de Respuesta */}
            <Modal transparent visible={visibleAnswerModal}>
                <KeyboardAvoidingView
                    style={{flex: 1}}
                    keyboardVerticalOffset={60}
                    behavior={Platform.OS == 'android' ? null : 'padding'}
                >
                    <TouchableOpacity 
                        style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end'}} 
                        onPressOut={() => setVisibleAnswerModal(false)}>

                            <View style={{alignItems: 'flex-end'}}>
                                <TouchableOpacity 
                                    onPress={() => setVisibleAnswerModal(false)}
                                    style={{backgroundColor: 'rgba(0,0,0,.9)', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 15, marginBottom: 5}}>
                                    <MaterialCommunityIcons 
                                        name='close' 
                                        color='#bdbdbd' 
                                        size={25}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{backgroundColor: '#fff', padding: 10, flexDirection: 'row', alignItems: 'center'}}>

                                <View style={{backgroundColor: '#e9e9e9', borderRadius: 3, paddingVertical: 10, paddingHorizontal: 15, flex: 1}}>
                                    <TextInput 
                                        placeholder='↩️ Responder'
                                        returnKeyType='send'
                                        style={{fontFamily: 'inter-medium'}}
                                        ref={textinputAnswer}
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

                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </Modal>

            {/* Editar o eliminar pregunta */}
            <Modal visible={crudQuestionVisible} transparent>
                <TouchableOpacity 
                    onPressOut={onClose}
                    style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor: '#fff', paddingVertical: 10, width: '90%'}}>
                        <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {
                                Alert.alert('', 'Estas seguro de eliminar esta pregunta?', 
                                    [
                                        {text: 'Aceptar', onPress: questionDestroy}, 
                                        {text: 'Cancelar', style: 'cancel'}
                                    ]
                                )
                            }}>
                                <MaterialCommunityIcons name='delete-outline' size={20} color={colores.darkButton} />
                                <Text style={{fontFamily: 'inter', marginLeft: 10}}>Eliminar Pregunta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/*editar o  eliminar respuesta*/}
            <Modal visible={crudAnswerVisible} transparent>
                <TouchableOpacity 
                    onPressOut={onClose}
                    style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor: '#fff', paddingVertical: 10, width: '90%'}}>
                        <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
                            <TouchableOpacity 
                                onPress={() => {
                                    Alert.alert('', 'Estás seguro de eliminar esta respuesta?', [
                                        {text: 'Aceptar', onPress: answerDestroy},
                                        {text: 'Cancelar'}
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

            <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 5 }}>
              <Text style={{ fontFamily: "inter-medium", fontSize: 16, paddingBottom: 10 }}>
                Preguntas Más Recientes:
              </Text>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              {questions.length > 0 ? 
                questions.map((item) => 
                    <QuestionItem 
                        item={item} 
                        user={user}
                        users={users} 
                        setProcessing={setProcessing}
                        navigation={navigation}
                        token={token}
                        commerce={commerce}
                        key={item.id}
                        setVisibleAnswerModal={setVisibleAnswerModal}
                        setQuestionId={setQuestionId}
                        setAnswerMessage={setAnswerMessage}
                        setCrudQuestionVisible={setCrudQuestionVisible}
                        setQuestions={setQuestions}
                        questionDestroy={questionDestroy}
                        setAnswerId={setAnswerId}
                    /> 
                    ) :  
                <View>
                  <Text style={{fontFamily: "inter", fontSize: 13 }} >
                    No hay Preguntas disponibles aún, sé el primero en preguntar
                  </Text>
                </View>
              }
              <View style={{ marginTop: 5, paddingBottom: 50 }}>

                <Button 
                    mode="contained" 
                    labelStyle={{fontFamily: 'inter-medium'}}
                    style={{marginBottom: 5, backgroundColor: colores.darkButton, borderRadius: 5}}
                    icon="account-question-outline" 
                    onPress={openQuestionModal}>
                    Haz una Pregunta
                </Button>

                <Button 
                  icon="chat-question-outline" 
                  mode="outlined"
                  style={{borderRadius: 5}} 
                  labelStyle={{color: colores.darkButton, fontFamily: 'inter-medium'}}
                  onPress={() => navigation.navigate('Questions', { commerceId: commerce?.id })}>
                  Todas las Preguntas
                </Button>
              </View>
            </View>
        </>
    )
}

export default React.memo(QuestionOnCommerce)