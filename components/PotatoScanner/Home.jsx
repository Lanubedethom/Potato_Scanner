import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Potato from "../ui/Potato";
import Dialog from "../ui/Dialog";
import * as ImagePicker from 'expo-image-picker';
import { predictEspecie } from "../../api/api";

export default function Home({ updateHistory }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [info, setInfo] = useState(null);
    const [process, setProcess] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchPrediction = async (imageUri) => {
        try {
            // Convertir la base64 a Blob
            const byteString = atob(imageUri.split(',')[1]); // Eliminar el encabezado base64
            const arrayBuffer = new ArrayBuffer(byteString.length);
            const uintArray = new Uint8Array(arrayBuffer);
            for (let i = 0; i < byteString.length; i++) {
                uintArray[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([uintArray], { type: 'image/png' });

            // Crear el FormData para enviar el archivo
            const formData = new FormData();
            formData.append('file', blob, 'imagen.png'); // El nombre del archivo puede ser ajustado

            // Realizar la solicitud POST
            const response = await fetch('http://127.0.0.1:8000/predict/', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || 'Error durante la predicción');
            }

            console.log('Respuesta del servidor:', data);
            // Actualizar el estado info con los datos recibidos
            setInfo({
                species: data.especie,
                description: "Descripción de la especie predicha.",
                date: new Date().toLocaleString()
            });

            return data
        } catch (error) {
            console.error('Papa nativa peruana:', error);
            throw error; // Volver a lanzar el error para manejarlo donde sea necesario
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
            // Llama a handleCapture después de actualizar el estado
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
            // Llama a handleCapture después de actualizar el estado
            handleCapture(imageUri);
        }
    };

    const handleCapture = (imageUri) => {
        setIsModalVisible(true);
        setProgress(0);
        setProcess(true);

        console.log("Captura de imagen:", imageUri); // Ahora usamos imageUri directamente

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
                onClose={(accepted) => handleClose(accepted)} // Pasa la función handleClose como prop
            />
        </View>
    );
}
