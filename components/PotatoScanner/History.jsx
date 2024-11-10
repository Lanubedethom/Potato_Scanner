import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Card from "../ui/Card";

export default function History({ newEntry }) {
    const [scanHistory, setScanHistory] = useState([]);

    useEffect(() => {
        if (newEntry) {
            setScanHistory((prevHistory) => [newEntry, ...prevHistory]);
        }
    }, [newEntry]);

    const handleDelete = (id) => {
        setScanHistory((prevHistory) => prevHistory.filter((scan) => scan.id !== id));
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {/* Encabezado */}
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 15,
                alignItems: "center",
                backgroundColor: "white",
                borderBottomWidth: 1,
                borderBottomColor: "lightgray"
            }}>
                <Text style={{
                    color: "black",
                    marginLeft: 5,
                    fontSize: 14,
                    fontFamily: "Inter-Regular"
                }}>
                    Historial
                </Text>
            </View>

            {/* Lista de historial */}
            <ScrollView style={{ padding: 10 }}>
                {scanHistory.length > 0 ? (
                    scanHistory.map((scan) => (
                        <Card
                            key={scan.id}
                            species={scan.species}
                            description={scan.description}
                            date={scan.date}
                            onDelete={() => handleDelete(scan.id)}
                        />
                    ))
                ) : (
                    <View style={styles.container}>
                        <Text style={styles.text}>Historial vacío, scanea un imagen para ver los detalles aquí.</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
        fontSize: 12,
        color: "gray",
    },
});