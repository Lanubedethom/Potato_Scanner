import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Card from "../ui/Card";

export default function History() {
    const scanHistory = [
        { id: 1, date: "3/11/2024, 22:26:46", species: "Russet Potato", description: "A large, oblong potato with a russet-brown skin and white flesh. Ideal for baking and frying." },
        { id: 2, date: "3/11/2024, 22:26:31", species: "Russet Potato", description: "A large, oblong potato with a russet-brown skin and white flesh. Ideal for baking and frying." },
        // Más elementos según sea necesario
    ];

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {/* Encabezado */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, alignItems: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Potato Scanner</Text>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon name="trash" size={20} color="black" />
                    <Text style={{ color: "black", marginLeft: 5 }}>Clear All</Text>
                </TouchableOpacity>
            </View>

            {/* Lista de historial */}
            <ScrollView style={{ padding: 10 }}>
                {scanHistory.length > 0 ? (
                    scanHistory.map((scan) => (
                        <Card key={scan.id} species={scan.species} description={scan.description} date={scan.date} />
                    ))
                ) : (
                    <Text>No hay nada aquí aún, escanea una imagen.</Text>
                )}
            </ScrollView>
        </View>
    );
}
