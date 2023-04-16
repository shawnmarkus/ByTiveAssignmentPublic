import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  StatusBar,
  Text,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import Home from './Screen/Home';

function App() {
  const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={[Styles.safeViewTopWrapper]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={Styles.enclosingView}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            display: 'flex',
            height: '100%',
            width: '95%',
          }}>
          {!refreshing ? (
            <Home
              refreshThePage={() => {
                onRefresh();
              }}
            />
          ) : null}
        </View>
      </ScrollView>
      {/* <View style={Styles.addBtn}>
        <Text>jfjkdsfjsk</Text>
      </View> */}
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
  // addBtn: {
  //   backgroundColor: 'red',
  //   position: 'absolute',
  //   zIndex: 1000,
  //   bottom: 100,
  //   borderRadius: 50,
  //   right: 50,
  // },
});

export default App;




import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import CardComp from './CardComp';
import Loader from './Loader';
import {UserListContext} from './createContext';

const Home = () => {
  const [list, setList, refreshing] = useContext(UserListContext);
  return (
    <View style={Styles.wrapperContainer}>
      {list !== undefined ? (
        list.map((item, indx) => {
          return <CardComp userItem={item} key={indx} />;
        })
      ) : (
        <Loader />
      )}
      {/* <Text style={{color: 'black'}}>{JSON.stringify(list)}</Text> */}
    </View>
  );
};

const Styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Home;


// latest app at 11;45

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
  Modal,
  Text,
  Pressable,
} from 'react-native';
import {UserListContext} from './Screen/createContext';
import RNBootSplash from 'react-native-bootsplash';
import {Plus} from './assets/exportFile';
import Home from './Screen/Home';
import CreateForm from './Screen/CreateForm';

function ModelComp({show, toggleModel}) {
  console.log('model');
  return (
    <>
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
            {/* <FormComp toggleModel={() => toggleModel()} /> */}

            {/* <Text style={{backgroundColor: 'red'}}>ghdsahjkhj</Text> */}
          </View>
        </View>
      </Modal>
    </>
  );
}

function App() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [list, setList] = useState();

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
        console.log('status dekh', data);
        setList([...data.retrievedData]);
      })
      .catch(err => {
        console.log('error is ', err);
        if (!list) {
          console.log(undefined === list, list);

          // dummy data to test ui
          // setList([
          //   {
          //     name: 'Leanne Graham',
          //     imgSrc:
          //       'https://avatars.dicebear.com/v2/avataaars/Bret.svg?options[mood][]=happy',
          //     email: 'Sincere@april.biz',
          //     contactNo: '1-770-736-8031 x56442',
          //     website: 'http://hildegard.org',
          //     _id: 1,
          //   },
          //   {
          //     name: 'assad Graham',
          //     imgSrc:
          //       'https://avatars.dicebear.com/v2/avataaars/Bret.svg?options[mood][]=happy',
          //     email: 'Sincere@april.biz',
          //     contactNo: '1-770-736-8031 x56442',
          //     website: 'http://hildegard.org',
          //     _id: 2,
          //   },
          //   {
          //     name: 'khasa Graham',
          //     imgSrc:
          //       'https://avatars.dicebear.com/v2/avataaars/Bret.svg?options[mood][]=happy',
          //     email: 'Sincere@april.biz',
          //     contactNo: '1-770-736-8031 x56442',
          //     website: 'http://hildegard.org',
          //     _id: 3,
          //   },
          // ]);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={[Styles.safeViewTopWrapper]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      <UserListContext.Provider value={[list, setList, onRefresh]}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={Styles.enclosingView}>
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
  addBtn: {
    backgroundColor: 'red',
    position: 'absolute',
    zIndex: 1000,
    bottom: 50,
    right: 50,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    flex: 1,
    justifyContent: 'center',
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

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;



// home


import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import CardComp from './CardComp';
import Loader from './Loader';
import {UserListContext} from './createContext';

const Home = () => {
  const [list, setList, onRefresh] = useContext(UserListContext);
  return (
    <View style={Styles.wrapperContainer}>
      {list !== undefined ? (
        list.map((item, indx) => {
          return <CardComp userItem={item} key={indx} />;
        })
      ) : (
        <Loader />
      )}
    </View>


<UserListContext.Provider value={[list, setList, onRefresh]}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={Styles.enclosingView}>
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
  );
};

const Styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Home;
