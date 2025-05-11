import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Modal,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  LayoutAnimation,
  Alert,
  SafeAreaView, // <-- added this
  ScrollView // <-- added this
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminUserManagement = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const BASE_URL = 'http://172.29.176.1:5000'; 

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/get-users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.users);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching users:', error.response?.data || error.message);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      await axios.delete(`${BASE_URL}/delete-user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error.response?.data || error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      await axios.put(`${BASE_URL}/update-user/${selectedUser._id}`, selectedUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error.response?.data || error.message);
    }
  };

  const confirmDelete = (user) => {
    alert(
      'Confirm Delete',
      `Are you sure you want to delete ${user.fullName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => handleDelete(user._id), style: 'destructive' },
      ]
    );
  };

  const toggleExpansion = (userId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.policyNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.userCard}
      onPress={() => toggleExpansion(item._id)}
      activeOpacity={0.9}
    >
      <View style={styles.mainInfo}>
        <View style={styles.avatar}>
          <Icon name="person" size={24} color="#fff" />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.userName}>{item.fullName}</Text>
          <Text style={styles.username}>@{item.username}</Text>
        </View>
        <Icon 
          name={expandedUserId === item._id ? 'expand-less' : 'expand-more'} 
          size={24} 
          color="#95a5a6" 
        />
      </View>

      {expandedUserId === item._id && (
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Icon name="email" size={16} color="#7f8c8d" />
            <Text style={styles.detailText}>{item.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="policy" size={16} color="#7f8c8d" />
            <Text style={styles.detailText}>Policy: {item.policyNo}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="date-range" size={16} color="#7f8c8d" />
            <Text style={styles.detailText}>
              Registered: {new Date(item.registrationDate).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]}
              onPress={() => {
                setSelectedUser(item);
                setEditModalVisible(true);
              }}
            >
              <Icon name="edit" size={18} color="#fff" />
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => confirmDelete(item)}
            >
              <Icon name="delete" size={18} color="#fff" />
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f8f9fa'}}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Admin User Management</Text>
      </View>

      <View style={styles.container}>
        <TextInput
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
          }}
          placeholder="Search by username, email or policy number"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#3498db" />
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchUsers} />
            }
          />
        )}

        <Modal visible={editModalVisible} animationType="slide" transparent>
          <View style={{
            flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'
          }}>
            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%', maxHeight: '90%' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Edit User</Text>
              <FlatList
                data={[
                  { label: 'Full Name', key: 'fullName' },
                  { label: 'Email', key: 'email' },
                  { label: 'Phone', key: 'phone' },
                  { label: 'Address', key: 'address' },
                  { label: 'City', key: 'city' },
                  { label: 'Postal Code', key: 'postalCode' },
                  { label: 'CNIC', key: 'cnic' },
                  { label: 'Beneficiary ID', key: 'beneficiaryId' },
                  { label: 'Policy Number', key: 'policyNo' },
                  { label: 'Username', key: 'username' },
                  { label: 'Role', key: 'role' },
                ]}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                  <TextInput
                    placeholder={item.label}
                    value={selectedUser?.[item.key]}
                    onChangeText={(text) => setSelectedUser({ ...selectedUser, [item.key]: text })}
                    style={{ borderBottomWidth: 1, marginBottom: 10 }}
                  />
                )}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={handleUpdate}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton, { marginLeft: 10 }]}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Company Name. All rights reserved.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    backgroundColor: '#003566',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#003566',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    backgroundColor: '#3498db',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  nameContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  username: {
    fontSize: 14,
    color: '#95a5a6',
  },
  detailsSection: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    color: '#7f8c8d',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  editButton: {
    backgroundColor: '#3498db',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AdminUserManagement;
