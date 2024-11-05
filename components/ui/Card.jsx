import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function Card({ species, description, date, onDelete }) {
    return (
        <View style={{
            flexDirection: "row",
            padding: 15,
            boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.1)",
            borderRadius: 10,
            marginBottom: 10,
            alignItems: "center",
            position: "relative"
        }}>
            <Icon name="image" size={40} color="#9CA3AF" style={{ marginRight: 15 }} />
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{species}</Text>
                <Text style={{ color: "gray" }}>{description}</Text>
                <Text style={{ fontSize: 10, color: "gray", marginTop: 5 }}>{date}</Text>
            </View>
            <TouchableOpacity onPress={onDelete} style={{ position: "absolute", top: 10, right: 10 }}>
                <Icon name="trash-2" size={15} color="black" />
            </TouchableOpacity>
        </View>
    );
}
