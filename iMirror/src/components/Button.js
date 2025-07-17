import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ 
  label = "Button", 
  onPress, 
  variant = "primary", 
  size = "medium",
  disabled = false
}) => {
  const getButtonStyle = () => {
    if (variant === "primary") {
      return disabled ? styles.primaryDisabled : styles.primary;
    } else {
      return disabled ? styles.secondaryDisabled : styles.secondary;
    }
  };

  const getTextStyle = () => {
    if (variant === "primary") {
      return styles.primaryText;
    } else {
      return styles.secondaryText;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, getButtonStyle()]} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, getTextStyle()]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primary: {
    backgroundColor: '#74a4ee',
    borderWidth: 1,
    borderColor: '#7fabef',
  },
  primaryDisabled: {
    backgroundColor: '#a8c9f8',
    borderWidth: 1,
    borderColor: '#7fabef',
  },
  secondary: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#74a4ee',
  },
  secondaryDisabled: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#74a4ee',
  },
});

export default Button;
