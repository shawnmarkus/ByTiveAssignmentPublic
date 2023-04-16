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

  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // useEffect(() => {
  //   console.log('page got refresh ');
  // }, [refreshing]);

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
