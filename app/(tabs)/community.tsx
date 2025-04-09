import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7;

// Sample data for tech events
const EVENTS = [
  {
    id: "1",
    title: "React Native Meetup",
    description: "Join us for a hands-on workshop on animations and gestures in React Native.",
    date: "June 15, 2023",
    time: "6:30 PM - 8:30 PM",
    location: "Tech Hub Coworking",
    image: require("../../assets/images/code-preview.png"),
    attendees: 42,
    distance: "2.3 mi",
  },
  {
    id: "2",
    title: "JavaScript Conference",
    description: "Three days of JavaScript talks, workshops, and networking with experts.",
    date: "July 7-9, 2023",
    time: "9:00 AM - 5:00 PM",
    location: "Downtown Convention Center",
    image: require("../../assets/images/code-preview.png"),
    attendees: 156,
    distance: "4.8 mi",
  },
  {
    id: "3",
    title: "AI & ML Study Group",
    description: "Weekly study group focusing on practical machine learning applications.",
    date: "Every Thursday",
    time: "7:00 PM - 9:00 PM",
    location: "University Tech Center",
    image: require("../../assets/images/code-preview.png"),
    attendees: 28,
    distance: "3.1 mi",
  },
];

// Sample data for tech communities
const COMMUNITIES = [
  {
    id: "1",
    name: "Frontend Developers",
    members: 1245,
    description: "Community of frontend developers sharing knowledge and best practices.",
    image: require("../../assets/images/code-preview.png"),
    isJoined: true,
  },
  {
    id: "2",
    name: "Mobile App Builders",
    members: 876,
    description: "For mobile developers across all platforms to collaborate and learn.",
    image: require("../../assets/images/code-preview.png"),
    isJoined: false,
  },
  {
    id: "3",
    name: "DevOps Enthusiasts",
    members: 542,
    description: "Discussing CI/CD, containerization, and cloud infrastructure topics.",
    image: require("../../assets/images/code-preview.png"),
    isJoined: false,
  },
  {
    id: "4",
    name: "Full Stack Heroes",
    members: 1089,
    description: "From frontend to backend, database to deployment - we cover it all!",
    image: require("../../assets/images/code-preview.png"),
    isJoined: true,
  },
];

