import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-250)).current; // start off-screen

  useEffect(() => {
    Animated.timing(sidebarAnim, {
      toValue: isSidebarVisible ? 0 : -250,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isSidebarVisible]);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const navigateTo = (screen) => {
    setSidebarVisible(false);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar Menu */}
      <Animated.View style={[styles.sidebar, { left: sidebarAnim }]}>
        <ScrollView>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateTo('Home')}>
            <Text style={styles.sidebarText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateTo('Container11')}>
            <Text style={styles.sidebarText}>Check Claims</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateTo('FraudResults')}>
            <Text style={styles.sidebarText}>Fraud Results</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateTo('UserRegistration')}>
            <Text style={styles.sidebarText}>User Registration</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateTo('AdminUserManagement')}>
            <Text style={styles.sidebarText}>User Management</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateTo('Container16')}>
            <Text style={styles.sidebarText}>Update Policy Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateTo('Title')}>
            <Text style={styles.sidebarText}>Policy Recommendation</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name="menu" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="log-out-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
      <ScrollView contentContainerStyle={styles.mainContent}>
  <View style={styles.contentRow}>
    <Image
      source={require('../assets/img3.png')}
      style={styles.sideImage}
    />
    <View style={styles.textContainer}>
      <Text style={styles.tagline}>Fraud Detection Made Easy</Text>
      <Text style={styles.paragraph}>
        Our platform leverages advanced data mining techniques and AI algorithms to detect fraudulent insurance claims with high accuracy. Whether you're an admin or investigator, our system provides powerful tools to streamline detection and ensure policy integrity.
      </Text>
    </View>
  </View>
</ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Insurance System</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },

  sidebar: {
    position: 'absolute',
    top: 60,
    bottom: 60,
    width: 250,
    backgroundColor: '#ffffff',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    zIndex: 100,
    elevation: 10,
  },

  sidebarItem: {
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },

  sidebarText: {
    fontSize: 16,
    color: '#333',
  },

  header: {
    height: 60,
    backgroundColor: '#003566',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },

  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
    paddingTop: 10,
    marginBottom: 60,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },
  
  sideImage: {
    width: 400,
    height: 400,
    borderRadius: 20,
    marginRight: 10,
  },
  
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
    maxWidth: 500,
  },
  
  paragraph: {
    fontSize: 20,
    color: '#333',
    marginTop: 10,
    lineHeight: 26,
    textAlign: 'left',
  },
  

  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  mainImage: {
    width: '85%',
    height: 230,
    borderRadius: 20,
    marginBottom: 20,
  },

  tagline: {
    fontSize: 20,
    fontWeight: '600',
    color: '#003566',
    textAlign: 'center',
  },

  footer: {
    height: 60,
    backgroundColor: '#003566',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },

  footerText: {
    fontSize: 14,
    color: '#555',
  },
});

export default Dashboard;
