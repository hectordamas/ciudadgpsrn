import React, { useState, useEffect, useRef, memo } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { Checkbox, Text, Button } from 'react-native-paper';
import { colores } from "../../constants";
import 'moment/locale/es';

const Day = ({ item, commerceId, token }) => {
    const { EXPO_PUBLIC_API_URL } = process.env;

    const handleInputChange = (setter, nextRef) => (text) => {
        setter(text.replace(/[^0-9]/g, '')); // Remove non-numeric characters
        if (text.length === 2 && nextRef) {
            nextRef.current.focus();
        }
    };

    const convertTo12Hour = (hour) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || null;
        return { hour12: hour12?.toString().padStart(2, '0'), period };
    };

    const convertTo24Hour = (hour12, period) => {
        let hour24 = parseInt(hour12, 10);
        if (period === 'PM' && hour24 < 12) {
            hour24 += 12;
        } else if (period === 'AM' && hour24 === 12) {
            hour24 = 0;
        }
        return hour24;
    };

    const [selected, setSelected] = useState(item.isSelected);

    const initialOpenTime = convertTo12Hour(item.hour_open);
    const initialCloseTime = convertTo12Hour(item.hour_close);

    const [hourOpen, setHourOpen] = useState(initialOpenTime.hour12 || '');
    const [minuteOpen, setMinuteOpen] = useState(item.minute_open !== null ? item.minute_open.toString().padStart(2, '0') : '');
    const [amPmOpen, setAmPmOpen] = useState(initialOpenTime.period || 'AM');

    const [hourClose, setHourClose] = useState(initialCloseTime.hour12 || '');
    const [minuteClose, setMinuteClose] = useState(item.minute_close !== null ? item.minute_close.toString().padStart(2, '0') : '');
    const [amPmClose, setAmPmClose] = useState(initialCloseTime.period || 'AM');

    // Refs for text inputs
    const minuteOpenRef = useRef(null);
    const minuteCloseRef = useRef(null);

    useEffect(() => {
        const setSelection = async () => {
            try {
                const hourOpen24 = convertTo24Hour(hourOpen, amPmOpen);
                const hourClose24 = convertTo24Hour(hourClose, amPmClose);

                const res = await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/setHour`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'X-Requested-With': 'XMLHttpRequest',
                        'Authorization': token
                    },
                    body: JSON.stringify({
                        hourOpen: hourOpen24,
                        minuteOpen,
                        hourClose: hourClose24,
                        minuteClose,
                        selected,
                        commerceId,
                        id: item.id
                    })
                });
                const result = await res.json();
                console.log(result);
            } catch (err) {
                console.log(err);
            }
        };
        setSelection();
    }, [selected, hourOpen, minuteOpen, hourClose, minuteClose, amPmOpen, amPmClose]);

    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, paddingHorizontal: 20, flex: 1}}>
                <Text style={{fontFamily: 'inter-bold'}}>{item.name}</Text>
                <Checkbox.Android
                    onPress={() => setSelected(!selected)}
                    status={selected ? 'checked' : 'unchecked'}
                />
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 20 }}
            >
                <View style={{ marginRight: 20 }}>
                    <Text style={{ marginBottom: 5, fontFamily: 'inter-medium'}}>Hora de Apertura</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TextInput
                            keyboardType="numeric"
                            style={{ backgroundColor: '#e9e9e9', width: 40, textAlign: 'center' }}
                            value={hourOpen}
                            onChangeText={handleInputChange(setHourOpen, minuteOpenRef)}
                            placeholder="HH"
                            maxLength={2}
                            returnKeyType="next"
                            onSubmitEditing={() => minuteOpenRef.current.focus()}
                        />
                        <Text>:</Text>
                        <TextInput
                            ref={minuteOpenRef}
                            keyboardType="numeric"
                            style={{ backgroundColor: '#e9e9e9', width: 40, textAlign: 'center' }}
                            value={minuteOpen}
                            onChangeText={handleInputChange(setMinuteOpen)}
                            placeholder="MM"
                            maxLength={2}
                        />
                        <Button
                            mode="elevated"
                            style={{ marginLeft: 10 }}
                            labelStyle={{ fontSize: 12, color: colores.darkButton }}
                            onPress={() => setAmPmOpen(amPmOpen === 'AM' ? 'PM' : 'AM')}
                        >
                            {amPmOpen}
                        </Button>
                    </View>
                </View>

                <View>
                    <Text style={{ marginBottom: 5, fontFamily: 'inter-medium'}}>Hora de Cierre</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TextInput
                            keyboardType="numeric"
                            style={{ backgroundColor: '#e9e9e9', width: 40, textAlign: 'center' }}
                            value={hourClose}
                            onChangeText={handleInputChange(setHourClose, minuteCloseRef)}
                            placeholder="HH"
                            maxLength={2}
                            returnKeyType="next"
                            onSubmitEditing={() => minuteCloseRef.current.focus()}
                        />
                        <Text>:</Text>
                        <TextInput
                            ref={minuteCloseRef}
                            keyboardType="numeric"
                            style={{ backgroundColor: '#e9e9e9', width: 40, textAlign: 'center' }}
                            value={minuteClose}
                            onChangeText={handleInputChange(setMinuteClose)}
                            placeholder="MM"
                            maxLength={2}
                        />
                        <Button
                            mode="elevated"
                            style={{ marginLeft: 10 }}
                            labelStyle={{ fontSize: 12, color: colores.darkButton }}
                            onPress={() => setAmPmClose(amPmClose === 'AM' ? 'PM' : 'AM')}
                        >
                            {amPmClose}
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default memo(Day);
