import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Potato from "../ui/Potato";
import Dialog from "../ui/Dialog";
import * as ImagePicker from 'expo-image-picker';
import { predictEspecie } from "../../api/api";
import * as FileSystem from 'expo-file-system';

export default function Home({ updateHistory }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [info, setInfo] = useState(null);
    const [process, setProcess] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    const BASE_URL = 'http://localhost:8000';

    const fetchPrediction = async (imageUri) => {
        try {
            const formData = new FormData();

            if (Platform.OS === 'web') {
                const base64Index = imageUri.indexOf(';base64,');
                const mimeType = imageUri.substring(5, base64Index);
                const base64Data = imageUri.substring(base64Index + 8);

                const byteString = atob(imageUri.split(',')[1]);
                const arrayBuffer = new ArrayBuffer(byteString.length);
                const uintArray = new Uint8Array(arrayBuffer);
                for (let i = 0; i < byteString.length; i++) {
                    uintArray[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([uintArray], { type: mimeType });
                formData.append('file', blob, `imagen.${mimeType.split('/')[1]}`);
            } else {
                try {
                    const base64 = await FileSystem.readAsStringAsync(imageUri, {
                        encoding: FileSystem.EncodingType.Base64,
                    });

                    formData.append('file', {
                        uri: imageUri,
                        type: 'image/jpeg',
                        name: 'image.jpg',
                        data: base64
                    });

                    console.log('Image encoded successfully');
                } catch (error) {
                    console.error('Error reading file:', error);
                    throw error;
                }
            }

            const response = await fetch(`${BASE_URL}/predict/`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || 'Error durante la predicción');
            }

            console.log('Respuesta del servidor:', data);
            setInfo({
                species: data.especie,
                description: "Papa nativa peruana.",
                date: new Date().toLocaleString(),
                confianza: data.confianza,
            });

            return data;
        } catch (error) {
            console.error('Error de red:', error);
            throw error;
        }
    };



    const handleTakePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permiso para acceder a cámara es requerido!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri; // Guarda la URI primero
            setSelectedImage(imageUri); // Actualiza el estado
            handleCapture(imageUri);
        }
    };

    const handleImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri; // Guarda la URI primero
            setSelectedImage(imageUri); // Actualiza el estado
            handleCapture(imageUri);
        }
    };

    const handleCapture = (imageUri) => {
        setIsModalVisible(true);
        setProgress(0);
        setProcess(true);

        console.log("Captura de imagen:", imageUri);

        const fetchPredictionPromise = fetchPrediction(imageUri);

        const intervalPromise = new Promise((resolve) => {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 1) {
                        clearInterval(interval);
                        resolve();
                        return 1;
                    }
                    return prev + 0.1;
                }, 50);
            });
        });

        Promise.all([fetchPredictionPromise, intervalPromise])
            .then(() => {
                setProcess(false);
            })
            .catch((error) => {
                console.error('Error durante la predicción o el progreso:', error);
                setProcess(false);
            });
    };


    const handleClose = (accepted) => {
        setIsModalVisible(false);
        if (accepted && info) {
            updateHistory({
                id: Date.now(),
                date: info.date,
                species: info.species,
                description: info.description,
                confianza: info.confianza,
            });
        }
        setProgress(0);
        setInfo(null);
        setProcess(true);
    };

    return (
        <View style={{ flex: 1, alignItems: "center", padding: 20, backgroundColor: "white" }}>
            {/* Icono de papa grande */}
            <View style={{
                width: 100,
                height: 100,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 40,
            }}>
                <Potato width={50} height={50} />
            </View>

            {/* Titulo */}
            <Text style={{
                fontSize: 24,
                fontWeight: "bold",
                fontFamily: 'PacificoRegular',
                marginBottom: 20,
                fontStyle: "italic",
                color: "black"
            }}>
                Kipa
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
                onPress={handleTakePhoto}
            >
                <Icon name="camera" size={15} color="white" style={{ marginRight: 10 }} />
                <Text style={{
                    color: "white",
                    fontFamily: "InterRegular",
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
                onClose={(accepted) => handleClose(accepted)}
            />
        </View>
    );
}
