import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Settings() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Aquí no hay nada todavía</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    text: {
        fontSize: 18,
        color: "gray",
    },
});