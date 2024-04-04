import React, { useContext, useState } from 'react'
import {View, Text, Image, Dimensions, TouchableOpacity, Modal, Alert} from 'react-native'
import { ActivityIndicator, Divider } from 'react-native-paper'
import {images, colores} from '../../constants'
import Moment from 'moment'
import 'moment/locale/es';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Contexto } from '../../functions/Context'
let ScreenWidth = Dimensions.get("window").width;
const {EXPO_PUBLIC_API_URL} = process.env

const QuestionItem = ({question, user, setQuestions, navigation}) => {
    const [crudVisible, setCrudVisible] = useState(false)
    const [processing, setProcessing] = useState(false)
    const context = useContext(Contexto)
    const {token} = context

    const handleDestroy = async () => {
        setProcessing(true)
        await fetch(`${EXPO_PUBLIC_API_URL}/api/questions/${question?.id}/destroy`, {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': token
            },
            body: JSON.stringify({questionId: question?.id})
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            res.message && Alert.alert('', 'Tu pregunta fue eliminada con éxito')
            res?.questions && setQuestions && setQuestions(res?.questions)
        })
        .catch((err) => console.log(err))
        .finally(() => setProcessing(false))
    }

    return (
    <TouchableOpacity key={question?.id} onLongPress={() => {
            if(user){
                if(question?.user?.id == user?.id){
                    setCrudVisible(true)
                }
            }
        }}>
        <Modal visible={processing} transparent>
            <View style={{flex:1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color='#fff' size={60}/>
                <Text style={{marginTop: 10}}>Procesando Información</Text>
            </View>
        </Modal>

        <Modal visible={crudVisible} transparent>
            <TouchableOpacity 
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}
                onPressOut={() => setCrudVisible(false) }>
                <View style={{backgroundColor: '#fff', paddingVertical: 10, width: '90%'}}>
                    <TouchableOpacity style={{paddingVertical: 10, paddingHorizontal: 20}} onPress={() => {
                        Alert.alert('', 'Estás seguro de ejecutar esta acción?', [
                          {text: 'Aceptar', onPress: handleDestroy },
                          {text: 'Cancelar', style: 'cancel'} 
                        ])
                      }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <MaterialCommunityIcons name='delete-outline' size={20} color={colores.darkButton} />
                            <Text style={{fontFamily: 'inter', marginLeft: 10}}>Eliminar Pregunta</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
        <Divider />
        <View style={{flexDirection: 'row', paddingVertical: 10}} >
            <View style={{ marginRight: 10 }}>
              <Image 
                source={question?.user?.avatar ? {uri: question?.user?.avatar?.startsWith('http') ? question.user.avatar : EXPO_PUBLIC_API_URL + question.user.avatar} : images.user_avatar_default} 
                style={{ width: 40, height: 40, borderRadius: 20 }} 
              />
            </View>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                <View style={{flex: 1}}>
                  <Text style={{ fontFamily: "inter-medium", flexWrap: 'wrap', fontSize: 14}}>
                    {question?.user?.name} comentó
                  </Text>
                  <Text style={{ fontFamily: "inter", fontSize: 9.5, color: colores.darkButton}}>
                    {Moment(question?.created_at).fromNow()}
                  </Text>
                </View>
              </View>
              <View>
                {question?.message && 
                    <Text style={{fontFamily: "roboto", fontSize: 13, flexWrap: 'wrap', maxWidth: ScreenWidth, width: '100%'}}>
                      {question?.message}
                    </Text>
                }
              </View>
              <View style={{marginTop: 5, flexDirection: 'row'}}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate('Thread', {questionId: question.id}) }>
                        <MaterialCommunityIcons name='forum-outline' size={15} color={colores.primaryButton}/>
                        <Text style={{fontFamily: 'inter-bold', fontSize: 11, color: colores.primaryButton, marginLeft: 3}}>Ver Hilo</Text>
                    </TouchableOpacity>
              </View>
            </View>
        </View>
    </TouchableOpacity>
    )
}

export default React.memo(QuestionItem)