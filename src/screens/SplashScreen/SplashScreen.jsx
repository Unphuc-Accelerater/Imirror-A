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
