import { Modal, View, Text, ProgressBarAndroid } from "react-native";

export default function Dialog({ visible, progress }) {
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                <View style={{ width: "80%", padding: 20, backgroundColor: "white", borderRadius: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Analyzing Potato</Text>
                    <Text>Please wait while we process your image.</Text>
                    <ProgressBarAndroid styleAttr="Horizontal" progress={progress} indeterminate={false} />
                </View>
            </View>
        </Modal>
    );
}
