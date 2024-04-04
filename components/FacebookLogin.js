import React from "react";
import {Image, Text} from 'react-native'
import { icons } from "../constants";
import { Button } from "react-native-paper";

const FacebookLogin = (props) => {
    return (
        <Button 
            style={{marginTop: 15, marginBottom: 15}}
            mode="elevated"
            icon={() => <Image source={icons.facebook} style={{resizeMode:"contain", width:22, height:22}} /> }
            onPress={() => props.openAuthSession('facebook')}>
                <Text style={{color: '#212121'}}>Continuar con Facebook</Text>
        </Button>
    )
}

export default React.memo(FacebookLogin)