import React, {useState, useEffect, memo} from "react";
import { View, ScrollView, Platform} from "react-native";
import { Checkbox, Text, Button} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';
import { colores } from "../../constants";
import moment from 'moment/moment';
import 'moment/locale/es';

const Day = ({item, navigation, commerceId, token}) => {
    const {EXPO_PUBLIC_API_URL} = process.env
    const [selected, setSelected] = useState(false)

    const [hourOpenVisible, setHourOpenVisible] = useState(false)
    const [hourOpen, setHourOpen] = useState(null);
    const [minuteOpen, setMinuteOpen] = useState(null);

    const [hourCloseVisible, setHourCloseVisible] = useState(false)
    const [hourClose, setHourClose] = useState(null);
    const [minuteClose, setMinuteClose] = useState(null);

    const setSelection = async () => {
        await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/setHour`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': token
            },
            body: JSON.stringify({hourOpen, minuteOpen, hourClose, minuteClose, selected, commerceId, id: item.id})
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        setSelection();
    }, [selected, hourOpen, minuteOpen, hourClose, minuteClose]);

    useEffect(() => {
        setHourOpen(item.hour_open)
        setMinuteOpen(item.minute_open)
        setHourClose(item.hour_close)
        setMinuteClose(item.minute_close)
        setSelected(item.isSelected)
    }, [item])
    

    const setOpenValues = (event, time) => {
      Platform.OS == 'android' && setHourOpenVisible(!hourOpenVisible);
      if (event.type == 'set') {
        setHourOpen(moment(time).hour());
        setMinuteOpen(moment(time).minutes());
      }
    };
    
    const setCloseValues = (event, time) => {
        Platform.OS == 'android' && setHourCloseVisible(!hourCloseVisible);
      if (event.type == 'set') {
        setHourClose(moment(time).hour());
        setMinuteClose(moment(time).minutes());
      }
    };

    return (
        <View>
            <Checkbox.Item
                label={item.name}
                onPress={() => setSelected(!selected)}
                status={selected ? 'checked' : 'unchecked'}
            />
            <ScrollView
                showsHorizontalScrollIndicator={false} 
                horizontal 
                contentContainerStyle={{paddingBottom: 10, paddingHorizontal: 20}}>
                <View style={{marginRight: 10}}>
                    <Button 
                        onPress={() => setHourOpenVisible(!hourOpenVisible)}
                        mode="elevated" 
                        labelStyle={{fontFamily: 'inter-bold', fontSize: 12, color: colores.darkButton}}
                        style={{borderRadius: 5}}
                        icon={'clock-outline'}>Hora de Apertura</Button>
                    {hourOpenVisible && <DateTimePicker value={new Date()} mode='time' onChange={setOpenValues} />}
                    <Text>{hourOpen !== null && minuteOpen !== null && moment({hour: hourOpen, minute: minuteOpen}).format('hh:mm a')}</Text>
                </View>
                <View>
                    <Button 
                        onPress={() => setHourCloseVisible(!hourCloseVisible)}
                        mode="elevated" 
                        labelStyle={{fontFamily: 'inter-bold', fontSize: 12, color: colores.darkButton}}
                        style={{borderRadius: 5}}
                        icon={'clock-outline'}>Hora de Cierre</Button>
                    {hourCloseVisible && <DateTimePicker value={new Date()} mode='time' onChange={setCloseValues} />}
                    <Text>{hourClose !== null && minuteClose !== null && moment({hour: hourClose, minute: minuteClose}).format('hh:mm a')}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default memo(Day)