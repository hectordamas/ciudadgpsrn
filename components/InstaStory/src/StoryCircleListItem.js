import React, {useState, useEffect} from "react";
import {View, Image, TouchableOpacity, Text, StyleSheet, Platform} from "react-native";
import {usePrevious} from "./helpers/StateHelpers";
import {LinearGradient} from 'expo-linear-gradient'
const {EXPO_PUBLIC_API_URL} = process.env;    
const DEFAULT_AVATAR = require("./assets/images/no_avatar.png");

const StoryCircleListItem = (props) => {

    const {
        item,
        avatarSize,
        showText,
        textStyle
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

    const size = avatarSize ?? 60;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => _handleItemPress(item)}>
                <LinearGradient
                  colors={['#770EF0', '#F700A9', '#F3BF01']}
                  start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                  style={[
                        styles.avatarWrapper,
                        {
                            height: size + 3,
                            width: size + 3,
                        }
                    ]}
                    >                
                    <Image style={{
                            height: size,
                            width: size,
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: '#fff',
                            backgroundColor: '#fff'
                        }}
                        resizeMode={'contain'}
                        source={{uri: EXPO_PUBLIC_API_URL + item?.logo}}
                        defaultSource={Platform.OS === 'ios' ? DEFAULT_AVATAR : null}
                    />
                </LinearGradient>
            </TouchableOpacity>
            {showText &&
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={{width: size + 4, ...styles.text, ...textStyle}}>
                    {item?.name}
                </Text>
            }
        </View>
    );
}

export default React.memo(StoryCircleListItem);

const styles = StyleSheet.create({
    container: {
        marginVertical: 2,
        marginRight: 15
    },
    avatarWrapper: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 100,
        height: 64,
        width: 64
    },
    text: {
        marginTop: 5,
        textAlign: "center",
        alignItems: "center",
        fontSize: 11,
        fontFamily: 'roboto-medium'
    }
});
