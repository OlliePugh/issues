import { useState } from "react";
import React from "react";
import { Button } from "react-native";
import {
  CreateResponsiveStyle,
  DEVICE_SIZES,
  maxSize,
} from "rn-responsive-styles";

// import GameTile from "../../components/GameTile";
import { Text, View } from "../../components/Themed";
import VideoStream from "../../components/VideoStream";

export default function PlayScreen() {
  const styles = useStyles();
  const [videoStarted, setVideoStarted] = useState(false);

  const serverAddress = "wss://janus.conf.meetecho.com/ws";
  const streamId = 1;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Play</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        title={videoStarted ? "Stop" : "Play"}
        onPress={() => setVideoStarted(!videoStarted)}
      />
      <VideoStream
        serverAddress={serverAddress}
        streamId={streamId}
        playing={videoStarted}
      />
    </View>
  );
}

const useStyles = CreateResponsiveStyle(
  {
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    container: {
      flex: 1,
      // justifyContent: "space-evenly",
      // flexDirection: "row",
      // flexWrap: "wrap",
    },
  },
  {
    [maxSize(DEVICE_SIZES.SM)]: {
      container: {
        backgroundColor: "blue",
      },
    },
  }
);
