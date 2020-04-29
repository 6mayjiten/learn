import React from 'react';
var Spinner = require('react-native-spinkit');
import {StyleSheet, View} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6ec9eb',
    opacity: 0.2,
  },

  spinner: {
    marginBottom: 50,
  },
});

const Loader = () => (
  <View style={styles.container}>
    <Spinner
      style={styles.spinner}
      isVisible={true}
      size={100}
      type="Bounce"
      color="#f74a00"
    />
  </View>
);
export default Loader;
