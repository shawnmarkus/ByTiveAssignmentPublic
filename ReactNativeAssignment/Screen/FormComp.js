import React, {useContext, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import {UserListContext} from './createContext';

const FormComp = ({_id, toggleModel}) => {
  // const {userList, refreshThePage} = useContext(UserListContext);
  // const [list, setList] = userList;
  // const refresh = refreshThePage;

  const [list, setList, refreshThePage] = useContext(UserListContext);

  const [user, setUser] = useState(
    list.filter(item => {
      return item._id === _id;
    })[0],
  );

  const onSubmit = () => {
    fetch('http://192.168.43.152:5001/editUser', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...user,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('data that is updated', data.data);
        refreshThePage();
      })
      .catch(err => {
        console.log('error while update is: ', err);
      });

    toggleModel();
  };

  return (
    <View style={[Styles.formConatinerWrapper]}>
      <Text style={Styles.label}>Name</Text>
      <TextInput
        placeholder="enter Name"
        placeholderTextColor="#ababab"
        value={user.name}
        editable={true}
        onChangeText={text => setUser({...user, name: text})}
        style={Styles.inputBox}
      />

      <Text style={Styles.label}>Email</Text>
      <TextInput
        placeholder="enter email"
        placeholderTextColor="#ababab"
        style={Styles.inputBox}
        value={user.email}
        editable={true}
        onChangeText={text => setUser({...user, email: text})}
      />

      <Text style={Styles.label}>Phone Number</Text>
      <TextInput
        placeholder="enter Phone Number"
        placeholderTextColor="#ababab"
        style={Styles.inputBox}
        value={user.contactNo}
        editable={true}
        onChangeText={text => setUser({...user, contactNo: text})}
      />

      <Text style={Styles.label}>website</Text>
      <TextInput
        placeholder="enter website"
        placeholderTextColor="#ababab"
        style={Styles.inputBox}
        value={user.website}
        editable={true}
        onChangeText={text => setUser({...user, website: text})}
      />

      <View style={[Styles.modelButtonContainer]}>
        <Pressable
          style={[Styles.button, Styles.buttonClose]}
          onPress={() => toggleModel()}>
          <Text style={Styles.textStyle}>Close</Text>
        </Pressable>
        <Pressable
          style={[Styles.button, Styles.buttonClose]}
          onPress={onSubmit}>
          <Text style={Styles.textStyle}>Submit</Text>
        </Pressable>
      </View>
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
    height: 40,
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
