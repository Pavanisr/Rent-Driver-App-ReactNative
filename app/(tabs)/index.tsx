import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

// Haversine formula for distance calculation
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in meters
}

export default function HomeScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Ride form state
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [distance, setDistance] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);

  // price per meter by vehicle type
  const VEHICLE_PRICES: Record<string, number> = {
    car: 5,
    van: 7,
    bike: 3,
  };

  // animation for offer cards
  const onPressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  // Simulate ride search and price calculation
  const calculateRide = () => {
    Keyboard.dismiss();

    if (!pickup.trim() || !destination.trim() || !vehicleType.trim()) {
      Alert.alert("Missing fields", "Please enter pickup, destination, and vehicle type.");
      return;
    }

    // Simulate coordinates (for demo)
    const lat1 = Math.random() * 0.1 + 6.90; // random around Colombo
    const lon1 = Math.random() * 0.1 + 79.85;
    const lat2 = Math.random() * 0.1 + 6.95;
    const lon2 = Math.random() * 0.1 + 79.90;

    const dist = getDistance(lat1, lon1, lat2, lon2);
    const pricePerMeter = VEHICLE_PRICES[vehicleType.toLowerCase()] || 5;
    const computedPrice = Math.round(dist * pricePerMeter);

    setDistance(dist);
    setPrice(computedPrice);
    setPriceModalVisible(true);
  };

  useEffect(() => {
  let timer: ReturnType<typeof setTimeout>;
  if (bookingModalVisible) {
    timer = setTimeout(() => {
      setBookingModalVisible(false);
      Alert.alert("Demo", "Driver found! (Demo)");
    }, 4000);
  }
  return () => clearTimeout(timer);
}, [bookingModalVisible]);


  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* App Name */}
        <Text style={styles.appName}>Driver Buddy</Text>

        {/* Hero Section */}
        <View style={styles.heroWrapper}>
          <Image source={require("@/assets/images/hero.jpg")} style={styles.heroImage} />
          <View style={styles.gradientOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Hello, Pavani 👋</Text>
            <Text style={styles.heroSubtitle}>Where's your next destination?</Text>

            <View style={styles.searchBar}>
              <TextInput
                placeholder="Search for destinations..."
                placeholderTextColor="#BFC6D0"
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
          {["Car Driver", "Van Driver", "Bike Driver"].map((cat) => (
            <TouchableOpacity key={cat} style={styles.categoryChip} activeOpacity={0.8}>
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Book a Ride Section */}
        <Text style={styles.sectionTitle}>Book Ride for now</Text>
        <View style={styles.filterWrapper}>
          <TextInput
            placeholder="Pickup Location"
            placeholderTextColor="#888"
            style={styles.filterInput}
            value={pickup}
            onChangeText={setPickup}
          />
          <TextInput
            placeholder="Destination"
            placeholderTextColor="#888"
            style={styles.filterInput}
            value={destination}
            onChangeText={setDestination}
          />
          <TextInput
            placeholder="Vehicle Type (Car, Van, Bike)"
            placeholderTextColor="#888"
            style={styles.filterInput}
            value={vehicleType}
            onChangeText={setVehicleType}
          />

          <TouchableOpacity
            style={styles.filterSearchButton}
            onPress={calculateRide}
            activeOpacity={0.85}
          >
            <Text style={styles.filterSearchButtonText}>Search Rides</Text>
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
            <Animated.View key={idx} style={[styles.offerCard, { transform: [{ scale: scaleAnim }] }]}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={() => Alert.alert(item.title, "This is a demo offer card.")}
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
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Price Modal */}
      <Modal isVisible={priceModalVisible} onBackdropPress={() => setPriceModalVisible(false)} useNativeDriver>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Ride Details</Text>

          <View style={styles.modalRow}>
            <Text style={styles.modalLabel}>Pickup</Text>
            <Text style={styles.modalValue}>{pickup}</Text>
          </View>

          <View style={styles.modalRow}>
            <Text style={styles.modalLabel}>Destination</Text>
            <Text style={styles.modalValue}>{destination}</Text>
          </View>

          <View style={styles.modalRow}>
            <Text style={styles.modalLabel}>Distance</Text>
            <Text style={styles.modalValue}>{distance ? (distance / 1000).toFixed(2) + " km" : "-"}</Text>
          </View>

          <View style={[styles.modalRow, { marginTop: 8 }]}>
            <Text style={[styles.modalLabel, { fontSize: 18 }]}>Price</Text>
            <Text style={[styles.modalValue, { fontSize: 18, fontWeight: "700" }]}>Rs {price ?? "-"}</Text>
          </View>

          <TouchableOpacity
            style={[styles.bookButton, { marginTop: 18 }]}
            onPress={() => {
              setPriceModalVisible(false);
              setBookingModalVisible(true);
            }}
            activeOpacity={0.9}
          >
            <Text style={styles.bookButtonText}>Book Ride</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cancelButton]}
            onPress={() => setPriceModalVisible(false)}
            activeOpacity={0.9}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Booking Modal */}
      <Modal isVisible={bookingModalVisible} backdropOpacity={0.45} useNativeDriver>
        <View style={styles.modalBox}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={{ marginTop: 14, fontSize: 18, fontWeight: "600", color: "#222" }}>
            Searching nearby drivers...
          </Text>
          <Text style={{ marginTop: 8, fontSize: 13, color: "#666", textAlign: "center" }}>
            We are looking for available drivers close to your pickup location.
          </Text>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F7F7F7" },
  appName: { fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 15, marginTop: 15, color: "#007AFF", letterSpacing: 1 },

  heroWrapper: { width: "100%", height: 260, borderRadius: 20, overflow: "hidden", marginBottom: 25, position: "relative", shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.12, shadowRadius: 10, elevation: 6 },
  heroImage: { width: "100%", height: "100%", position: "absolute", resizeMode: "cover" },
  gradientOverlay: { position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.25)" },
  heroContent: { position: "absolute", top: 40, width: "100%", alignItems: "center" },
  heroTitle: { fontSize: 24, fontWeight: "700", color: "#ffffffff", marginBottom: 6 },
  heroSubtitle: { fontSize: 14, color: "#e6ddddff", marginBottom: 18 },

  searchBar: { width: "90%", backgroundColor: "#E3E6EA", flexDirection: "row", alignItems: "center", borderRadius: 25, paddingHorizontal: 15, paddingVertical: 10 },
  searchInput: { flex: 1, fontSize: 15, color: "#111" },
  searchIconWrapper: { width: 35, height: 35, borderRadius: 20, backgroundColor: "#007AFF", alignItems: "center", justifyContent: "center" },

  sectionTitle: { fontSize: 20, fontWeight: "600", marginBottom: 12, color: "#222" },
  horizontalScroll: { marginBottom: 25 },

  categoryChip: { backgroundColor: "#007AFF", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 25, marginRight: 12, elevation: 3 },
  categoryText: { color: "#FFF", fontSize: 15, fontWeight: "600" },

  filterWrapper: { backgroundColor: "#FFF", padding: 18, borderRadius: 15, marginBottom: 25, elevation: 3 },
  filterInput: { backgroundColor: "#F3F6FA", borderRadius: 25, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, marginBottom: 12, color: "#222" },
  filterSearchButton: { backgroundColor: "#007AFF", paddingVertical: 14, borderRadius: 25, alignItems: "center" },
  filterSearchButtonText: { color: "#FFF", fontSize: 16, fontWeight: "700" },

  offerCard: { width: 180, backgroundColor: "#FFF", borderRadius: 15, marginRight: 15, overflow: "hidden", elevation: 4, paddingBottom: 10, position: "relative" },
  offerImage: { width: "100%", height: 120, resizeMode: "cover", borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  offerTitle: { fontSize: 14, fontWeight: "600", textAlign: "center", marginTop: 8, paddingHorizontal: 8, color: "#222" },

  badge: { position: "absolute", top: 10, left: 10, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, zIndex: 10 },
  badgeText: { color: "#FFF", fontSize: 12, fontWeight: "700" },

  modalBox: { backgroundColor: "#FFF", padding: 22, borderRadius: 14, alignItems: "center" },
  modalTitle: { fontSize: 20, fontWeight: "800", marginBottom: 10, color: "#111" },
  modalRow: { width: "100%", flexDirection: "row", justifyContent: "space-between", marginVertical: 6 },
  modalLabel: { color: "#666", fontSize: 15 },
  modalValue: { color: "#222", fontSize: 15, maxWidth: "60%", textAlign: "right" },

  bookButton: { marginTop: 8, backgroundColor: "#007AFF", paddingVertical: 12, paddingHorizontal: 26, borderRadius: 25 },
  bookButtonText: { color: "#FFF", fontSize: 16, fontWeight: "700" },

  cancelButton: { marginTop: 10, paddingVertical: 10, paddingHorizontal: 24, borderRadius: 25 },
  cancelButtonText: { color: "#333", fontSize: 15 },
});
