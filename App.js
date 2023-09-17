import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AlcometerApp = () => {
  const [numberOfDrinks, setNumberOfDrinks] = useState('');
  const [alcoholType, setAlcoholType] = useState('beer'); // Default to beer
  const [timeElapsed, setTimeElapsed] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male'); // Default to male
  const [bacResult, setBacResult] = useState(null);

  const alcoholTypes = {
    beer: 170, // Typical alcohol content (in mL) for a 355 mL can of beer
    wine: 75,  // Typical alcohol content (in mL) for a 150 mL glass of wine
    spirits: 45, // Typical alcohol content (in mL) for a 45 mL shot of spirits
  };

  const calculateBAC = () => {
    // Perform your BAC calculation here based on user input.
    // This calculation is simplified and not accurate.
    // You should use an appropriate formula for accurate BAC calculation.
    const r = gender === 'male' ? 0.68 : 0.55; // Widmark formula constant
    const alcoholConsumed = numberOfDrinks * alcoholTypes[alcoholType]; // Calculate alcohol consumption

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
      <View style={styles.alcoholTypeButtons}>
        <Button
          title="Beer"
          onPress={() => setAlcoholType('beer')}
          color={alcoholType === 'beer' ? 'blue' : 'gray'}
        />
        <Button
          title="Wine"
          onPress={() => setAlcoholType('wine')}
          color={alcoholType === 'wine' ? 'purple' : 'gray'}
        />
        <Button
          title="Spirits"
          onPress={() => setAlcoholType('spirits')}
          color={alcoholType === 'spirits' ? 'brown' : 'gray'}
        />
      </View>

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
      <View style={styles.genderButtons}>
        <Button
          title="Male"
          onPress={() => setGender('male')}
          color={gender === 'male' ? 'blue' : 'gray'}
        />
        <Button
          title="Female"
          onPress={() => setGender('female')}
          color={gender === 'female' ? 'pink' : 'gray'}
        />
      </View>

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
  alcoholTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default AlcometerApp;