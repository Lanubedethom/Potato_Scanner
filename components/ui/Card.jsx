import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function Card({ species, description, date }) {
    return (
        <View style={{
            flexDirection: "row",
            padding: 15,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 10,
            alignItems: "center"
        }}>
            <Icon name="image" size={40} color="gray" style={{ marginRight: 15 }} />
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{species}</Text>
                <Text>{description}</Text>
                <Text style={{ fontSize: 10, color: "gray", marginTop: 5 }}>{date}</Text>
            </View>
            <TouchableOpacity style={{ padding: 5 }}>
                <Icon name="trash" size={20} color="black" />
            </TouchableOpacity>
        </View>
    );
}