export default function CommunityScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("events");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <TouchableOpacity>
          <Ionicons name="options-outline" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#94a3b8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={activeTab === "events" ? "Search events..." : "Search communities..."}
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="location-outline" size={20} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "events" && styles.activeTab]}
          onPress={() => setActiveTab("events")}
        >
          <Text style={[styles.tabText, activeTab === "events" && styles.activeTabText]}>
            Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "communities" && styles.activeTab]}
          onPress={() => setActiveTab("communities")}
        >
          <Text style={[styles.tabText, activeTab === "communities" && styles.activeTabText]}>
            Communities
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === "events" ? (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Tech Events</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.eventCardsContainer}
            >
              {EVENTS.map((event, index) => (
                <Animated.View
                  key={event.id}
                  entering={FadeInDown.delay(index * 100).springify()}
                  style={styles.eventCard}
                >
                  <Image source={event.image} style={styles.eventImage} />
                  <View style={styles.eventContent}>
                    <View style={styles.eventHeader}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <View style={styles.distanceBadge}>
                        <Ionicons name="location-outline" size={12} color="#3b82f6" />
                        <Text style={styles.distanceText}>{event.distance}</Text>
                      </View>
                    </View>
                    <Text style={styles.eventDescription} numberOfLines={2}>
                      {event.description}
                    </Text>
                    <View style={styles.eventDetails}>
                      <View style={styles.eventDetailItem}>
                        <Ionicons name="calendar-outline" size={14} color="#64748b" />
                        <Text style={styles.eventDetailText}>{event.date}</Text>
                      </View>
                      <View style={styles.eventDetailItem}>
                        <Ionicons name="time-outline" size={14} color="#64748b" />
                        <Text style={styles.eventDetailText}>{event.time}</Text>
                      </View>
                      <View style={styles.eventDetailItem}>
                        <Ionicons name="location-outline" size={14} color="#64748b" />
                        <Text style={styles.eventDetailText}>{event.location}</Text>
                      </View>
                    </View>
                    <View style={styles.eventFooter}>
                      <View style={styles.attendeesContainer}>
                        <Text style={styles.attendeesText}>{event.attendees} attending</Text>
                      </View>
                      <TouchableOpacity style={styles.attendButton}>
                        <Text style={styles.attendButtonText}>Attend</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>
              ))}
            </ScrollView>

            <View style={styles.categoriesSection}>
              <Text style={styles.categoriesTitle}>Explore Categories</Text>
              <View style={styles.categoriesGrid}>
                <TouchableOpacity style={styles.categoryItem}>
                  <Ionicons name="code-slash-outline" size={24} color="#3b82f6" />
                  <Text style={styles.categoryText}>Coding</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem}>
                  <Ionicons name="flask-outline" size={24} color="#8b5cf6" />
                  <Text style={styles.categoryText}>Data Science</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem}>
                  <Ionicons name="cloud-outline" size={24} color="#ec4899" />
                  <Text style={styles.categoryText}>Cloud</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem}>
                  <Ionicons name="phone-portrait-outline" size={24} color="#f59e0b" />
                  <Text style={styles.categoryText}>Mobile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem}>
                  <Ionicons name="git-branch-outline" size={24} color="#10b981" />
                  <Text style={styles.categoryText}>DevOps</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem}>
                  <Ionicons name="shield-checkmark-outline" size={24} color="#ef4444" />
                  <Text style={styles.categoryText}>Security</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.createEventSection}>
              <View style={styles.createEventContent}>
                <Ionicons name="calendar" size={32} color="#3b82f6" />
                <Text style={styles.createEventTitle}>Create your own tech event</Text>
                <Text style={styles.createEventDescription}>
                  Share your knowledge and connect with other developers
                </Text>
                <TouchableOpacity style={styles.createEventButton}>
                  <Text style={styles.createEventButtonText}>Create Event</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Communities</Text>
            </View>

            {COMMUNITIES.map((community, index) => (
              <Animated.View
                key={community.id}
                entering={FadeInDown.delay(index * 100).springify()}
                style={styles.communityCard}
              >
                <Image source={community.image} style={styles.communityImage} />
                <View style={styles.communityContent}>
                  <View style={styles.communityHeader}>
                    <Text style={styles.communityName}>{community.name}</Text>
                    {community.isJoined && <View style={styles.joinedBadge} />}
                  </View>
                  <Text style={styles.membersText}>{community.members} members</Text>
                  <Text style={styles.communityDescription} numberOfLines={2}>
                    {community.description}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.communityButton,
                      community.isJoined ? styles.leaveButton : styles.joinButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.communityButtonText,
                        community.isJoined ? styles.leaveButtonText : styles.joinButtonText,
                      ]}
                    >
                      {community.isJoined ? "Leave" : "Join"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            ))}

            <View style={styles.createCommunitySection}>
              <TouchableOpacity style={styles.createCommunityButton}>
                <Ionicons name="add" size={24} color="#ffffff" />
                <Text style={styles.createCommunityText}>Create New Community</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: "#1e293b",
  },
  locationButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  tab: {
    marginRight: 24,
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#3b82f6",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748b",
  },
  activeTabText: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  content: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },
  seeAllText: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "500",
  },
  eventCardsContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  eventCard: {
    width: CARD_WIDTH,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginHorizontal: 8,
    overflow: "hidden",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  eventImage: {
    width: "100%",
    height: 140,
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    flex: 1,
    marginRight: 8,
  },
  distanceBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0f2fe",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  distanceText: {
    fontSize: 11,
    color: "#3b82f6",
    marginLeft: 2,
    fontWeight: "500",
  },
  eventDescription: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 12,
    lineHeight: 20,
  },
  eventDetails: {
    marginBottom: 16,
  },
  eventDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  eventDetailText: {
    fontSize: 13,
    color: "#64748b",
    marginLeft: 6,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  attendeesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  attendeesText: {
    fontSize: 13,
    color: "#64748b",
  },
  attendButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  attendButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  categoriesSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryItem: {
    width: "31%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryText: {
    fontSize: 12,
    color: "#1e293b",
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },
  createEventSection: {
    marginTop: 24,
    marginHorizontal: 16,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  createEventContent: {
    alignItems: "center",
  },
  createEventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  createEventDescription: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 20,
  },
  createEventButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  createEventButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
  },
  communityCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  communityImage: {
    width: 100,
    height: "100%",
  },
  communityContent: {
    flex: 1,
    padding: 16,
  },
  communityHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  communityName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    flex: 1,
    marginRight: 8,
  },
  joinedBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10b981",
  },
  membersText: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8,
  },
  communityDescription: {
    fontSize: 14,
    color: "#1e293b",
    marginBottom: 12,
    lineHeight: 20,
  },
  communityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  joinButton: {
    backgroundColor: "#3b82f6",
  },
  leaveButton: {
    backgroundColor: "#f1f5f9",
  },
  communityButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  joinButtonText: {
    color: "#ffffff",
  },
  leaveButtonText: {
    color: "#64748b",
  },
  createCommunitySection: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  createCommunityButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1e40af",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  createCommunityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginLeft: 8,
  },
});