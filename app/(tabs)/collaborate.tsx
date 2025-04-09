import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, SlideInRight } from "react-native-reanimated";

// Sample data for projects
const PROJECTS = [
  {
    id: "1",
    title: "E-commerce Mobile App",
    description: "A React Native e-commerce app with payment integration and animation effects",
    skills: ["React Native", "JavaScript", "Firebase"],
    creator: {
      name: "Alex Morgan",
      avatar: require("../../assets/images/avatars/avatar1.png"),
    },
    collaborators: 3,
    status: "Active",
    progress: 65,
  },
  {
    id: "2",
    title: "Machine Learning Dashboard",
    description: "A dashboard to visualize ML model performance and data insights",
    skills: ["Python", "React", "TensorFlow"],
    creator: {
      name: "Jordan Lee",
      avatar: require("../../assets/images/avatars/avatar2.png"),
    },
    collaborators: 2,
    status: "Recruiting",
    progress: 25,
  },
  {
    id: "3",
    title: "Mobile Wallet App",
    description: "A crypto wallet app with enhanced security features",
    skills: ["Flutter", "Blockchain", "Firebase"],
    creator: {
      name: "Jamie Chen",
      avatar: require("../../assets/images/avatars/avatar4.png"),
    },
    collaborators: 4,
    status: "Active",
    progress: 80,
  },
];

// Sample data for recent activity
const ACTIVITIES = [
  {
    id: "1",
    user: {
      name: "Alex Morgan",
      avatar: require("../../assets/images/avatars/avatar1.png"),
    },
    action: "committed to",
    project: "E-commerce Mobile App",
    time: "2 hours ago",
    details: "Added payment gateway integration",
  },
  {
    id: "2",
    user: {
      name: "Jordan Lee",
      avatar: require("../../assets/images/avatars/avatar2.png"),
    },
    action: "commented on",
    project: "Machine Learning Dashboard",
    time: "Yesterday",
    details: "Let's optimize the model training pipeline",
  },
  {
    id: "3",
    user: {
      name: "Jamie Chen",
      avatar: require("../../assets/images/avatars/avatar4.png"),
    },
    action: "merged pull request in",
    project: "Mobile Wallet App",
    time: "2 days ago",
    details: "Implemented biometric authentication",
  },
];

const { width } = Dimensions.get("window");

