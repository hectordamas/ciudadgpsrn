import React from 'react';
import {View, Text, Image, FlatList, StatusBar} from 'react-native';
import { Appbar } from 'react-native-paper';
import { images } from '../constants';
import RenderCommerces from '../components/showCommerces/RenderCommerces';
import {Spinner} from '../components';
const {EXPO_PUBLIC_API_URL} = process.env;    
import { Contexto } from '../functions/Context';


const initialState = {
    commerces: [],
    loaded: false,
    error: false
}

class Favoritos extends React.Component{
    state = initialState

    static contextType = Contexto

    getData = async () => {
        const {latitude, longitude} = this.context.location.coords
        const {user} = this.context
        await fetch(`${EXPO_PUBLIC_API_URL}/api/likes?user_id=${user.id}&lat=${latitude}&lon=${longitude}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With' : 'XMLHttpRequest',
            },
        }).then(res => res.json())
        .then((res) => {
            this.setState({commerces: res.commerces, loaded:true})
        })
        .catch(err => console.log(err))
    }

    componentDidMount = async () => {
        this.props.navigation.addListener("focus", () => {
          this.setState(initialState, this.getData);
        });
    }

    render(){
        const props = this.props;
        const {navigation} = props;
        const {user} = this.context;
        const {commerces, loaded} = this.state;

        return (
            <View style={{backgroundColor:'#fff', flex:1}}>
                <Appbar.Header  statusBarHeight={0}  style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
                  shadowColor: '#000',      // Color de la sombra (iOS)
                  shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                  shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                  shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title={
                        <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                            Favoritos
                        </Text>} 
                    />
                </Appbar.Header>
        
                {loaded ? 
                    commerces.length > 0 ? 
                    <FlatList
                        data={commerces}
                        renderItem={(item, key) => <RenderCommerces item={item} key={key} navigation={navigation} user={user}/>}
                        keyExtractor={(item, key) => String(key)}
                        style={{padding:10}}
                    />
                    :
                    <View style={{width:'100%', paddingHorizontal:30, flex:1,  alignItems:'center'}}>
                        <View>
                            <View>
                                <Image source={images.favorite} resizeMode={'contain'} style={{width:'100%', height:250, marginTop:50}}/>
                            </View>
                            <Text style={{fontFamily:'inter-medium', textAlign:'center', fontSize:17, marginTop:30}}>
                                Aún no has agregado nada a tu lista de Favoritos
                            </Text> 
                        </View>
                    </View>
                
                : <Spinner />
                }
            </View>
        )
    }

}


export default Favoritos