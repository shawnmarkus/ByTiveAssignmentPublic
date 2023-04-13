import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  StatusBar,
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
});

export default App;
