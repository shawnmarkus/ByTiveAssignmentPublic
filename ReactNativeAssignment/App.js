import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native';

import Home from './Screen/Home';

function App() {
  const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={[Styles.safeViewTopWrapper]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
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
    height: '100%',
    backgroundColor: 'white',
  },
  enclosingView: {
    // overflow: 'scroll',
    // minHeight: '100%',
    alignItems: 'center',
  },
});

export default App;
