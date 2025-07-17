import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSequence,
  withDelay
} from 'react-native-reanimated';
import { Svg, Path } from 'react-native-svg';
import Button from '../components/Button';

const LoginSignup = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Animation values
  const cardTranslateY = useSharedValue(50);
  const cardOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    // Start animations when component mounts
    cardTranslateY.value = withTiming(0, { duration: 600 });
    cardOpacity.value = withTiming(1, { duration: 600 });
    
    // Enable continue button only when exactly 10 digits are entered
    setIsContinueEnabled(phoneNumber.length === 10);
  }, [phoneNumber]);

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: cardTranslateY.value }],
      opacity: cardOpacity.value,
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handlePhoneNumberChange = (text) => {
    // Only allow digits and limit to 10 characters
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 10) {
      setPhoneNumber(cleaned);
    }
  };

  const handleContinue = () => {
    if (isContinueEnabled) {
      buttonScale.value = withSequence(
        withTiming(0.95, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
      
      // Navigate to OTP screen
      setTimeout(() => {
        navigation.navigate('EnterOTP', { phoneNumber });
      }, 200);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setIsKeyboardVisible(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const renderKeypad = () => {
    const keypadButtons = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '0', 'DEL']
    ];

    return (
      <View style={styles.keypadContainer}>
        {keypadButtons.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.keypadRow}>
            {row.map((key, keyIndex) => {
              if (key === '') {
                return <View key={`key-${rowIndex}-${keyIndex}`} style={styles.keypadButton} />;
              }
              
              return (
                <TouchableOpacity
                  key={`key-${rowIndex}-${keyIndex}`}
                  style={styles.keypadButton}
                  onPress={() => {
                    if (key === 'DEL') {
                      setPhoneNumber(prev => prev.slice(0, -1));
                    } else if (phoneNumber.length < 10) {
                      setPhoneNumber(prev => prev + key);
                    }
                  }}
                >
                  <Text style={styles.keypadButtonText}>
                    {key === 'DEL' ? '⌫' : key}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
        
        <TouchableOpacity 
          style={styles.keypadDoneButton}
          onPress={() => setIsKeyboardVisible(false)}
        >
          <Text style={styles.keypadDoneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome</Text>
        <Text style={styles.headerSubtitle}>Log in to your account</Text>
      </View>
      
      <Animated.View style={[styles.card, cardAnimatedStyle]}>
        <TouchableOpacity 
          style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}
          onPress={handleInputFocus}
          activeOpacity={0.8}
        >
          <View style={styles.countryCode}>
            <Text style={styles.countryCodeText}>+91</Text>
            <Svg width={10} height={6} viewBox="0 0 10 6" fill="none">
              <Path d="M1 1L5 5L9 1" stroke="#090a0a" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
          
          <View style={styles.phoneInputWrapper}>
            <Text style={[
              styles.phoneInput,
              !phoneNumber && styles.placeholder
            ]}>
              {phoneNumber || "Mobile number"}
            </Text>
            {isFocused && phoneNumber.length < 10 && (
              <View style={styles.cursor} />
            )}
          </View>
        </TouchableOpacity>
        
        <Text style={styles.disclaimer}>
          You will receive an SMS verification that may apply message and data rates.
        </Text>
        
        <Animated.View style={[styles.buttonWrapper, buttonAnimatedStyle]}>
          <Button
            label="Continue"
            onPress={handleContinue}
            disabled={!isContinueEnabled}
          />
        </Animated.View>
        
        <Text style={styles.termsText}>
          By continuing, you agree to our <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>.
        </Text>
      </Animated.View>
      
      <Modal
        visible={isKeyboardVisible}
        transparent={true}
        animationType="slide"
      >
        {renderKeypad()}
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    backgroundImage: 'linear-gradient(168deg, rgba(219,234,254,1) 11%, rgba(202,225,254,1) 43%, rgba(252,231,243,1) 100%)',
  },
  header: {
    marginTop: 100,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#090a0a',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#090a0a',
    lineHeight: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#e3e5e5',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputContainerFocused: {
    borderColor: '#74a4ee',
    borderWidth: 2,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#090a0a',
    marginRight: 4,
  },
  phoneInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    fontSize: 16,
    color: '#090a0a',
  },
  placeholder: {
    color: '#727772',
  },
  cursor: {
    width: 2,
    height: 20,
    backgroundColor: '#090a0a',
    marginLeft: 2,
  },
  disclaimer: {
    fontSize: 12,
    color: '#6c7072',
    marginBottom: 24,
  },
  buttonWrapper: {
    marginBottom: 24,
  },
  termsText: {
    fontSize: 12,
    color: '#090a0a',
    textAlign: 'center',
    lineHeight: 16,
  },
  termsLink: {
    color: '#6a4dff',
  },
  keypadContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#e3e5e5',
    paddingTop: 16,
    paddingBottom: 34,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  keypadButton: {
    width: 70,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 5,
  },
  keypadButtonText: {
    fontSize: 25,
    color: '#090a0a',
  },
  keypadDoneButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#74a4ee',
    borderRadius: 20,
    marginTop: 10,
  },
  keypadDoneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginSignup;
