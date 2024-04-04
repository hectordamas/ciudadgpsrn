import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, Image, Text, TextInput, SafeAreaView, ScrollView, StatusBar} from 'react-native'
import {icons, images, colores} from '../../constants'
import { Appbar } from 'react-native-paper'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

const {EXPO_PUBLIC_API_URL} = process.env

const SearchJobs = ({navigation}) => {
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const textInput = useRef(null)
    
    const onSubmit = () => navigation.navigate('Jobs', {search: text})

    const onChangeText = async () => {
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/searchJobs?search=${text}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'applicaction/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(result => result.json())
        .then((result) => {
            console.log(result)
            if(result.jobs){
                let {jobs} = result
                setSuggestions(jobs)
            }   
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            setText('')
            setTimeout(() => textInput.current.focus(), 10)
        })
    }, [])

    useEffect(() => {
        let isMounted = true;

        if(isMounted){
            text.length > 0 && onChangeText()
        }

        return () => {
            isMounted = false
        }
    }, [text])

    return (
        <View style={{flex:1, backgroundColor: '#fff'}}>
            <Appbar.Header statusBarHeight={0}  style={{height: 50}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={<Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14, marginTop:3}}>Buscar en Bolsa de Empleos</Text>} />
            </Appbar.Header>
            <View style={{flex: 1, paddingHorizontal: 20}}>
                <View style={{paddingBottom:10}}>
                    <SafeAreaView style={{flexDirection:'row', borderRadius:5, borderColor:'#757575', borderWidth:.2}}>
                        <TextInput
                            style={{width:'85%', paddingLeft:10, paddingVertical: 8, fontFamily:'roboto', fontSize:13, color:'#757575'}}
                            placeholder="Buscar Por Cargo o Palabra Clave"
                            placeholderTextColor="#757575"
                            ref={textInput}
                            value={text}
                            onChangeText={(val) => setText(val)}
                            onSubmitEditing={onSubmit}
                            returnKeyType={'search'}
                        />
                        <TouchableOpacity style={{flexDirection:'row', width:'15%', borderWidth:1, borderColor:'red', justifyContent:'center', alignItems: 'center', backgroundColor:'red', borderBottomEndRadius:5, borderTopEndRadius:5}} 
                          onPress={onSubmit}>
                            <Image
                                style={{width:15, height:15, tintColor:colores.btnText}}
                                source={icons.search_button}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>

                {
                    text.length == 0 ? 
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
                        <Image source={images.search_jobs} style={{height: 180, marginBottom: 20}} resizeMode='contain'/>
                        <Text style={{textTransform: 'capitalize', textAlign: 'center', fontFamily: 'inter'}}>Busca en la Bolsa de Empleos por alguna palabra clave</Text>
                    </View> 
                    : 
                    <ScrollView>
                        {suggestions.length > 0 &&
                            suggestions.map((item) => {
                                return (
                                <TouchableOpacity style={{paddingVertical:10, flexDirection:'row', alignItems: 'center', textTransform: 'capitalize'}} key={item.id} onPress={() => navigation.navigate('Jobs', {search: item.title}) }>
                                    <View style={{marginRight: 5}}>
                                        <MaterialCommunityIcons name="briefcase-search-outline" size={20} color="black" />
                                    </View> 
                                    <View>
                                        <Text style={{fontFamily:'inter', textTransform: 'capitalize'}}>{item.title}</Text>
                                    </View>                                                
                                </TouchableOpacity>
                                )   
                            })
                        }
                    </ScrollView>
                }
            </View>
        </View>
    )
}

export default SearchJobs