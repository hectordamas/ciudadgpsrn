import React, {useState, useEffect, memo} from "react";
import { View, ScrollView, Platform, TextInput, TouchableOpacity} from "react-native";
import { Checkbox, Text, Button, Icon} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';
import { colores } from "../../constants";
import moment from 'moment/moment';
import 'moment/locale/es';

const Day = ({ item, commerceId, token }) => {

    console.log('Day re-render ' , {
        item, commerceId, token
    })

    const { EXPO_PUBLIC_API_URL } = process.env;
    const [selected, setSelected] = useState(item.isSelected);

    const [hourOpenVisible, setHourOpenVisible] = useState(false);
    const [hourOpen, setHourOpen] = useState(item.hour_open);
    const [minuteOpen, setMinuteOpen] = useState(item.minute_open);

    const [hourCloseVisible, setHourCloseVisible] = useState(false);
    const [hourClose, setHourClose] = useState(item.hour_close);
    const [minuteClose, setMinuteClose] = useState(item.minute_close);

    useEffect(() => {
        const setSelection = async () => {
            try {
                const res = await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/setHour`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'X-Requested-With': 'XMLHttpRequest',
                        'Authorization': token
                    },
                    body: JSON.stringify({ hourOpen, minuteOpen, hourClose, minuteClose, selected, commerceId, id: item.id })
                });
                const result = await res.json();
                console.log(result);
            } catch (err) {
                console.log(err);
            }
        };
        setSelection();
    }, [selected, hourOpen, minuteOpen, hourClose, minuteClose]);

    const setOpenValues = (event, time) => {
        Platform.OS == 'android' && setHourOpenVisible(!hourOpenVisible);
        if (event.type === 'set') {
            setHourOpen(moment(time).hour());
            setMinuteOpen(moment(time).minutes());
        }
    };

    const setCloseValues = (event, time) => {
        Platform.OS == 'android' && setHourCloseVisible(!hourCloseVisible);
        if (event.type === 'set') {
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
                contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 20 }}
            >
                <View style={{ marginRight: 10 }}>
                    <Button
                        onPress={() => setHourOpenVisible(!hourOpenVisible)}
                        mode="elevated"
                        labelStyle={{ fontFamily: 'inter-bold', fontSize: 12, color: colores.darkButton }}
                        style={{ borderRadius: 5 }}
                        icon={'clock-outline'}
                    >
                        Hora de Apertura
                    </Button>
                    {hourOpenVisible && (
                        <DateTimePicker
                            value={hourOpen !== null && minuteOpen !== null ? new Date(0, 0, 0, hourOpen, minuteOpen) : new Date()}
                            mode='time'
                            onChange={setOpenValues}
                        />
                    )}
                    <Text>{hourOpen !== null && minuteOpen !== null && moment({ hour: hourOpen, minute: minuteOpen }).format('hh:mm a')}</Text>
                </View>
                <View>
                    <Button
                        onPress={() => setHourCloseVisible(!hourCloseVisible)}
                        mode="elevated"
                        labelStyle={{ fontFamily: 'inter-bold', fontSize: 12, color: colores.darkButton }}
                        style={{ borderRadius: 5 }}
                        icon={'clock-outline'}
                    >
                        Hora de Cierre
                    </Button>
                    {hourCloseVisible && (
                        <DateTimePicker
                            value={hourClose !== null && minuteClose !== null ? new Date(0, 0, 0, hourClose, minuteClose) : new Date()}
                            mode='time'
                            onChange={setCloseValues}
                        />
                    )}
                    <Text>{hourClose !== null && minuteClose !== null && moment({ hour: hourClose, minute: minuteClose }).format('hh:mm a')}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default memo(Day);
