import React from "react";
import { Text, Image} from 'react-native'
import {  icons } from "../constants";
import { Button } from "react-native-paper";

const AppleLogin = (props) => {
    return (
    <Button 
        style={{marginBottom: 15}}
        mode="elevated"
        icon={() => <Image source={icons.apple} style={{resizeMode:"contain", width:22, height:22}} /> }
        onPress={() => props.openAuthSession('apple')}>
            <Text style={{color: '#212121'}}>Continuar con Apple</Text>
    </Button>
    )
}

export default React.memo(AppleLogin)