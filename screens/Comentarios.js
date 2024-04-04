import React from 'react'
import {View, Image, Text, FlatList, ActivityIndicator, Dimensions} from 'react-native'
import { Appbar } from 'react-native-paper';
import { Spinner } from '../components';
import {icons, images} from '../constants';
const {EXPO_PUBLIC_API_URL} = process.env;    
import Moment from 'moment';
import 'moment/locale/es';

let width = Dimensions.get("window").width;


const initialState = {
    comments: [],
    loaded: false,
    page: 1,
    count: 0,
    masResultados:true,
    error: false
}

const ListFooterComponent = ({masResultados}) => {
    return (
        <View style={{paddingVertical:20, paddingHorizontal:20}}>
            {
                masResultados && <ActivityIndicator size={'large'} color={'black'}/> 
            }
        </View>
    )
}

export default class Comentarios extends React.Component{

    state = initialState

    getData = async () => {
        const {commerce_id} = this.props.route.params
        const {page} = this.state

        await fetch(`${EXPO_PUBLIC_API_URL}/api/comments?page=${page}&commerce_id=${commerce_id}`)
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            this.setState({
                comments: this.state.comments.concat(res.comments.data), loaded: true,
                count:res.comments.total, page: res.comments.current_page + 1
            })
        })
        .catch(err => console.log(err))
    }

    onEndReached = () => {
        const {comments, count} = this.state;
        if(comments.length < count){
            this.getData()
        }else{
            this.setState({masResultados:false})
        }
    }

    componentDidMount = async () => {
        const {navigation} = this.props
        navigation.addListener('focus', () => {
            this.setState(initialState, this.getData)
        });
    }

    render(){
        const {navigation} = this.props
        const {loaded, comments, masResultados} = this.state
        const rate = [1,2,3,4,5];

        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <Appbar.Header  statusBarHeight={0}  style={{height: 50, elevation: 4,           
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                  <Appbar.Content title={<Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:15}}>Comentarios</Text>} />
                </Appbar.Header>

                <View style={{flex:1}}>
                    {
                        loaded ?
                            comments?.length > 0 ? 
                                <FlatList 
                                    contentContainerStyle={{paddingVertical: 10}}
                                    data={comments}
                                    renderItem={({item}) => {
                                            return (
                                            <View key={item.id} style={{marginBottom: 15, paddingBottom: 10, borderBottomWidth: 0.2, borderColor: "#e6e6e6", paddingHorizontal: 20, flexWrap: 'wrap', width: width}}>
                                              <View key={item.id} style={{ flexDirection: "row" }}>
                                                <View style={{ marginRight: 10 }}>
                                                  <Image source={item.user.avatar ? {uri: item.user.avatar.startsWith('http') ? item.user.avatar : EXPO_PUBLIC_API_URL + item.user.avatar} : images.user_avatar_default} style={{ width: 50, height: 50, borderRadius: 25}}/>
                                                </View>
                                                <View>
                                                  <Text style={{ fontFamily: "inter-medium" }}>
                                                    {item.user.name}
                                                  </Text>
                                                  <Text style={{ fontFamily: "inter", fontSize: 10, marginBottom: 2}}>
                                                    {Moment(item.created_at).fromNow()}
                                                  </Text>
                                                  <View style={{ flexDirection: "row" }}>
                                                    {rate.map((rate, key) => <Image key={key} source={rate <= item.rating ? icons.estrella_filled : icons.estrella} style={{ width: 15, height: 15, tintColor:'#ffc107' }}/>)}
                                                  </View>
                                                  {item.comment && <Text style={{ textAlign: "justify", fontFamily: "roboto", fontSize: 13, marginTop: 5}} >
                                                    {item.comment}
                                                  </Text>}
                      
                                                </View>
                                              </View>
                                            </View>
                                            )
                                        }
                                    }
                                    onEndReached={() => this.onEndReached()}
                                    ListFooterComponent={<ListFooterComponent masResultados={masResultados}/>}
                                />
                            : <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Text style={{fontFamily:'inter', fontSize:15}}>No hay Comentarios Disponibles</Text></View>
                        : <Spinner />
                    }
                </View>
            </View>
        )
    }
}
