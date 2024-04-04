import React, {useCallback, useState, useContext} from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert, View, Modal, ActivityIndicator} from 'react-native'
import { Appbar, Text, IconButton, Divider } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import { Spinner } from '../components'
const {EXPO_PUBLIC_API_URL} = process.env
import { Contexto } from "../functions/Context";
import QuestionItem from '../components/QuestionScreen/QuestionItem'

const Questions = ({route, navigation}) => {
    const {commerceId} = route.params
    const [loaded, setLoaded] = useState(false)
    const [questions, setQuestions] = useState([])
    const [message, setMessage] = useState('')
    const [processing, setProcessing] = useState(false)
    const contexto = useContext(Contexto)
    const {user, token} = contexto

    // Preguntas
    const handleSubmit = async () => {
        if(!message){
            return Alert.alert('', 'No puedes mandar una pregunta vacía')
        }
        setProcessing(true)
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/questions/store`, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                'Authorization': token
            },
            body: JSON.stringify({
                message: message, 
                commerceId: commerceId,
                userId: user?.id
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            res?.questions && setQuestions(res.questions)
            Alert.alert('', 'Se ha enviado tu pregunta al establecimiento')
        })
        .catch(err => console.log(err))
        .finally(() => {
            setProcessing(false)
            setMessage('')
        })
        
    }

    const getQuestionsCommerce = async () => {
        await fetch(`${EXPO_PUBLIC_API_URL}/api/getQuestionsCommerce/${commerceId}`, {
            method:'GET',
            headers: {
                "Content-Type" : 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            res?.questions && setQuestions(res?.questions)
        })
        .catch(err => console.log(err))
        .finally(() => setLoaded(true))
    }

    const handleMount = useCallback(() => { getQuestionsCommerce() }, [commerceId])
    useFocusEffect(handleMount)

    return (
        <KeyboardAvoidingView 
            style={{flex: 1}}
            keyboardVerticalOffset={60}
            behavior={Platform.OS == 'ios' ? 'padding' : null}
           >
            {/* Procesando */}
            <Modal transparent visible={processing}>
                <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator color={'#fff'} size={60} />
                    <Text style={{color: '#fff'}}>Procesando Información</Text>              
                </View>
            </Modal>

            <Appbar.Header  
                statusBarHeight={0}  
                style={{ 
                    height: 50, elevation: 4,  // Elevación de la sombra (Android)
                    shadowColor: '#000',      // Color de la sombra (iOS)
                    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                    shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                    shadowRadius: 2, 
                    zIndex: 10, 
                    backgroundColor: '#fff'
                    }}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={
                    <Text style={{fontFamily:'inter-medium', fontSize:14}}>
                        Preguntas
                    </Text>} 
                />
            </Appbar.Header>


            {
                loaded ? 
                <>
                    {questions.length > 0 ?
                        <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
                            {questions.map((question) => 
                                <QuestionItem 
                                    question={question}
                                    user={user}
                                    key={question.id}
                                    navigation={navigation}
                                    setQuestions={setQuestions}
                                />
                            )}
                        </ScrollView> : 
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>No hay preguntas disponibles</Text>
                        </View>
                    }
                    
                    {user &&
                        <View>
                            <Divider />
                            <View style={{backgroundColor: '#fff', padding: 10, flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{backgroundColor: '#e9e9e9', borderRadius: 3, paddingVertical: 10, paddingHorizontal: 15, flex: 1}}>
                                    <TextInput 
                                        placeholder='🤔 Haz una Pregunta'
                                        returnKeyType='send'
                                        style={{fontFamily: 'inter-medium'}}
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
                        </View>
                    }
                </> : <Spinner />
            }

        </KeyboardAvoidingView>
    )
}

export default Questions