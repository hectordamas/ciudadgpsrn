import {React} from 'react'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native'
import { colores, icons, images } from '../constants'
import { NumericFormat } from 'react-number-format'

const Pricing = ({setPricing, commerceName}) => {

    const planes = [
        {name: "Plan Anual", price: 50, color: '#ffa500'},
        {name: "Plan Semestral", price: 40, color: '#4caf50'},
        {name: "Plan Trimestral", price: 30, color: '#2196f3'}
    ]

    const submit = async (item) => {
        await Linking.openURL(`https://api.whatsapp.com/send?phone=584129749348&text=¡Hola! Estoy interesado/a en el ${item.name} de CiudadGPS para mi local asociado: ${commerceName}.`)
    }

    return (
        <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: '#fff'}}>
            <TouchableOpacity style={{marginTop: 5}} onPress={setPricing}>
                <Image source={icons.close} style={{width: 20, height: 20}}/>
            </TouchableOpacity>
            <View style={{flex:1, justifyContent: 'center'}}>
                <Image source={images.pricing} style={{width: '100%', maxHeight: 230, height: '30%'}} resizeMode='contain'/>
                <Text style={{fontFamily: 'inter-medium', fontSize: 18, marginBottom: 5}}>Elige tu plan para continuar</Text>
                <Text style={{fontFamily: 'inter', fontSize: 14, marginBottom: 10}}>Aquí puedes seleccionar el plan que mejor se adapte a lo que necesitas.</Text>
                {
                    planes.map((item, key) => {
                        return (
                            <TouchableOpacity style={{backgroundColor: item.color, padding: 15, marginBottom: 15, borderRadius: 5, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}} 
                                key={key}
                                onPress={() => submit(item)}
                                >
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{marginRight: 5}}>
                                        <Image source={icons.tag} style={{tintColor: '#fff', width: 20, height: 20}}/>
                                    </View>
                                    <View>
                                        <Text style={{color: colores.white, fontFamily: 'roboto', fontSize: 16}}>{item.name}</Text>
                                    </View>
                                </View>
                                <View>
                                    <NumericFormat 
                                        value={item.price} 
                                        displayType={'text'} 
                                        thousandSeparator={true} prefix={'$ '} 
                                        renderText={formattedValue => <Text style={{fontFamily: 'roboto-medium', color: '#fff'}}>{formattedValue}</Text>} 
                                    /> 
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }

                <TouchableOpacity 
                    onPress={setPricing}
                    style={{backgroundColor: colores.black, padding: 15, marginBottom: 15, borderRadius: 5, flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{marginRight: 5}}>
                            <Image source={icons.back} style={{tintColor: '#fff', width: 20, height: 20}}/>
                        </View>
                        <View>
                            <Text style={{color: colores.white, fontFamily: 'roboto', fontSize: 16}}>Volver</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Pricing