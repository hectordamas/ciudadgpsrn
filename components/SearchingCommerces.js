import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import LottieView from 'lottie-react-native';

export default class SearchingCommerces extends React.Component{
    render(){
        return(
            <View style={{justifyContent:'center', alignItems:'center', paddingHorizontal:20, backgroundColor:'#fff'}}>
                <View>
                    <LottieView style={{width:250, height:300}} source={require('../search.json')} autoPlay/>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <View style={{marginRight:10}}>
                        <ActivityIndicator size={'small'} color={'black'}/>
                    </View>
                    <View>
                        <Text style={{fontFamily:'inter-medium'}}>
                            Buscando comercios cercanos...
                        </Text>
                    </View>
                </View>
            </View>  
        )
    }
} 