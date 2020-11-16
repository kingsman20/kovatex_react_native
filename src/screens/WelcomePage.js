import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomePage = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textOne}> Address Verifier </Text>
      <Text style={styles.textTwo}> You have to pay to access the API</Text>
      <Text style={styles.textThree}>
        {' '}
        Payable Amount: ${props.cartInfo.amount}{' '}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.setMakePayment(true);
        }}
      >
        <Text style={styles.textFour}>Proceed To Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    marginTop: 50,
  },

  textOne: { fontSize: 25, margin: 10 },
  textTwo: { fontSize: 16, margin: 10 },
  textThree: { fontSize: 16, margin: 10 },
  textFour: { color: '#FFF', fontSize: 20 },
  button: {
    height: 60,
    width: 300,
    backgroundColor: '#FF5733',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomePage;
