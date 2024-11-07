import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
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
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 3
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
                    <Text>No hay nada aquí aún, escanea una imagen.</Text>
                )}
            </ScrollView>
        </View>
    );
}