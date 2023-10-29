import { MediaDevices } from "janus-gateway-tsdx";
import { mediaDevices } from "react-native-webrtc-web-shim";

class MediaDevicesReactNativeShim implements MediaDevices {
  getUserMedia = (constraints: MediaStreamConstraints) => {
    return Promise.resolve(mediaDevices.getUserMedia(constraints));
  };
}

export default MediaDevicesReactNativeShim;
