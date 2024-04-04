import React from 'react';
import {View, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import {images} from '../constants';

export default class LoadingLottie extends React.Component{
    render(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center', paddingHorizontal:20, backgroundColor:'#fff'}}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <LottieView style={{width:'90%', height:180, marginBottom:30}} source={require('../loading.json')} autoPlay loop/>
                    <Image source={images.logo_ciudadgps_color} style={{width:130, height: 60, resizeMode:'contain'}}/>
                </View>
            </View>  

        )
    }
}