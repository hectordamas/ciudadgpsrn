import { Alert, Linking, Platform } from 'react-native';
import Constants from 'expo-constants';

const checkForUpdates = async ({storeVersions}) => {
  const isIOS = Platform.OS === 'ios';
  const {version} = Constants.expoConfig
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.ciudadgps.app'
  const appStoreUrl = 'https://apps.apple.com/app/apple-store/id1643027976'
  const storeURL = isIOS ? appStoreUrl : playStoreUrl;
  if(storeVersions.every((item) => item != version)){
    Alert.alert('Actualización Disponible', 'Para brindarte una mejor experiencia de usuario te invitamos a instalar la última versión de nuestra App', 
      [ {text: 'Actualizar', onPress: () => Linking.openURL(storeURL)}]
    );
  }
};

export default checkForUpdates;