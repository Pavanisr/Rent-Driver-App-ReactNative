import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";

export default function ExploreScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FFFFFF", dark: "#ece7e7ff" }}
      headerImage={
        <Image
          source={require("@/assets/images/driver-hero.jpg")}
          style={styles.headerImage}
        />
      }
    >
      <View style={styles.container}>
        {/* Title */}
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            Explore Drivers
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Find your perfect driver for any trip
          </ThemedText>
        </ThemedView>

        {/* Feature Cards */}
        <View style={styles.section}>
          <FeatureCard
            title="Hire Daily Drivers"
            desc="Perfect for your everyday travel."
            icon={require("@/assets/images/driver1.jpg")}
          />
          <FeatureCard
            title="Long-Distance Drivers"
            desc="Experienced drivers for long tours."
            icon={require("@/assets/images/driver2.jpg")}
          />
          <FeatureCard
            title="Night Driving"
            desc="Safe drivers available at night."
            icon={require("@/assets/images/driver3.jpg")}
          />
        </View>

        {/* Categories */}
        <ThemedText type="subtitle" style={styles.sectionHeading}>
          Categories
        </ThemedText>

        <View style={styles.categoryRow}>
          <CategoryCard
            label="Car Drivers"
            icon={require("@/assets/images/car.jpeg")}
          />
          <CategoryCard
            label="Van Drivers"
            icon={require("@/assets/images/van.jpg")}
          />
          <CategoryCard
            label="Truck Drivers"
            icon={require("@/assets/images/truck.jpg")}
          />
        </View>

        {/* Popular Drivers */}
        <ThemedText type="subtitle" style={styles.sectionHeading}>
          Popular Drivers
        </ThemedText>

        <View style={styles.driverList}>
          <DriverCard
            name="Sahan Perera"
            rating="4.9"
            trips="120+ Trips"
            img={require("@/assets/images/driverA.jpg")}
          />
          <DriverCard
            name="Nuwan Silva"
            rating="4.8"
            trips="100+ Trips"
            img={require("@/assets/images/driverB.jpg")}
          />
        </View>
      </View>
    </ParallaxScrollView>
  );
}

/* ---------- Components ---------- */

function FeatureCard({ title, desc, icon }: any) {
  return (
    <View style={styles.featureCard}>
      <Image source={icon} style={styles.featureImage} />
      <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
        {title}
      </ThemedText>
      <ThemedText style={styles.featureDesc}>{desc}</ThemedText>
    </View>
  );
}

function CategoryCard({ label, icon }: any) {
  return (
    <TouchableOpacity style={styles.categoryCard}>
      <Image source={icon} style={styles.categoryIcon} />
      <ThemedText style={styles.categoryLabel}>{label}</ThemedText>
    </TouchableOpacity>
  );
}

function DriverCard({ name, rating, trips, img }: any) {
  return (
    <View style={styles.driverCard}>
      <Image source={img} style={styles.driverImage} />
      <View style={styles.driverInfo}>
        <ThemedText type="defaultSemiBold" style={styles.driverName}>
          {name}
        </ThemedText>
        <ThemedText style={styles.driverMeta}>
          ⭐ {rating} · {trips}
        </ThemedText>
      </View>
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },

  headerImage: {
    width: "100%",
    height: 280,
    objectFit: "cover",
  },

  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  title: {
    fontFamily: Fonts.rounded,
    fontSize: 32,
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.7,
    fontSize: 15,
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  /* Feature Cards */
  featureCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  featureImage: {
    width: "100%",
    height: 130,
    borderRadius: 14,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
  },
  featureDesc: {
    marginTop: 3,
    opacity: 0.7,
  },

  /* Categories */
  sectionHeading: {
    marginTop: 28,
    paddingHorizontal: 20,
    fontSize: 20,
    fontFamily: Fonts.rounded,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 15,
  },
  categoryCard: {
    width: "30%",
    backgroundColor: "#F5F7FA",
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  categoryIcon: {
    width: 42,
    height: 42,
    marginBottom: 7,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: "500",
  },

  /* Driver Cards */
  driverList: {
    paddingHorizontal: 20,
    marginTop: 18,
  },
  driverCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  driverInfo: {
    marginLeft: 12,
    justifyContent: "center",
  },
  driverName: {
    fontSize: 16,
  },
  driverMeta: {
    marginTop: 3,
    opacity: 0.7,
  },
});
