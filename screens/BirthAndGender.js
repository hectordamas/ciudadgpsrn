import React, { useState } from "react";
import { View, StyleSheet, Modal, ActivityIndicator, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import moment from 'moment';
import { useEffect } from "react";
import { colores } from "../constants";

const BirthAndGender = ({user, setUserChanges}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [gender, setGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {EXPO_PUBLIC_API_URL} = process.env

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    const currentDate = selectedDate || selectedDate;
    setSelectedDate(currentDate);
  };

  const handleSubmission = async () => {
    // Verificar que ambos campos estén completos antes de enviar
    if (!selectedDate || !gender) {
      Alert.alert("Campos obligatorios", "Por favor, completa todos los campos antes de enviar la información.");
      return;
    }

    // Validar que la fecha no sea la misma que la fecha actual ni en el futuro
    const currentDate = moment();
    const selectedDateMoment = moment(selectedDate);

    if (!selectedDate || selectedDateMoment.isSameOrAfter(currentDate, "day")) {
      Alert.alert("Fecha inválida", "Por favor, selecciona una fecha válida en el pasado.");
      return;
    }

    // Validar que la persona no sea un recién nacido o alguien extremadamente joven
    const minValidDate = moment().subtract(100, "years"); // Establecer un rango razonable de 100 años

    if (selectedDateMoment.isSameOrBefore(minValidDate, "day")) {
      Alert.alert("Fecha inválida", "Por favor, selecciona una fecha válida para una persona más joven.");
      return;
    }

    // Validar que la persona tenga al menos 10 años
    const minAge = moment().subtract(10, "years");
    if (selectedDateMoment.isAfter(minAge, "day")) {
      Alert.alert("Edad mínima no cumplida", "Debes tener al menos 10 años para registrarte.");
      return;
    }

    setIsLoading(true);

    await fetch(`${EXPO_PUBLIC_API_URL}/api/users/setGenderAndBirthday`, {
      method: 'POST',
      headers: {
        "Content-Type" : 'application/json',
        'X-Requested-With' : 'XMLHttpRequest',
      },
      body: JSON.stringify({userId: user.id, gender, selectedDate})
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if(res.user){
        Alert.alert('','Tus datos han sido guardados con éxito!');
        setUserChanges(res.user)
      }

      if(res.error){
        Alert.alert('Error', res.error);
      }

      if(res.errors){
        Alert.alert('Error', Object.values(res.errors)[0][0]);
      }
    })
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false))
  };

  useEffect(() => {
    console.log(user)
  }, [])

  return (
    <View style={styles.container}>
      <Modal transparent visible={isLoading} onRequestClose={() => {}}>
        <View style={styles.modalContainer}>
          <ActivityIndicator color="#fff" size={65} />
          <Text style={styles.modalText} variant="titleMedium">Procesando Información</Text>
        </View>
      </Modal>

      <Text variant="titleLarge" style={styles.title}>Completa tu Registro:</Text>
      <Text style={styles.text}>Bienvenido/a a CiudadGPS. Personaliza tu experiencia compartiendo tu género y fecha de nacimiento. ¡Queremos adaptarnos a ti! 😊</Text>

      <Text variant="titleMedium" style={styles.subtitle}>Fecha de Nacimiento:</Text>
      <Button
        style={{ borderRadius: 5, marginBottom: 5 }}
        mode="contained-tonal"
        icon={'calendar-account-outline'}
        onPress={() => setShowDatePicker(true)}
      >
        Seleccionar Fecha
      </Button>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          style={styles.datePicker}
          maximumDate={new Date()}
        />
      )}
      {/* Aquí mostrar la fecha seleccionada */}
      {selectedDate && (
        <Text style={styles.selectedDateText}>
          Fecha seleccionada: {selectedDate.toLocaleDateString()}
        </Text>
      )}

      <Text variant="titleMedium" style={styles.subtitle}>Género:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona tu género" value="" />
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Femenino" value="Femenino" />
        <Picker.Item label="Otro" value="Otro" />
      </Picker>

      <Button
        style={{ borderRadius: 5, marginTop: 10, backgroundColor: colores.darkButton}}
        mode="contained"
        onPress={handleSubmission}
        icon={'send'}
      >Completar Registro</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 10,
    fontFamily: 'inter-medium'
  },
  text: {
    marginBottom: 10,
    fontFamily: 'inter'
  },
  subtitle: {
    marginBottom: 10,
    marginTop: 20,
    fontFamily: 'inter-medium'
  },
  datePicker: {
    marginBottom: 20,
  },
  picker: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalText: {
    marginTop: 15,
    color: '#fff',
    fontFamily: 'inter-medium',
  },
  selectedDateText: {
    marginTop: 2,
    fontFamily: 'roboto',
  },
});

export default React.memo(BirthAndGender);