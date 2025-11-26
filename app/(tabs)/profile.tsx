import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      {/* Top Curved Header */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <Image
            source={require("@/assets/images/user1.png")} // change to your image
            style={styles.avatar}
          />
        </View>

        <Text style={styles.name}>Pavani Senarath</Text>
        <Text style={styles.subtitle}>Driver Buddy User</Text>
      </View>

      {/* Info Card */}
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>pavani@example.com</Text>

        <View style={styles.line} />

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>+94 71 234 5678</Text>

        <View style={styles.line} />

        <Text style={styles.label}>Account Type</Text>
        <Text style={styles.value}>Regular User</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        {[
          { icon: "📱", label: "Phone" },
          { icon: "✉️", label: "Email" },
          { icon: "⚙️", label: "Settings" },
          { icon: "🔒", label: "Privacy" },
        ].map((btn, index) => (
          <TouchableOpacity key={index} style={styles.actionButton}>
            <Text style={styles.actionIcon}>{btn.icon}</Text>
            <Text style={styles.actionLabel}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF4FF",
    paddingTop: 80,
  },

  /** HEADER **/
  header: {
    backgroundColor: "#0A84FF",
    height: 300,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: "center",
    paddingTop: 90,
    position: "relative",
  },

  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 100,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  name: {
    marginTop: 150,
    fontSize: 22,
    fontWeight: "700",
    color: "#003366",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#5C6B7A",
    marginTop: 4,
    textAlign: "center",
  },

  /** INFO CARD **/
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 50,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  label: {
    color: "#7A8BA0",
    fontSize: 13,
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#003366",
  },

  line: {
    height: 1,
    backgroundColor: "#E0E6EE",
    marginVertical: 10,
  },

  /** ACTION BUTTONS **/
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    paddingHorizontal: 20,
  },

  actionButton: {
    alignItems: "center",
  },

  actionIcon: {
    fontSize: 30,
    backgroundColor: "#CFE5FF",
    padding: 15,
    borderRadius: 50,
    textAlign: "center",
  },

  actionLabel: {
    marginTop: 8,
    fontSize: 13,
    color: "#003366",
    textAlign: "center",
  },
});
