import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Sidebar = () => {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuVisible(!isMenuVisible)}>
          <Icon name="menu-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Welcome User</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Sidebar */}
      {isMenuVisible && (
        <View style={styles.sidebar}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('')}
            >
              <Icon name="home-outline" size={24} color="#000" />
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox} onPress={() => navigation.navigate('MainContainer')}>
              <Text style={styles.sidebarItemText}>Enter Claims</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox} onPress={() => navigation.navigate('Container3')}>
              <Text style={styles.sidebarItemText}>Update Claims</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox} onPress={() => navigation.navigate('Container4')}>
              <Text style={styles.sidebarItemText}>Cancel Claims</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox} onPress={() => navigation.navigate('ClaimStatus')}>
              <Text style={styles.sidebarItemText}>Claim Status</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox} onPress={() => navigation.navigate('Container2')}>
              <Text style={styles.sidebarItemText}>Policy Updates</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox} onPress={() => navigation.navigate('ContainerRecommendations')}>
              <Text style={styles.sidebarItemText}>Recommendations</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.mainContent}>
          <View style={styles.rowContent}>
            <Image
              source={require('../assets/img1.png')}
              style={styles.sideImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.tagline}>Fraud Detection Made Easy</Text>
              <Text style={styles.paragraph}>
                Our intelligent platform helps insurance companies identify and prevent fraudulent claims. 
                Through data mining and machine learning, it brings efficiency, accuracy, and transparency 
                to the claims process.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Icon name="logo-facebook" size={28} color="#000" style={styles.footerIcon} />
          <Icon name="logo-instagram" size={28} color="#000" style={styles.footerIcon} />
          <Icon name="logo-twitter" size={28} color="#000" style={styles.footerIcon} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#B23B3B',
    elevation: 5,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 250,
    backgroundColor: '#FFE3E3',
    padding: 15,
    zIndex: 999, 
    elevation: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    
  },
  menuText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  menuBox: {
    backgroundColor: '#FFF',
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  sidebarItemText: {
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  mainContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  sideImage: {
    width: 500,
    height: 400,
    borderRadius: 20,
    marginRight: 30,
  },
  textContainer: {
    maxWidth: 350,
    flex: 1,
  },
  tagline: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#B23B3B',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor:'#B23B3B',
    padding:10,
  },
  footerIcon: {
    marginHorizontal: 15,
  },
});
export default Sidebar;