export default function CollaborateScreen() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f4f8" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Collaborate</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="add-circle" size={24} color="#3b82f6" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "projects" && styles.activeTab]}
            onPress={() => setActiveTab("projects")}
          >
            <Text
              style={[styles.tabText, activeTab === "projects" && styles.activeTabText]}
            >
              Projects
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "activity" && styles.activeTab]}
            onPress={() => setActiveTab("activity")}
          >
            <Text
              style={[styles.tabText, activeTab === "activity" && styles.activeTabText]}
            >
              Activity
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "projects" ? (
          <View style={styles.projectsContainer}>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Projects</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>48</Text>
                <Text style={styles.statLabel}>Commits</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>7</Text>
                <Text style={styles.statLabel}>Collaborators</Text>
              </View>
            </View>

            {PROJECTS.map((project, index) => (
              <Animated.View
                key={project.id}
                entering={SlideInRight.delay(index * 100).springify()}
                style={styles.projectCard}
              >
                <View style={styles.projectHeader}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      project.status === "Active" ? styles.activeStatus : styles.recruitingStatus,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        project.status === "Active"
                          ? styles.activeStatusText
                          : styles.recruitingStatusText,
                      ]}
                    >
                      {project.status}
                    </Text>
                  </View>
                </View>
                <Text style={styles.projectDescription}>{project.description}</Text>

                <View style={styles.skillsRow}>
                  {project.skills.map((skill, idx) => (
                    <View key={idx} style={styles.skillChip}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.progressContainer}>
                  <View style={styles.progressBarBackground}>
                    <View
                      style={[styles.progressBar, { width: `${project.progress}%` }]}
                    />
                  </View>
                  <Text style={styles.progressText}>{project.progress}%</Text>
                </View>

                <View style={styles.projectFooter}>
                  <View style={styles.creatorContainer}>
                    <Image source={project.creator.avatar} style={styles.creatorAvatar} />
                    <Text style={styles.creatorName}>{project.creator.name}</Text>
                  </View>
                  <View style={styles.collaboratorsContainer}>
                    <Ionicons name="people-outline" size={16} color="#64748b" />
                    <Text style={styles.collaboratorsText}>
                      {project.collaborators} collaborators
                    </Text>
                  </View>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="git-branch-outline" size={18} color="#3b82f6" />
                    <Text style={styles.actionButtonText}>View Code</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="chatbubble-outline" size={18} color="#3b82f6" />
                    <Text style={styles.actionButtonText}>Discuss</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            ))}
          </View>
        ) : (
          <View style={styles.activityContainer}>
            {ACTIVITIES.map((activity, index) => (
              <Animated.View
                key={activity.id}
                entering={FadeIn.delay(index * 100)}
                style={styles.activityCard}
              >
                <Image source={activity.user.avatar} style={styles.activityAvatar} />
                <View style={styles.activityContent}>
                  <View style={styles.activityHeader}>
                    <Text style={styles.activityText}>
                      <Text style={styles.activityUserName}>{activity.user.name} </Text>
                      {activity.action}{" "}
                      <Text style={styles.activityProjectName}>{activity.project}</Text>
                    </Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                  <Text style={styles.activityDetails}>{activity.details}</Text>
                </View>
              </Animated.View>
            ))}
          </View>
        )}

        <View style={styles.codeEditorPreview}>
          <Text style={styles.previewTitle}>Live Coding Sessions</Text>
          <TouchableOpacity style={styles.previewCard}>
            <View style={styles.previewHeader}>
              <View style={styles.liveBadge}>
                <View style={styles.liveIndicator} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
              <Text style={styles.previewCardTitle}>React Native Animation Workshop</Text>
            </View>
            <Image
              source={require("../../assets/images/code-preview.png")}
              style={styles.codeImage}
              resizeMode="cover"
            />
            <View style={styles.previewFooter}>
              <View style={styles.previewParticipants}>
                <Image
                  source={require("../../assets/images/avatars/avatar1.png")}
                  style={styles.participantAvatar}
                />
                <Image
                  source={require("../../assets/images/avatars/avatar2.png")}
                  style={[styles.participantAvatar, { marginLeft: -10 }]}
                />
                <View style={styles.moreParticipants}>
                  <Text style={styles.moreParticipantsText}>+3</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join Session</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    fontFamily: "Inter-Bold",
  },
  iconButton: {
    padding: 6,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#e2e8f0",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#ffffff",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    fontFamily: "Inter-SemiBold",
  },
  activeTabText: {
    color: "#1e293b",
  },
  projectsContainer: {
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: width / 3.5,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3b82f6",
    marginBottom: 4,
    fontFamily: "Inter-Bold",
  },
  statLabel: {
    fontSize: 13,
    color: "#64748b",
    fontFamily: "Inter-Medium",
  },
  projectCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    flex: 1,
    fontFamily: "Inter-SemiBold",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activeStatus: {
    backgroundColor: "#ecfdf5",
  },
  recruitingStatus: {
    backgroundColor: "#eff6ff",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  activeStatusText: {
    color: "#10b981",
  },
  recruitingStatusText: {
    color: "#3b82f6",
  },
  projectDescription: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 12,
    fontFamily: "Inter-Regular",
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  skillChip: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
    color: "#64748b",
    fontFamily: "Inter-Medium",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    marginRight: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#3b82f6",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748b",
    fontFamily: "Inter-Medium",
  },
  projectFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  creatorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  creatorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  creatorName: {
    fontSize: 13,
    color: "#64748b",
    fontFamily: "Inter-Medium",
  },
  collaboratorsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  collaboratorsText: {
    fontSize: 13,
    color: "#64748b",
    marginLeft: 4,
    fontFamily: "Inter-Regular",
  },
  actionButtons: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  actionButtonText: {
    fontSize: 13,
    color: "#3b82f6",
    marginLeft: 4,
    fontFamily: "Inter-Medium",
  },
  activityContainer: {
    marginBottom: 20,
  },
  activityCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  activityText: {
    fontSize: 14,
    color: "#64748b",
    flex: 1,
    fontFamily: "Inter-Regular",
  },
  activityUserName: {
    fontWeight: "600",
    color: "#1e293b",
    fontFamily: "Inter-SemiBold",
  },
  activityProjectName: {
    color: "#3b82f6",
    fontFamily: "Inter-SemiBold",
  },
  activityTime: {
    fontSize: 12,
    color: "#94a3b8",
    marginLeft: 8,
    fontFamily: "Inter-Regular",
  },
  activityDetails: {
    fontSize: 13,
    color: "#64748b",
    fontFamily: "Inter-Regular",
  },
  codeEditorPreview: {
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1e293b",
    fontFamily: "Inter-SemiBold",
  },
  previewCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  previewHeader: {
    marginBottom: 12,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fee2e2",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ef4444",
    marginRight: 4,
  },
  liveText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#ef4444",
    fontFamily: "Inter-Bold",
  },
  previewCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    fontFamily: "Inter-SemiBold",
  },
  codeImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  previewFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  previewParticipants: {
    flexDirection: "row",
    alignItems: "center",
  },
  participantAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  moreParticipants: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  moreParticipantsText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#64748b",
    fontFamily: "Inter-Bold",
  },
  joinButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    fontFamily: "Inter-SemiBold",
  },
}); 