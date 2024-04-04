import React, {useState, useCallback, useEffect, useContext} from "react";
import {View, Image, Text, ScrollView, StatusBar} from 'react-native'
import {LineChart, Spinner} from "../components";
import { useFocusEffect } from "@react-navigation/native";
const {EXPO_PUBLIC_API_URL} = process.env;    
import { NumericFormat } from 'react-number-format';
import { Contexto } from "../functions/Context";
import { Appbar} from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const ViewReport = ({navigation, route}) => {
  const contexto = useContext(Contexto)
  const [primerSemestre, setPrimerSemestre] = useState(['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'])
  const [dataPrimerSemestre, setDataPrimerSemestre] = useState([])

  const [segundoSemestre, setSegundoSemestre] = useState(['Julio', 'Agosto', 'Sep.', 'Oct.', 'Nov.', 'Dic.'])
  const [dataSegundoSemestre, setDataSegundoSemestre] = useState([])

  const [visitasTotales, setVisitasTotales] = useState(null)
  const [likes, setLikes] = useState(0);

  const [loaded, setLoaded] = useState(false)
  const [commerce, setCommerce] = useState([])
  const {commerce_id} = route.params

  const fetchData = async () => {
    await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/visits?commerce_id=${commerce_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': contexto?.token
        }
    })
    .then(res => res.json())
    .then((res) => {
        console.log(res)
        setVisitasTotales(res.visitasTotales)
        setLikes(res.likes)
        setDataSegundoSemestre(res.segundoSemestreData)
        setDataPrimerSemestre(res.primerSemestreData)
        setCommerce(res.commerce)
    })
    .catch(e => console.log(e));
  }

  useFocusEffect(useCallback(() => {
        setLoaded(false)

        fetchData()
    }, [commerce_id])
  )

  useEffect(() => {
    dataPrimerSemestre?.length > 0 && setLoaded(true)
  }, [dataPrimerSemestre])


  return (
        <View style={{flex:1, backgroundColor: '#fff'}}>
            <Appbar.Header  statusBarHeight={0}  style={{height: 50, elevation: 4,             // Elevación de la sombra (Android)
              shadowColor: '#000',      // Color de la sombra (iOS)
              shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (iOS)
              shadowOpacity: 0.2,       // Opacidad de la sombra (iOS)
              shadowRadius: 2, zIndex: 10, backgroundColor: '#fff'}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={
                    <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                        Reporte de Visitas
                    </Text>} 
                />
            </Appbar.Header>

            {
              loaded ? 
              <ScrollView contentContainerStyle={{paddingVertical: 10}}>
                  <View style={{flex:1, paddingHorizontal: 20}}>

                      <View style={{padding: 5, flexDirection: 'row', alignItems: 'center', paddingBottom: 15}}>
                          <View style={{marginRight: 15}}>
                              <Image source={{uri: EXPO_PUBLIC_API_URL + commerce?.logo}} style={{width: 80, height:80, borderRadius: 50, borderWidth:1, borderColor: '#e9e9e9', backgroundColor: '#e9e9e9'}}/>
                          </View>
                          <View>
                              <Text numberOfLines={2} style={{fontFamily: 'inter-medium', fontSize: 18, maxWidth: '90%', marginBottom: 5}}>{commerce?.name}</Text>

                              <View style={{borderWidth: .2, borderColor: '#e9e9e9', backgroundColor: '#e9e9e9', paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start', justifyContent: 'center', borderRadius: 3, flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                  <MaterialCommunityIcons name="chart-line" size={20} color="black" style={{marginRight: 5}}/>
                                  <Text style={{fontFamily: 'inter-medium', fontSize: 13, marginRight: 5}}>Visitas del Año:</Text>
                                  <NumericFormat value={visitasTotales} displayType={'text'} thousandSeparator={true} renderText={formattedValue => <Text style={{fontFamily: 'roboto', fontSize: 13}}>{formattedValue}</Text>} />
                              </View>

                              <View style={{borderWidth: .2, borderColor: '#e9e9e9', backgroundColor: '#e9e9e9', paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start', justifyContent: 'center', borderRadius: 3, flexDirection: 'row', alignItems: 'center'}}>
                                  <MaterialCommunityIcons name="cards-heart-outline" size={20} color="black" style={{marginRight: 5}}/>
                                  <Text style={{fontFamily: 'inter-medium', fontSize: 13, marginRight: 5}}>Favoritos:</Text>
                                  <NumericFormat value={likes} displayType={'text'} thousandSeparator={true} renderText={formattedValue => <Text style={{fontFamily: 'roboto', fontSize: 13}}>{formattedValue}</Text>} />
                              </View>
                          </View>
                      </View>

                      {/*Primer Semestre*/}
                      <LineChart 
                        backgroundGradientFrom="#f7f3f9"
                        backgroundGradientTo="#f7f3f9"
                        labels={primerSemestre} 
                        data={dataPrimerSemestre} 
                        title='Primer Semestre'
                      />

                      {/*Segundo Semestre*/}
                      <LineChart 
                        backgroundGradientFrom="#f7f3f9"
                        backgroundGradientTo="#f7f3f9"
                        labels={segundoSemestre} 
                        data={dataSegundoSemestre} 
                        title='Segundo Semestre'
                      />
                  </View>
              </ScrollView> 
              : <Spinner />
            }
        </View>
    )
}

export default ViewReport