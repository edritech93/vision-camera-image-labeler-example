import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  useCameraDevices,
  Camera,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {labelImage} from 'vision-camera-image-labeler';

export default function App() {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  useEffect(() => {
    Camera.requestCameraPermission();
  }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const labels = labelImage(frame);
    console.log('------------------------------------');
    console.log('labels => ', labels);
    console.log('------------------------------------');
  }, []);

  if (device) {
    return (
      <Camera
        style={styles.wrapCamera}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      />
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  wrapCamera: {
    flex: 1,
  },
});
