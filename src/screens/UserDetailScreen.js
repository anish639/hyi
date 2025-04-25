import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserDetailScreen = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phone}</Text>
      <Text>Website: {user.website}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});

export default UserDetailScreen;
