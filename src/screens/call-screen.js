import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActionSheetIOS,
  Image,
  BackHandler,
} from 'react-native';
import RtcEngine from 'react-native-agora';
import Clipboard from '@react-native-clipboard/clipboard'
import { icons } from '../assets/icons';
import size from '../theme/fonts';
import metrics from '../theme/metrics';


export function CallScreen({ navigation, route }) {

  const { params } = route;

  const [engine, setEngine] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [users, setUsers] = useState([1])

  const agoraInit = async () => {
    setEngine(await RtcEngine.create(params.appId));
  };

  const agoraStart = async () => {
    await engine.joinChannel(
      params.token,
      params.channelName.trim(),
      null,
      0,
    )
    engine.addListener('UserOffline', async () => {
      agoraEnd();
    });

    engine.addListener('UserJoined', async (uuid) => {
      setUsers(prev => [...prev, uuid])
    });
  };

  const agoraEnd = async () => {
    await engine.leaveChannel()
    await engine.destroy()
    navigation.goBack();
  };

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      agoraInit();
      isInitialMount.current = false;
    } else {
      agoraStart();
    }
  }, [engine]);

  const onPressAudio = async () => {
    await engine.muteLocalAudioStream(!isMuted)
      .then(() => setIsMuted(!isMuted));
  };

  const onPressSpeaker = async () => {
    await engine.setEnableSpeakerphone(!isSpeakerOn)
      .then(() => setIsSpeakerOn(!isSpeakerOn));
  };

  const onPressLeave = async () => {
    const options = [
      {
        text: 'End Call',
        onPress: () => agoraEnd(),
      },
    ];

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', ...options.map((option) => option.text)],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex !== 0) {
            options[buttonIndex - 1].onPress();
          }
        }
      );
    } else {
      Alert.alert('Do you want to end this call?', '', options, {
        cancelable: true,
      });
    }
  };

  const copyToClipboard = () => {
    let callerName = params.displayName ? params.displayName : "host"
    Clipboard.setString(
      `callerName: ${callerName}\ntoken: ${params.token}\nchannel: ${params.channelName.trim()}\nsdk: agora`
    )
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true
      })
    return () => backHandler.remove()
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topWrapper}>
        <View style={styles.channelInfo}>
          <Text
            style={styles.channelName}
            numberOfLines={3}
          >
            {params.channelName}
          </Text>
          <Text style={styles.numberOfUsers}>
            {`Participants: ${users.length}`}
          </Text>
        </View>
      </View>
      <View style={styles.middleWrapper}>
        <TouchableOpacity onPress={onPressAudio} >
          <Image
            source={isMuted ? icons.unmute : icons.mute}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressSpeaker}>
          <Image
            source={isSpeakerOn ? icons.speakerOff : icons.speakerOn}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
          <Text style={styles.copyText}>Copy Data</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.leaveButton} onPress={onPressLeave} >
        <Text style={styles.leaveText}>LEAVE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topWrapper: {
    flex: 1
  },
  channelInfo: {
    width: metrics.width / 2.4,
    padding: metrics.height / 90,
    borderRadius: metrics.height / 90,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginTop: metrics.height / 30,
    marginLeft: metrics.width / 36
  },
  channelName: {
    fontSize: size(16),
    fontWeight: 'bold',
    color: 'white',
  },
  numberOfUsers: {
    fontSize: size(13),
    color: 'white',
  },
  middleWrapper: {
    flex: 4,
    paddingLeft: metrics.width / 36,
    justifyContent: 'center',
  },
  image: {
    width: metrics.width / 7.5,
    height: metrics.width / 7.5
  },
  copyButton: {
    width: metrics.width / 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: metrics.height / 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.height / 72
  },
  copyText: {
    color: 'white',
    fontSize: size(15),
    paddingVertical: metrics.height / 60,
  },
  leaveButton: {
    borderRadius: metrics.height / 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: metrics.width / 7,
    paddingVertical: metrics.height / 50,
    alignSelf: 'center',
    marginBottom: metrics.height / 15,
  },
  leaveText: {
    fontSize: size(25),
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center'
  },
});