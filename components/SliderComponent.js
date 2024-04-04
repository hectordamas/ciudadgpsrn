import {memo, useState} from 'react'
import {View, TouchableOpacity, Text, FlatList, Dimensions, Share, Image, Alert} from 'react-native'
import { icons, colores } from '../constants'
const {EXPO_PUBLIC_API_URL} = process.env;    
import {isLiked} from "../functions";
import { MaterialCommunityIcons  } from '@expo/vector-icons';

const SliderComponent = (props) => {
    const {images, commerce_id, user, like, dislike, auth, likes, commerce} = props
    const [activeSlide, setActiveSlide] = useState(0);
    let ScreenWidth = Dimensions.get("window").width;
    let heightSlider =  ScreenWidth / 1.22

    const onShare = async () => {
        try {
          await Share.share({
            uri: `${EXPO_PUBLIC_API_URL}/comercios/${commerce_id}/redirect`, 
            title: `Descubre a ${commerce?.name} en CiudadGPS`,
            message: `${EXPO_PUBLIC_API_URL}/comercios/${commerce_id}/redirect`,
          });
        } catch (error) {
          Alert.alert(error.message);
        }
    }
  
    const handleSnapToItem = (index) => setActiveSlide(index)
  
    const renderItem = ({ item, index }) => (
      <Image
        key={index}
        source={{ uri: EXPO_PUBLIC_API_URL + item.uri }}
        style={{ width: ScreenWidth, height: heightSlider, backgroundColor: '#e9e9e9' }}
      />
    );

    
    return (
        <View>
        <FlatList
          data={images}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onMomentumScrollEnd={(event) => {
            const offset = event.nativeEvent.contentOffset.x;
            const activeIndex = Math.floor(offset / ScreenWidth);
            handleSnapToItem(activeIndex);
          }}
        />
  
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 10,
            top: 10,
            backgroundColor: 'rgba(0,0,0,0.8)',
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 5,
            flexDirection: 'row',
            zIndex: 1,
          }}
          onPress={onShare}
        >
          <MaterialCommunityIcons name="share-variant-outline" size={20} color="#fff" style={{marginRight: 5}} />
          <Text style={{ color: '#fff' }}>Compartir</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: 8,
            borderRadius: 5,
            flexDirection: 'row',
          }}
          onPress={() => (user ? (isLiked(likes, user.id) ? dislike() : like()) : auth())}
        >
          <Image
            source={
              user ? (isLiked(likes, user.id) ? icons.like : icons.favorite) : icons.favorite
            }
            style={{
              tintColor: user
                ? isLiked(likes, user.id)
                  ? colores.like
                  : colores.white
                : colores.white,
              width: 20,
              height: 20,
              marginRight: 5
            }}
          />
          <Text style={{color: user ? isLiked(likes, user.id) ? colores.like : colores.white : colores.white }}>
            {user ? (isLiked(likes, user.id) ? 'Seguido' : 'Seguir') : 'Seguir' }
          </Text>
        </TouchableOpacity>
  
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
            position: 'absolute',
            width: '100%',
            bottom: 0,
            zIndex: 20
          }}
        >
          {images.map((_, index) => (
            <View
              key={index}
              style={{
                width: 5,
                height: 5,
                borderRadius: 5,
                marginHorizontal: 5,
                backgroundColor:
                  index === activeSlide ? colores.primary : colores.white,
              }}
            />
          ))}
        </View>
      </View>
    )

}

export default memo(SliderComponent)