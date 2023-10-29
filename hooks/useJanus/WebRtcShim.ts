import { WebRTC } from "janus-gateway-tsdx";
import {
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from "react-native-webrtc-web-shim";

class WebRTCReactNativeShim implements WebRTC {
  newRTCPeerConnection = (config: RTCConfiguration): RTCPeerConnection => {
    return new RTCPeerConnection(config);
  };

  newRTCSessionDescription = (
    jsep: RTCSessionDescription
  ): RTCSessionDescription => {
    return new RTCSessionDescription(jsep);
  };

  newRTCIceCandidate = (candidate: RTCIceCandidate): RTCIceCandidate => {
    return new RTCIceCandidate(candidate);
  };
}

export default WebRTCReactNativeShim;
