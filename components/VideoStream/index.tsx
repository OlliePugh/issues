/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { RTCView } from "react-native-webrtc-web-shim";

import useJanus from "../../hooks/useJanus";

interface VideoStreamProps {
  serverAddress: string;
  streamId: number;
  playing: boolean;
}

const VideoStream = ({
  serverAddress,
  streamId,
  playing,
}: VideoStreamProps) => {
  const { watch, stop, remoteStream } = useJanus({
    url: serverAddress,
    connectionOptions: { keepalive: true },
    streamId,
  });

  useEffect(() => {
    if (playing) {
      if (remoteStream == null) watch();
    } else {
      stop();
    }
  }, [playing]);

  return (
    <>
      {remoteStream != null && playing && (
        <RTCView
          stream={remoteStream}
          objectFit={"cover"}
          style={styles.remoteView}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  remoteView: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2.35,
  },
});

export default VideoStream;
