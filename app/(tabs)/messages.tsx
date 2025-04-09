import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

// Sample data for chats
const CHATS = [
  {
    id: "1",
    user: {
      name: "Alex Morgan",
      avatar: require("../../assets/images/avatars/avatar1.png"),
      isOnline: true,
    },
    lastMessage: "I think we can use Reanimated for this transition",
    time: "10:42 AM",
    unread: 2,
  },
  {
    id: "2",
    user: {
      name: "Jordan Lee",
      avatar: require("../../assets/images/avatars/avatar2.png"),
      isOnline: true,
    },
    lastMessage: "Let me check the documentation for that API",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "3",
    user: {
      name: "Taylor Swift",
      avatar: require("../../assets/images/avatars/avatar3.png"),
      isOnline: false,
    },
    lastMessage: "I sent you the design files. Let me know what you think!",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "4",
    user: {
      name: "Jamie Chen",
      avatar: require("../../assets/images/avatars/avatar4.png"),
      isOnline: true,
    },
    lastMessage: "We need to optimize the performance. It's lagging on older devices",
    time: "Wednesday",
    unread: 0,
  },
  {
    id: "5",
    user: {
      name: "Robin Williams",
      avatar: require("../../assets/images/avatars/avatar1.png"),
      isOnline: false,
    },
    lastMessage: "Can you help me with the authentication flow?",
    time: "Monday",
    unread: 0,
  },
];

// Sample messages for active chat
const MESSAGES = [
  {
    id: "1",
    text: "Hey, how's the progress on the animation component?",
    sender: "them",
    time: "10:30 AM",
  },
  {
    id: "2",
    text: "I'm working on it right now. The spring animations are looking good!",
    sender: "me",
    time: "10:32 AM",
  },
  {
    id: "3",
    text: "Great! Can you share a video preview when you get a chance?",
    sender: "them",
    time: "10:35 AM",
  },
  {
    id: "4",
    text: "Sure, I'll send it over in about an hour.",
    sender: "me",
    time: "10:36 AM",
  },
  {
    id: "5",
    text: "I think we can use Reanimated for this transition. It's much smoother than the Animated API for complex animations.",
    sender: "them",
    time: "10:42 AM",
  },
];

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  
  const activeChatData = CHATS.find(chat => chat.id === activeChat);

  const filteredChats = CHATS.filter(chat => 
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = ({ item, index }) => (
    <Animated.View entering={FadeIn.delay(index * 50)}>
      <TouchableOpacity 
        style={[
          styles.chatItem, 
          activeChat === item.id && styles.activeChatItem
        ]}
        onPress={() => setActiveChat(item.id)}
      >
        <View style={styles.avatarContainer}>
          <Image source={item.user.avatar} style={styles.avatar} />
          {item.user.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.username}>{item.user.name}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          <Text 
            style={[
              styles.lastMessage, 
              item.unread > 0 && styles.unreadMessage
            ]} 
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
        </View>
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>{item.unread}</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="create-outline" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {!activeChat ? (
        <>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="#94a3b8" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search conversations"
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.tabSelector}>
            <TouchableOpacity style={[styles.tab, styles.activeTab]}>
              <Text style={[styles.tabText, styles.activeTabText]}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Requests</Text>
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredChats}
            renderItem={renderChatItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.chatList}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <View style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setActiveChat(null)}
            >
              <Ionicons name="chevron-back" size={24} color="#3b82f6" />
            </TouchableOpacity>
            <View style={styles.activeChatInfo}>
              <View style={styles.activeChatUser}>
                <Image 
                  source={activeChatData?.user.avatar} 
                  style={styles.activeChatAvatar} 
                />
                <View>
                  <Text style={styles.activeChatName}>{activeChatData?.user.name}</Text>
                  <Text style={styles.activeChatStatus}>
                    {activeChatData?.user.isOnline ? "Online" : "Offline"}
                  </Text>
                </View>
              </View>
              <View style={styles.chatActions}>
                <TouchableOpacity style={styles.chatAction}>
                  <Ionicons name="call-outline" size={20} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatAction}>
                  <Ionicons name="videocam-outline" size={20} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatAction}>
                  <Ionicons name="ellipsis-vertical" size={20} color="#64748b" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <ScrollView 
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
          >
            {MESSAGES.map((message, index) => (
              <View 
                key={message.id}
                style={[
                  styles.messageWrapper,
                  message.sender === "me" ? styles.myMessageWrapper : styles.theirMessageWrapper
                ]}
              >
                {message.sender === "them" && (
                  <Image source={activeChatData?.user.avatar} style={styles.messageAvatar} />
                )}
                <View 
                  style={[
                    styles.messageBubble,
                    message.sender === "me" ? styles.myMessage : styles.theirMessage
                  ]}
                >
                  <Text style={styles.messageText}>{message.text}</Text>
                  <Text style={styles.messageTime}>{message.time}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.inputAction}>
              <Ionicons name="attach-outline" size={24} color="#64748b" />
            </TouchableOpacity>
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
              placeholderTextColor="#94a3b8"
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
            />
            <TouchableOpacity 
              style={[
                styles.sendButton,
                newMessage.length > 0 ? styles.activeSendButton : {}
              ]}
              disabled={newMessage.length === 0}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={newMessage.length > 0 ? "#ffffff" : "#94a3b8"} 
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    fontFamily: "Inter-Bold",
  },
  headerIcon: {
    padding: 6,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
    height: 36,
    fontSize: 15,
    color: "#1e293b",
    fontFamily: "Inter-Regular",
  },
  tabSelector: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#3b82f6",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#64748b",
    fontFamily: "Inter-SemiBold",
  },
  activeTabText: {
    color: "#3b82f6",
  },
  tabBadge: {
    backgroundColor: "#ef4444",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  tabBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
  },
  chatList: {
    paddingHorizontal: 16,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activeChatItem: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10b981",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  username: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1e293b",
    fontFamily: "Inter-SemiBold",
  },
  timeText: {
    fontSize: 12,
    color: "#94a3b8",
    fontFamily: "Inter-Regular",
  },
  lastMessage: {
    fontSize: 14,
    color: "#64748b",
    fontFamily: "Inter-Regular",
  },
  unreadMessage: {
    fontWeight: "600",
    color: "#1e293b",
    fontFamily: "Inter-SemiBold",
  },
  unreadBadge: {
    backgroundColor: "#3b82f6",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  unreadBadgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  chatHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    marginBottom: 16,
  },
  activeChatInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activeChatUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  activeChatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  activeChatName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    fontFamily: "Inter-SemiBold",
  },
  activeChatStatus: {
    fontSize: 13,
    color: "#64748b",
    fontFamily: "Inter-Regular",
  },
  chatActions: {
    flexDirection: "row",
  },
  chatAction: {
    marginLeft: 16,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  messagesContent: {
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  myMessageWrapper: {
    justifyContent: "flex-end",
  },
  theirMessageWrapper: {
    justifyContent: "flex-start",
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    maxWidth: "75%",
  },
  myMessage: {
    backgroundColor: "#3b82f6",
  },
  theirMessage: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#ffffff",
    fontFamily: "Inter-Regular",
  },
  messageTime: {
    fontSize: 11,
    color: "#e0e7ff",
    marginTop: 6,
    alignSelf: "flex-end",
    fontFamily: "Inter-Regular",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    backgroundColor: "#ffffff",
  },
  inputAction: {
    marginRight: 8,
  },
  messageInput: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 15,
    color: "#1e293b",
    fontFamily: "Inter-Regular",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  activeSendButton: {
    backgroundColor: "#3b82f6",
  },
}); 