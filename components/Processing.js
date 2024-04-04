import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';

export default class Processing extends React.Component{
    render(){
        return (
            <View style={{
                position: 'absolute',
                justifyContent:'center', 
                alignItems:'center',
                backgroundColor:'rgba(0,0,0,0.8)',
                width:'100%',
                height:'100%',
                top:0,
                right:0,
                zIndex:100
            }}>
                <View style={{alignItems:'center', backgroundColor:'none'}}>
                    <ActivityIndicator size={'large'} color={'#fff'}/>
                    <Text style={{color:'#fff', marginTop:30, fontFamily:'inter'}}> Procesando Información...</Text>
                </View>
            </View>
        );   
    }
}