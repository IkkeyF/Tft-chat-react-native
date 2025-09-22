import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, style, primary = true }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, primary ? styles.primary : styles.secondary, style]}>
      <Text style={[styles.text, primary ? styles.primaryText : styles.secondaryText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
  },
  primary: {
    backgroundColor: '#f8c537',
  },
  secondary: {
    backgroundColor: '#4a4a5a',
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
  primaryText: {
    color: '#1a1a2e',
  },
  secondaryText: {
    color: '#e2e2e2',
  },
});

export default Button;