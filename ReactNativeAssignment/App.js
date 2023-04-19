import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Modal,
  Text,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {Plus} from './assets/exportFile';
import Home from './Screen/Home';
import CreateForm from './Screen/CreateForm';
import {UserListContext} from './Screen/createContext';

function ModelComp({show, toggleModel}) {
  console.log('model');
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        toggleModel();
      }}>
      <View style={Styles.centeredView}>
        <View style={Styles.modalView}>
          <CreateForm toggleModel={() => toggleModel()} />
        </View>
      </View>
    </Modal>
  );
}

function App() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 500});
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const [list, setList] = React.useState();

  useEffect(() => {
    fetch('https://bytivebackend-evt4.onrender.com/getUserList', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setList([...data.retrievedData]);
      })
      .catch(err => {
        console.log('error is ', err);
        if (!list) {
          console.log(undefined === list, list);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (list) {
      console.log('here is the list', list);
    }
  }, [list]);

  return (
    <SafeAreaView style={[Styles.safeViewTopWrapper]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      <UserListContext.Provider value={[list, setList, onRefresh]}>
        <ScrollView contentContainerStyle={Styles.enclosingView}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              display: 'flex',
              height: '100%',
              width: '95%',
            }}>
            {!refreshing ? <Home /> : null}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={Styles.addBtn}
          onPress={() => setModalVisible(true)}>
          <Plus />
        </TouchableOpacity>

        {modalVisible ? (
          <ModelComp
            show={modalVisible}
            toggleModel={() => setModalVisible(!modalVisible)}
          />
        ) : null}
      </UserListContext.Provider>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  safeViewTopWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  enclosingView: {
    minHeight: '100%',
    alignItems: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
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

  addBtn: {
    backgroundColor: 'red',
    position: 'absolute',
    zIndex: 1000,
    bottom: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    right: 50,
  },
});

export default App;
