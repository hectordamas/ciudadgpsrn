import React from 'react'
import {View, TouchableOpacity, Image, Text, FlatList, Modal, ActivityIndicator, Alert, StatusBar} from 'react-native'
import { icons, colores, images } from '../constants'
import { Appbar } from 'react-native-paper';
const {EXPO_PUBLIC_API_URL} = process.env;    
import moment from 'moment'
import 'moment/locale/es';
import { Contexto } from '../functions/Context'

class Stories extends React.Component{
    static contextType = Contexto
    state = {
        processing: false,
    }

    destroyStory = async (story_id) => {
      let {afterDestroyStory} = this.props.route.params
      this.setState({processing: true})
      await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/destroyStory`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With' : 'XMLHttpRequest',
            'Authorization': this.context?.token
          }, 
          body: JSON.stringify({story_id})
        })
        .then((res) => res.json())
        .then((res) => this.setState({processing: false}, () => {
            console.log(res)
          afterDestroyStory()
          Alert.alert('', 'Historia eliminada con éxito')
          this.props.navigation.goBack()
        }))
        .catch(e => this.setState({processing: false}, () => console.log(e)))
    }

    render(){
        let {navigation} = this.props
        let {stories} = this.props.route.params
        let {processing} = this.state

        return (
            <>
              <Modal transparent={true} visible={processing}>
                <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, justifyContent: 'center', alignItems:'center'}}>
                  <ActivityIndicator size={60} color={'#ffff'}/>
                </View>
              </Modal>
                    <View style={{flex: 1, backgroundColor: '#fff'}}>
                        <Appbar.Header statusBarHeight={0}  style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
                          shadowColor: '#000',      // Color de la sombra (iOS)
                          shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                          shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                          shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                            <Appbar.BackAction onPress={() => navigation.goBack()} />
                            <Appbar.Content title={
                                <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                                    Historias
                                </Text>} 
                            />
                        </Appbar.Header>

                    { stories.length > 0 ? 
                      <FlatList 
                          data={stories}
                          renderItem={({item}) => {
                              return (
                                  <View style={{borderBottomColor: '#bdbdbd', borderBottomWidth: .2, paddingVertical: 10, paddingHorizontal: 20,
                                          flexDirection: 'row', alignItems: 'center'
                                      }}>
                                      
                                          <View style={{marginRight: 15}}>
                                              <Image source={{uri: EXPO_PUBLIC_API_URL + item.image}} style={{width: 50, height: 50, resizeMode: 'cover', borderRadius: 100, borderColor: '#bdbdbd', borderWidth: .2, backgroundColor: '#e9e9e9'}}/>
                                          </View>
                                    
                                          <View>
                                              <Text style={{fontFamily: 'inter-medium'}}>{moment(item.created_at).fromNow()}</Text>
                                              <TouchableOpacity onPress={() => Alert.alert('', 'Estás seguro de eliminar esta historia?', [
                                                {text: 'Aceptar', onPress: () => this.destroyStory(item.id)},
                                                {text: 'Cancelar', style: 'cancel'},
                                              ])}>
                                                  <Text style={{color: colores.primary}}>eliminar</Text>
                                              </TouchableOpacity>
                                          </View>
                                  </View>
                              )
                          }}
                        
                      />: 
                      <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', paddingHorizontal: 25}}>
                          <Image source={images.stories} style={{height: 150}} resizeMode='contain'/>
                          <Text style={{fontFamily: 'inter', textAlign: 'center'}}>No se han subido historias para este local en las últimas 24 horas</Text>
                      </View>
                    }
                  </View>
            </>
        )
    }
}

export default Stories