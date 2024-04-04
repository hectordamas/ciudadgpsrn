import React from 'react'
import {Image, Text } from 'react-native'
import { icons } from '../constants'
import { Button } from "react-native-paper";

const GoogleLogin = (props) => {
    return (
        <Button 
            style={{marginBottom: 15}}
            mode="elevated"
            icon={() => <Image source={icons.google} style={{resizeMode:"contain", width:22, height:22}} /> }
            onPress={() => props.openAuthSession('google')}>
                <Text style={{color: '#212121'}}>Continuar con Google</Text>
        </Button>
    );

}

export default GoogleLogin