import React from "react";
import {View} from "react-native";
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
        newStory,
        navigation,
        afterDestroyStory,
        visibleManagementOptions
    } = props;

    return (
        <View style={{marginTop: 10}}>
            {   data.map((item) => 
                    <StoryCircleListItem
                        key={item.id}
                        avatarSize={avatarSize}
                        handleStoryItemPress={() => handleStoryItemPress && handleStoryItemPress(item, item.id)}
                        unPressedBorderColor={unPressedBorderColor}
                        pressedBorderColor={pressedBorderColor}
                        item={item}
                        newStory={newStory}
                        navigation={navigation}
                        showText={showText}
                        textStyle={textStyle}
                        afterDestroyStory={afterDestroyStory}
                        visibleManagementOptions={visibleManagementOptions}
                    />            
                )

            }
        </View>
    );

}

export default StoryCircleListView;
