import React, { useState, useRef, useEffect, useCallback } from 'react';
import {StyleSheet, View, Image, FlatList} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps";
import { colores, icons } from '../constants';
import Store from './Store'

const VistaMapa = (props) => {
  let {data, onEndReached, navigation} = props
  let Locations = data
  const [ longitude, setLongitude ] = useState(Locations[0].lon);
  const [ latitude, setLatitude ] = useState(Locations[0].lat);
  const [ index, setIndex ] = useState(0)
  const [viewableItems, setViewableItems] = useState([]);

  const _map = useRef(null);
  let isMounted = true;

  useEffect(() => {
    let i = Locations.findIndex((item) => item.id === viewableItems[0]?.item?.id);
    if (i !== -1 && i !== index) {
      updateState(i);
    }

    if(Locations.length - 1 == index  && isMounted) { 
      onEndReached()
    }

    return () => {isMounted = false}

  }, [viewableItems, Locations, index]);

  const updatePosition = (i) => {
    if (Locations[i]) {
      let {lat, lon} = Locations[i];
      _map.current.animateToRegion({latitude: lat, longitude: lon, latitudeDelta: 0.02, longitudeDelta: 0.02}, 500);
    }
  }

  const updateState = (i) => {  
    if (index !== i) {
      updatePosition(i);
      setIndex(i);
    }
  }

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    setViewableItems(viewableItems);
  }, []);

  return (
    <View style={styles.container}>

      {
        isMounted &&
        <MapView ref={_map} region={{latitude, longitude, longitudeDelta: 0.02, latitudeDelta: 0.02}} style={styles.container} provider={PROVIDER_GOOGLE}>
          {Locations.map((marker, key) => 
            <Marker key={key} coordinate={{latitude: marker.lat, longitude: marker.lon}} title={marker.name}>
              <View style={styles.markerWrap}>
                <Image source={icons.marker} style={[key == index ?  styles.markerActive : styles.marker, {tintColor: key == index ? '#000' : colores.primary}]} resizeMode="contain"/>
              </View>
            </Marker>
          )}
        </MapView>
      }
      
      <View style={styles.listStores}>
        {
          isMounted &&
            <FlatList
              data={Locations}
              renderItem={({item}, key) => <Store index={key} marker={item} navigation={navigation} />}
              horizontal
              pagingEnabled
              initialNumToRender={2}
              maxToRenderPerBatch={2}
              shouldItemUpdate={false}
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              contentContainerStyle={{paddingHorizontal: 20}}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={{
                minimumViewTime: 100,
                viewAreaCoveragePercentThreshold: 50,
              }}
            />
        }
      </View>

    </View>
  );
};

export default React.memo(VistaMapa);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStores:{    
    marginBottom:15,
    width: '100%', 
    position: 'absolute',
    bottom: 0
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 30, height: 30,
  },
  markerActive: {
    width: 35, height: 35
  }
});