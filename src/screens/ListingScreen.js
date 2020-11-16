import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import * as addressAction from '../redux/actions/addressAction';

const formSchema = yup.object({
  address: yup.string().required().min(3),
});

const ListingScreen = (navData) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <ScrollView>
      <Formik
        initialValues={{
          address: '',
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          setIsLoading(true);
          dispatch(addressAction.fetchAddress(values))
            .then((results) => {
              setIsLoading(false);
              setAddresses(results.Items);
              console.log('results', results);
            })
            .catch((err) => {
              setIsLoading(false);
              console.log(err);
            });
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter Address</Text>
              <TextInput
                style={styles.input}
                onChangeText={props.handleChange('address')}
                onBlur={props.handleBlur('address')}
                value={props.values.address}
              />
              <Text style={styles.error}>
                {props.touched.address && props.errors.address}
              </Text>

              <View style={styles.buttonContainer}>
                <Button title='Search' onPress={props.handleSubmit} />
              </View>
            </View>
            <View>
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <View>
                    <View style={styles.card}>
                      <Text style={styles.text}>{address.Id}</Text>
                      <Text style={styles.text}>{address.Text}</Text>
                      <Text style={styles.text}>{address.Highligh}</Text>
                      <Text style={styles.text}>{address.Description}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text>No Address</Text>
              )}
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  form: {
    margin: 20,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
  },
  formGroup: {
    width: '100%',
  },
  label: {
    marginVertical: 10,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
  error: {
    color: 'red',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    elevation: 5,
    height: 200,
    margin: 10,
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: 'gray',
    margin: 5,
  },
});

export default ListingScreen;
