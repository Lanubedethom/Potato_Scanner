import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
    Modal,
    Button,
    Text,
    Heading,
    VStack,
    Progress,
    Center,
    useTheme
} from "native-base";

export default function Dialog({ visible, progress, info, process, onClose }) {
    const [showModal, setShowModal] = useState(visible);
    const theme = useTheme();

    useEffect(() => {
        setShowModal(visible);
    }, [visible]);

    const handleClose = (accepted) => {
        setShowModal(false);
        onClose(accepted); // Llama a la función onClose pasada como prop
    };

    return (
        <Center>
            <Modal isOpen={showModal} onClose={() => handleClose(false)} size="lg">
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>
                        <Heading size="md" color="black">
                            Resultado
                        </Heading>
                    </Modal.Header>
                    <Modal.Body>
                        {process ? (
                            <VStack space={4} alignItems="center">
                                <Text fontSize="md" color="gray">
                                    Procesando imagen...
                                </Text>
                                <Progress
                                    value={progress * 100}
                                    size="xs"
                                    colorScheme="black"
                                    width="100%"
                                    bg="gray.200" // Fondo de la barra de progreso
                                    _filledTrack={{
                                        bg: "black", // Color de la barra de progreso
                                    }}
                                />
                            </VStack>
                        ) : (
                            info && (
                                <VStack space={4}>
                                    <Text fontSize="lg" bold color="black">
                                        {info.species}
                                    </Text>
                                    <Text color="gray">Confianza: {info.confianza}%</Text>
                                    <Text color="gray">{info.description}</Text>
                                    <Text color="gray">{info.date}</Text>
                                </VStack>
                            )
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="solid"
                                bg="black"
                                onPress={() => handleClose(false)}
                            >
                                <Text color="white">Cancelar</Text>
                            </Button>
                            {!process && (
                                <Button
                                    variant="outline"
                                    borderColor="black"
                                    onPress={() => handleClose(true)}
                                >
                                    <Text color="black">Aceptar</Text>
                                </Button>
                            )}
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
    );
}