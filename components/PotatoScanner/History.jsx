import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Card from "../ui/Card";
import Potato from "../ui/Potato";

export default function History() {
    const scanHistory = [
        {
            id: 1,
            date: "3/11/2024, 22:26:46",
            species: "Russet Potato",
            description: "A large, oblong potato with a russet-brown skin and white flesh. Ideal for baking and frying."
        },
        {
            id: 2,
            date: "3/11/2024, 22:26:31",
            species: "Russet Potato",
            description: "A large, oblong potato with a russet-brown skin and white flesh. Ideal for baking and frying."
        },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {/* Encabezado */}
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 15,
                alignItems: "center",
                boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.1)",
                elevation: 3
            }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Potato width={25} height={30} />
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        fontFamily: "Pacifico",
                        marginLeft: 10
                    }}>
                        Potato Scanner
                    </Text>
                </View>
                <Text style={{
                    color: "black",
                    marginLeft: 5,
                    fontSize: 14,
                    fontFamily: "Inter-Regular"
                }}>
                    Detalle
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
                            date={scan.date} />
                    ))
                ) : (
                    <Text>No hay nada aquí aún, escanea una imagen.</Text>
                )}
            </ScrollView>
        </View>
    );
}
