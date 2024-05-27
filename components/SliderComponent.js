import React, { memo, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, Dimensions, Share, Image, Alert, StyleSheet, Modal, Pressable } from 'react-native';
import { icons, colores } from '../constants';
const { EXPO_PUBLIC_API_URL } = process.env;
import { isLiked } from "../functions";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SliderComponent = (props) => {
  const { images, commerce_id, user, like, dislike, auth, likes, commerce } = props;
  const [activeSlide, setActiveSlide] = useState(0);
  const ScreenWidth = Dimensions.get("window").width;
  const maxHeight = ScreenWidth * 0.8; // Definimos un alto máximo relativo al ancho de la pantalla
  const minHeight = ScreenWidth * 0.5; // Definimos un alto mínimo relativo al ancho de la pantalla
  const [imageProperties, setImageProperties] = useState([]);
  const [containerHeight, setContainerHeight] = useState(maxHeight); // Altura inicial
  const [modalVisible, setModalVisible] = useState(false);
  const [imageActive, setImageActive] = useState(null);

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
  };

  const handleSnapToItem = (index) => {
    setActiveSlide(index);
    if (imageProperties[index]) {
      setContainerHeight(imageProperties[index].height);
    }
  };

  useEffect(() => {
    if (images && images.length > 0) {
      const newImageProperties = images.map(image => {
        return new Promise((resolve) => {
          Image.getSize(`${EXPO_PUBLIC_API_URL}${image.uri}`, (width, height) => {
            const aspectRatio = width / height;
            let calculatedHeight = Math.min((ScreenWidth / aspectRatio), maxHeight);
            const resizeMode = aspectRatio >= (16 / 9) ? 'cover' : 'contain';

            if (resizeMode === 'cover') {
              calculatedHeight = Math.max(calculatedHeight, minHeight);
            }

            resolve({ height: calculatedHeight, resizeMode });
          });
        });
      });

      Promise.all(newImageProperties).then(results => {
        setImageProperties(results);
        if (results[0]) {
          setContainerHeight(results[0].height);
        }
      });
    }
  }, [images]);

  const ImageItem = ({ item, index }) => {
    const image_url = `${EXPO_PUBLIC_API_URL}${item.uri}`;

    const onPress = () => {
      setImageActive({ uri: image_url });
      setModalVisible(true);
    };

    return (
      <Pressable 
        onPress={onPress}
        key={index}
        style={[styles.imageContainer, { height: imageProperties[index]?.height || maxHeight }]}
      >
        <Image
          source={{ uri: image_url }}
          style={styles.image}
          resizeMode={imageProperties[index]?.resizeMode || 'contain'}
        />
      </Pressable>
    );
  };

  const renderItem = ({ item, index }) => {
    return <ImageItem item={item} index={index} />;
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} transparent>
        <Pressable 
          onPressOut={() => setModalVisible(false)}
          style={{backgroundColor: 'rgba(0,0,0,0.8)', flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
          <Image 
            style={{width: ScreenWidth * 0.9, height: ScreenWidth * 2}} 
            resizeMode='contain' 
            source={imageActive}
          />
        </Pressable>
      </Modal>

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
        style={{ height: containerHeight, maxHeight }} // Altura dinámica basada en la imagen visible, con un máximo
      />

      <TouchableOpacity
        style={styles.shareButton}
        onPress={onShare}
      >
        <MaterialCommunityIcons name="share-variant-outline" size={20} color="#fff" style={{ marginRight: 5 }} />
        <Text style={{ color: '#fff' }}>Compartir</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.likeButton}
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
        <Text style={{ color: user ? isLiked(likes, user.id) ? colores.like : colores.white : colores.white }}>
          {user ? (isLiked(likes, user.id) ? 'Seguido' : 'Seguir') : 'Seguir'}
        </Text>
      </TouchableOpacity>

      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeSlide ? styles.paginationDotActive : styles.paginationDotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: Dimensions.get("window").width,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  shareButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    zIndex: 1,
  },
  likeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 8,
    borderRadius: 5,
    flexDirection: 'row',
  },
  paginationContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    paddingTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: colores.primary,
  },
  paginationDotInactive: {
    backgroundColor: '#ccc',
  },
});

export default memo(SliderComponent);
