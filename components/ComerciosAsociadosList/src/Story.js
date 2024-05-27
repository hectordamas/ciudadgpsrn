import React, {Fragment, useRef, useState, useEffect} from "react";
import {Dimensions, View, Platform, TextStyle} from "react-native";
import Modal from "react-native-modalbox";
import StoryListItem from "./StoryListItem";
import StoryCircleListView from "./StoryCircleListView";
import {isNullOrWhitespace} from "./helpers/ValidationHelpers";
import AndroidCubeEffect from "./components/AndroidCubeEffect";
import CubeNavigationHorizontal from "./components/CubeNavigationHorizontal";

export const Story = (props) => {
    const {
        data,
        unPressedBorderColor,
        pressedBorderColor,
        style,
        onStart,
        onClose,
        duration,
        swipeText,
        link,
        linkText,
        customSwipeUpComponent,
        customCloseComponent,
        avatarSize,
        showAvatarText,
        avatarTextStyle,
        newStory,
        navigation,
        afterDestroyStory,
        visibleManagementOptions
    } = props;

    const [dataState, setDataState] = useState(data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedData, setSelectedData] = useState([]);
    const cube = useRef();

    // Component Functions
    const _handleStoryItemPress = (item, index) => {
        const newData = dataState.slice(index);
        if (onStart) {
            onStart(item)
        }

        setCurrentPage(0);
        setSelectedData(newData);
        setIsModalOpen(true);
    };

    useEffect(() => {
        handleSeen();
    }, [currentPage]);

    const handleSeen = () => {
        const seen = selectedData[currentPage];
        const seenIndex = dataState.indexOf(seen);
        if (seenIndex > 0) {
            if (!dataState[seenIndex]?.seen) {
                let tempData = dataState;
                dataState[seenIndex] = {
                    ...dataState[seenIndex],
                    seen: true
                }
                setDataState(tempData);
            }
        }
    }

    function onStoryFinish(state) {
        if (!isNullOrWhitespace(state)) {
            if (state == "next") {
                const newPage = currentPage + 1;
                if (newPage < selectedData.length) {
                    setCurrentPage(newPage);
                    cube?.current?.scrollTo(newPage);
                } else {
                    setIsModalOpen(false);
                    setCurrentPage(0);
                    if (onClose) {
                        onClose(selectedData[selectedData.length - 1]);
                    }
                }
            } else if (state == "previous") {
                const newPage = currentPage - 1;
                if (newPage < 0) {
                    setIsModalOpen(false);
                    setCurrentPage(0);
                } else {
                    setCurrentPage(newPage);
                    cube?.current?.scrollTo(newPage);
                }
            }
        }
    }

    const renderStoryList = () => selectedData.map((x, i) => {
        return (<StoryListItem duration={duration > 0 ? duration * 1000 : 1000 * 1000}
                               key={i}
                               name={x.name}
                               logo={x.logo}
                               stories={x.stories}
                               currentPage={currentPage}
                               onFinish={onStoryFinish}
                               swipeText={swipeText}
                               newStory={newStory}
                               navigation={navigation}
                               link={link}
                               linkText={linkText}
                               customSwipeUpComponent={customSwipeUpComponent}
                               customCloseComponent={customCloseComponent}
                               onClosePress={() => {
                                   setIsModalOpen(false);
                                   if (onClose) {
                                       onClose(x);
                                   }
                               }}
                               index={i}/>)
    })

    const renderCube = () => {
        if (Platform.OS == 'ios') {
            return (
                <CubeNavigationHorizontal
                    ref={cube}
                    callBackAfterSwipe={(x) => {
                        if (x != currentPage) {
                            setCurrentPage(parseInt(x));
                        }
                    }}
                >
                    {renderStoryList()}
                </CubeNavigationHorizontal>
            )
        } else {
            return (<AndroidCubeEffect
                ref={cube}
                callBackAfterSwipe={(x) => {
                    if (x != currentPage) {
                        setCurrentPage(parseInt(x));
                    }
                }}
            >
                {renderStoryList()}
            </AndroidCubeEffect>)
        }
    }

    return (
        <Fragment>
            <View style={{...style, flex: 1}}>
                <StoryCircleListView
                    handleStoryItemPress={_handleStoryItemPress}
                    data={dataState}
                    avatarSize={avatarSize}
                    unPressedBorderColor={unPressedBorderColor}
                    pressedBorderColor={pressedBorderColor}
                    showText={showAvatarText}
                    textStyle={avatarTextStyle}
                    newStory={newStory}
                    navigation={navigation}
                    afterDestroyStory={afterDestroyStory}
                    visibleManagementOptions={visibleManagementOptions}
                />
            </View>
            <Modal
                style={{
                    flex: 1,
                    height: Dimensions.get("window").height,
                    width: Dimensions.get("window").width
                }}
                isOpen={isModalOpen}
                onClosed={() => setIsModalOpen(false)}
                position="center"
                swipeToClose
                swipeArea={250}
                backButtonClose
                coverScreen={true}
            >
                {renderCube()}
            </Modal>
        </Fragment>
    );
};
export default Story;
