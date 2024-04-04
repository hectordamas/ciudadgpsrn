import { PureComponent, memo } from 'react';
import {View, Text, TouchableOpacity, Dimensions, StyleSheet, Image} from 'react-native'
import {icons} from '../constants'
const {EXPO_PUBLIC_API_URL} = process.env;    

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;

class Store extends PureComponent{
    render(){
        let {marker, index, navigation} = this.props

        let item = marker
        const logo = EXPO_PUBLIC_API_URL + item.logo
    
        return (
          <TouchableOpacity style={[styles.card]} key={index} onPress={() => navigation.navigate('Commerce', {commerce_id: item.id})}>
                <View style={{flexDirection:'row'}}>
                    <View style={{width:60, height:60, marginHorizontal:10}}>
                        <Image source={{uri: logo}} style={{width:60, height:60, borderRadius:50, backgroundColor:'#bdbdbd'}}/> 
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{fontFamily:'inter-medium', flexWrap: 'wrap', maxWidth: '90%'}} numberOfLines={1}>{item.name}</Text>
                        <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
                            <View style={{flexDirection:'row', marginTop: 5}}>
                                <View style={{flexDirection:'row', marginRight:15}}>
                                    <Image source={icons.star} style={{height: 15, width: 15, marginRight: 5}}/>
                                    <Text style={{fontFamily:'inter-medium'}}>{item.rating ? item.rating.toFixed(1) : 'Nuevo'}</Text>
                                </View>
                                <View style={{flexDirection:'row', marginRight:15}}>
                                    <Image source={icons.distance} style={{height: 15, width: 15, marginRight: 5}}/>
                                    <Text style={{fontFamily:'inter-medium'}}>{item.distance > 1 ? `${(item.distance).toFixed(2)} km` : `${(item.distance * 1000).toFixed(2)} m`}</Text>
                                </View>
                            </View>
                        </View> 
                    </View>
                </View>
          </TouchableOpacity>
        );
    }
}

export default memo(Store) 


const styles = StyleSheet.create({
    card: {
        elevation: 2,
        backgroundColor: "#FFF",
        borderRadius: 5,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        width: CARD_WIDTH,
        overflow: "hidden",
        paddingVertical: 10,
        marginHorizontal: 5
    },
    cardtitle: {
        fontSize: 12,
        fontWeight: "bold",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    signIn: {
        width: '100%',
        padding:5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 11,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    button: {
      alignItems: 'center',
      marginTop: 5
    },
})

  