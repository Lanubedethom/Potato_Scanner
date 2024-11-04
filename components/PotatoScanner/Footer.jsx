import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function Footer({ currentPage, setCurrentPage }) {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical: 10,
            borderTopWidth: 1,
            borderColor: "lightgray",
            backgroundColor: "white"
        }}>
            {[
                { name: "home", label: "Home" },
                { name: "clock", label: "History" },
                { name: "settings", label: "Settings" }
            ].map((item, index) => (
                <TouchableOpacity key={index} onPress={() => setCurrentPage(item.name)} style={{ alignItems: "center" }}>
                    <Icon name={item.name} size={24} color={currentPage === item.name ? "black" : "gray"} />
                    <Text style={{ color: currentPage === item.name ? "black" : "gray", fontSize: 12 }}>{item.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
