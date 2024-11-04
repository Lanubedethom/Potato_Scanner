import React from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Potato from "../ui/Potato";

export default function Home() {
    const handleCapture = () => {
        console.log("Captura de imagen");
    };

    return (
        <View style={{ flex: 1, alignItems: "center", padding: 20, backgroundColor: "white" }}>
            {/* Icono de papa grande */}
            <View style={{
                width: 100,
                height: 100,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Potato width={50} height={50} />
            </View>

            {/* Titulo */}
            <Text style={{
                fontSize: 24,
                fontWeight: "bold",
                fontFamily: "Pacifico",
                marginBottom: 20
            }}>
                Potato Scanner
            </Text>

            {/* Contenedor de imagen */}
            <TouchableOpacity style={{
                borderColor: "gray",
                borderWidth: 2,
                borderRadius: 10,
                width: 200,
                height: 200,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
                borderStyle: "dashed"
            }}>
                <Icon name="upload" color="gray" size={40} />
            </TouchableOpacity>

            {/* Botón de captura */}
            <TouchableOpacity style={{
                backgroundColor: "black",
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20
            }} onPress={handleCapture}>
                <Text style={{ color: "white" }}>Capture Potato Image</Text>
            </TouchableOpacity>
        </View>
    );
}
