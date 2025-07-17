import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Modal,
  Dimensions
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSequence
} from 'react-native-reanimated';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

const EnterOTP = ({ navigation, route }) => {
  const { phoneNumber } = route.params || { phoneNumber: '' };
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const [resendCountdown, setResendCountdown] = useState(25);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);

  // Animation values
  const buttonScale = useSharedValue(1);
  const otpContainerScale = useSharedValue(1);

  useEffect(() => {
    // Check if all OTP digits are filled
    const isComplete = otp.every(digit => digit !== "");
    setIsContinueEnabled(isComplete);
  }, [otp]);

  useEffect(() => {
    // Countdown timer for resend code
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [resendCountdown]);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const otpContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: otpContainerScale.value }],
    };
  });

  const handleDigitClick = (index) => {
    setActiveInputIndex(index);
    setIsKeyboardVisible(true);
    
    // Animate the OTP container
    otpContainerScale.value = withSequence(
      withTiming(0.98, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
  };

  const handleKeyPress = (digit) => {
    if (activeInputIndex < 4) {
      const newOtp = [...otp];
      newOtp[activeInputIndex] = digit;
      setOtp(newOtp);
      
      // Move to next input if available
      if (activeInputIndex < 3) {
        setActiveInputIndex(activeInputIndex + 1);
      }
    }
  };

  const handleBackspace = () => {
    if (activeInputIndex >= 0) {
      const newOtp = [...otp];
      newOtp[activeInputIndex] = "";
      setOtp(newOtp);
      
      // Move to previous input if not at first
      if (activeInputIndex > 0) {
        setActiveInputIndex(activeInputIndex - 1);
      }
    }
  };

  const handleContinue = () => {
    if (isContinueEnabled) {
      buttonScale.value = withSequence(
        withTiming(0.95, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
      
      // Navigate to setup profile
      setTimeout(() => {
        navigation.navigate('SetupProfile');
      }, 200);
    }
  };

  const handleResendCode = () => {
    if (isResendEnabled) {
      // Reset OTP and countdown
      setOtp(['', '', '', '']);
      setActiveInputIndex(0);
      setResendCountdown(25);
      setIsResendEnabled(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
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
                      handleBackspace();
                    } else {
                      handleKeyPress(key);
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
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={handleGoBack}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Enter OTP</Text>
      
      <Text style={styles.subtitle}>
        Enter the 4-digit that we have sent via the phone number{' '}
        <Text style={styles.phoneNumber}>+{phoneNumber || '62 813-8172-5977'}</Text>
      </Text>
      
      <Animated.View style={[styles.otpContainer, otpContainerAnimatedStyle]}>
        {otp.map((digit, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.otpInput,
              activeInputIndex === index && styles.otpInputActive
            ]}
            onPress={() => handleDigitClick(index)}
          >
            <Text style={styles.otpDigit}>{digit}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
      
      <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
        <Button
          label="Continue"
          onPress={handleContinue}
          disabled={!isContinueEnabled}
        />
      </Animated.View>
      
      <TouchableOpacity
        style={styles.resendButton}
        onPress={handleResendCode}
        disabled={!isResendEnabled}
      >
        <Text style={[
          styles.resendText,
          !isResendEnabled && styles.resendTextDisabled
        ]}>
          {isResendEnabled ? 'Resend code' : `Resend code (${resendCountdown}s)`}
        </Text>
      </TouchableOpacity>
      
      <Modal
        visible={isKeyboardVisible}
        transparent={true}
        animationType="slide"
      >
        {renderKeypad()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    backgroundImage: 'linear-gradient(168deg, rgba(219,234,254,1) 11%, rgba(202,225,254,1) 43%, rgba(252,231,243,1) 100%)',
    paddingHorizontal: 30,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#090a0a',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#090a0a',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  phoneNumber: {
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: (width - 100) / 4,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  otpInputActive: {
    borderColor: '#74a4ee',
  },
  otpDigit: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  resendButton: {
    alignSelf: 'center',
    padding: 10,
  },
  resendText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#74a4ee',
  },
  resendTextDisabled: {
    color: '#a8a8a8',
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

export default EnterOTP;
