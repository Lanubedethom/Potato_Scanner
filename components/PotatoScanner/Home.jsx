import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Potato from "../ui/Potato";
import Dialog from "../ui/Dialog";
import * as ImagePicker from 'expo-image-picker';

export default function Home() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [info, setInfo] = useState(null);
    const [process, setProcess] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleCapture = () => {
        setIsModalVisible(true);
        setProgress(0);
        setProcess(true);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 1) {
                    clearInterval(interval);
                    setProcess(false);
                    setInfo({
                        species: "Russet Potato",
                        description: "A large, oblong potato with a russet-brown skin and white flesh. Ideal for baking and frying.",
                        date: new Date().toLocaleString()
                    });
                    return 1;
                }
                return prev + 0.01; // Incremento más pequeño para un progreso más fluido
            }, 50); // Intervalo más corto para un progreso más fluido
        });
    };

    const handleImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            handleCapture();
        }
    };

    const handleClose = () => {
        setIsModalVisible(false);
        setProgress(0);
        setInfo(null);
        setProcess(true);
        setSelectedImage(null);
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
                marginBottom: 20,
                color: "black"
            }}>
                Potato Scanner
            </Text>

            {/* Contenedor de imagen */}
            <TouchableOpacity
                style={{
                    borderColor: "#9CA3AF",
                    borderWidth: 2,
                    borderRadius: 10,
                    width: 200,
                    height: 200,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    borderStyle: "dashed"
                }}
                onPress={handleImagePicker}
            >
                {selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, borderRadius: 10 }} />
                ) : (
                    <Icon name="upload" color="#9CA3AF" size={40} />
                )}
            </TouchableOpacity>

            {/* BotOn de captura */}
            <TouchableOpacity
                style={{
                    backgroundColor: "black",
                    borderRadius: 5,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    flexDirection: "row",
                    alignItems: "center"
                }}
                onPress={handleCapture}
            >
                <Icon name="camera" size={15} color="white" style={{ marginRight: 10 }} />
                <Text style={{
                    color: "white",
                    fontFamily: "Inter-Regular",
                    fontSize: 13.5
                }}>
                    Capturar Imagen
                </Text>
            </TouchableOpacity>

            <Dialog
                visible={isModalVisible}
                progress={progress}
                info={info}
                process={process}
                onClose={handleClose} // Pasa la función handleClose como prop
            />
        </View>
    );
}