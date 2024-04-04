import React from 'react';
import SwipeUpDownModal from './SwipeUpDownModal';
import { View, StyleSheet } from 'react-native';

const SwipeDownModal = ({children, isVisible, onClose, flex}) => {
  return (
    <SwipeUpDownModal
      modalVisible={isVisible}
      ContentModal={
        <View style={styles.containerContent}>
          <View style={{backgroundColor: '#fff', flex, borderTopStartRadius: 10, borderTopRightRadius: 10, paddingTop: 10}}>
            {children}
          </View>
        </View>
      }
      onClose={onClose}
    />
  );
};

const styles = StyleSheet.create({
  containerContent: {
    flex: 1, 
    backgroundColor: 'transparent',
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'flex-end'
  },
});

export default SwipeDownModal;