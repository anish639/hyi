import React, { useContext, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import UserFormModal from '../components/UserFormModal';
import { useNavigation } from '@react-navigation/native';

const UsersListScreen = () => {
  const { users, loading, error, deleteUser } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const navigation = useNavigation();

  const openModal = (user = null) => {
    setEditUser(user);
    setModalVisible(true);
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <Button title="Add User" onPress={() => openModal()} />

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserDetails', { user: item })}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>{item.email}</Text>
              <Text style={styles.info}>{item.phone}</Text>
            </TouchableOpacity>

            <View style={styles.buttonRow}>
              <Button title="Edit" onPress={() => openModal(item)} />
              <Button title="Delete" onPress={() => deleteUser(item.id)} />
            </View>
          </View>
        )}
      />

      <UserFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        editUser={editUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});

export default UsersListScreen;
