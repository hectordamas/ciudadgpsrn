import React, { useState, useCallback, useRef } from 'react';
import { FlatList, View, TouchableOpacity, Image, Text, Dimensions, ActivityIndicator, StatusBar } from 'react-native';
import { icons, colores, images } from '../constants';
import Moment from 'moment';
import 'moment/locale/es';
import { Spinner } from '../components';
import { useFocusEffect } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

const {EXPO_PUBLIC_API_URL} = process.env;    
const { width } = Dimensions.get('screen');

const Jobs = ({ navigation, route }) => {
    const [jobs, setJobs] = useState([]);
    const pageRef = useRef(1);
    const [loaded, setLoaded] = useState(false);
    const [count, setCount] = useState(0);
    const search = route.params?.search;

    const fetchData = async () => {
      let url = search
        ? `${EXPO_PUBLIC_API_URL}/api/auth/jobs?page=${pageRef.current}&search=${search}`
        : `${EXPO_PUBLIC_API_URL}/api/auth/jobs?page=${pageRef.current}`;
      await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.jobs && setJobs((prevJobs) => [...prevJobs, ...res.jobs.data]);
          res.jobs && setCount(res.jobs.total);
          pageRef.current += 1;
          setLoaded(true);
          console.log(res);
        })
        .catch((err) => console.log(err));
    };

    useFocusEffect(
      useCallback(() => {
        setLoaded(false);
        setJobs([]);
        pageRef.current = 1;
        fetchData();
      }, [search])
    );

    return (
        <>
        {loaded ? 
        <View style={{flex:1, backgroundColor: '#fff'}}>
            <View style={{width: '100%',
                backgroundColor: '#fff',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.00,
                elevation: 1,
                zIndex: 10
            }}>
                <Appbar.Header  statusBarHeight={0}  style={{height: 50, backgroundColor: '#fff'}}>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title={
                        <Text style={{fontFamily:'inter-medium', textTransform:'capitalize', fontSize:14}}>
                            Bolsa de Empleos
                        </Text>} 
                    />
                </Appbar.Header>
                <View style={{paddingBottom:10, paddingHorizontal:20, borderBottomWidth: .3, borderBottomColor: '#e9e9e9'}}>
                    <View style={{flexDirection:'row', borderRadius:5, borderColor:'#757575', borderWidth:.2}}>
                        <TouchableOpacity onPress={() => navigation.navigate('SearchJobs') } style={{width:'85%', paddingLeft:15, paddingVertical: 12}}>
                            <Text style={{color: '#757575', fontSize:13}} numberOfLines={1}>Buscar Por Cargo o Palabra Clave</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SearchJobs') } style={{flexDirection:'row', width:'15%', borderWidth:1, borderColor:'red', justifyContent:'center', alignItems: 'center', backgroundColor:'red', borderBottomEndRadius:5, borderTopEndRadius:5}}>
                            <Image
                                style={{width:15, height:15, tintColor:colores.btnText}}
                                source={icons.search_button}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {
                jobs.length > 0 ? 
                    <FlatList 
                        data={jobs}
                        renderItem={({item, index}) => {
                            let logo = EXPO_PUBLIC_API_URL + item?.commerce?.logo
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('Job', {job_id: item.id} )} style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 7, borderBottomWidth: .3, borderBottomColor: '#e9e9e9', width: width}} key={index}>
                                    <View style={{elevation: 5, 
                                        shadowColor: "#000",
                                        shadowOffset: {
                                        	width: 0,
                                        	height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        width: 65, height: 65,
                                        borderRadius: 100
                                        }}
                                        >
                                        <Image source={{uri: logo}} style={{width: 65, height: 65, borderRadius: 100, backgroundColor: '#e9e9e9'}} resizeMode='contain'/>
                                    </View>
                                    <View style={{justifyContent: 'center', width:  width * 0.3, flexWrap: 'wrap', marginLeft: 10}}>
                                        <Text numberOfLines={2} style={{fontFamily: 'inter-medium', width:  width * 0.67, textTransform: 'capitalize'}}>{item.title}</Text>
                                        <Text numberOfLines={1} style={{fontSize: 12, fontFamily: 'inter', width:  width * 0.67, textTransform: 'capitalize', marginVertical: 3}}>{item?.commerce?.name}</Text>
                                        <Text style={{fontFamily: 'inter', fontSize: 11}}>{Moment(item.created_at).fromNow()}</Text>
                                    </View>
                                </TouchableOpacity> 
                            )
                        }}
                        onEndReached={fetchData}
                        ListFooterComponent={() => 
                            <View style={{justifyContent: 'center',alignItems: 'center', paddingVertical: 20}}>
                                {
                                    count !== jobs.length ?                                 
                                    <ActivityIndicator size={20} color={colores.primary} /> : <Text style={{fontFamily:'inter', fontSize: 11}}>Has llegado al final de la búsqueda</Text>
                                }
                            </View>
                        }
                    />
                : 
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={images.cv} style={{height: 150, marginBottom: 50}} resizeMode='contain'/>
                    <Text style={{textTransform: 'capitalize'}}>Aún no hay empleos publicados</Text>
                </View>
            }
        </View> : <Spinner />}
        </>
    )    
}

export default React.memo(Jobs)