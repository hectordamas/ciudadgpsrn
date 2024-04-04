import React from "react";
import {View, Text, ActivityIndicator, Platform} from "react-native";
import {colores} from '../constants'

const Spinner = ({text}) => {
    return (
        <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
              backgroundColor: "#fff",
              paddingTop: Platform.OS == 'android' ? 0 : 50
            }}
          >

             <ActivityIndicator color={colores.primary} size={80} />
           
            {text && <Text style={{fontFamily: 'inter-medium', fontSize:15, textTransform:'capitalize', marginTop: 50}}>{text}</Text>}
        </View>
    );
}

export default Spinner