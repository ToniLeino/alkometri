import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const PromillesCalculatorApp = () => {
  const [numberOfDrinks, setNumberOfDrinks] = useState('');
  const [timeElapsed, setTimeElapsed] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [alcoholConcentration, setAlcoholConcentration] = useState(null);

   // Define colors for each gender
   const genderColors = {
    male: '#3498db',  // Blue for male
    female: '#e74c3c',  // Red for female
  };

  const calculateAlcoholConcentration = () => {
    if (numberOfDrinks && timeElapsed && weight) {
      const alcoholConsumed = numberOfDrinks * 14; // Assuming a standard drink is 14 grams of alcohol
      let genderFactor = 0.55; // Default value for male

      if (gender === 'female') {
        genderFactor = 0.68; // Adjust for female gender
      }

      const bacWithoutTime = (alcoholConsumed / (weight * 1000)) * 100; // BAC value without considering time
      const bac = bacWithoutTime - (0.015 * timeElapsed); // Adjust for time elapsed

      // Ensure the alcohol concentration doesn't go below 0
      const promilles = Math.max(bac * genderFactor, 0).toFixed(2);

      setAlcoholConcentration(promilles);
    } else {
      setAlcoholConcentration(null);
    }
  };
    // Function to get text color based on the alcohol concentration
    const getTextColor = (promilles) => {
      const promillesValue = parseFloat(promilles);
      if (promillesValue <= 0.05) {
        return 'green';  // Low alcohol concentration (safe)
      } else if (promillesValue <= 0.1) {
        return 'yellow';  // Moderate alcohol concentration (caution)
      } else {
        return 'red';  // High alcohol concentration (danger)
      }
    };

 return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: genderColors[gender] }}
    >
      <Text style={styles.label}>Number of Drinks:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={numberOfDrinks}
        onChangeText={(text) => setNumberOfDrinks(text)}
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
      <View style={styles.genderButtons}>
        <Button
          title="Male"
          onPress={() => setGender('male')}
          color={gender === 'male' ? 'white' : 'gray'}
        />
        <Button
          title="Female"
          onPress={() => setGender('female')}
          color={gender === 'female' ? 'white' : 'gray'}
        />
      </View>

      <Button title="Calculate" onPress={calculateAlcoholConcentration} />

      {alcoholConcentration !== null && (
        <Text style={[styles.result, { color: getTextColor(alcoholConcentration) }]}>
          Your Estimated Alcohol Concentration: {alcoholConcentration} promilles
        </Text>
      )}
    </ScrollView>
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
    marginBottom: 5,
    color: 'white', // Text color is white
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  result: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PromillesCalculatorApp;