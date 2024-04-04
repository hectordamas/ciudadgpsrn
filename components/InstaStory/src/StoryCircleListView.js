import React from "react";
import {View, FlatList} from "react-native";
import StoryCircleListItem from "./StoryCircleListItem";

const StoryCircleListView = (props) => {
    const {
        data,
        handleStoryItemPress,
        unPressedBorderColor,
        pressedBorderColor,
        avatarSize,
        showText,
        textStyle,
    } = props;

    return (
        <View>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={data}
                horizontal
                contentContainerStyle={{paddingHorizontal: 20}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                    <StoryCircleListItem
                        avatarSize={avatarSize}
                        handleStoryItemPress={() => handleStoryItemPress && handleStoryItemPress(item, index)}
                        unPressedBorderColor={unPressedBorderColor}
                        pressedBorderColor={pressedBorderColor}
                        item={item}
                        showText={showText}
                        textStyle={textStyle}
                    />
                )}
            />
        </View>
    );

}

export default React.memo(StoryCircleListView);
