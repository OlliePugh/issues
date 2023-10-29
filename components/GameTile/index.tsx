import React from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "../Themed";
const GameTile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} className="text-ce">
        Some Game Tile
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: "red",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default GameTile;
