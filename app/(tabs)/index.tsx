import { useRef } from "react";
import { Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* App Name */}
      <Text style={styles.appName}>Driver Buddy</Text>

      {/* Hero Section */}
      <View style={styles.heroWrapper}>
        <Image 
          source={require("@/assets/images/hero.jpg")}
          style={styles.heroImage}
        />
        <View style={styles.gradientOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Hello, Pavani 👋</Text>
          <Text style={styles.heroSubtitle}>Where's your next destination?</Text>

          <View style={styles.searchBar}>
            <TextInput
              placeholder="Search for destinations..."
              placeholderTextColor="#888"
              style={styles.searchInput}
            />
            <TouchableOpacity style={styles.searchIconWrapper}>
              <Text style={{ fontSize: 18 }}>🔍</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 10 }}
        style={styles.horizontalScroll}
      >
        {[
          "Car Driver",
          "Van Driver",
          "Lorry Driver",
          "Bus Driver",
          "Three-Wheel Driver",
          "Bike Delivery Driver",
        ].map((cat) => (
          <TouchableOpacity key={cat} style={styles.categoryChip}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Book a Ride Section */}
      <Text style={styles.sectionTitle}>Book a Ride</Text>
      <View style={styles.filterWrapper}>
        {["Pickup Location", "Destination", "Vehicle Type (Car, Van, Bike...)", "Select Date (DD/MM/YYYY)", "Select Time (HH:MM)"].map((placeholder, idx) => (
          <TextInput
            key={idx}
            placeholder={placeholder}
            placeholderTextColor="#888"
            style={styles.filterInput}
          />
        ))}
        <TouchableOpacity style={styles.filterSearchButton}>
          <Text style={styles.filterSearchButtonText}>Search Drivers</Text>
        </TouchableOpacity>
      </View>

      {/* Offers / Discounts */}
      <Text style={styles.sectionTitle}>Offers & Discounts</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 10 }}
        style={styles.horizontalScroll}
      >
        {[
          { image: require("@/assets/images/deal.jpg"), title: "10% off for Airport Drops", badge: "Hot Deal", badgeColor: "#FF3B30" },
          { image: require("@/assets/images/offer.jpg"), title: "Festival Deals", badge: "Festival", badgeColor: "#FF9500" },
          { image: require("@/assets/images/user.png"), title: "First Ride Discount", badge: "New", badgeColor: "#34C759" },
        ].map((item, idx) => (
          <Animated.View
            key={idx}
            style={[styles.offerCard, { transform: [{ scale: scaleAnim }] }]}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
            >
              <Image source={item.image} style={styles.offerImage} />
              <View style={[styles.badge, { backgroundColor: item.badgeColor }]}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
              <Text style={styles.offerTitle}>{item.title}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F7F7F7" },
  appName: { fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 15, marginTop: 15, color: "#007AFF", letterSpacing: 1 },
  heroWrapper: { width: "100%", height: 260, borderRadius: 20, overflow: "hidden", marginBottom: 25, position: "relative", shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  heroImage: { width: "100%", height: "100%", position: "absolute", resizeMode: "cover" },
  gradientOverlay: { position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.45)" },
  heroContent: { position: "absolute", top: 40, width: "100%", alignItems: "center" },
  heroTitle: { fontSize: 24, fontWeight: "700", color: "#FFF", marginBottom: 6 },
  heroSubtitle: { fontSize: 14, color: "#EEE", marginBottom: 18 },
  searchBar: { width: "90%", backgroundColor: "rgba(255, 255, 255, 0.15)", flexDirection: "row", alignItems: "center", borderRadius: 25, paddingHorizontal: 15, paddingVertical: 10 },
  searchInput: { flex: 1, fontSize: 15, color: "#FFF" },
  searchIconWrapper: { width: 35, height: 35, borderRadius: 20, backgroundColor: "#FFF", alignItems: "center", justifyContent: "center" },
  sectionTitle: { fontSize: 20, fontWeight: "600", marginBottom: 12, color: "#222" },
  horizontalScroll: { marginBottom: 25 },
  categoryChip: { backgroundColor: "#007AFF", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 25, marginRight: 12, elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 5 },
  categoryText: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  filterWrapper: { backgroundColor: "#FFF", padding: 20, borderRadius: 15, marginBottom: 25, elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 5 },
  filterInput: { backgroundColor: "#F0F0F0", borderRadius: 25, paddingHorizontal: 15, paddingVertical: 12, fontSize: 15, marginBottom: 15 },
  filterSearchButton: { backgroundColor: "#007AFF", paddingVertical: 14, borderRadius: 25, alignItems: "center" },
  filterSearchButtonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  offerCard: { width: 180, backgroundColor: "#FFF", borderRadius: 15, marginRight: 15, overflow: "hidden", elevation: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 5, paddingBottom: 10, position: "relative" },
  offerImage: { width: "100%", height: 120, resizeMode: "cover", borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  offerTitle: { fontSize: 14, fontWeight: "600", textAlign: "center", marginTop: 8, paddingHorizontal: 5, color: "#222" },
  badge: { position: "absolute", top: 10, left: 10, backgroundColor: "#FF3B30", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, zIndex: 10 },
  badgeText: { color: "#FFF", fontSize: 12, fontWeight: "600" },
});
