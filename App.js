import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

const AlcometerApp = () => {
  const [numberOfDrinks, setNumberOfDrinks] = useState('');
  const [alcoholType, setAlcoholType] = useState('');
  const [timeElapsed, setTimeElapsed] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male'); // Default to male
  const [bacResult, setBacResult] = useState(null);

  const calculateBAC = () => {
    // Perform your BAC calculation here based on user input.
    // This calculation is simplified and not accurate.
    // You should use an appropriate formula for accurate BAC calculation.
    const r = gender === 'male' ? 0.68 : 0.55; // Widmark formula constant
    const alcoholConsumed = numberOfDrinks * 14; // Standard drink has 14 grams of pure alcohol

    const bac = (alcoholConsumed / (weight * 1000 * r) - 0.015 * timeElapsed).toFixed(2);
    setBacResult(bac);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Number of Drinks:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={numberOfDrinks}
        onChangeText={(text) => setNumberOfDrinks(text)}
      />

      <Text style={styles.label}>Type of Alcohol:</Text>
      <TextInput
        style={styles.input}
        value={alcoholType}
        onChangeText={(text) => setAlcoholType(text)}
      />

      <Text style={styles.label}>Time Elapsed (hours):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={timeElapsed}
        onChangeText={(text) => setTimeElapsed(text)}
      />

      <Text style={styles.label}>Weight (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={(text) => setWeight(text)}
      />

      <Text style={styles.label}>Gender:</Text>
      <Picker
        style={styles.input}
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>

      <Button title="Calculate BAC" onPress={calculateBAC} />

      {bacResult && <Text>Your Estimated BAC: {bacResult}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AlcometerApp;