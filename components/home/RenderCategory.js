import React, {useState} from 'react';
import {TouchableOpacity, View, Image, Text, ActivityIndicator, StyleSheet} from 'react-native';

const {EXPO_PUBLIC_API_URL} = process.env;  

const RenderCategory = (props) => {
    const [loadingImage, setLoadingImage] = useState(false);

    const {navigation, item} = props;
    const image_url = EXPO_PUBLIC_API_URL + item.image_url
    return (
        <TouchableOpacity style={styles.touch}
            onPress={() => navigation.navigate('Category', {category_id: item.id}) }
        >
            <View
                style={{
                    width: 45,
                    height: 45,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    
                }}
            >
            {loadingImage && 
                <View style={{alignItems:'center', justifyContent:'center', width:'100%', height:'100%', position:'absolute'}}>
                    <ActivityIndicator size="large" color='red' /> 
                </View>
            }

            <Image 
                onLoadStart={() => setLoadingImage(true)}
                onLoadEnd={() => setLoadingImage(false)}
                source={{uri: image_url}} resizeMode="contain" style={{width: '100%', height: '100%'}}
            />
                
            </View>
            <Text style={{marginTop:10, fontSize:10, textAlign:'center', letterSpacing:0.5, fontFamily: 'inter-bold'}} numberOfLines={1}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );
} 

const styles = StyleSheet.create({
    touch: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
        borderRadius:5,
        width: 100,
        height:100,
        elevation: 5,
        backgroundColor: '#fafafa',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
})

export default React.memo(RenderCategory);