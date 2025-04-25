import React, { useContext, useEffect, useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from '../context/UserContext';

const UserFormModal = ({ visible, onClose, editUser }) => {
  const { addUser, updateUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    setName(editUser ? editUser.name : '');
    setEmail(editUser ? editUser.email : '');
    setPhone(editUser ? editUser.phone : '');
  }, [editUser]);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) return;

    const userData = { name, email, phone };

    if (editUser) {
      updateUser(editUser.id, userData);
    } else {
      addUser(userData);
    }

    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Enter phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button title={editUser ? 'Update' : 'Add'} onPress={handleSubmit} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={onClose} color="red" />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 10,
  },
});

export default UserFormModal;
