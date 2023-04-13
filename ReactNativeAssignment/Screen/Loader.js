import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const Loader = () => {
  return (
    <View style={Styles.centeredView}>
      <ActivityIndicator size={'large'} color={'black'} />
    </View>
  );
};

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
