import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { PaymentView } from '../components/PaymentView';
import axios from 'axios';
import WelcomePage from './WelcomePage';

const SERVER_URL = 'https://kovatex-cli.herokuapp.com';

const PaymentScreen = props => {
  const [response, setResponse] = useState();

  const [makePayment, setMakePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const cartInfo = {
    id: '5eruyt35eggr76476236523t3',
    amount: 100,
  };

  const onCheckStatus = async (paymentResponse) => {
    setPaymentStatus('Loading...');
    setResponse(paymentResponse);

    let jsonResponse = JSON.parse(paymentResponse);
    // perform operation to check payment status

    try {
      const stripeResponse = await axios.post(`${SERVER_URL}/payment`, {
        email: 'codergogoi@gmail.com',
        product: cartInfo,
        authToken: jsonResponse,
      });

      if (stripeResponse) {
        const { paid } = stripeResponse.data;
        if (paid === true) {
          props.navigation.navigate('Listing')
        } else {
          setPaymentStatus('Payment failed due to some issue');
        }
      } else {
        setPaymentStatus(' Payment failed due to some issue');
      }
    } catch (error) {
      console.log(error);
      setPaymentStatus(' Payment failed due to some issue');
    }
  };

  const paymentUI = () => {
    if (!makePayment) {
      return (
        <WelcomePage setMakePayment={setMakePayment} cartInfo={cartInfo} />
      );
    } else {
      if (response !== undefined) {
        return (
          <View style={styles.paymentStatus}>
            <Text style={styles.textOne}> {paymentStatus} </Text>
          </View>
        );
      } else {
        return (
          <PaymentView
            onCheckStatus={onCheckStatus}
            product={cartInfo.description}
            amount={cartInfo.amount}
          />
        );
      }
    }
  };

  return <View style={styles.container}>{paymentUI()}</View>;
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  navigation: { flex: 2, backgroundColor: 'red' },
  body: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  footer: { flex: 1, backgroundColor: 'cyan' },
  paymentStatus: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    marginTop: 50,
  },
  textOne: { fontSize: 25, margin: 10 },
  textTwo: { fontSize: 16, margin: 10 },
});

export { PaymentScreen };
