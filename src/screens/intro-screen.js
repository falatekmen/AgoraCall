import React, { useEffect, useState } from 'react';
import { View, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import { APP_ID } from '../../config';
import size from '../theme/fonts';
import metrics from '../theme/metrics';

const platformPermissions = {
  ios: PERMISSIONS.IOS.MICROPHONE,
  android: PERMISSIONS.ANDROID.RECORD_AUDIO,
};

export function IntroScreen({ navigation }) {

  const [appId, setAppId] = useState(APP_ID)

  useEffect(() => {
    const permissions = platformPermissions[Platform.OS];

    check(permissions).then(
      (status) => {
        if (status === RESULTS.BLOCKED) {
          openSettings()
        } else if (status !== RESULTS.GRANTED) {
          request(permissions)
        }
      });

    if (APP_ID) {
      navigation.navigate('Join', { appId })
    }
  }, []);

  return (
    <View style={styles.container} >
      <Text style={styles.text}>Agora App ID</Text>
      <TextInput
        style={styles.input}
        value={appId}
        onChangeText={setAppId}
        placeholderTextColor={'grey'}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => appId && navigation.navigate('Join', { appId })}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: metrics.height / 5
  },
  text: {
    color: "grey",
    alignSelf: 'center',
    fontSize: size(18),
    fontWeight: "bold",
    marginBottom: metrics.height / 80,
  },
  input: {
    backgroundColor: "grey",
    alignSelf: 'center',
    fontSize: size(18),
    width: metrics.width / 1.3,
    borderRadius: metrics.height / 72,
    marginBottom: metrics.height / 36,
    paddingLeft: metrics.width / 36,
    paddingVertical: metrics.height / 110
  },
  button: {
    backgroundColor: "orange",
    alignItems: 'center',
    marginTop: metrics.height / 72,
    width: metrics.width / 3,
    alignSelf: 'center',
    borderRadius: metrics.height / 100,
  },
  buttonText: {
    color: "white",
    marginVertical: metrics.height / 100,
    fontSize: size(18)
  },
})