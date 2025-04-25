import React, { createContext, useEffect, useState } from 'react';
import {
  fetchUsersApi,
  addUserApi,
  updateUserApi,
  deleteUserApi,
} from '../api/userApi';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsersApi();
      setUsers(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user) => {
    try {
      const newUser = await addUserApi(user);
      setUsers((prev) => [...prev, newUser]);
    } catch (e) {
      setError(e.message);
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const updated = await updateUserApi(id, updatedUser);
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
    } catch (e) {
      setError(e.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteUserApi(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{ users, loading, error, addUser, updateUser, deleteUser ,fetchUsers}}
    >
      {children}
    </UserContext.Provider>
  );
};
