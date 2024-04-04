import React from 'react'
import { View, Modal, TouchableOpacity } from 'react-native'
import { Card, Text, IconButton} from 'react-native-paper'
import moment from 'moment';
import 'moment/locale/es';
import { colores } from '../constants';

const Horario = ({visible, setVisible, days}) => {
    return (
        <Modal visible={visible} transparent>
            <TouchableOpacity 
                onPressOut={setVisible} 
                style={{
                    flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)', 
                    paddingHorizontal: 10
                }}>
                <Card style={{width: '100%', borderRadius: 5, backgroundColor: '#fff'}}>
                    <Card.Title 
                        title={<Text variant='titleMedium' style={{fontFamily: 'inter-medium'}}>Horarios de Atención</Text>} 
                        right={() => <IconButton icon="close" onPress={setVisible} />}
                    />
                    <Card.Content>
                        {
                            days?.map((item) => {
                                return (
                                    <View style={{
                                        paddingVertical: 7, 
                                        flexDirection: 'row', 
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }} key={item.id}>
                                        <View>
                                            <Text style={{fontFamily: 'inter-medium'}}>{item.name}</Text>
                                        </View>

                                        <View>
                                            {
                                                item.isSelected && item.hour_open !== null && item.minute_open !== null && item.hour_close !== null && item.minute_close !== null ?
                                                <Text style={{color: colores.successButton, fontFamily: 'inter-medium'}}>{
                                                    moment({hour: item.hour_open, minute: item.minute_open}).format('hh:mm a') 
                                                    + ' - ' + 
                                                    moment({hour: item.hour_close, minute: item.minute_close}).format('hh:mm a')
                                                }</Text> : 
                                                <Text style={{color: colores.dangerButton, fontFamily: 'inter-medium'}}>Cerrado</Text>
                                            }
                                        </View>

                                    </View>
                                )
                            })
                        }
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        </Modal>
    )
}

export default Horario
