import { USER_LOCAL_STORAGE_KEY, API_BASE_URL } from '@/constants';
import { saveToStorage, removeFromStorage, getFromStorage } from '@/utils/storage';
import { useState, useEffect } from 'react';
import { createHttpClient } from '@/utils/httpClient';

const httpClient = createHttpClient(API_BASE_URL, {
  'content-type': 'application/json',
});

let changeListeners = [];
const callChangeListeners = (newUser) => {
  changeListeners.forEach((callback) => {
    callback(newUser);
  });
};
export const onUserChange = (callback) => {
  changeListeners = [
    ...changeListeners,
    callback,
  ];
};
export const offUserChange = (callback) => {
  const index = changeListeners.indexOf(callback);
  if (index > -1) {
    changeListeners = [
      ...changeListeners.slice(0, index),
      ...changeListeners.slice(index + 1),
    ];
  }
};

let progressListeners = [];
const callProgressListeners = (newValue) => {
  progressListeners.forEach((callback) => {
    callback(newValue);
  });
};
export const onProgressChange = (callback) => {
  progressListeners = [
    ...progressListeners,
    callback,
  ];
};
export const offProgressChange = (callback) => {
  const index = progressListeners.indexOf(callback);
  if (index > -1) {
    progressListeners = [
      ...progressListeners.slice(0, index),
      ...progressListeners.slice(index + 1),
    ];
  }
};

export const validateLogin = (email, password) => httpClient.post('/auth/login', {
  body: JSON.stringify({
    email,
    password,
  }),
}).then((data) => {
  const newUser = {
    email,
    name: email.replace(/@.*/g, ''),
    accessToken: data.body.user._id,
  };
  saveToStorage(USER_LOCAL_STORAGE_KEY, newUser);
  callChangeListeners(newUser);
}).catch((e) => {
  removeFromStorage(USER_LOCAL_STORAGE_KEY);
  callChangeListeners(null);
  throw e;
}).finally(() => {
  callProgressListeners(false);
});

export const logout = () => {
  removeFromStorage(USER_LOCAL_STORAGE_KEY);
  callChangeListeners(null);
};

export const getUser = () => getFromStorage(USER_LOCAL_STORAGE_KEY);

export const useUser = () => {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    onUserChange(setUser);
    return () => {
      offUserChange(setUser);
    };
  }, []);

  return user;
};