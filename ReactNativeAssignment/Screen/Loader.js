import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Loader = () => {
  return (
    <View style={Styles.centeredView}>
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          color: 'black',
        }}>
        Loading....
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  centeredView: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
