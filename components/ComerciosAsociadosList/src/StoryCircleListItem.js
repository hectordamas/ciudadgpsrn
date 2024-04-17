import React, {useState, useEffect} from "react";
import {View, Image, TouchableOpacity, Text, Platform} from "react-native";
import {usePrevious} from "./helpers/StateHelpers";
const {EXPO_PUBLIC_API_URL} = process.env;    
import { LinearGradient } from 'expo-linear-gradient';
import { colores, icons } from "../../../constants";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Divider } from "react-native-paper";

const DEFAULT_AVATAR = require("./assets/images/no_avatar.png");

const StoryCircleListItem = (props) => {

    const {
        item,
        unPressedBorderColor,
        pressedBorderColor,
        avatarSize,
        navigation,
        newStory,
        afterDestroyStory,
        visibleManagementOptions
    } = props;

    const [isPressed, setIsPressed] = useState(props?.item?.seen);

    const prevSeen = usePrevious(props?.item?.seen);

    useEffect(() => {
        if (prevSeen != props?.item?.seen) {
            setIsPressed(props?.item?.seen);
        }

    }, [props?.item?.seen]);

    const _handleItemPress = item => {
        const {handleStoryItemPress} = props;

        if (handleStoryItemPress) handleStoryItemPress(item);

        setIsPressed(true);
    };

    const size = avatarSize ?? 45;

    return (
        <View>
            <Divider />
            <View style={{flexDirection:'row', alignItems:'center', paddingVertical:10, width: '100%'}}>
                <View style={{flexDirection:'row', flex: 5.6, paddingLeft: 20}}>

                    <View>
                        <View
                            style={{height: size + 4, width: size + 4, alignItems: 'center', justifyContent: 'center', borderRadius: 64 / 2, marginRight:10}}
                            >
                                <Image
                                    style={{
                                        height: size,
                                        width: size,
                                        borderRadius: 100,
                                        borderColor: '#e9e9e9',
                                        borderWidth: 1,
                                        backgroundColor: '#e9e9e9'
                                    }}
                                    source={{uri: EXPO_PUBLIC_API_URL + item.logo}}
                                    defaultSource={Platform.OS === 'ios' ? DEFAULT_AVATAR : null}
                                />
                        </View>
                    </View>
            
                    <View style={{justifyContent:'center', flex: 1}}>
                        <Text style={{fontFamily:'inter-medium', flexWrap: 'wrap', marginBottom:5}} numberOfLines={1}>{item.name}</Text>
                        <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
                            <View style={{flexDirection:'row', marginTop: 5, width: '100%'}}>
                                <TouchableOpacity 
                                    onPress={() => visibleManagementOptions(item.id, item.paid, item.name) } 
                                    style={{flexDirection:'row', marginRight:5, backgroundColor: colores.successButton, paddingHorizontal: 10, paddingVertical: 3, alignItems: 'center', borderRadius: 3}}
                                    >
                                    <MaterialCommunityIcons name="square-edit-outline" size={20} style={{marginRight: 5}} color="#fff" />
                                    <Text style={{fontFamily:'inter-bold', color: '#fff', fontSize:11, letterSpacing: 0.3}}>Administrar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => newStory(item.id)} 
                                    style={{flexDirection:'row', marginRight:5, backgroundColor: colores.darkButton, paddingHorizontal: 10, paddingVertical: 3, alignItems: 'center', borderRadius: 3}}
                                    >
                                    <MaterialCommunityIcons name="history" size={20} style={{marginRight: 5}} color="#fff"  />
                                    <Text style={{fontFamily:'inter-bold', color: '#fff', fontSize:11, letterSpacing: 0.3}}>Historia</Text>
                                </TouchableOpacity>
                            </View>
                        </View> 
                    </View>
                </View>
                <View style={{flex: .4, alignItems: 'center', justifyContent: 'center', paddingRight: 10}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Stories', {stories: item.stories, afterDestroyStory})}>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color={colores.darkButton} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default StoryCircleListItem;

