import React from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, StatusBar} from 'react-native';
import RenderCategory from '../components/home/RenderCategory'
import {icons} from '../constants'
import { Spinner } from '../components';
import { Appbar } from 'react-native-paper';

const {EXPO_PUBLIC_API_URL} = process.env;    

class Categories extends React.Component{
    _isMounted = false
    state = {
        categories: [],
        loaded: false
    } 

    componentDidMount = async () => {
        this._isMounted = true

        if(this._isMounted){
            await fetch(`${EXPO_PUBLIC_API_URL}/api/categories`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Requested-With' : 'XMLHttpRequest',
                },
            })
            .then(response => response.json())
            .then(res => {  
                if(res.categories){
                    this.setState({categories: res.categories, loaded: true})
                }          
            })
            .catch(e => console.log(e))
        }
    }

    componentWillUnmount = ()  => this._isMounted = false

    render(){
        const {navigation} = this.props
        const {categories, loaded} = this.state
        return(
            <View style={{flex:1, backgroundColor: '#fff'}}>
                <Appbar.Header  statusBarHeight={0}  style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
                  shadowColor: '#000',      // Color de la sombra (iOS)
                  shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
                  shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
                  shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title={
                        <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                            Todas las Categorías
                        </Text>} 
                    />
                </Appbar.Header>
                {
                    loaded ?                 
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <FlatList
                                contentContainerStyle={{paddingHorizontal:20, paddingVertical:30}}
                                numColumns={3}
                                data={categories}
                                renderItem={({item}) => <View style={{flex:1, justifyContent: 'center', alignItems: 'center', paddingBottom:10, paddingRight:3}}><RenderCategory item={item} navigation={navigation}/></View>}
                                keyExtractor={item => item.id}
                            />
                        </View>
                        : <Spinner />
                }
            </View>
        );
    }
}

export default React.memo(Categories)