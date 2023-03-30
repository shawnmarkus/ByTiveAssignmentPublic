import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import Home from './Screen/Home';

function App() {
  return (
    <SafeAreaView style={[Styles.safeViewTopWrapper]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={Styles.enclosingView}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            display: 'flex',
            height: '100%',
            width: '95%',
          }}>
          <Home />
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
