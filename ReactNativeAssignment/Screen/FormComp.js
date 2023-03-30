import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const FormComp = () => {
  return (
    <View style={[Styles.formConatinerWrapper]}>
      <Text style={Styles.label}>Name</Text>
      <TextInput
        placeholder="enter Name"
        placeholderTextColor="#ababab"
        style={Styles.inputBox}
      />

      <Text style={Styles.label}>Email</Text>
      <TextInput
        required
        placeholder="enter email"
        placeholderTextColor="#ababab"
        style={Styles.inputBox}
      />

      <Text style={Styles.label}>Phone Number</Text>
      <TextInput
        placeholder="enter Phone Number"
        placeholderTextColor="#ababab"
        style={Styles.inputBox}
      />

      <Text style={Styles.label}>website</Text>
      <TextInput
        placeholder="enter website"
        placeholderTextColor="#ababab"
        style={Styles.inputBox}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
  },

  iconConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },

  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: 'black',
    position: 'absolute',
    right: 0,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#8f8f8f',
    shadowOpacity: 0.25,
    elevation: 15,
    width: '90%',
  },

  formConatinerWrapper: {margin: 10},

  label: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 10,
    color: 'black',
  },

  inputBox: {
    borderColor: 'blue',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    height: 32,
    color: 'black',
  },

  modelButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 0,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#2196F3',
    marginLeft: 10,
    width: 70,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default FormComp;
