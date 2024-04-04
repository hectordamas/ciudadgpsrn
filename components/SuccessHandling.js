import React from 'react'
import {View, Image, Text, TouchableOpacity} from 'react-native'
import {colores, images} from '../constants';

export default class Success extends React.Component{
    render(){
        const {navigation} = this.props
        const {text} = this.props.route.params

        return (
            <View style={{backgroundColor:'#fff', position:'absolute', width:'100%', height:'100%', zIndex:100, 
            justifyContent:'center', alignItems:'center', top:0, right:0, left:0, bottom:0, paddingHorizontal:20}}>
                <View style={{width:'100%', justifyContent:'center', alignItems:'center',}}>
                    <Image source={images.success} style={{width:'100%', height:300}} resizeMode={'contain'}/>
                    <Text style={{fontFamily:'inter', textAlign:'center', fontSize:15}}>{text}</Text>
                </View>
                <View style={{marginTop:20, width:'100%'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{borderRadius:20, paddingVertical:10, backgroundColor:colores.black, flexDirection:'row', justifyContent:'center'}}>
                        <Text style={{fontFamily:'inter-bold', color:'#fff', textTransform:'uppercase', letterSpacing:0.5}}> Regresar </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
