import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  useCameraDevices,
  Camera,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {labelImage} from 'vision-camera-image-labeler';
import {runOnJS} from 'react-native-reanimated';

export default function App() {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  const [result, setResult] = useState(null);

  useEffect(() => {
    Camera.requestCameraPermission();
  }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const objRes = labelImage(frame);
    if (objRes.length > 0) {
      runOnJS(setResult)(objRes[0]);
    }
  }, []);

  if (device) {
    return (
      <View style={styles.container}>
        <Camera
          style={styles.wrapCamera}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
        />
        <Text style={styles.textResult}>{result?.label ?? '-'}</Text>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapCamera: {
    flex: 1,
  },
  textResult: {
    position: 'absolute',
    bottom: 55,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    fontSize: 32,
    textAlign: 'center',
  },
});
