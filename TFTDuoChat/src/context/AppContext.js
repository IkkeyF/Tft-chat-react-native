import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

const initialState = {
  currentUser: null,
  currentRoom: null,
  isHost: false,
  partner: null,
  messages: [],
  isTyping: false,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.payload };
    case 'LOGOUT':
      return initialState;
    case 'CREATE_ROOM':
      return { ...state, currentRoom: action.payload, isHost: true };
    case 'JOIN_ROOM':
      return { ...state, currentRoom: action.payload, isHost: false, partner: action.partner || 'Seu Duo' };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await AsyncStorage.getItem('currentUser');
        if (user) {
          dispatch({ type: 'LOGIN', payload: user });
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (state.currentUser) {
      AsyncStorage.setItem('currentUser', state.currentUser);
    } else {
      AsyncStorage.removeItem('currentUser');
    }
  }, [state.currentUser]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
