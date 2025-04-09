import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/AuthContext";


const USER = {
  name: "Sahil kulkarni",
  username: "@sahil",
  avatar: require("../../assets/images/avatars/user.jpeg"),
  bio: "Full Stack Developer passionate about React Native, Node.js, and cloud technologies. Open to collaborate on mobile and web projects.",
  skills: [
    { name: "React Native", level: "Advanced" },
    { name: "JavaScript", level: "Advanced" },
    { name: "TypeScript", level: "Intermediate" },
    { name: "Node.js", level: "Intermediate" },
    { name: "AWS", level: "Beginner" },
  ],
  stats: {
    connections: 47,
    collaborations: 12,
    meetings: 8,
  },
  location: "Nashik, Maharashtra",
  availability: "Available for collaborations",
};

// Menu items
const MENU_ITEMS = [
  { icon: "person-outline", label: "Edit Profile", route: "/edit-profile" },
  { icon: "bookmark-outline", label: "Saved Items", route: "/saved" },
  { icon: "settings-outline", label: "Settings", route: "/settings" },
  { icon: "shield-outline", label: "Privacy", route: "/privacy" },
  { icon: "help-circle-outline", label: "Help & Support", route: "/help" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const [availableSwitch, setAvailableSwitch] = useState(true);
  const [activeTab, setActiveTab] = useState("skills");

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#3b82f6" />
          </TouchableOpacity>
        </View>

        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.profileHeader}
        >
          <Image source={USER.avatar} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{USER.name}</Text>
            <Text style={styles.username}>{USER.username}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color="#64748b" />
              <Text style={styles.locationText}>{USER.location}</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          style={styles.availabilityCard}
        >
          <View style={styles.availabilityHeader}>
            <View style={styles.availabilityInfo}>
              <View style={styles.availabilityDot} />
              <Text style={styles.availabilityText}>
                {availableSwitch ? "Available for collaborations" : "Not available"}
              </Text>
            </View>
            <Switch
              value={availableSwitch}
              onValueChange={setAvailableSwitch}
              trackColor={{ false: "#cbd5e1", true: "#bfdbfe" }}
              thumbColor={availableSwitch ? "#3b82f6" : "#94a3b8"}
            />
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          style={styles.statsCard}
        >
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{USER.stats.connections}</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{USER.stats.collaborations}</Text>
            <Text style={styles.statLabel}>Collaborations</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{USER.stats.meetings}</Text>
            <Text style={styles.statLabel}>Meetings</Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(500).springify()}
          style={styles.bioCard}
        >
          <Text style={styles.bioText}>{USER.bio}</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(600).springify()}
          style={styles.tabContainer}
        >
          <TouchableOpacity
            style={[styles.tab, activeTab === "skills" && styles.activeTab]}
            onPress={() => setActiveTab("skills")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "skills" && styles.activeTabText,
              ]}
            >
              Skills
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "projects" && styles.activeTab]}
            onPress={() => setActiveTab("projects")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "projects" && styles.activeTabText,
              ]}
            >
              Projects
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "history" && styles.activeTab]}
            onPress={() => setActiveTab("history")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "history" && styles.activeTabText,
              ]}
            >
              History
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {activeTab === "skills" && (
          <Animated.View
            entering={FadeInDown.delay(700).springify()}
            style={styles.skillsContainer}
          >
            {USER.skills.map((skill, index) => (
              <View key={index} style={styles.skillItem}>
                <View style={styles.skillInfo}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <Text style={styles.skillLevel}>{skill.level}</Text>
                </View>
                <View style={styles.skillBar}>
                  <View
                    style={[
                      styles.skillProgress,
                      {
                        width:
                          skill.level === "Advanced"
                            ? "90%"
                            : skill.level === "Intermediate"
                            ? "60%"
                            : "30%",
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.addSkillButton}>
              <Ionicons name="add" size={20} color="#3b82f6" />
              <Text style={styles.addSkillText}>Add Skill</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {activeTab === "projects" && (
          <Animated.View
            entering={FadeInDown.delay(700).springify()}
            style={styles.emptyContainer}
          >
            <Ionicons name="code-slash-outline" size={48} color="#94a3b8" />
            <Text style={styles.emptyTitle}>No Projects Yet</Text>
            <Text style={styles.emptyText}>
              Projects you collaborate on will show up here
            </Text>
            <TouchableOpacity style={styles.emptyButton}>
              <Text style={styles.emptyButtonText}>Start a Project</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {activeTab === "history" && (
          <Animated.View
            entering={FadeInDown.delay(700).springify()}
            style={styles.emptyContainer}
          >
            <Ionicons name="time-outline" size={48} color="#94a3b8" />
            <Text style={styles.emptyTitle}>No Activity Yet</Text>
            <Text style={styles.emptyText}>
              Your collaboration history will appear here
            </Text>
          </Animated.View>
        )}

        <Animated.View
          entering={FadeInDown.delay(800).springify()}
          style={styles.menuContainer}
        >
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => router.push(item.route as any)}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon as any} size={22} color="#64748b" />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </TouchableOpacity>
          ))}
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(900).springify()}
          style={styles.logoutContainer}
        >
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </Animated.View>
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
  settingsButton: {
    padding: 8,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 6,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 13,
    color: "#64748b",
    marginLeft: 4,
  },
  availabilityCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  availabilityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  availabilityInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10b981",
    marginRight: 8,
  },
  availabilityText: {
    fontSize: 14,
    color: "#1e293b",
  },
  statsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#64748b",
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#e2e8f0",
  },
  bioCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bioText: {
    fontSize: 14,
    color: "#1e293b",
    lineHeight: 20,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tab: {
    marginRight: 24,
    paddingBottom: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#3b82f6",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#64748b",
  },
  activeTabText: {
    color: "#3b82f6",
  },
  skillsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  skillItem: {
    marginBottom: 16,
  },
  skillInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  skillName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1e293b",
  },
  skillLevel: {
    fontSize: 12,
    color: "#64748b",
  },
  skillBar: {
    height: 6,
    backgroundColor: "#e2e8f0",
    borderRadius: 3,
    overflow: "hidden",
  },
  skillProgress: {
    height: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 3,
  },
  addSkillButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    borderStyle: "dashed",
  },
  addSkillText: {
    fontSize: 14,
    color: "#3b82f6",
    marginLeft: 8,
  },
  emptyContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 16,
  },
  emptyButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  menuContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 15,
    color: "#1e293b",
    marginLeft: 12,
  },
  logoutContainer: {
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    backgroundColor: "#fff1f2",
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ef4444",
    marginLeft: 8,
  },
}); 