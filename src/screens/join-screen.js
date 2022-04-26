import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import size from '../theme/fonts';
import metrics from '../theme/metrics';


export function JoinScreen({ navigation, route }) {

  const { appId } = route.params;

  const [channelName, setChannelName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [token, setToken] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Channel Name</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder={"Required"}
          value={channelName}
          onChangeText={setChannelName}
          autoCapitalize="none"
          placeholderTextColor={'grey'}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Display Name</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder={"Optional"}
          value={displayName}
          onChangeText={setDisplayName}
          placeholderTextColor={'grey'}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Token</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder={"Required"}
          value={token}
          onChangeText={setToken}
          placeholderTextColor={'grey'}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          channelName && appId && token && navigation.navigate('Call', {
            channelName,
            displayName,
            token,
            appId
          })}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: metrics.width / 12,
    paddingTop: metrics.height / 6
  },
  inputContainer: {
    paddingVertical: metrics.height / 120,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textWrapper: {
    flex: 1.11,
  },
  text: {
    color: 'grey',
    fontSize: size(15)
  },
  input: {
    flex: 1.8,
    height: metrics.height / 16,
    color: 'white',
    paddingLeft: metrics.width / 36,
    fontSize: size(15),
  },
  button: {
    backgroundColor: 'orange',
    alignItems: 'center',
    marginTop: metrics.height / 20,
    width: metrics.width / 3,
    alignSelf: 'center',
    borderRadius: metrics.height / 100,
  },
  buttonText: {
    color: 'white',
    marginVertical: metrics.height / 100,
    fontSize: size(18),
  },
});
